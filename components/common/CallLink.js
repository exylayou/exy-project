import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert, Linking, Platform } from 'react-native';

/**
 * Initiates a phone call using the device's phone dialer
 * @param {string} phoneNumber - The phone number to dial
 */
export const dialCall = async (phoneNumber) => {
  if (!phoneNumber) {
    Alert.alert('Error', 'Phone number is required');
    return;
  }

  const telUrl = `tel:${phoneNumber}`;

  try {
    const canOpen = await Linking.canOpenURL(telUrl);

    if (canOpen) {
      await Linking.openURL(telUrl);
    } else {
      Alert.alert(
        'Unable to Make Call',
        'Your device does not support phone calls or the phone number format is invalid.'
      );
    }
  } catch (error) {
    Alert.alert(
      'Error',
      'An error occurred while trying to make the call. Please try again.'
    );
    console.error('Error opening phone dialer:', error);
  }
};

/**
 * CallButton Component
 * A reusable button component that initiates phone calls
 *
 * @param {Object} props
 * @param {string} props.phoneNumber - The phone number to dial
 * @param {string} props.label - The button label text
 * @param {string} [props.buttonColor] - Optional custom button color (defaults to bright blue)
 */
export const CallButton = ({ phoneNumber, label, buttonColor }) => {
  const handlePress = () => {
    dialCall(phoneNumber);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonColor && { backgroundColor: buttonColor }
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Text style={styles.buttonText}>{label || 'Call'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF', // Bright blue (iOS blue)
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CallButton;
