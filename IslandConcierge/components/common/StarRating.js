import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function StarRating({
  rating,
  maxRating = 5,
  size = 16,
  showNumber = true,
  style
}) {
  // Ensure rating is a valid number
  const validRating = typeof rating === 'number' ? rating : 0;
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 >= 0.5;

  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Ionicons
        key={`full-${i}`}
        name="star"
        size={size}
        color={Colors.star}
      />
    );
  }

  // Add half star if needed
  if (hasHalfStar && fullStars < maxRating) {
    stars.push(
      <Ionicons
        key="half"
        name="star-half"
        size={size}
        color={Colors.star}
      />
    );
  }

  // Add empty stars
  const emptyStars = maxRating - Math.ceil(validRating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Ionicons
        key={`empty-${i}`}
        name="star-outline"
        size={size}
        color={Colors.star}
      />
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.starsContainer}>
        {stars}
      </View>
      {showNumber && validRating > 0 && (
        <Text style={styles.ratingText}>
          {validRating.toFixed(1)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
});
