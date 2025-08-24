import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import VehicleIcon from './VehicleIcon';

export default function VehicleCard({ vehicle, index }) {
  return (
    <TouchableOpacity
      style={[styles.container, { marginTop: index * 4 }]}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <VehicleIcon type={vehicle.type} />
          <View style={styles.vehicleInfo}>
            <Text style={styles.plateNumber}>{vehicle.plate}</Text>
            <Text style={styles.vehicleType}>
              {getVehicleTypeName(vehicle.type)}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkButton}>
          <Text style={styles.checkButtonText}>{"Kiểm tra\nphạt nguội"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function getVehicleTypeName(type) {
  const typeMap = {
    "1": "Xe hơi",
    "2": "Xe máy", 
    "3": "Xe điện"
  };
  return typeMap[type] || "Không xác định";
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vehicleInfo: {
    marginLeft: 16,
    flex: 1,
  },
  plateNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  vehicleType: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  checkButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#DC2626',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});