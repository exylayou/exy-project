/**
 * API Utility for Island Concierge Travel App
 *
 * This module provides functions for fetching data from the backend.
 * Currently uses local JSON data as a placeholder for API calls.
 * In production, these functions will make real HTTP requests to the backend API.
 */

import toursData from '../data/tours.json';

/**
 * Simulates an API call delay
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} - Resolves after the specified delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches tours from the database with optional filtering
 *
 * @param {Object} filters - Optional filter parameters
 * @param {string} filters.date - Date for tour availability (format: 'YYYY-MM-DD')
 * @param {number} filters.max_price - Maximum price in USD
 * @param {string} filters.activity_type - Type of activity (e.g., 'Adventure', 'Cultural')
 * @param {number} filters.min_rating - Minimum rating (0-5)
 * @param {number} filters.max_duration - Maximum duration in hours
 * @param {string} filters.difficulty - Difficulty level ('Easy', 'Moderate', 'Challenging')
 *
 * @returns {Promise<Array>} - Array of tour objects matching the filters
 *
 * @example
 * // Fetch all tours
 * const allTours = await fetchTours();
 *
 * @example
 * // Fetch tours with price filter
 * const affordableTours = await fetchTours({ max_price: 100 });
 *
 * @example
 * // Fetch tours with multiple filters
 * const filtered = await fetchTours({
 *   max_price: 200,
 *   activity_type: 'Adventure',
 *   min_rating: 4.5
 * });
 */
export const fetchTours = async (filters = {}) => {
  // Simulate API call delay (500ms)
  await delay(500);

  try {
    let tours = [...toursData.tours];

    // Apply filters if provided
    if (filters) {
      // Filter by maximum price
      if (filters.max_price !== undefined) {
        tours = tours.filter(tour => tour.price_usd <= filters.max_price);
      }

      // Filter by activity type
      if (filters.activity_type) {
        tours = tours.filter(
          tour => tour.activity_type.toLowerCase() === filters.activity_type.toLowerCase()
        );
      }

      // Filter by minimum rating
      if (filters.min_rating !== undefined) {
        tours = tours.filter(tour => tour.rating >= filters.min_rating);
      }

      // Filter by maximum duration
      if (filters.max_duration !== undefined) {
        tours = tours.filter(tour => tour.duration_hours <= filters.max_duration);
      }

      // Filter by difficulty level
      if (filters.difficulty) {
        tours = tours.filter(
          tour => tour.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
        );
      }

      // Filter by date (check if tour is available on that day)
      if (filters.date) {
        const dateObj = new Date(filters.date);
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = dayNames[dateObj.getDay()];

        tours = tours.filter(tour => {
          if (tour.available_days.includes('Daily')) {
            return true;
          }
          return tour.available_days.includes(dayName);
        });
      }
    }

    // Return filtered tours
    return {
      success: true,
      data: tours,
      count: tours.length,
      filters: filters,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching tours:', error);
    return {
      success: false,
      error: 'Failed to fetch tours',
      data: [],
      count: 0,
    };
  }
};

/**
 * Fetches a single tour by ID
 *
 * @param {string} tourId - The unique tour identifier
 * @returns {Promise<Object>} - Tour object or error
 *
 * @example
 * const tour = await fetchTourById('tour_001');
 */
export const fetchTourById = async (tourId) => {
  await delay(300);

  try {
    const tour = toursData.tours.find(t => t.tour_id === tourId);

    if (!tour) {
      return {
        success: false,
        error: `Tour with ID ${tourId} not found`,
        data: null,
      };
    }

    return {
      success: true,
      data: tour,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching tour by ID:', error);
    return {
      success: false,
      error: 'Failed to fetch tour',
      data: null,
    };
  }
};

/**
 * Fetches all unique activity types available
 *
 * @returns {Promise<Array>} - Array of unique activity types
 *
 * @example
 * const types = await fetchActivityTypes();
 * // Returns: ['Adventure', 'Water Sports', 'Cultural', 'Nature', 'Leisure']
 */
export const fetchActivityTypes = async () => {
  await delay(200);

  try {
    const activityTypes = [...new Set(toursData.tours.map(tour => tour.activity_type))];

    return {
      success: true,
      data: activityTypes.sort(),
      count: activityTypes.length,
    };
  } catch (error) {
    console.error('Error fetching activity types:', error);
    return {
      success: false,
      error: 'Failed to fetch activity types',
      data: [],
      count: 0,
    };
  }
};

/**
 * Fetches tours sorted by rating (highest first)
 *
 * @param {number} limit - Optional limit on number of tours to return
 * @returns {Promise<Array>} - Array of top-rated tours
 *
 * @example
 * const topTours = await fetchTopRatedTours(5);
 */
export const fetchTopRatedTours = async (limit = 10) => {
  await delay(400);

  try {
    const sortedTours = [...toursData.tours].sort((a, b) => b.rating - a.rating);
    const limitedTours = limit ? sortedTours.slice(0, limit) : sortedTours;

    return {
      success: true,
      data: limitedTours,
      count: limitedTours.length,
    };
  } catch (error) {
    console.error('Error fetching top rated tours:', error);
    return {
      success: false,
      error: 'Failed to fetch top rated tours',
      data: [],
      count: 0,
    };
  }
};

/**
 * Fetches tours within a specific price range
 *
 * @param {number} minPrice - Minimum price in USD
 * @param {number} maxPrice - Maximum price in USD
 * @returns {Promise<Array>} - Array of tours within the price range
 *
 * @example
 * const midRangeTours = await fetchToursByPriceRange(50, 100);
 */
export const fetchToursByPriceRange = async (minPrice = 0, maxPrice = Infinity) => {
  await delay(400);

  try {
    const tours = toursData.tours.filter(
      tour => tour.price_usd >= minPrice && tour.price_usd <= maxPrice
    );

    return {
      success: true,
      data: tours,
      count: tours.length,
      price_range: { min: minPrice, max: maxPrice },
    };
  } catch (error) {
    console.error('Error fetching tours by price range:', error);
    return {
      success: false,
      error: 'Failed to fetch tours by price range',
      data: [],
      count: 0,
    };
  }
};

export default {
  fetchTours,
  fetchTourById,
  fetchActivityTypes,
  fetchTopRatedTours,
  fetchToursByPriceRange,
};
