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

const AssignRoutes = () => {
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [isDriverDropdownOpen, setIsDriverDropdownOpen] = useState(false);
  const [isRouteDropdownOpen, setIsRouteDropdownOpen] = useState(false);

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

  const handleAssignRoute = () => {
    if (!selectedDriverId || !selectedRoute) {
      alert('Please select a driver and a route');
      return;
    }

    alert('Route assigned successfully!');
  };

  const toggleDriverDropdown = () => {
    setIsDriverDropdownOpen(!isDriverDropdownOpen);
  };

  const toggleRouteDropdown = () => {
    setIsRouteDropdownOpen(!isRouteDropdownOpen);
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

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.routeAssignmentContainer} behavior="padding">
        <Image source={LogoImage} style={styles.logo} />

        <Text style={styles.assignmentTitle}>Assign Routes to Drivers</Text>

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[styles.driverDropdown, isDriverDropdownOpen && styles.dropdownOpen]}
            onPress={toggleDriverDropdown}
          >
            <Text style={styles.dropdownText}>
              {selectedDriverId
                ? mockDrivers.find(driver => driver.id === selectedDriverId).name
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

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={[styles.routeDropdown, isRouteDropdownOpen && styles.dropdownOpen]}
            onPress={toggleRouteDropdown}
          >
            <Text style={styles.dropdownText}>
              {selectedRoute
                ? mockRoutes.find(route => route.id === selectedRoute).name
                : 'Select a Route'}
            </Text>
            <Text style={styles.caretIcon}>{isRouteDropdownOpen ? '^' : 'v'}</Text>
          </TouchableOpacity>

          {isRouteDropdownOpen && (
            <FlatList
              data={mockRoutes}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderRouteDropdownItem}
            />
          )}
        </View>

        <TouchableOpacity style={styles.assignButton} onPress={handleAssignRoute}>
          <Text style={styles.assignButtonText}>Assign Route</Text>
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


export default AssignRoutes;
