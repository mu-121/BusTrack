import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NearStops = () => {
  
  const nearbyStopsData = [
    { id: '101', name: 'Sohan', distance: '0.5 km' },
    { id: '102', name: 'Dhoke kala khan', distance: '0.8 km' },
    { id: '103', name: 'Iqbal Town', distance: '1.2 km' },
    { id: '103', name: 'Kuri Road', distance: '1.8 km' },
    { id: '103', name: 'Zia Masjid', distance: '2.5 km' },
    { id: '103', name: 'Khana Pul', distance: '3 km' },
    
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nearby Stops</Text>
      {nearbyStopsData.map((stop) => (
        <View key={stop.id} style={styles.nearbyStopItem}>
          <Text style={styles.nearbyStopText}>Stop Name: {stop.name}</Text>
          <Text style={styles.nearbyStopText}>Distance: {stop.distance}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#187bcd',
    textAlign: 'center',
  },
  nearbyStopItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  nearbyStopText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default NearStops;
