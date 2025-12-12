// API utilities for IslandConcierge app
// Integrates with Netlify Functions for backend services

// Auto-detect API base URL (works for both local dev and production)
const getAPIBaseURL = () => {
  if (typeof window !== 'undefined') {
    // Browser environment
    if (window.location.hostname === 'localhost') {
      // Local development
      return 'http://localhost:8888/.netlify/functions';
    }
    // Production (Netlify)
    return `${window.location.protocol}//${window.location.host}/.netlify/functions`;
  }
  // Default fallback
  return '/.netlify/functions';
};

const API_BASE_URL = getAPIBaseURL();

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} - Response data
 */
export const fetchData = async (endpoint, options = {}) => {
  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Send chat message to Gemini AI
 * @param {string} message - User message
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise} - AI response
 */
export const sendChatMessage = async (message, conversationHistory = []) => {
  try {
    const response = await fetchData('/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        conversationHistory
      })
    });
    return response;
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error;
  }
};

/**
 * Fetch points of interest from Google Places
 * @param {object} filters - Filter parameters (category, radius, limit)
 * @returns {Promise} - POI data
 */
export const fetchPOIs = async (filters = {}) => {
  try {
    const { category = 'THINGS TO DO', radius = 50000, limit = 20 } = filters;

    // Build query string
    const params = new URLSearchParams({
      category,
      radius: radius.toString(),
      limit: limit.toString()
    });

    const response = await fetchData(`/places?${params.toString()}`, {
      method: 'GET'
    });

    return response.pois || [];
  } catch (error) {
    console.error('Places API Error:', error);
    // Return empty array on error to prevent app crash
    return [];
  }
};

/**
 * Fetch available tours from JSON database
 * @param {object} params - Tour search parameters
 * @returns {Promise} - Tour data
 */
export const fetchTours = async (params = {}) => {
  try {
    const { activityType, minPrice, maxPrice, difficulty, limit = 50 } = params;

    // Build query string
    const queryParams = new URLSearchParams();
    if (activityType) queryParams.append('activityType', activityType);
    if (minPrice) queryParams.append('minPrice', minPrice.toString());
    if (maxPrice) queryParams.append('maxPrice', maxPrice.toString());
    if (difficulty) queryParams.append('difficulty', difficulty);
    queryParams.append('limit', limit.toString());

    const response = await fetchData(`/tours?${queryParams.toString()}`, {
      method: 'GET'
    });

    return response.tours || [];
  } catch (error) {
    console.error('Tours API Error:', error);
    // Return empty array on error to prevent app crash
    return [];
  }
};

/**
 * Fetch emergency contacts
 * Note: Currently returns hardcoded data. Can be moved to Netlify Function if needed.
 * @returns {Promise} - Emergency contact data
 */
export const fetchEmergencyContacts = async () => {
  // For now, return the hardcoded data from EmergencyScreen
  // This could be moved to a Netlify Function in the future
  return Promise.resolve([]);
};

export default {
  fetchData,
  sendChatMessage,
  fetchPOIs,
  fetchTours,
  fetchEmergencyContacts,
};
