import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
import SafetyAlert from '../components/emergency/SafetyAlert';
import EmergencyContact from '../components/emergency/EmergencyContact';

// Sample data (in production, this would come from /emergency/data API)
const SAFETY_ALERTS = [
  {
    id: '1',
    type: 'warning',
    title: '⚠️ WARNING: Tropical Storm Watch',
    message: 'A tropical storm watch is in effect. Stay informed and follow local authorities. Secure loose items and avoid beach areas.',
    icon: 'warning',
  },
];

const CONSULATES = [
  {
    id: '1',
    name: 'US Embassy',
    description: 'Police / Fire / Ambulance',
    phone: '+1 (246) 227-4000',
    email: 'BridgetownACS@state.gov',
    address: 'Wildey Business Park, Barbados',
    flagEmoji: '🇺🇸',
  },
  {
    id: '2',
    name: 'UK High Commission',
    description: 'British Embassy Services',
    phone: '+1 (246) 430-7800',
    email: 'bhc.barbados@fcdo.gov.uk',
    address: 'Lower Collymore Rock, Barbados',
    flagEmoji: '🇬🇧',
  },
  {
    id: '3',
    name: 'Canadian Consulate',
    description: 'Consular Services',
    phone: '+1 (246) 629-3550',
    email: 'btown@international.gc.ca',
    address: 'Bishop\'s Court Hill, Barbados',
    flagEmoji: '🇨🇦',
  },
];

export default function EmergencyScreen() {
  const handleEmergencyCall = () => {
    Linking.openURL('tel:911');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Safety Alerts Section */}
      {SAFETY_ALERTS.map((alert) => (
        <SafetyAlert
          key={alert.id}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          icon={alert.icon}
        />
      ))}

      {/* 911 Emergency Button */}
      <View style={styles.emergencySection}>
        <Text style={styles.sectionTitle}>EMERGENCY SERVICES</Text>
        <Text style={styles.sectionSubtitle}>
          Police / Fire / Ambulance
        </Text>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={handleEmergencyCall}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={32} color={Colors.white} />
          <Text style={styles.emergencyText}>911</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.callNowButton}
          onPress={handleEmergencyCall}
          activeOpacity={0.7}
        >
          <Ionicons name="call-outline" size={20} color={Colors.white} />
          <Text style={styles.callNowText}>CALL NOW</Text>
        </TouchableOpacity>
      </View>

      {/* Consulates Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CONSULATES</Text>
        {CONSULATES.map((consulate) => (
          <EmergencyContact
            key={consulate.id}
            name={consulate.name}
            description={consulate.description}
            phone={consulate.phone}
            email={consulate.email}
            address={consulate.address}
            flagEmoji={consulate.flagEmoji}
          />
        ))}
      </View>

      {/* Additional Info */}
      <View style={styles.infoSection}>
        <Ionicons name="information-circle" size={20} color={Colors.textSecondary} />
        <Text style={styles.infoText}>
          In case of emergency, always call 911 first. Consulate numbers are for non-emergency assistance.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    paddingBottom: Spacing.xxl,
  },
  emergencySection: {
    backgroundColor: Colors.white,
    padding: Spacing.xl,
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.base,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.large,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  emergencyButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.emergency,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
    ...Shadows.large,
  },
  emergencyText: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    marginTop: Spacing.xs,
  },
  callNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.emergency,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.base,
    gap: Spacing.sm,
    width: '100%',
  },
  callNowText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    letterSpacing: 1,
  },
  section: {
    marginTop: Spacing.xl,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    padding: Spacing.base,
    marginHorizontal: Spacing.base,
    marginTop: Spacing.xl,
    borderRadius: BorderRadius.base,
    gap: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.sm,
  },
});
