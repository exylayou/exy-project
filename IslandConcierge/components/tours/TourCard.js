import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import StarRating from '../common/StarRating';
import Badge from '../common/Badge';

export default function TourCard({
  name,
  operator,
  duration,
  price,
  rating,
  reviewCount,
  imageSource,
  isNew,
  isRecommended,
  activityType,
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
      <View style={styles.badgeContainer}>
        {isRecommended && (
          <Badge type="recommended" style={styles.badge} />
        )}
        {isNew && (
          <Badge type="new" style={styles.badge} />
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>

        {operator && (
          <Text style={styles.operator}>{operator}</Text>
        )}

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{duration}</Text>
          </View>

          {activityType && (
            <View style={styles.detailItem}>
              <Ionicons name="boat-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.detailText}>{activityType}</Text>
            </View>
          )}
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.ratingContainer}>
            <StarRating rating={rating} size={14} showNumber={false} />
            {reviewCount && (
              <Text style={styles.reviewCount}>({reviewCount})</Text>
            )}
          </View>

          <Text style={styles.price}>${price}</Text>
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
    marginBottom: Spacing.base,
    marginHorizontal: Spacing.base,
    ...Shadows.medium,
  },
  image: {
    width: '100%',
    height: 180,
  },
  badgeContainer: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'column',
    gap: Spacing.xs,
  },
  badge: {
    marginBottom: Spacing.xs,
  },
  content: {
    padding: Spacing.base,
  },
  name: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  operator: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.base,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  detailText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  price: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
});
