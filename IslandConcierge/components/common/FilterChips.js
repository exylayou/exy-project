import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

export default function FilterChips({
  filters,
  selectedFilter,
  onFilterSelect,
  style
}) {
  if (!filters || filters.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter, index) => {
          const isSelected = selectedFilter === filter || selectedFilter === filter.value;
          const filterLabel = typeof filter === 'string' ? filter : filter.label;
          const filterValue = typeof filter === 'string' ? filter : filter.value;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.chip,
                isSelected && styles.chipSelected
              ]}
              onPress={() => onFilterSelect(filterValue)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.chipText,
                isSelected && styles.chipTextSelected
              ]}>
                {filterLabel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.sm,
  },
  chip: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.backgroundLight,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.white,
    fontWeight: Typography.fontWeight.semibold,
  },
});
