import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

const BADGE_TYPES = {
  new: {
    backgroundColor: Colors.primary,
    textColor: Colors.white,
    label: 'New',
  },
  recommended: {
    backgroundColor: Colors.warning,
    textColor: Colors.white,
    label: 'Hotel Recommended',
    icon: 'trophy',
  },
  featured: {
    backgroundColor: Colors.success,
    textColor: Colors.white,
    label: 'Featured',
    icon: 'star',
  },
  popular: {
    backgroundColor: Colors.info,
    textColor: Colors.white,
    label: 'Popular',
    icon: 'trending-up',
  },
};

export default function Badge({
  type = 'new',
  label,
  icon,
  backgroundColor,
  textColor,
  style
}) {
  const badgeConfig = BADGE_TYPES[type] || BADGE_TYPES.new;
  const finalLabel = label || badgeConfig.label;
  const finalIcon = icon || badgeConfig.icon;
  const finalBgColor = backgroundColor || badgeConfig.backgroundColor;
  const finalTextColor = textColor || badgeConfig.textColor;

  return (
    <View style={[
      styles.badge,
      { backgroundColor: finalBgColor },
      style
    ]}>
      {finalIcon && (
        <Ionicons
          name={finalIcon}
          size={12}
          color={finalTextColor}
          style={styles.icon}
        />
      )}
      <Text style={[styles.text, { color: finalTextColor }]}>
        {finalLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.base,
    alignSelf: 'flex-start',
  },
  icon: {
    marginRight: Spacing.xs,
  },
  text: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
