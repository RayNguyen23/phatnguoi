import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Car, Bike, Zap } from 'lucide-react-native';

export default function VehicleIcon({ type }) {
  const getIconComponent = () => {
    switch (type) {
      case "1":
        return <Car size={32} color="#60A5FA" strokeWidth={2} />;
      case "2":
        return <Bike size={32} color="#34D399" strokeWidth={2} />;
      case "3":
        return <Zap size={32} color="#FBBF24" strokeWidth={2} />;
      default:
        return <Car size={32} color="#94A3B8" strokeWidth={2} />;
    }
  };

  return (
    <View style={styles.iconContainer}>
      {getIconComponent()}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#334155',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});