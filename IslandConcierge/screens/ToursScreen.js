import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';
import Hero from '../components/common/Hero';
import FilterChips from '../components/common/FilterChips';
import TourCard from '../components/tours/TourCard';

// Sample tour data (in production, this would come from /tours API)
const SAMPLE_TOURS = [
  {
    id: '1',
    name: 'Full-Day Catamaran Sail',
    operator: 'Island Adventures',
    duration: '8 hrs',
    price: 140,
    rating: 4.9,
    reviewCount: 156,
    activityType: 'Sailing',
    imageSource: { uri: 'https://via.placeholder.com/400x180/00BCD4/FFFFFF?text=Catamaran+Sail' },
    isRecommended: true,
  },
  {
    id: '2',
    name: 'La Soufrière Volcano Hike',
    operator: 'Peak Adventures',
    duration: '6 hrs',
    price: 85,
    rating: 4.8,
    reviewCount: 243,
    activityType: 'Hiking',
    imageSource: { uri: 'https://via.placeholder.com/400x180/4CAF50/FFFFFF?text=Volcano+Hike' },
    isNew: true,
  },
  {
    id: '3',
    name: 'Tobago Cays Snorkel Tour',
    operator: 'Caribbean Marine Tours',
    duration: '5 hrs',
    price: 120,
    rating: 5.0,
    reviewCount: 389,
    activityType: 'Snorkeling',
    imageSource: { uri: 'https://via.placeholder.com/400x180/2196F3/FFFFFF?text=Snorkel+Tour' },
    isRecommended: true,
  },
  {
    id: '4',
    name: 'Dark View Falls & River Tubing',
    operator: 'River Adventures SVG',
    duration: '4 hrs',
    price: 72,
    rating: 4.6,
    reviewCount: 128,
    activityType: 'Water Sports',
    imageSource: { uri: 'https://via.placeholder.com/400x180/009688/FFFFFF?text=River+Tubing' },
    isNew: true,
  },
  {
    id: '5',
    name: 'Sunset Cruise & Dinner',
    operator: 'Grenadines Cruises',
    duration: '3 hrs',
    price: 95,
    rating: 4.7,
    reviewCount: 201,
    activityType: 'Cruise',
    imageSource: { uri: 'https://via.placeholder.com/400x180/FF9800/FFFFFF?text=Sunset+Cruise' },
  },
];

const ACTIVITY_FILTERS = [
  { label: 'All Tours', value: 'all' },
  { label: 'Sailing', value: 'sailing' },
  { label: 'Hiking', value: 'hiking' },
  { label: 'Snorkeling', value: 'snorkeling' },
  { label: 'Water Sports', value: 'water-sports' },
];

export default function ToursScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleTourPress = (tour) => {
    // TODO: Navigate to tour detail/booking page
    console.log('View tour:', tour.name);
  };

  // Filter tours based on selected activity type
  const filteredTours = selectedFilter === 'all'
    ? SAMPLE_TOURS
    : SAMPLE_TOURS.filter(tour =>
        tour.activityType.toLowerCase().includes(selectedFilter.toLowerCase())
      );

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <Hero
        imageSource={{ uri: 'https://via.placeholder.com/400x250/006994/FFFFFF?text=Island+Tours' }}
        title="ISLAND TOURS"
        subtitle="Book Your Caribbean Adventure"
        height={220}
      />

      {/* Filter Bar */}
      <FilterChips
        filters={ACTIVITY_FILTERS}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />

      {/* Tours List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredTours.map((tour) => (
          <TourCard
            key={tour.id}
            {...tour}
            onPress={() => handleTourPress(tour)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
});
