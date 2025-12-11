import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

export default function SafetyAlert({
  type = 'warning', // 'warning', 'danger', 'info'
  title,
  message,
  icon = 'alert-circle',
  style
}) {
  const alertStyles = {
    warning: {
      backgroundColor: Colors.warningLight,
      borderColor: Colors.warning,
      iconColor: Colors.warning,
      textColor: Colors.textPrimary,
    },
    danger: {
      backgroundColor: '#FFEBEE',
      borderColor: Colors.emergency,
      iconColor: Colors.emergency,
      textColor: Colors.textPrimary,
    },
    info: {
      backgroundColor: '#E3F2FD',
      borderColor: Colors.info,
      iconColor: Colors.info,
      textColor: Colors.textPrimary,
    },
  };

  const currentStyle = alertStyles[type] || alertStyles.warning;

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: currentStyle.backgroundColor,
        borderColor: currentStyle.borderColor,
      },
      style
    ]}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={24}
          color={currentStyle.iconColor}
        />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: currentStyle.textColor }]}>
          {title}
        </Text>
        {message && (
          <Text style={[styles.message, { color: currentStyle.textColor }]}>
            {message}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Spacing.base,
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.sm,
    borderRadius: BorderRadius.base,
    borderWidth: 1.5,
  },
  iconContainer: {
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.xs,
  },
  message: {
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.sm,
  },
});
