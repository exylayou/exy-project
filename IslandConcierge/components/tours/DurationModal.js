import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function DurationModal({ visible, onClose, onSelect, selectedDuration }) {
  const [tempSelection, setTempSelection] = useState(selectedDuration);

  const durationOptions = [
    { label: '1 Hour', value: '1 Hour' },
    { label: '2 Hours', value: '2 Hours' },
    { label: '3 Hours', value: '3 Hours' },
    { label: '4 Hours', value: '4 Hours' },
    { label: 'Half Day (4-6 hours)', value: 'Half Day' },
    { label: 'Full Day (6+ hours)', value: 'Full Day' },
    { label: 'Multi-Day', value: 'Multi-Day' },
  ];

  const handleDurationSelect = (duration) => {
    setTempSelection(duration);
    onSelect(duration);
  };

  const handleClear = () => {
    setTempSelection(null);
    onSelect(null);
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
            <Text style={styles.modalTitle}>Tour Duration</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.durationList}>
            {durationOptions.map((option, index) => {
              const isSelected = tempSelection === option.value;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.durationItem,
                    isSelected && styles.selectedDurationItem
                  ]}
                  onPress={() => handleDurationSelect(option.value)}
                >
                  <Text style={[
                    styles.durationText,
                    isSelected && styles.selectedDurationText
                  ]}>
                    {option.label}
                  </Text>
                  {isSelected && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
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
    maxHeight: '60%',
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
  durationList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  durationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedDurationItem: {
    backgroundColor: '#006994',
    borderColor: '#006994',
  },
  durationText: {
    fontSize: 16,
    color: '#006994',
    fontWeight: '500',
  },
  selectedDurationText: {
    color: '#FFFFFF',
  },
  checkmark: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  clearButton: {
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
});
