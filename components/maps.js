import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const BusTrackingMap = ({ navigation }) => {
  
  // Sample bus schedule data (Replace this with actual data from the backend)
  const initialBusScheduleData = [
    { id: '1', busNumber: 'Bus A', latitude: 37.78825, longitude: -122.4324, tracked: false, time: '9:00 AM', route: 'Route A' },
    { id: '2', busNumber: 'Bus B', latitude: 37.7896386, longitude: -122.421646, tracked: false, time: '9:15 AM', route: 'Route B' },
    // Add more bus schedules here...
  ];

  const [busScheduleData, setBusScheduleData] = useState(initialBusScheduleData);

  const handleTrackBus = (busId) => {
    const updatedBusScheduleData = busScheduleData.map((bus) =>
      bus.id === busId ? { ...bus, tracked: !bus.tracked } : bus
    );
    setBusScheduleData(updatedBusScheduleData);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.6956962780534,
          longitude: 73.02698497120006,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // Additional map settings
        showsUserLocation={true}
        loadingEnabled={true}
        zoomEnabled={true}
      >
        {busScheduleData.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
            pinColor={bus.tracked ? 'red' : 'green'}
            title={bus.busNumber}
            description={`Time: ${bus.time}, Route: ${bus.route}`}
          />
        ))}
      </MapView>
      {busScheduleData.map((bus) => (
        <View key={bus.id} style={[styles.scheduleItem, bus.tracked && styles.trackedBusItem]}>
          <Text style={styles.scheduleText}>Bus: {bus.busNumber}</Text>
          <Text style={styles.scheduleText}>Time: {bus.time}</Text>
          <Text style={styles.scheduleText}>Route: {bus.route}</Text>
          <TouchableOpacity
            style={[styles.trackButton, bus.tracked ? styles.trackedButton : styles.untrackedButton]}
            onPress={() => handleTrackBus(bus.id)}
          >
            <Text style={styles.trackButtonText}>{bus.tracked ? 'Untrack' : 'Track'}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={styles.viewScheduleButton}
        onPress={() => navigation.navigate('BusSchedule')}
      >
        <Text style={styles.viewScheduleButtonText}>View Bus Schedule</Text>
      </TouchableOpacity>
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
  map: {
    flex: 50, 
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  scheduleItem: {
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
  trackedBusItem: {
    backgroundColor: '#b3e6b3', // Light green for tracked buses
  },
  scheduleText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  trackButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginTop: 8,
  },
  trackedButton: {
    backgroundColor: '#ff6666', // Red for tracked button
  },
  untrackedButton: {
    backgroundColor: '#66cc66', // Green for untracked button
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BusTrackingMap;
