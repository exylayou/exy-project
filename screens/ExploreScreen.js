import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import PoiCard from '../components/common/PoiCard';
import { getPoiByFilter } from '../data/poiData';
import colors from '../themes/colors';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.15; // 15% of screen height

const FILTERS = [
  'FOR YOU',
  'THINGS TO DO',
  'BEACHES',
  'CULTURAL',
  'OUTDOOR & ADVENTURE',
  'RESTAURANTS',
];

/**
 * ExploreScreen - Main screen for discovering POIs in Saint Vincent and the Grenadines
 *
 * Features:
 * - Hero header with island imagery
 * - Horizontal scrollable filter bar
 * - Two-column grid of POI cards
 * - Dynamic content based on selected filter
 */
const ExploreScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('FOR YOU');
  const pois = getPoiByFilter(activeFilter);

  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
  };

  const handlePoiPress = (poiId) => {
    console.log('Navigate to POI detail:', poiId);
    // TODO: Implement navigation to POI detail screen
    // navigation.navigate('PoiDetail', { poiId });
  };

  const renderHeroHeader = () => {
    return (
      <View style={styles.heroContainer}>
        {/* Hero Image */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200' }}
          // When local image is available, use: source={require('../images/hero_placeholder.jpg')}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <View style={styles.heroOverlay} />

        {/* Hero Text */}
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroText}>
            SAINT VINCENT AND{'\n'}THE GRENADINES
          </Text>
        </View>
      </View>
    );
  };

  const renderFilterBar = () => {
    return (
      <View style={styles.filterBarContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterBarContent}
        >
          {FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  isActive && styles.filterButtonActive,
                ]}
                onPress={() => handleFilterPress(filter)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderPoiGrid = () => {
    // Create pairs of POIs for two-column layout
    const poiPairs = [];
    for (let i = 0; i < pois.length; i += 2) {
      poiPairs.push(pois.slice(i, i + 2));
    }

    return (
      <View style={styles.gridContainer}>
        {poiPairs.map((pair, pairIndex) => (
          <View key={`pair-${pairIndex}`} style={styles.gridRow}>
            {pair.map((poi) => (
              <View key={poi.poiId} style={styles.gridItem}>
                <PoiCard
                  poiId={poi.poiId}
                  name={poi.name}
                  category={poi.category}
                  rating={poi.rating}
                  imageUrl={poi.imageUrl}
                  onPress={handlePoiPress}
                />
              </View>
            ))}
            {/* Add empty spacer if odd number of items in last row */}
            {pair.length === 1 && <View style={styles.gridItem} />}
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Header */}
        {renderHeroHeader()}

        {/* Filter Bar */}
        {renderFilterBar()}

        {/* POI Grid */}
        {renderPoiGrid()}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
  },
  scrollView: {
    flex: 1,
  },

  // Hero Header Styles
  heroContainer: {
    width: '100%',
    height: HERO_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
  },
  heroTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textShadowColor: colors.shadowDark,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    lineHeight: 32,
  },

  // Filter Bar Styles
  filterBarContainer: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  filterBarContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 24,
    backgroundColor: colors.offWhite,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  filterTextActive: {
    color: colors.white,
  },

  // Grid Styles
  gridContainer: {
    paddingTop: 16,
    paddingHorizontal: 8,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gridItem: {
    width: (width - 32) / 2, // Two columns with padding
  },
  bottomPadding: {
    height: 24,
  },
});

export default ExploreScreen;
