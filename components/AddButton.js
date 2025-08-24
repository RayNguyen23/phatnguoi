import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Plus } from 'lucide-react-native';

export default function AddButton({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.addBtn}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <View style={styles.iconContainer}>
          <Plus size={24} color="#FFFFFF" strokeWidth={2.5} />
        </View>
        <Text style={styles.addBtnText}>Thêm phương tiện</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 32,
    left: '5%',
    right: '5%',
    height: 64,
    backgroundColor: '#DC2626',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});