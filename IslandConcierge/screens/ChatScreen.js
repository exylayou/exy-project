import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../constants/theme';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Chat</Text>
      <Text style={styles.subtitle}>Your personalized island assistant</Text>
      <Text style={styles.placeholder}>Chat interface coming in Phase 2...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
  },
  title: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
  },
  placeholder: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textLight,
    marginTop: 20,
    fontStyle: 'italic',
  },
});
