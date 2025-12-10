import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export default function PriceRangeModal({ visible, onClose, onApply, currentRange }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    if (currentRange) {
      setMinPrice(currentRange.min ? currentRange.min.toString() : '');
      setMaxPrice(currentRange.max ? currentRange.max.toString() : '');
    } else {
      setMinPrice('');
      setMaxPrice('');
    }
  }, [currentRange, visible]);

  const handleApply = () => {
    const min = minPrice ? parseInt(minPrice, 10) : null;
    const max = maxPrice ? parseInt(maxPrice, 10) : null;

    if (min && max && min > max) {
      // Swap if min is greater than max
      onApply({ min: max, max: min });
    } else if (min || max) {
      onApply({ min, max });
    } else {
      onApply(null);
    }
  };

  const handleClear = () => {
    setMinPrice('');
    setMaxPrice('');
    onApply(null);
  };

  const quickPriceRanges = [
    { label: 'Under $50', min: null, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $500', min: 200, max: 500 },
    { label: 'Over $500', min: 500, max: null },
  ];

  const handleQuickSelect = (range) => {
    setMinPrice(range.min ? range.min.toString() : '');
    setMaxPrice(range.max ? range.max.toString() : '');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Price Range</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.sectionTitle}>Custom Range</Text>
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Min Price</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.input}
                    value={minPrice}
                    onChangeText={setMinPrice}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#B0B0B0"
                  />
                </View>
              </View>

              <Text style={styles.separator}>-</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Max Price</Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.input}
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                    keyboardType="numeric"
                    placeholder="∞"
                    placeholderTextColor="#B0B0B0"
                  />
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Quick Select</Text>
            <View style={styles.quickSelectContainer}>
              {quickPriceRanges.map((range, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickSelectButton}
                  onPress={() => handleQuickSelect(range)}
                >
                  <Text style={styles.quickSelectText}>{range.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#006994',
  },
  closeButton: {
    fontSize: 24,
    color: '#4A90A4',
    fontWeight: '300',
  },
  modalBody: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#006994',
    marginBottom: 12,
    marginTop: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  inputContainer: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: '#4A90A4',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#006994',
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    color: '#006994',
    marginRight: 4,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#006994',
  },
  separator: {
    fontSize: 18,
    color: '#4A90A4',
    marginHorizontal: 12,
    marginTop: 20,
  },
  quickSelectContainer: {
    gap: 10,
  },
  quickSelectButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderColor: '#006994',
  },
  quickSelectText: {
    fontSize: 14,
    color: '#006994',
    fontWeight: '500',
    textAlign: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderColor: '#006994',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#006994',
    fontSize: 16,
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#006994',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
