/**
 * Netlify Function: Google Places API
 * Fetches points of interest (POIs) using Google Places API
 *
 * Environment variables required:
 * - GOOGLE_PLACES_API_KEY: Google Cloud Platform API key with Places API enabled
 */

const fetch = require('node-fetch');

// SVG coordinates
const SVG_CENTER = {
  lat: 13.2528,
  lng: -61.1971
};

// Map category to Google Places types
const CATEGORY_TYPE_MAP = {
  'THINGS TO DO': ['tourist_attraction', 'point_of_interest'],
  'BEACHES': ['natural_feature'],
  'RESTAURANTS': ['restaurant', 'cafe'],
  'CULTURAL': ['museum', 'art_gallery', 'church'],
  'OUTDOOR & ADVENTURE': ['park', 'campground'],
  'HOTELS': ['lodging']
};

exports.handler = async (event, context) => {
  // Allow GET and POST
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse query parameters or body
    const params = event.httpMethod === 'GET'
      ? event.queryStringParameters || {}
      : JSON.parse(event.body || '{}');

    const {
      category = 'THINGS TO DO',
      radius = 50000, // 50km radius
      limit = 20
    } = params;

    // Check for API key
    if (!process.env.GOOGLE_PLACES_API_KEY) {
      console.error('GOOGLE_PLACES_API_KEY environment variable is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'API configuration error',
          details: 'GOOGLE_PLACES_API_KEY is not configured'
        })
      };
    }

    // Get place types for category
    const types = CATEGORY_TYPE_MAP[category] || CATEGORY_TYPE_MAP['THINGS TO DO'];

    // Fetch places from Google Places API
    const placesPromises = types.map(async (type) => {
      const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
      url.searchParams.append('location', `${SVG_CENTER.lat},${SVG_CENTER.lng}`);
      url.searchParams.append('radius', radius);
      url.searchParams.append('type', type);
      url.searchParams.append('key', process.env.GOOGLE_PLACES_API_KEY);

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${data.status} - ${data.error_message || ''}`);
      }

      return data.results || [];
    });

    const results = await Promise.all(placesPromises);
    const allPlaces = results.flat();

    // Remove duplicates based on place_id
    const uniquePlaces = Array.from(
      new Map(allPlaces.map(place => [place.place_id, place])).values()
    );

    // Transform to app format
    const pois = uniquePlaces.slice(0, limit).map(place => ({
      id: place.place_id,
      name: place.name,
      category: category,
      rating: place.rating || 0,
      reviewCount: place.user_ratings_total || 0,
      imageUrl: place.photos && place.photos[0]
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${process.env.GOOGLE_PLACES_API_KEY}`
        : 'https://via.placeholder.com/400x300/00BCD4/FFFFFF?text=No+Image',
      address: place.vicinity || '',
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      },
      openNow: place.opening_hours?.open_now,
      priceLevel: place.price_level,
      types: place.types
    }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Adjust for production
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      },
      body: JSON.stringify({
        pois,
        total: pois.length,
        category,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Google Places API Error:', error);

    // Handle specific error types
    if (error.message?.includes('API key')) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid API key' })
      };
    }

    if (error.message?.includes('quota') || error.message?.includes('OVER_QUERY_LIMIT')) {
      return {
        statusCode: 429,
        body: JSON.stringify({ error: 'API quota exceeded. Please try again later.' })
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch places',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
