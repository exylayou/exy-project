import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import EmergencyCard from '../components/emergency/EmergencyCard';
import { dialCall } from '../utils/phoneUtils';

/**
 * EmergencyScreen - Main screen displaying safety alerts and emergency contacts
 * Organized into three sections:
 * 1. Current Safety Alerts
 * 2. Local Emergency Services
 * 3. Consulate and Embassy Contacts
 */
const EmergencyScreen = () => {
  // Simulated emergency data following PRD API Response Structure
  const emergencyData = {
    alerts: [
      {
        id: 'alert-001',
        title: 'Tropical Storm Watch',
        description: 'Tropical Storm Alberto is expected to make landfall within 48 hours. Residents should prepare emergency kits and monitor local news for evacuation orders.',
        severity: 'critical',
        issuedAt: '2025-12-10T08:00:00Z',
        expiresAt: '2025-12-12T20:00:00Z',
      },
      {
        id: 'alert-002',
        title: 'Air Quality Advisory',
        description: 'Elevated air pollution levels detected. Sensitive groups should limit outdoor activities. Expected to improve by evening.',
        severity: 'warning',
        issuedAt: '2025-12-10T06:00:00Z',
        expiresAt: '2025-12-10T22:00:00Z',
      },
      {
        id: 'alert-003',
        title: 'Local Festival - Traffic Advisory',
        description: 'Annual Summer Festival in downtown area. Expect road closures on Main Street and increased pedestrian traffic from 10 AM to 10 PM.',
        severity: 'info',
        issuedAt: '2025-12-10T05:00:00Z',
        expiresAt: '2025-12-10T23:00:00Z',
      },
    ],

    local_contacts: [
      {
        id: 'emergency-001',
        name: 'Emergency Services (911)',
        type: 'emergency',
        phoneNumber: '911',
        description: 'Call for immediate emergency assistance - Police, Fire, or Medical emergencies.',
        available24_7: true,
        severity: 'critical',
      },
      {
        id: 'police-001',
        name: 'Police Non-Emergency',
        type: 'police',
        phoneNumber: '+1-555-0199',
        description: 'For non-urgent police matters, reports, and general inquiries.',
        available24_7: true,
        severity: 'info',
      },
      {
        id: 'hospital-001',
        name: 'City General Hospital',
        type: 'medical',
        phoneNumber: '+1-555-0123',
        description: '24-hour emergency room and trauma center. Located at 123 Medical Plaza.',
        available24_7: true,
        severity: 'warning',
      },
      {
        id: 'poison-001',
        name: 'Poison Control Center',
        type: 'medical',
        phoneNumber: '1-800-222-1222',
        description: 'Emergency assistance for poisoning incidents and toxic exposure.',
        available24_7: true,
        severity: 'warning',
      },
    ],

    consulates: [
      {
        id: 'consulate-001',
        name: 'U.S. Embassy',
        country: 'United States',
        phoneNumber: '+1-555-0150',
        emergencyPhone: '+1-555-0151',
        address: '456 Embassy Row, Capital City',
        email: 'embassy@state.gov',
        services: ['Passport Services', 'Citizen Services', 'Emergency Assistance'],
      },
      {
        id: 'consulate-002',
        name: 'British Consulate General',
        country: 'United Kingdom',
        phoneNumber: '+44-20-7499-9000',
        emergencyPhone: '+44-20-7499-9001',
        address: '789 Consulate Drive, Capital City',
        email: 'info@ukconsulate.gov',
        services: ['Passport Services', 'Notarial Services', 'Emergency Travel Documents'],
      },
      {
        id: 'consulate-003',
        name: 'Canadian Consulate',
        country: 'Canada',
        phoneNumber: '+1-555-0175',
        emergencyPhone: '+1-555-0176',
        address: '321 Maple Street, Capital City',
        email: 'consulate@canada.ca',
        services: ['Consular Assistance', 'Passport Renewal', 'Emergency Support'],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Emergency & Safety</Text>
          <Text style={styles.headerSubtitle}>
            Stay informed and access critical contacts
          </Text>
        </View>

        {/* Section A: Current Safety Alerts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Safety Alerts</Text>
          <Text style={styles.sectionDescription}>
            Active alerts and warnings for your current location
          </Text>
          {emergencyData.alerts.map((alert) => (
            <EmergencyCard
              key={alert.id}
              title={alert.title}
              body={alert.description}
              severity={alert.severity}
            />
          ))}
        </View>

        {/* Section B: Local Emergency Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local Emergency Services</Text>
          <Text style={styles.sectionDescription}>
            Critical contacts for immediate assistance
          </Text>
          {emergencyData.local_contacts.map((contact) => (
            <EmergencyCard
              key={contact.id}
              title={contact.name}
              body={`${contact.description}\n\n${contact.phoneNumber}${
                contact.available24_7 ? ' • Available 24/7' : ''
              }`}
              actionLabel="Call Now"
              actionHandler={() => dialCall(contact.phoneNumber)}
              severity={contact.severity}
            />
          ))}
        </View>

        {/* Section C: Consulate and Embassy Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Consulate & Embassy Contacts</Text>
          <Text style={styles.sectionDescription}>
            International assistance and diplomatic services
          </Text>
          {emergencyData.consulates.map((consulate) => (
            <EmergencyCard
              key={consulate.id}
              title={consulate.name}
              body={`${consulate.address}\n\nGeneral: ${consulate.phoneNumber}\nEmergency: ${consulate.emergencyPhone}\n\nServices: ${consulate.services.join(', ')}`}
              actionLabel="Call Emergency Line"
              actionHandler={() => dialCall(consulate.emergencyPhone)}
              severity="info"
            />
          ))}
        </View>

        {/* Footer spacing */}
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },

  // Header styles
  header: {
    paddingVertical: 24,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },

  // Section styles
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 16,
    lineHeight: 20,
  },

  // Footer spacing
  footer: {
    height: 24,
  },
});

export default EmergencyScreen;
