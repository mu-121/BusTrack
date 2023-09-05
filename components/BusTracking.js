import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BusTrackingScreen = () => {
  // Sample bus schedule data (Replace this with actual data from the backend)
  const initialBusScheduleData = [
    { id: '1', busNumber: 'Bus A', time: '08:00 AM', route: 'Route 101', tracked: false },
    { id: '2', busNumber: 'Bus B', time: '09:00 AM', route: 'Route 102', tracked: false },
    { id: '3', busNumber: 'Bus C', time: '10:00 AM', route: 'Route 103', tracked: false },
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
      <Text style={styles.title}>Bus Schedule</Text>
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

export default BusTrackingScreen;
