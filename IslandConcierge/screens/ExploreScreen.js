import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';
import Hero from '../components/common/Hero';
import FilterChips from '../components/common/FilterChips';
import CategorySection from '../components/explore/CategorySection';
import AttractionCard from '../components/explore/AttractionCard';
import RestaurantCard from '../components/explore/RestaurantCard';

// Sample data (in production, this would come from API)
const SAMPLE_ATTRACTIONS = [
  {
    id: '1',
    name: 'Botanical Gardens',
    category: 'Gardens & Parks',
    rating: 4.5,
    reviewCount: 234,
    imageSource: { uri: 'https://via.placeholder.com/200x140/006994/FFFFFF?text=Botanical+Gardens' },
    isRecommended: true,
  },
  {
    id: '2',
    name: 'La Soufrière Volcano',
    category: 'Mountains & Trails',
    rating: 5.0,
    reviewCount: 567,
    imageSource: { uri: 'https://via.placeholder.com/200x140/00BCD4/FFFFFF?text=La+Soufriere' },
  },
  {
    id: '3',
    name: 'Fort Charlotte',
    category: 'Historic Sites',
    rating: 4.3,
    reviewCount: 189,
    imageSource: { uri: 'https://via.placeholder.com/200x140/4FC3F7/FFFFFF?text=Fort+Charlotte' },
    isNew: true,
  },
];

const SAMPLE_BEACHES = [
  {
    id: '4',
    name: 'Princess Margaret Beach',
    category: 'Beaches',
    rating: 4.8,
    reviewCount: 432,
    imageSource: { uri: 'https://via.placeholder.com/200x140/00BCD4/FFFFFF?text=Princess+Beach' },
    isRecommended: true,
  },
  {
    id: '5',
    name: 'Tobago Cays',
    category: 'Marine Parks',
    rating: 5.0,
    reviewCount: 891,
    imageSource: { uri: 'https://via.placeholder.com/200x140/006994/FFFFFF?text=Tobago+Cays' },
  },
];

const SAMPLE_RESTAURANTS = [
  {
    id: '6',
    name: 'Flow Wine Bar',
    cuisine: 'Caribbean Fusion',
    rating: 4.6,
    reviewCount: 123,
    priceLevel: '$$$',
    imageSource: { uri: 'https://via.placeholder.com/200x140/FF9800/FFFFFF?text=Flow+Wine+Bar' },
    isRecommended: true,
  },
  {
    id: '7',
    name: 'Basil\'s Bar',
    cuisine: 'Seafood',
    rating: 4.4,
    reviewCount: 267,
    priceLevel: '$$',
    imageSource: { uri: 'https://via.placeholder.com/200x140/4CAF50/FFFFFF?text=Basils+Bar' },
  },
];

const FILTERS = [
  'FOR YOU',
  'THINGS TO DO',
  'BEACHES',
  'CULTURAL',
  'OUTDOOR & ADVENTURE',
  'RESTAURANTS',
];

export default function ExploreScreen() {
  const [selectedFilter, setSelectedFilter] = useState('FOR YOU');

  const handleAttractionPress = (attraction) => {
    // TODO: Navigate to POI detail page
    console.log('View attraction:', attraction.name);
  };

  const handleRestaurantPress = (restaurant) => {
    // TODO: Navigate to restaurant detail page
    console.log('View restaurant:', restaurant.name);
  };

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <Hero
        imageSource={{ uri: 'https://via.placeholder.com/400x250/00BCD4/FFFFFF?text=Saint+Vincent+%26+Grenadines' }}
        title="SAINT VINCENT AND THE GRENADINES"
        height={250}
      />

      {/* Filter Bar */}
      <FilterChips
        filters={FILTERS}
        selectedFilter={selectedFilter}
        onFilterSelect={setSelectedFilter}
      />

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Top Rated Attractions */}
        {(selectedFilter === 'FOR YOU' || selectedFilter === 'THINGS TO DO') && (
          <CategorySection title="⭐ Top Rated Attractions">
            {SAMPLE_ATTRACTIONS.map((attraction) => (
              <AttractionCard
                key={attraction.id}
                {...attraction}
                onPress={() => handleAttractionPress(attraction)}
              />
            ))}
          </CategorySection>
        )}

        {/* Beautiful Beaches */}
        {(selectedFilter === 'FOR YOU' || selectedFilter === 'BEACHES') && (
          <CategorySection title="🏖️ Beautiful Beaches">
            {SAMPLE_BEACHES.map((beach) => (
              <AttractionCard
                key={beach.id}
                {...beach}
                onPress={() => handleAttractionPress(beach)}
              />
            ))}
          </CategorySection>
        )}

        {/* Top Restaurants */}
        {(selectedFilter === 'FOR YOU' || selectedFilter === 'RESTAURANTS') && (
          <CategorySection title="🍴 Top Restaurants">
            {SAMPLE_RESTAURANTS.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onPress={() => handleRestaurantPress(restaurant)}
              />
            ))}
          </CategorySection>
        )}
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
});
