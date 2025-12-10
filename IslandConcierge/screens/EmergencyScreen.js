import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function EmergencyScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency</Text>
      <Text style={styles.subtitle}>Important contacts and information</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE4E4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C41E3A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B0000',
  },
});
