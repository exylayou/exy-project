import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DateFilter({ selectedDate, onDateSelect }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Date</Text>
      <Text style={styles.date}>{selectedDate || 'No date selected'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F0F8FF',
  },
  label: {
    fontSize: 14,
    color: '#4A90A4',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#006994',
  },
});
