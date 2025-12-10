/**
 * API Module
 * Contains functions for fetching data from the backend
 */

// Mock data for tours - replace with actual API calls in production
const MOCK_TOURS = [
  {
    id: '1',
    title: 'Tobago Cays Sailing Adventure',
    description: 'Explore the pristine waters of the Tobago Cays, a group of small uninhabited islands surrounded by coral reefs. Perfect for snorkeling and swimming with sea turtles.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    duration: 'Full Day',
    difficulty: 'Easy',
    price: 150,
    category: 'sailing',
  },
  {
    id: '2',
    title: 'La Soufriere Volcano Hike',
    description: 'Hike to the summit of La Soufriere, an active volcano offering breathtaking views of St. Vincent and neighboring islands.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    duration: 'Half Day',
    difficulty: 'Challenging',
    price: 75,
    category: 'adventure',
  },
  {
    id: '3',
    title: 'Bequia Island Cultural Tour',
    description: 'Discover the charming island of Bequia with visits to local craft markets, historic sites, and traditional boat-building workshops.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    duration: 'Full Day',
    difficulty: 'Easy',
    price: 95,
    category: 'cultural',
  },
  {
    id: '4',
    title: 'Falls of Baleine Waterfall Trek',
    description: 'Journey to the remote Falls of Baleine, accessible only by boat and hiking trail. Enjoy a refreshing swim in the natural pool.',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    duration: 'Full Day',
    difficulty: 'Moderate',
    price: 120,
    category: 'nature',
  },
  {
    id: '5',
    title: 'Scuba Diving at Anchor Reef',
    description: 'Dive into the crystal-clear waters to explore vibrant coral reefs, tropical fish, and underwater caves.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    duration: 'Half Day',
    difficulty: 'Moderate',
    price: 110,
    category: 'water',
  },
  {
    id: '6',
    title: 'Grenadines Multi-Island Sailing',
    description: 'A 3-day sailing adventure visiting multiple islands including Mustique, Canouan, and Mayreau with onboard accommodation.',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8',
    duration: 'Multi-Day',
    difficulty: 'Easy',
    price: 650,
    category: 'sailing',
  },
  {
    id: '7',
    title: 'Dark View Falls Nature Walk',
    description: 'A gentle walk through lush tropical rainforest to the stunning Dark View Falls, perfect for families.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    duration: 'Half Day',
    difficulty: 'Easy',
    price: 45,
    category: 'nature',
  },
  {
    id: '8',
    title: 'Kayaking in Wallilabou Bay',
    description: 'Explore the scenic Wallilabou Bay by kayak, famous as a filming location for Pirates of the Caribbean.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5',
    duration: 'Half Day',
    difficulty: 'Moderate',
    price: 60,
    category: 'water',
  },
  {
    id: '9',
    title: 'Fort Charlotte Historical Tour',
    description: 'Explore the 18th-century Fort Charlotte with panoramic views of Kingstown and learn about the island\'s colonial history.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5',
    duration: 'Half Day',
    difficulty: 'Easy',
    price: 35,
    category: 'cultural',
  },
  {
    id: '10',
    title: 'Vermont Nature Trail Adventure',
    description: 'Trek through the Vermont Nature Trail, home to the rare St. Vincent Parrot and other exotic wildlife.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    duration: 'Full Day',
    difficulty: 'Moderate',
    price: 85,
    category: 'nature',
  },
];

/**
 * Fetches tours from the API with optional filters
 * @param {Object} filters - Filter criteria (category, duration, difficulty)
 * @returns {Promise<Array>} Array of tour objects
 */
export const fetchTours = async (filters = {}) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredTours = [...MOCK_TOURS];

  // Apply filters
  if (filters.category) {
    filteredTours = filteredTours.filter(
      (tour) => tour.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.duration) {
    filteredTours = filteredTours.filter(
      (tour) => tour.duration.toLowerCase().replace(/\s+/g, '-') === filters.duration.toLowerCase()
    );
  }

  if (filters.difficulty) {
    filteredTours = filteredTours.filter(
      (tour) => tour.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
    );
  }

  return filteredTours;
};

/**
 * Fetches a single tour by ID
 * @param {string} tourId - The tour ID
 * @returns {Promise<Object>} Tour object
 */
export const fetchTourById = async (tourId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const tour = MOCK_TOURS.find((t) => t.id === tourId);
  if (!tour) {
    throw new Error('Tour not found');
  }

  return tour;
};
