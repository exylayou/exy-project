import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * ToursFilterBar Component
 * Provides filtering options for tours by category, duration, and difficulty
 */
const ToursFilterBar = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = [
    { id: 'all', label: 'All Tours' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'water', label: 'Water Sports' },
    { id: 'nature', label: 'Nature' },
    { id: 'sailing', label: 'Sailing' },
  ];

  const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'half-day', label: 'Half Day' },
    { id: 'full-day', label: 'Full Day' },
    { id: 'multi-day', label: 'Multi-Day' },
  ];

  const difficulties = [
    { id: 'all', label: 'Any Level' },
    { id: 'easy', label: 'Easy' },
    { id: 'moderate', label: 'Moderate' },
    { id: 'challenging', label: 'Challenging' },
  ];

  const handleFilterChange = (type, value) => {
    let newFilters = {
      category: selectedCategory,
      duration: selectedDuration,
      difficulty: selectedDifficulty,
    };

    if (type === 'category') {
      setSelectedCategory(value);
      newFilters.category = value;
    } else if (type === 'duration') {
      setSelectedDuration(value);
      newFilters.duration = value;
    } else if (type === 'difficulty') {
      setSelectedDifficulty(value);
      newFilters.difficulty = value;
    }

    // Remove 'all' values from filters
    const activeFilters = {};
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] !== 'all') {
        activeFilters[key] = newFilters[key];
      }
    });

    if (onFilterChange) {
      onFilterChange(activeFilters);
    }
  };

  const renderFilterSection = (title, items, selectedValue, type) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScrollContent}
      >
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.filterChip,
              selectedValue === item.id && styles.filterChipActive,
            ]}
            onPress={() => handleFilterChange(type, item.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedValue === item.id && styles.filterChipTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderFilterSection('Category', categories, selectedCategory, 'category')}
      {renderFilterSection('Duration', durations, selectedDuration, 'duration')}
      {renderFilterSection('Difficulty', difficulties, selectedDifficulty, 'difficulty')}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterSection: {
    marginBottom: 12,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
    marginBottom: 8,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#2e7d32',
    borderColor: '#2e7d32',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default ToursFilterBar;
