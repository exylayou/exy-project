import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LandingPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Island Concierge</Text>
      <Text style={styles.subtitle}>Welcome to your Caribbean experience</Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#006994',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4A90A4',
  },
});
