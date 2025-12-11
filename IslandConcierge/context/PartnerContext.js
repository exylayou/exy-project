import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Partner Context for tracking hotel/accommodation partnerships
 * Enables revenue sharing and attribution for bookings
 */

const PartnerContext = createContext();

export const PartnerProvider = ({ children }) => {
  const [partnerData, setPartnerData] = useState({
    partnerId: null,
    partnerName: null,
    qrCodeId: null,
    referralSource: null,
    sessionStart: null,
  });

  // Load partner data from storage on mount
  useEffect(() => {
    loadPartnerData();
  }, []);

  const loadPartnerData = async () => {
    try {
      const stored = await AsyncStorage.getItem('partnerData');
      if (stored) {
        setPartnerData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading partner data:', error);
    }
  };

  const savePartnerData = async (data) => {
    try {
      await AsyncStorage.setItem('partnerData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving partner data:', error);
    }
  };

  /**
   * Initialize partner session from QR code scan
   * @param {string} partnerId - Unique hotel/partner identifier
   * @param {string} partnerName - Display name of partner
   * @param {string} qrCodeId - Unique QR code identifier
   */
  const initializePartner = async (partnerId, partnerName, qrCodeId) => {
    const data = {
      partnerId,
      partnerName,
      qrCodeId,
      referralSource: 'qr_scan',
      sessionStart: new Date().toISOString(),
    };

    setPartnerData(data);
    await savePartnerData(data);

    // TODO: Send to analytics API
    console.log('Partner session initialized:', data);
  };

  /**
   * Track booking attribution for revenue sharing
   * @param {object} bookingData - Booking details
   */
  const trackBooking = async (bookingData) => {
    if (!partnerData.partnerId) {
      console.warn('No partner attribution for this booking');
      return;
    }

    const attribution = {
      ...bookingData,
      partnerId: partnerData.partnerId,
      partnerName: partnerData.partnerName,
      qrCodeId: partnerData.qrCodeId,
      timestamp: new Date().toISOString(),
    };

    // TODO: Send to API for revenue sharing calculation
    console.log('Booking tracked with partner attribution:', attribution);

    return attribution;
  };

  /**
   * Clear partner session
   */
  const clearPartner = async () => {
    setPartnerData({
      partnerId: null,
      partnerName: null,
      qrCodeId: null,
      referralSource: null,
      sessionStart: null,
    });
    await AsyncStorage.removeItem('partnerData');
  };

  const value = {
    partnerData,
    initializePartner,
    trackBooking,
    clearPartner,
  };

  return (
    <PartnerContext.Provider value={value}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartner = () => {
  const context = useContext(PartnerContext);
  if (!context) {
    throw new Error('usePartner must be used within a PartnerProvider');
  }
  return context;
};

export default PartnerContext;
