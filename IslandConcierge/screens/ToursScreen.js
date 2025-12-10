import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ToursFilterBar from '../components/tours/ToursFilterBar';

export default function ToursScreen() {
  const [filters, setFilters] = useState({
    date: null,
    priceRange: null,
    duration: null,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
    // Here you would typically fetch/filter tours based on the new filters
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tours</Text>
        <Text style={styles.subtitle}>Book your island adventures</Text>
      </View>

      <ToursFilterBar
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      <ScrollView style={styles.content}>
        {/* Tour list will go here */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {filters.date || filters.priceRange || filters.duration
              ? 'Filtered tours will appear here'
              : 'Select filters to find tours'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006994',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A90A4',
  },
  content: {
    flex: 1,
  },
  placeholder: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#4A90A4',
    textAlign: 'center',
  },
});
