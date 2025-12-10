import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ToursScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tours</Text>
      <Text style={styles.subtitle}>Book your island adventures</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
