import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function FilterBar({ filters, selectedFilter, onFilterSelect }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters && filters.map((filter, index) => (
          <View
            key={index}
            style={[
              styles.filterItem,
              selectedFilter === filter && styles.selectedFilter
            ]}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.selectedFilterText
            ]}>
              {filter}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#F0F8FF',
  },
  filterItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#006994',
  },
  selectedFilter: {
    backgroundColor: '#006994',
  },
  filterText: {
    fontSize: 14,
    color: '#006994',
  },
  selectedFilterText: {
    color: '#FFFFFF',
  },
});
