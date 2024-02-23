import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

const BusTrackingMap = ({ route }) => {
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    const { bus } = route.params || {};

    if (bus && bus.bus) {
      const unsubscribe = firestore()
        .collection('Locations')
        .doc(bus.bus)
        .onSnapshot((documentSnapshot) => {
          if (documentSnapshot.exists) {
            const location = documentSnapshot.data();
            setDriverLocation(location);
          }
        });

      return () => {
        unsubscribe();
      };
    } else {
      //console.error('');
    }
  }, [route.params]);

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
        showsUserLocation={true}
        loadingEnabled={true}
        zoomEnabled={true}
      >
        {driverLocation != null && (
          <Marker coordinate={driverLocation} title={driverLocation.timeStamp}>
            <Image source={require('../bus-256.jpg')} style={{ width: 30, height: 30 }} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  map: {
    flex: 1,
    marginBottom: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default BusTrackingMap;
