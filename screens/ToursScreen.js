import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import TourCard from '../components/TourCard';
import ToursFilterBar from '../components/ToursFilterBar';
import { fetchTours } from '../api/api';

const { width } = Dimensions.get('window');

/**
 * ToursScreen Component
 * Main screen for displaying and filtering tours in Saint Vincent and the Grenadines
 */
const ToursScreen = ({ navigation }) => {
  const [toursData, setToursData] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch tours whenever filters change
   */
  useEffect(() => {
    const loadTours = async () => {
      setIsLoading(true);
      try {
        const tours = await fetchTours(activeFilters);
        setToursData(tours);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setToursData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTours();
  }, [activeFilters]);

  /**
   * Handle filter changes from the filter bar
   */
  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  /**
   * Handle tour card press
   */
  const handleTourPress = (tour) => {
    // Navigate to tour details screen if navigation is available
    if (navigation && navigation.navigate) {
      navigation.navigate('TourDetails', { tourId: tour.id });
    } else {
      console.log('Tour pressed:', tour.title);
    }
  };

  /**
   * Render the Hero Header
   */
  const renderHeroHeader = () => (
    <View style={styles.heroContainer}>
      {/* Hero image - using a placeholder URL. Replace with local image path if available */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80' }}
        style={styles.heroImage}
        resizeMode="cover"
      />
      <View style={styles.heroOverlay}>
        <Text style={styles.heroText}>SAINT VINCENT AND THE GRENADINES</Text>
      </View>
    </View>
  );

  /**
   * Render loading indicator
   */
  const renderLoading = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#2e7d32" />
      <Text style={styles.loadingText}>Loading Tours...</Text>
    </View>
  );

  /**
   * Render empty state
   */
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No tours found matching your criteria. Try adjusting your filters.
      </Text>
    </View>
  );

  /**
   * Render tour item
   */
  const renderTourItem = ({ item }) => (
    <TourCard tour={item} onPress={handleTourPress} />
  );

  /**
   * Render list header (includes hero and filters)
   */
  const renderListHeader = () => (
    <>
      {renderHeroHeader()}
      <ToursFilterBar onFilterChange={handleFilterChange} />
    </>
  );

  /**
   * Render main content based on loading state
   */
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          {renderListHeader()}
          {renderLoading()}
        </>
      );
    }

    return (
      <FlatList
        data={toursData}
        renderItem={renderTourItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={
          toursData.length === 0 ? styles.emptyListContent : styles.listContent
        }
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  heroContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
    backgroundColor: '#e0e0e0',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ToursScreen;
