import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Image,
} from 'react-native';

// Add your logo image file path here
const LogoImage = require('../trackon-bus-1.jpg');

const ManageUsers = () => {
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedBusId, setSelectedBusId] = useState('');
  const [busCapacity, setBusCapacity] = useState('');
  const [isDriverDropdownOpen, setIsDriverDropdownOpen] = useState(false);
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = useState(false);
  const [isBusDropdownOpen, setIsBusDropdownOpen] = useState(false);

  // Simulated static data for drivers and routes (Replace this with actual data from the backend)
  const mockDrivers = [
    { id: '1', name: 'Driver 1' },
    { id: '2', name: 'Driver 2' },
    { id: '3', name: 'Driver 3' },
  ];

  const mockRoutes = [
    { id: '101', name: 'Route 101' },
    { id: '102', name: 'Route 102' },
    { id: '103', name: 'Route 103' },
  ];

  const mockBuses = [
    { id: '1', busNumber: 'Bus A', capacity: 50 },
    { id: '2', busNumber: 'Bus B', capacity: 60 },
    { id: '3', busNumber: 'Bus C', capacity: 55 },
  ];

  const handleAssignRoute = () => {
    if (!selectedDriverId || !selectedRoute || !selectedBusId) {
      alert('Please select a driver, a route, and a bus');
      return;
    }

    alert(`Route assigned successfully!\n\nSelected Bus: ${selectedBusId}\nCapacity of Bus: ${busCapacity}`);
  };

  const toggleDriverDropdown = () => {
    setIsDriverDropdownOpen(!isDriverDropdownOpen);
  };

  const toggleRouteDropdown = () => {
    setIsRouteDropdownOpen(!isRouteDropdownOpen);
  };

  const toggleBusDropdown = () => {
    setIsBusDropdownOpen(!isBusDropdownOpen);
  };

  const selectBus = (busId, capacity) => {
    setSelectedBusId(busId);
    setBusCapacity(capacity);
    setIsBusDropdownOpen(false);
  };

  const renderDriverDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.driverDropdownItem, selectedDriverId === item.id && styles.selectedDriver]}
      onPress={() => {
        setSelectedDriverId(item.id);
        toggleDriverDropdown();
      }}
    >
      <Text style={styles.dropdownText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRouteDropdownItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.routeDropdownItem, selectedRoute === item.id && styles.selectedRoute]}
      onPress={() => {
        setSelectedRoute(item.id);
        toggleRouteDropdown();
      }}
    >
      <Text style={styles.dropdownText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderBusDropdown = () => {
    return (
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={[styles.busDropdown, isBusDropdownOpen && styles.dropdownOpen]}
          onPress={toggleBusDropdown}
        >
          <Text style={styles.dropdownText}>
            {selectedBusId ? `Bus: ${selectedBusId} (Capacity: ${busCapacity})` : 'Select a Bus'}
          </Text>
          <Text style={styles.caretIcon}>{isBusDropdownOpen ? '^' : 'v'}</Text>
        </TouchableOpacity>

        {isBusDropdownOpen && (
          <FlatList
            data={mockBuses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.busDropdownItem}
                onPress={() => selectBus(item.busNumber, item.capacity)}
              >
                <Text style={styles.dropdownText}>{`${item.busNumber} (Capacity: ${item.capacity})`}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.routeAssignmentContainer} behavior="padding">
        <Image source={LogoImage} style={styles.logo} />

        <Text style={styles.assignmentTitle}>Manage Users</Text>

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[styles.driverDropdown, isDriverDropdownOpen && styles.dropdownOpen]}
            onPress={toggleDriverDropdown}
          >
            <Text style={styles.dropdownText}>
              {selectedDriverId
                ? mockDrivers.find((driver) => driver.id === selectedDriverId).name
                : 'Select a Driver'}
            </Text>
            <Text style={styles.caretIcon}>{isDriverDropdownOpen ? '^' : 'v'}</Text>
          </TouchableOpacity>

          {isDriverDropdownOpen && (
            <FlatList
              data={mockDrivers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderDriverDropdownItem}
            />
          )}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Route"
          value={selectedRoute}
          onChangeText={setSelectedRoute}
        />

        {/* Bus Dropdown */}
        {renderBusDropdown()}

        <TouchableOpacity style={styles.assignButton} onPress={handleAssignRoute}>
          <Text style={styles.assignButtonText}>Manage Users</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
    routeAssignmentContainer: {
      flex: 1,
      padding: 20,
    },
    logo: {
      width: 130,
      height: 100,
      alignSelf: 'center',
      marginBottom: 20,
      resizeMode: 'contain',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 4,
    },
    assignmentTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#187bcd',
      textAlign: 'center',
    },
    dropdownContainer: {
      position: 'relative',
      width: '100%',
    },
    driverDropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      height: 50,
      justifyContent: 'center',
      paddingHorizontal: 16,
      marginBottom: 20,
      backgroundColor: 'white', // Background color for the closed dropdown
    },
    routeDropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      height: 50,
      justifyContent: 'center',
      paddingHorizontal: 16,
      marginBottom: 20,
      backgroundColor: 'white', // Background color for the closed dropdown
    },
    busDropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      height: 50,
      justifyContent: 'center',
      paddingHorizontal: 16,
      marginBottom: 20,
      backgroundColor: 'white', // Background color for the closed dropdown
    },
    dropdownOpen: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: '#f0f0f0', // Background color for the opened dropdown
    },
    caretIcon: {
      position: 'absolute',
      right: 16,
      top: 15,
      fontSize: 14,
      color: '#333',
    },
    driverDropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    selectedDriver: {
      backgroundColor: '#f0f0f0',
    },
    routeDropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    busDropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#333',
    },
    assignButton: {
      width: '100%',
      height: 50,
      backgroundColor: '#187bcd',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 20,
    },
    assignButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    
  });
  
  export default ManageUsers;

