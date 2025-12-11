import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';

export default function EmergencyContact({
  name,
  description,
  phone,
  email,
  address,
  flagEmoji,
  style
}) {
  const handleCall = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleEmail = () => {
    if (email) {
      Linking.openURL(`mailto:${email}`);
    }
  };

  const handleMap = () => {
    if (address) {
      // TODO: Open maps with address
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        {flagEmoji && (
          <Text style={styles.flag}>{flagEmoji}</Text>
        )}
        <View style={styles.headerText}>
          <Text style={styles.name}>{name}</Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
      </View>

      {phone && (
        <Text style={styles.info}>📞 {phone}</Text>
      )}

      <View style={styles.actions}>
        {phone && (
          <TouchableOpacity
            style={[styles.button, styles.callButton]}
            onPress={handleCall}
            activeOpacity={0.7}
          >
            <Ionicons name="call" size={16} color={Colors.white} />
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
        )}

        {email && (
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleEmail}
            activeOpacity={0.7}
          >
            <Ionicons name="mail" size={16} color={Colors.primary} />
            <Text style={styles.secondaryButtonText}>Email</Text>
          </TouchableOpacity>
        )}

        {address && (
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleMap}
            activeOpacity={0.7}
          >
            <Ionicons name="location" size={16} color={Colors.primary} />
            <Text style={styles.secondaryButtonText}>Map</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.base,
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.sm,
    ...Shadows.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  flag: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  description: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  info: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.base,
    gap: Spacing.xs,
    flex: 1,
  },
  callButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  buttonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.white,
  },
  secondaryButtonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
  },
});
