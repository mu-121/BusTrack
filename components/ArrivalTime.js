import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';

// Import your logo image here
import LogoImage from '../trackon-bus-1.jpg';

const ArrivalTime = () => {
  const busArrivalTimeData = {
    // Sample bus arrival time data for different stops (Replace this with actual data from the backend)
    '101': [
      { id: 'A1', stopName: 'Stop 101', busNumber: 'Bus A', arrivalTime: '08:10 AM' },
      { id: 'A2', stopName: 'Stop 101', busNumber: 'Bus B', arrivalTime: '08:15 AM' },
      
    ],
    '102': [
      { id: 'B1', stopName: 'Stop 102', busNumber: 'Bus C', arrivalTime: '08:20 AM' },
      { id: 'B2', stopName: 'Stop 102', busNumber: 'Bus D', arrivalTime: '08:25 AM' },
    ],
    '103': [
      { id: 'C1', stopName: 'Stop 103', busNumber: 'Bus E', arrivalTime: '08:30 AM' },
      { id: 'C2', stopName: 'Stop 103', busNumber: 'Bus F', arrivalTime: '08:35 AM' },
    ],
    // Add more bus arrival time data for other stops...
  };

  const [selectedStopId, setSelectedStopId] = useState(''); // Default stop ID (empty)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStopSelect = (stopId) => {
    setSelectedStopId(stopId);
    setIsDropdownOpen(false);
  };

  const renderStopItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        selectedStopId === item.id && styles.selectedItem,
      ]}
      onPress={() => handleStopSelect(item.id)}
    >
      <Text style={styles.dropdownItemText}>{item.stopName}</Text>
    </TouchableOpacity>
  );

  const stopList = Object.keys(busArrivalTimeData).map((stopId) => ({
    id: stopId,
    stopName: `Stop ${stopId}`,
  }));

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={LogoImage} style={styles.logo} />

      <View style={styles.headerContainer}>
        <Text style={styles.title}>Bus Arrival Time</Text>
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Text style={styles.dropdownButtonText}>
            {selectedStopId
              ? `Selected Stop: ${stopList.find((stop) => stop.id === selectedStopId)?.stopName}`
              : 'Select Stop'}
          </Text>
        </TouchableOpacity>

        <Modal visible={isDropdownOpen} animationType="fade">
          <View style={styles.dropdownContainer}>
            <FlatList
              data={stopList}
              keyExtractor={(item) => item.id}
              renderItem={renderStopItem}
              extraData={selectedStopId} // Pass selectedStopId as extraData to ensure FlatList updates when the selection changes
            />
          </View>
        </Modal>

        {selectedStopId ? (
          <>
            <Text style={styles.subTitle}>
              Bus Arrival Time at {stopList.find((stop) => stop.id === selectedStopId)?.stopName}
            </Text>
            <FlatList
              data={busArrivalTimeData[selectedStopId]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.busArrivalTimeItem}>
                  <Text style={styles.busArrivalTimeText}>Bus: {item.busNumber}</Text>
                  <Text style={[styles.busArrivalTimeText, { color: '#187bcd' }]}>
                    Arrival Time: {item.arrivalTime}
                  </Text>
                </View>
              )}
            />
          </>
        ) : (
          <Text style={styles.emptyText}>Please select a stop to view the bus arrival time.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Move content to the center vertically
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  logo: {
    width: 0,
    height: 0,
    alignSelf: 'center', // Center the logo horizontally
    marginBottom: 20, // Add some space between the logo and the header
  },
  headerContainer: {
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1, // Take available space to center content vertically
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#187bcd',
    textAlign: 'center', // Center the title text
  },
  dropdownButton: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 5,
  },
  selectedItem: {
    backgroundColor: '#187bcd',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#187bcd',
    marginBottom: 10,
    textAlign: 'center',
  },
  busArrivalTimeItem: {
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
  busArrivalTimeText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default ArrivalTime;
