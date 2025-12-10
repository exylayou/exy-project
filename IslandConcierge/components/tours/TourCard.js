import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../common/Card';

export default function TourCard({ title, duration, price, description }) {
  return (
    <Card>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoRow}>
        {duration && <Text style={styles.info}>Duration: {duration}</Text>}
        {price && <Text style={styles.price}>${price}</Text>}
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006994',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    color: '#4A90A4',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006994',
  },
  description: {
    fontSize: 14,
    color: '#666666',
  },
});
