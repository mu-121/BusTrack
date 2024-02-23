import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  ScrollView
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { RadioButton } from 'react-native-paper';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCV1UW_QBiSU6tRfgE5xgPXM1QnBpUm6Xc",
  authDomain: "my-project-b7ecb.firebaseapp.com",
  projectId: "my-project-b7ecb",
  storageBucket: "my-project-b7ecb.appspot.com",
  messagingSenderId: "1052885078165",
  appId: "1:1052885078165:web:f472c88a1cd18a1ff60b9c",
  measurementId: "G-6XY6P7DH3H",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AssignRoutes = () => {
  const [selectedBusId, setSelectedBusId] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [assignedRoutes, setAssignedRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
 const [route, setRoute] = useState([]); 
 const [selectedDirection, setSelectedDirection] = useState('towards');

useEffect(() => {
  const fetchData = async () => {
    const db = getDatabase();
    const busesRef = ref(db, 'Buses');

    try {
      const snapshot = await get(busesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const busesArray = Object.entries(data).map(([key, value]) => ({ id: key, name: value }));
        setBuses(busesArray);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();

  const fetchRoutes = async () => {
    const db = getDatabase();
    const routesRef = ref(db, 'Stops'); // Assuming your routes are stored under 'Routes'

    try {
      const snapshot = await get(routesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const routesArray = Object.values(data); // Assuming routes are stored as an array
        setRoute(routesArray);
      }
    } catch (error) {
      console.error('Error fetching routes:', error);
    }
  };

  fetchRoutes();
}, []);
  
  const [isBusDropdownOpen, setBusDropdownOpen] = useState(false);
  const [isRouteDropdownOpen, setRouteDropdownOpen] = useState(false);

  const toggleBusDropdown = () => {
    setBusDropdownOpen(!isBusDropdownOpen);
  };

  const toggleRouteDropdown = () => {
    setRouteDropdownOpen(!isRouteDropdownOpen);
  };

  const handleAssignRoute = () => {
    if (!selectedBusId || !selectedRoute || !selectedTime) {
      alert('Please select a bus, a route, and set the time');
      return;
    }

    const newBus = selectedBusId;
    const newRoute = selectedRoute;
    const sDirection = selectedDirection;
    let hours = selectedTime.getHours();
    const minutes = selectedTime.getMinutes();

    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    setSelectedBusId('');
    setSelectedRoute('');
    setSelectedTime(null);

    setAssignedRoutes([...assignedRoutes, { bus: newBus, route: newRoute, direction: sDirection, time: formattedTime }]);
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const handleConfirmTime = (time) => {
    setSelectedTime(time);
    setTimePickerVisible(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleDeleteRoute = (id) => {
    const updatedRoutes = assignedRoutes.filter(route => route.id !== id);
    setAssignedRoutes(updatedRoutes);
  };
  const handleRadioButtonChange = (value) => {
    setSelectedDirection(value);
  };
  const saveAssignedRoutes = (assignedRoutes) => {
    const routesCollectionRef = collection(db, 'routes');

  assignedRoutes.forEach(async (item) => {
    try {
      await addDoc(routesCollectionRef, item);
      console.log(`Document added for id: ${item.id}`);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  });
  setAssignedRoutes([]);
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.routeAssignmentContainer} behavior="padding">
        <Text style={styles.assignmentTitle}>Assign Routes to Buses</Text>

        {/* Bus Dropdown */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity
            style={styles.picker}
            onPress={toggleBusDropdown}
          >
            <Text style={styles.pickerText}>
              {selectedBusId ? buses.find(bus => bus.name === selectedBusId).name : 'Select Bus'}
            </Text>
          </TouchableOpacity>
          {isBusDropdownOpen && (
            <FlatList
              data={buses}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => {
                    setSelectedBusId(item.name);
                    toggleBusDropdown();
                  }}
                >
                  <Text style={styles.pickerItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        {/* Route Dropdown */}
        <View style={styles.pickerContainer}>
          <TouchableOpacity
            style={styles.picker}
            onPress={toggleRouteDropdown}
          >
            <Text style={styles.pickerText}>
              {selectedRoute ? selectedRoute : 'Select Route'}
            </Text>
          </TouchableOpacity>
          {isRouteDropdownOpen && (
            <FlatList
              data={route}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => {
                    setSelectedRoute(item);
                    toggleRouteDropdown();
                  }}
                >
                  <Text style={styles.pickerItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        
        <View>
      <RadioButton.Item
        label="Towards"
        value="towards"
        status={selectedDirection === 'towards' ? 'checked' : 'unchecked'}
        onPress={() => handleRadioButtonChange('towards')}
      />
      <RadioButton.Item
        label="From"
        value="from"
        status={selectedDirection === 'from' ? 'checked' : 'unchecked'}
        onPress={() => handleRadioButtonChange('from')}
      />
    </View>

        {/* Time Picker */}
        <TouchableOpacity style={styles.timeButton} onPress={showTimePicker}>
          <Text style={styles.timeButtonText}>
            {selectedTime ? `Selected Time: ${selectedTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : 'Set Bus Time'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
        />

        {/* Assign Button */}
        <TouchableOpacity style={styles.assignButton} onPress={handleAssignRoute}>
          <Text style={styles.assignButtonText}>Assign Route</Text>
        </TouchableOpacity>

        {assignedRoutes.length > 0 && (
          <View style={styles.selectedItemsContainer}>
            <Text style={styles.selectedItemsTitle}>Assigned Routes:</Text>
            <FlatList
              data={assignedRoutes}
              keyExtractor={(item) => item.bus}
              renderItem={({ item }) => (
                <View style={styles.assignedItem}>
                  <Text style={styles.assignedItemText}>{`Bus: ${item.bus}, Route: ${item.route}, Direction: ${selectedDirection}, Time: ${item.time}`}</Text>
                  <TouchableOpacity onPress={() => handleDeleteRoute(item.id)}>
                    <Text style={{color: 'red'}}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            />

            {/* Delete Button */}
            <TouchableOpacity style={styles.deleteButton} onPress={() => setAssignedRoutes([])}>
              <Text style={styles.deleteButtonText}>Delete All</Text>
            </TouchableOpacity>
            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={() => saveAssignedRoutes(assignedRoutes)}>
              <Text style={styles.deleteButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
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
  assignmentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#187bcd',
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  pickerText: {
    color: '#000',
  },
  pickerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  pickerItemText: {
    color: '#000',
  },
  timeButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#187bcd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  timeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  selectedItemsContainer: {
    marginTop: 20,
  },
  selectedItemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#187bcd',
  },
  assignedItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assignedItemText: {
    color: '#000',
  },
  deleteButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  saveButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioButtonContainer: {
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default AssignRoutes;