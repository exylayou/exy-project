import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * EmergencyCard - A versatile component for displaying safety alerts and contact information
 * with appropriate visual urgency.
 *
 * @param {string} title - The main heading (e.g., "Tropical Storm Watch")
 * @param {string} body - Details or description
 * @param {string} actionLabel - Optional button text (e.g., "Call Now")
 * @param {function} actionHandler - Optional function to execute on button press
 * @param {string} severity - Visual urgency level: 'critical', 'warning', or 'info'
 */
const EmergencyCard = ({
  title,
  body,
  actionLabel,
  actionHandler,
  severity = 'info'
}) => {
  // Determine styling based on severity
  const getSeverityStyles = () => {
    switch (severity) {
      case 'critical':
        return {
          container: styles.criticalContainer,
          title: styles.criticalTitle,
          button: styles.criticalButton,
        };
      case 'warning':
        return {
          container: styles.warningContainer,
          title: styles.warningTitle,
          button: styles.warningButton,
        };
      case 'info':
      default:
        return {
          container: styles.infoContainer,
          title: styles.infoTitle,
          button: styles.infoButton,
        };
    }
  };

  const severityStyles = getSeverityStyles();

  return (
    <View style={[styles.card, severityStyles.container]}>
      <Text style={[styles.title, severityStyles.title]}>{title}</Text>
      <Text style={styles.body}>{body}</Text>

      {actionHandler && actionLabel && (
        <TouchableOpacity
          style={[styles.button, severityStyles.button]}
          onPress={actionHandler}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Critical severity styles (Red)
  criticalContainer: {
    backgroundColor: '#FFEBEE',
    borderWidth: 2,
    borderColor: '#D32F2F',
  },
  criticalTitle: {
    color: '#B71C1C',
  },
  criticalButton: {
    backgroundColor: '#D32F2F',
  },

  // Warning severity styles (Yellow/Orange)
  warningContainer: {
    backgroundColor: '#FFF3E0',
    borderWidth: 2,
    borderColor: '#F57C00',
  },
  warningTitle: {
    color: '#E65100',
  },
  warningButton: {
    backgroundColor: '#F57C00',
  },

  // Info severity styles (Light blue/White)
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoTitle: {
    color: '#1976D2',
  },
  infoButton: {
    backgroundColor: '#1976D2',
  },

  // Common text styles
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
    marginBottom: 12,
  },

  // Button styles
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default EmergencyCard;
