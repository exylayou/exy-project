import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import colors from '../../themes/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Assuming 16px margin on each side

/**
 * PoiCard - Reusable component for displaying Points of Interest
 * Used in Explore and Tours lists
 *
 * @param {string} poiId - Unique identifier for the POI
 * @param {string} name - POI name (e.g., "Botanical Gardens")
 * @param {string} category - POI category (e.g., "Attraction", "Restaurant")
 * @param {number} rating - Rating value (e.g., 4.5)
 * @param {string} imageUrl - Remote image URL
 * @param {function} onPress - Handler for navigation to detail page
 */
const PoiCard = ({
  poiId,
  name,
  category,
  rating,
  imageUrl,
  onPress,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(poiId);
    }
  };

  const renderStarRating = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <View style={styles.ratingContainer}>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, index) => {
            if (index < fullStars) {
              return <Text key={index} style={styles.starIcon}>★</Text>;
            } else if (index === fullStars && hasHalfStar) {
              return <Text key={index} style={styles.starIcon}>★</Text>;
            } else {
              return <Text key={index} style={styles.starIconEmpty}>☆</Text>;
            }
          })}
        </View>
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Gradient Overlay for text readability */}
        <View style={styles.gradientOverlay} />

        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>

        {/* Bottom Info Overlay */}
        <View style={styles.infoOverlay}>
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={2}>
              {name}
            </Text>
            {renderStarRating()}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 240, // High aspect ratio for premium look
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'transparent',
    // Simulating gradient with opacity
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  textContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
    textShadowColor: colors.shadowDark,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 0.3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 6,
  },
  starIcon: {
    color: colors.star,
    fontSize: 16,
    marginRight: 2,
    textShadowColor: colors.shadowDark,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  starIconEmpty: {
    color: colors.lightGray,
    fontSize: 16,
    marginRight: 2,
    textShadowColor: colors.shadowDark,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ratingText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    textShadowColor: colors.shadowDark,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default PoiCard;
