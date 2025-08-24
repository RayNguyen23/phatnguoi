import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { X, Car, Hash, Calendar, Tag } from 'lucide-react-native';

const vehicleTypes = [
  { id: '1', label: 'Xe máy', color: '#3B82F6' },
  { id: '2', label: 'Ô tô', color: '#10B981' },
  { id: '3', label: 'Xe tải', color: '#F59E0B' },
];

export default function AddVehicleModal({ visible, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: '1',
    plate: '',
    brand: '',
    model: '',
    year: undefined,
  });

  const handleSubmit = () => {
    if (!formData.plate.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập biển số xe');
      return;
    }

    onAdd({
      ...formData,
      plate: formData.plate.trim().toUpperCase(),
    });

    // Reset form
    setFormData({
      type: '1',
      plate: '',
      brand: '',
      model: '',
      year: undefined,
    });
  };

  const handleClose = () => {
    setFormData({
      type: '1',
      plate: '',
      brand: '',
      model: '',
      year: undefined,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Thêm Phương Tiện</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#64748B" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Vehicle Type Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Loại phương tiện</Text>
              <View style={styles.typeContainer}>
                {vehicleTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.typeButton,
                      formData.type === type.id && { 
                        backgroundColor: type.color + '20',
                        borderColor: type.color 
                      }
                    ]}
                    onPress={() => setFormData(prev => ({ ...prev, type: type.id }))}
                  >
                    <Car size={20} color={formData.type === type.id ? type.color : '#64748B'} />
                    <Text style={[
                      styles.typeText,
                      formData.type === type.id && { color: type.color }
                    ]}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* License Plate */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Biển số xe *</Text>
              <View style={styles.inputContainer}>
                <Hash size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.plate}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, plate: text }))}
                  placeholder="Ví dụ: 30A12345"
                  placeholderTextColor="#64748B"
                  autoCapitalize="characters"
                />
              </View>
            </View>

            {/* Brand */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hãng xe</Text>
              <View style={styles.inputContainer}>
                <Tag size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.brand}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, brand: text }))}
                  placeholder="Ví dụ: Honda, Toyota, BMW"
                  placeholderTextColor="#64748B"
                />
              </View>
            </View>

            {/* Model */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mẫu xe</Text>
              <View style={styles.inputContainer}>
                <Car size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.model}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, model: text }))}
                  placeholder="Ví dụ: Civic, Camry, X5"
                  placeholderTextColor="#64748B"
                />
              </View>
            </View>

            {/* Year */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Năm sản xuất</Text>
              <View style={styles.inputContainer}>
                <Calendar size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={formData.year?.toString() || ''}
                  onChangeText={(text) => {
                    const year = parseInt(text);
                    setFormData(prev => ({ 
                      ...prev, 
                      year: isNaN(year) ? undefined : year 
                    }));
                  }}
                  placeholder="Ví dụ: 2020"
                  placeholderTextColor="#64748B"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Thêm phương tiện</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    minHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#334155',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 8,
  },
  typeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#F8FAFC',
    paddingVertical: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#374151',
    borderRadius: 12,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D1D5DB',
  },
  submitButton: {
    flex: 2,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 12,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});