import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import VehicleCard from '../components/VehicleCard';
import AddButton from '../components/AddButton';

const VehicleList = [
  { id: 1, type: "1", plate: "20C28499" }, 
  { id: 2, type: "2", plate: "97C5635" },
  { id: 3, type: "3", plate: "51A12345" }
];

export default function VehicleScreen() {
  const renderItem = ({ item, index }) => (
    <VehicleCard vehicle={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Phương Tiện</Text>
        <Text style={styles.subtitle}>Quản lý các phương tiện của bạn</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList 
          data={VehicleList} 
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    fontWeight: '400',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  listContent: {
    paddingBottom: 100,
  },
});