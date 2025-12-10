import { Linking, Alert, Platform } from 'react-native';

/**
 * dialCall - Utility function to initiate a phone call
 * Handles cross-platform phone dialing with proper error handling
 *
 * @param {string} phoneNumber - The phone number to dial (e.g., "911", "+1-555-0100")
 * @returns {Promise<void>}
 */
export const dialCall = async (phoneNumber) => {
  // Remove non-numeric characters except + for international format
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, '');

  // Create the appropriate URL scheme based on platform
  const phoneUrl = Platform.OS === 'ios'
    ? `telprompt:${cleanNumber}`
    : `tel:${cleanNumber}`;

  try {
    // Check if the device can handle the phone URL
    const supported = await Linking.canOpenURL(phoneUrl);

    if (supported) {
      await Linking.openURL(phoneUrl);
    } else {
      Alert.alert(
        'Unable to Make Call',
        `Your device cannot make phone calls to ${phoneNumber}. This feature may not be supported on your device.`,
        [{ text: 'OK' }]
      );
    }
  } catch (error) {
    console.error('Error attempting to dial phone number:', error);
    Alert.alert(
      'Call Failed',
      `Unable to initiate call to ${phoneNumber}. Please try dialing manually.`,
      [{ text: 'OK' }]
    );
  }
};

/**
 * formatPhoneNumber - Formats a phone number for display
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  const cleaned = phoneNumber.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phoneNumber;
};
