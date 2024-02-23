import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
/*import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Your Firebase Config here
  apiKey: "AIzaSyCV1UW_QBiSU6tRfgE5xgPXM1QnBpUm6Xc",
  authDomain: "my-project-b7ecb.firebaseapp.com",
  projectId: "my-project-b7ecb",
  storageBucket: "my-project-b7ecb.appspot.com",
  messagingSenderId: "1052885078165",
  appId: "1:1052885078165:web:f472c88a1cd18a1ff60b9c",
  measurementId: "G-6XY6P7DH3H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase and get reference to the database
const database = getDatabase();*/

const TripPlanner = () => {
  const [busList, setBusList] = useState([]);

  useEffect(() => {
    const fetchBusesFromFirebase = async () => {
      try {
        const busesRef = ref(database, 'Buses');
        const snapshot = await get(busesRef);
        if (snapshot.exists()) {
          const busesData = snapshot.val();
          const busesArray = Object.keys(busesData).map(busId => ({
            id: busId,
            busNumber: busesData[busId]
          }));
          setBusList(busesArray);
        }
      } catch (error) {
        console.error('Error fetching buses from Firebase: ', error);
      }
    };

    fetchBusesFromFirebase();
  }, []);

  const renderBusItem = ({ item }) => (
    <View style={styles.busArrivalTimeItem}>
      <Text style={styles.busArrivalTimeText}>Bus: {item.busNumber}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Bus Arrival Time</Text>
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={busList}
          keyExtractor={(item) => item.id}
          renderItem={renderBusItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#187bcd',
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

export default TripPlanner;
