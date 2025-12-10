/**
 * API Utility Usage Examples
 *
 * This file demonstrates how to use the API utility functions
 * in your React Native components.
 */

import {
  fetchTours,
  fetchTourById,
  fetchActivityTypes,
  fetchTopRatedTours,
  fetchToursByPriceRange,
} from './api';

/**
 * Example 1: Fetch all tours
 */
export const example1_fetchAllTours = async () => {
  console.log('Example 1: Fetching all tours...');

  const result = await fetchTours();

  if (result.success) {
    console.log(`Found ${result.count} tours`);
    console.log('Tours:', result.data);
  } else {
    console.error('Error:', result.error);
  }

  return result;
};

/**
 * Example 2: Fetch tours with max price filter
 */
export const example2_fetchAffordableTours = async () => {
  console.log('Example 2: Fetching tours under $100...');

  const result = await fetchTours({ max_price: 100 });

  if (result.success) {
    console.log(`Found ${result.count} tours under $100`);
    result.data.forEach(tour => {
      console.log(`- ${tour.name}: $${tour.price_usd}`);
    });
  }

  return result;
};

/**
 * Example 3: Fetch tours with multiple filters
 */
export const example3_fetchFilteredTours = async () => {
  console.log('Example 3: Fetching Adventure tours with rating > 4.5...');

  const result = await fetchTours({
    activity_type: 'Adventure',
    min_rating: 4.5,
    max_price: 200,
  });

  if (result.success) {
    console.log(`Found ${result.count} matching tours`);
    result.data.forEach(tour => {
      console.log(`- ${tour.name}: $${tour.price_usd}, Rating: ${tour.rating}`);
    });
  }

  return result;
};

/**
 * Example 4: Fetch tours available on a specific date
 */
export const example4_fetchToursForDate = async () => {
  console.log('Example 4: Fetching tours available on Saturday...');

  const result = await fetchTours({
    date: '2026-04-18', // This is a Saturday
  });

  if (result.success) {
    console.log(`Found ${result.count} tours available on Saturday`);
  }

  return result;
};

/**
 * Example 5: Fetch a specific tour by ID
 */
export const example5_fetchSingleTour = async () => {
  console.log('Example 5: Fetching tour with ID tour_001...');

  const result = await fetchTourById('tour_001');

  if (result.success) {
    console.log('Tour found:', result.data.name);
    console.log('Price:', `$${result.data.price_usd}`);
    console.log('Duration:', `${result.data.duration_hours} hours`);
  } else {
    console.error('Error:', result.error);
  }

  return result;
};

/**
 * Example 6: Fetch all activity types
 */
export const example6_fetchCategories = async () => {
  console.log('Example 6: Fetching all activity types...');

  const result = await fetchActivityTypes();

  if (result.success) {
    console.log('Activity types:', result.data);
  }

  return result;
};

/**
 * Example 7: Fetch top-rated tours
 */
export const example7_fetchTopTours = async () => {
  console.log('Example 7: Fetching top 5 rated tours...');

  const result = await fetchTopRatedTours(5);

  if (result.success) {
    console.log('Top rated tours:');
    result.data.forEach((tour, index) => {
      console.log(`${index + 1}. ${tour.name}: ${tour.rating} stars`);
    });
  }

  return result;
};

/**
 * Example 8: Fetch tours by price range
 */
export const example8_fetchMidRangeTours = async () => {
  console.log('Example 8: Fetching tours between $50 and $100...');

  const result = await fetchToursByPriceRange(50, 100);

  if (result.success) {
    console.log(`Found ${result.count} tours in the $50-$100 range`);
  }

  return result;
};

/**
 * Example 9: Usage in a React Component
 */
export const ReactComponentExample = `
import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { fetchTours } from './api/api';
import TourCard from './components/TourCard';

const ToursScreen = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    max_price: 200,
    min_rating: 4.0,
  });

  useEffect(() => {
    loadTours();
  }, [filters]);

  const loadTours = async () => {
    setLoading(true);
    const result = await fetchTours(filters);

    if (result.success) {
      setTours(result.data);
    }

    setLoading(false);
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={tours}
      keyExtractor={(item) => item.tour_id}
      renderItem={({ item }) => <TourCard tour={item} />}
    />
  );
};

export default ToursScreen;
`;

/**
 * Run all examples (for testing)
 */
export const runAllExamples = async () => {
  console.log('=== Running All API Examples ===\n');

  await example1_fetchAllTours();
  console.log('\n---\n');

  await example2_fetchAffordableTours();
  console.log('\n---\n');

  await example3_fetchFilteredTours();
  console.log('\n---\n');

  await example4_fetchToursForDate();
  console.log('\n---\n');

  await example5_fetchSingleTour();
  console.log('\n---\n');

  await example6_fetchCategories();
  console.log('\n---\n');

  await example7_fetchTopTours();
  console.log('\n---\n');

  await example8_fetchMidRangeTours();
  console.log('\n---\n');

  console.log('React Component Example:');
  console.log(ReactComponentExample);
};
