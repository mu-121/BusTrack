import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NearStops = () => {
  // Sample nearby stops data (Replace this with actual data from the backend or real-time location services)
  const nearbyStopsData = [
    { id: '101', name: 'Stop 1', distance: '0.5 miles' },
    { id: '102', name: 'Stop 2', distance: '0.8 miles' },
    { id: '103', name: 'Stop 3', distance: '1.2 miles' },
    // Add more nearby stops here...
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
