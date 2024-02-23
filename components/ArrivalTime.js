import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';
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
const database = getDatabase();

const ArrivalTime = () => {
  const navigation = useNavigation();
  const [selectedStopId, setSelectedStopId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stopList, setStopList] = useState([]);

  useEffect(() => {
    // Fetch stops from Firebase when component mounts
    const fetchStopsFromFirebase = async () => {
      try {
        const stopsRef = ref(database, 'Stops');
        const snapshot = await get(stopsRef);
        if (snapshot.exists()) {
          const stopsData = snapshot.val();
          const stopsArray = Object.keys(stopsData).map(stopId => ({
            id: stopId,
            stopName: stopsData[stopId]
          }));
          setStopList(stopsArray);
        }
      } catch (error) {
        console.error('Error fetching stops from Firebase: ', error);
      }
    };

    fetchStopsFromFirebase();
  }, []);

  const handleStopSelect = (stopId) => {
    setSelectedStopId(stopId);
    setIsDropdownOpen(false);
  };

  const handleBusSelect = (busNumber) => {
    navigation.navigate('BusTrackingMap', { busNumber });
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

  return (
    <View style={styles.container}>
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
              extraData={selectedStopId} 
            />
          </View>
        </Modal>

        {selectedStopId ? (
          <>
            <Text style={styles.subTitle}>
              Bus Arrival Time at {stopList.find((stop) => stop.id === selectedStopId)?.stopName}
            </Text>
            {/* Placeholder for busArrivalTimeData */}
            <FlatList
              data={[]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleBusSelect(item.busNumber)}
                >
                  <View style={styles.busArrivalTimeItem}>
                    <Text style={styles.busArrivalTimeText}>Bus: {item.busNumber}</Text>
                    <Text style={[styles.busArrivalTimeText, { color: '#187bcd' }]}>
                      Arrival Time: {item.arrivalTime}
                    </Text>
                  </View>
                </TouchableOpacity>
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
