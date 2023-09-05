import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BusSchedule = ({ navigation }) => {
  // Sample bus schedule data (Replace this with actual data from the backend)
  const busScheduleData = [
    { id: '1', busNumber: 'Bus A', time: '08:00 AM', route: 'Route 101' },
    { id: '2', busNumber: 'Bus B', time: '09:00 AM', route: 'Route 102' },
    { id: '3', busNumber: 'Bus C', time: '10:00 AM', route: 'Route 103' },
    // Add more bus schedules here...
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Schedule</Text>
      {busScheduleData.map((bus) => (
        <TouchableOpacity
          key={bus.id}
          style={styles.scheduleItem}
          onPress={() => navigation.navigate('BusDetails', { bus })} // Assuming you have a "BusDetails" screen
        >
          <Text style={styles.scheduleText}>Bus: {bus.busNumber}</Text>
          <Text style={styles.scheduleText}>Time: {bus.time}</Text>
          <Text style={styles.scheduleText}>Route: {bus.route}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.openDrawerButton}
        onPress={() => navigation.openDrawer()} // Open the drawer
      >
        <Text style={styles.openDrawerButtonText}>Open Drawer</Text>
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
  scheduleText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  openDrawerButton: {
    backgroundColor: '#187bcd',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  openDrawerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BusSchedule;
