import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DatePickerModal from './DatePickerModal';
import PriceRangeModal from './PriceRangeModal';
import DurationModal from './DurationModal';

export default function ToursFilterBar({ onFilterChange, currentFilters = {} }) {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [durationModalVisible, setDurationModalVisible] = useState(false);

  const handleDateChange = (date) => {
    setDateModalVisible(false);
    onFilterChange({ ...currentFilters, date });
  };

  const handlePriceChange = (priceRange) => {
    setPriceModalVisible(false);
    onFilterChange({ ...currentFilters, priceRange });
  };

  const handleDurationChange = (duration) => {
    setDurationModalVisible(false);
    onFilterChange({ ...currentFilters, duration });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatPrice = (priceRange) => {
    if (!priceRange || (!priceRange.min && !priceRange.max)) return 'Price';
    if (priceRange.min && priceRange.max) {
      return `$${priceRange.min} - $${priceRange.max}`;
    }
    if (priceRange.min) return `> $${priceRange.min}`;
    return `< $${priceRange.max}`;
  };

  const formatDuration = (duration) => {
    if (!duration) return 'Duration';
    return duration;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Date Filter Button */}
        <TouchableOpacity
          style={[
            styles.filterButton,
            currentFilters.date && styles.activeFilterButton
          ]}
          onPress={() => setDateModalVisible(true)}
        >
          <Text style={[
            styles.filterText,
            currentFilters.date && styles.activeFilterText
          ]}>
            {formatDate(currentFilters.date)}
          </Text>
        </TouchableOpacity>

        {/* Price Range Filter Button */}
        <TouchableOpacity
          style={[
            styles.filterButton,
            currentFilters.priceRange && styles.activeFilterButton
          ]}
          onPress={() => setPriceModalVisible(true)}
        >
          <Text style={[
            styles.filterText,
            currentFilters.priceRange && styles.activeFilterText
          ]}>
            {formatPrice(currentFilters.priceRange)}
          </Text>
        </TouchableOpacity>

        {/* Duration Filter Button */}
        <TouchableOpacity
          style={[
            styles.filterButton,
            currentFilters.duration && styles.activeFilterButton
          ]}
          onPress={() => setDurationModalVisible(true)}
        >
          <Text style={[
            styles.filterText,
            currentFilters.duration && styles.activeFilterText
          ]}>
            {formatDuration(currentFilters.duration)}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modals */}
      <DatePickerModal
        visible={dateModalVisible}
        onClose={() => setDateModalVisible(false)}
        onSelect={handleDateChange}
        selectedDate={currentFilters.date}
      />

      <PriceRangeModal
        visible={priceModalVisible}
        onClose={() => setPriceModalVisible(false)}
        onApply={handlePriceChange}
        currentRange={currentFilters.priceRange}
      />

      <DurationModal
        visible={durationModalVisible}
        onClose={() => setDurationModalVisible(false)}
        onSelect={handleDurationChange}
        selectedDuration={currentFilters.duration}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#F0F8FF',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#006994',
    minWidth: 100,
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#006994',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#006994',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
});
