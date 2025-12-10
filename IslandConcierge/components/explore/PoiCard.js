import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../common/Card';

export default function PoiCard({ name, category, description }) {
  return (
    <Card>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.category}>{category}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </Card>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006994',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#4A90A4',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
});
