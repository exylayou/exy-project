import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import StarRating from '../common/StarRating';
import Badge from '../common/Badge';

export default function RestaurantCard({
  name,
  cuisine,
  rating,
  reviewCount,
  priceLevel, // $, $$, $$$
  imageSource,
  isRecommended,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Badges overlay on image */}
      {isRecommended && (
        <View style={styles.badgeContainer}>
          <Badge type="recommended" />
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        <View style={styles.infoRow}>
          {cuisine && (
            <Text style={styles.cuisine}>{cuisine}</Text>
          )}
          {cuisine && priceLevel && (
            <Text style={styles.separator}>•</Text>
          )}
          {priceLevel && (
            <Text style={styles.priceLevel}>{priceLevel}</Text>
          )}
        </View>

        <View style={styles.ratingContainer}>
          <StarRating rating={rating} size={14} showNumber={false} />
          {reviewCount && (
            <Text style={styles.reviewCount}>({reviewCount})</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginRight: Spacing.md,
    width: 200,
    ...Shadows.medium,
  },
  image: {
    width: '100%',
    height: 140,
  },
  badgeContainer: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
  },
  content: {
    padding: Spacing.md,
  },
  name: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  cuisine: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  separator: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    marginHorizontal: Spacing.xs,
  },
  priceLevel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewCount: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textLight,
    marginLeft: Spacing.xs,
  },
});
