import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function DatePickerModal({ visible, onClose, onSelect, selectedDate }) {
  const [selectedDay, setSelectedDay] = useState(selectedDate || null);

  // Generate the next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const dates = generateDates();

  const formatDateDisplay = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const formatDateValue = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  const handleDateSelect = (date) => {
    const dateValue = formatDateValue(date);
    setSelectedDay(dateValue);
    onSelect(dateValue);
  };

  const handleClear = () => {
    setSelectedDay(null);
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
            <Text style={styles.modalTitle}>Select Date</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.dateList}>
            {dates.map((date, index) => {
              const dateValue = formatDateValue(date);
              const isSelected = selectedDay === dateValue;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateItem,
                    isSelected && styles.selectedDateItem
                  ]}
                  onPress={() => handleDateSelect(date)}
                >
                  <Text style={[
                    styles.dateText,
                    isSelected && styles.selectedDateText
                  ]}>
                    {formatDateDisplay(date)}
                  </Text>
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
    maxHeight: '70%',
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
  dateList: {
    paddingHorizontal: 20,
  },
  dateItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F0F8FF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedDateItem: {
    backgroundColor: '#006994',
    borderColor: '#006994',
  },
  dateText: {
    fontSize: 16,
    color: '#006994',
    fontWeight: '500',
  },
  selectedDateText: {
    color: '#FFFFFF',
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
