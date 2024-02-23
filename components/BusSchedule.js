import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { initializeApp } from 'firebase/app';
import firestore from '@react-native-firebase/firestore';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

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

const BusSchedule = ({ navigation }) => {
  const [busScheduleData, setBusScheduleData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBusScheduleData = async () => {
      try {
        const querySnapshot = await firestore().collection('routes').get();

        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter the bus schedule based on the search query
        const filteredData = data.filter(
          bus =>
            bus.bus.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bus.route.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setBusScheduleData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBusScheduleData();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Schedule</Text>

      {/* Add a TextInput for the user to input their search query */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search a stop"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
        placeholderTextColor="#333"  // Set the placeholder text color
        color="black" 
      />

      {busScheduleData.map(bus => (
        <TouchableOpacity
          key={bus.id}
          style={styles.scheduleItem}
          onPress={() => navigation.navigate('BusTrackingMap', { bus })}
        >
          <Text style={styles.scheduleText}>Bus: {bus.bus}</Text>
          <Text style={styles.scheduleText}>Bus Time: {bus.time}</Text>
          <Text style={styles.boldText}>Direction: {bus.direction}</Text>
          <Text style={styles.scheduleText}>Route: {bus.route}</Text>
        </TouchableOpacity>
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
  scheduleText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    
    //fontWeight: 'bold'
  },
  openDrawerButton: {
    backgroundColor: '#187bcd',
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  boldText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  openDrawerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'black',
    
  },
  
});

export default BusSchedule;