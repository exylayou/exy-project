import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';

export default function MessageBubble({
  message,
  timestamp,
  isAI = false,
  avatar,
  location,
  onLocationPress,
  children
}) {
  return (
    <View style={[styles.container, isAI ? styles.aiContainer : styles.userContainer]}>
      {isAI && avatar && (
        <Image source={avatar} style={styles.avatar} />
      )}

      <View style={styles.bubbleWrapper}>
        <View style={[styles.bubble, isAI ? styles.aiBubble : styles.userBubble]}>
          <Text style={[styles.messageText, isAI ? styles.aiText : styles.userText]}>
            {message}
          </Text>

          {location && (
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={14} color={isAI ? Colors.primary : Colors.white} />
              <Text style={[styles.locationText, isAI ? styles.aiLocationText : styles.userLocationText]}>
                {location}
              </Text>
            </View>
          )}

          {children}
        </View>

        {timestamp && (
          <Text style={[styles.timestamp, isAI ? styles.aiTimestamp : styles.userTimestamp]}>
            {timestamp}
          </Text>
        )}
      </View>

      {!isAI && avatar && (
        <Image source={avatar} style={styles.avatar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    alignItems: 'flex-end',
  },
  aiContainer: {
    justifyContent: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: Spacing.sm,
  },
  bubbleWrapper: {
    maxWidth: '75%',
  },
  bubble: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  aiBubble: {
    backgroundColor: Colors.backgroundLight,
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: Typography.fontSize.base,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
  },
  aiText: {
    color: Colors.textPrimary,
  },
  userText: {
    color: Colors.white,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  locationText: {
    fontSize: Typography.fontSize.sm,
    marginLeft: Spacing.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  aiLocationText: {
    color: Colors.primary,
  },
  userLocationText: {
    color: Colors.white,
  },
  timestamp: {
    fontSize: Typography.fontSize.xs,
    marginTop: Spacing.xs,
    marginHorizontal: Spacing.sm,
  },
  aiTimestamp: {
    color: Colors.textLight,
    textAlign: 'left',
  },
  userTimestamp: {
    color: Colors.textLight,
    textAlign: 'right',
  },
});
