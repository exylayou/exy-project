/**
 * PoiCard Usage Example
 *
 * This file demonstrates how to use the PoiCard component
 * in your Explore and Tours screens.
 */

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PoiCard from './PoiCard';

const PoiCardExample = ({ navigation }) => {
  // Example POI data
  const samplePois = [
    {
      poiId: '1',
      name: 'Botanical Gardens',
      category: 'Attraction',
      rating: 4.5,
      imageUrl: 'https://example.com/botanical-gardens.jpg',
    },
    {
      poiId: '2',
      name: 'Ocean View Restaurant',
      category: 'Restaurant',
      rating: 4.8,
      imageUrl: 'https://example.com/restaurant.jpg',
    },
    {
      poiId: '3',
      name: 'Historic Lighthouse',
      category: 'Landmark',
      rating: 4.3,
      imageUrl: 'https://example.com/lighthouse.jpg',
    },
  ];

  // Handler for navigating to POI detail page
  const handlePoiPress = (poiId) => {
    console.log('Navigate to POI:', poiId);
    // Example navigation (adjust based on your navigation setup):
    // navigation.navigate('PoiDetail', { poiId });
  };

  return (
    <ScrollView style={styles.container}>
      {samplePois.map((poi) => (
        <PoiCard
          key={poi.poiId}
          poiId={poi.poiId}
          name={poi.name}
          category={poi.category}
          rating={poi.rating}
          imageUrl={poi.imageUrl}
          onPress={handlePoiPress}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 16,
  },
});

export default PoiCardExample;

/**
 * INTEGRATION GUIDE
 * =================
 *
 * 1. Import the component:
 *    import PoiCard from './components/common/PoiCard';
 *
 * 2. Use in your screen:
 *    <PoiCard
 *      poiId="unique-id"
 *      name="Botanical Gardens"
 *      category="Attraction"
 *      rating={4.5}
 *      imageUrl="https://your-image-url.jpg"
 *      onPress={(id) => navigation.navigate('PoiDetail', { poiId: id })}
 *    />
 *
 * 3. For lists, use FlatList for better performance:
 *    <FlatList
 *      data={pois}
 *      keyExtractor={(item) => item.poiId}
 *      renderItem={({ item }) => (
 *        <PoiCard
 *          poiId={item.poiId}
 *          name={item.name}
 *          category={item.category}
 *          rating={item.rating}
 *          imageUrl={item.imageUrl}
 *          onPress={handlePoiPress}
 *        />
 *      )}
 *    />
 *
 * CUSTOMIZATION
 * =============
 *
 * The component uses the Island Concierge color palette from themes/colors.js
 * You can customize colors by editing that file.
 *
 * To adjust the card dimensions, modify:
 * - CARD_WIDTH: Line 11 in PoiCard.js
 * - imageContainer height: Line 122 in PoiCard.js (currently 240)
 *
 * PROPS REFERENCE
 * ===============
 *
 * poiId (string, required): Unique identifier for the POI
 * name (string, required): Display name of the POI
 * category (string, required): Category badge text (e.g., "Attraction", "Restaurant")
 * rating (number, required): Rating from 0-5 (supports decimals)
 * imageUrl (string, required): URL to the POI image
 * onPress (function, required): Callback when card is tapped, receives poiId as argument
 */
