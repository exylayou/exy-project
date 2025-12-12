/**
 * Netlify Function: Tours API
 * Serves tour data from local JSON database
 */

const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse query parameters
    const params = event.queryStringParameters || {};
    const {
      activityType = 'all',
      minPrice,
      maxPrice,
      difficulty,
      limit = 50
    } = params;

    // Read tours from JSON file
    const toursPath = path.join(__dirname, '../../data/tours.json');
    const toursData = JSON.parse(fs.readFileSync(toursPath, 'utf8'));
    let { tours } = toursData;

    // Apply filters
    if (activityType && activityType !== 'all') {
      tours = tours.filter(tour =>
        tour.activityType.toLowerCase() === activityType.toLowerCase()
      );
    }

    if (minPrice) {
      tours = tours.filter(tour => tour.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      tours = tours.filter(tour => tour.price <= parseFloat(maxPrice));
    }

    if (difficulty) {
      tours = tours.filter(tour =>
        tour.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    // Limit results
    tours = tours.slice(0, parseInt(limit));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Adjust for production
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, max-age=1800' // Cache for 30 minutes
      },
      body: JSON.stringify({
        tours,
        total: tours.length,
        filters: {
          activityType,
          minPrice,
          maxPrice,
          difficulty
        },
        metadata: toursData.metadata,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Tours API Error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to fetch tours',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
