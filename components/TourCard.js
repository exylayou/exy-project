import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * TourCard Component
 * Displays a tour item with image, title, description, duration, and price
 */
const TourCard = ({ tour, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(tour)}
      activeOpacity={0.7}
    >
      {tour.image && (
        <Image
          source={{ uri: tour.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {tour.title || tour.name}
        </Text>

        {tour.description && (
          <Text style={styles.description} numberOfLines={3}>
            {tour.description}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.detailsRow}>
            {tour.duration && (
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>{tour.duration}</Text>
              </View>
            )}

            {tour.difficulty && (
              <View style={styles.detail}>
                <Text style={styles.detailLabel}>Difficulty:</Text>
                <Text style={styles.detailValue}>{tour.difficulty}</Text>
              </View>
            )}
          </View>

          {tour.price && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>From</Text>
              <Text style={styles.price}>${tour.price}</Text>
            </View>
          )}
        </View>

        {tour.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{tour.category}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    marginTop: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
    gap: 16,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },
  detailValue: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  priceLabel: {
    fontSize: 12,
    color: '#888',
    marginRight: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(46, 125, 50, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TourCard;
