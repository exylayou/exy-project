import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import StarRating from '../common/StarRating';
import Badge from '../common/Badge';

export default function AttractionCard({
  name,
  category,
  rating,
  reviewCount,
  imageSource,
  isNew,
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

        {category && (
          <Text style={styles.category}>{category}</Text>
        )}

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
    flexDirection: 'column',
    gap: Spacing.xs,
  },
  badge: {
    marginBottom: Spacing.xs,
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
  category: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
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
