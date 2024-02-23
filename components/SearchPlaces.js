import React, { Component } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Button } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Linking, Platform } from 'react-native';

const API_KEY = 'AIzaSyA9B-sHX-s-SOeuYKRsNHwCUuywzXvLHc0'; // Replace with your API Key

const PLACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const PLACE_DETAILS_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

const getCurrentLocation = async () => {
  // Check location permissions
  const permissionStatus = await check(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  );

  if (permissionStatus === RESULTS.GRANTED) {
    try {
      // Request location using Geolocation
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          }
        );
      });
    } catch (error) {
      throw error;
    }
  } else if (permissionStatus === RESULTS.DENIED) {
    // Handle the case where permission is denied
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
    throw new Error('Location permission denied.');
  } else {
    // Handle other permission statuses (e.g., blocked, unavailable)
    throw new Error('Location permission not granted.');
  }
};

class SearchPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      predictions: [],
    };
  }

  handleInputChange = (text) => {
    this.setState({ inputValue: text }, () => {
      this.fetchPredictions();
    });
  };

  fetchPredictions = async () => {
    const { inputValue } = this.state;

    if (inputValue.length > 0) {
      try {
        const response = await fetch(
          `${PLACES_API_BASE_URL}?input=${inputValue}&components=country:PK&key=${API_KEY}`
        );

        if (response.status === 200) {
          const data = await response.json();
          this.setState({ predictions: data.predictions });
        }
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    } else {
      this.setState({ predictions: [] });
    }
  };

  handlePredictionPress = async (prediction) => {
    if (prediction.isCurrentLocation) {
      try {
        const location = await getCurrentLocation();
        console.log('Current Latitude:', location.latitude);
        console.log('Current Longitude:', location.longitude);
        // Handle the current location data as needed
      } catch (error) {
        console.error('Error getting current location:', error);
      }
    } else {
      try {
        // Fetch place details using the place_id from the selected prediction
        const response = await fetch(
          `${PLACE_DETAILS_API_BASE_URL}?placeid=${prediction.place_id}&key=${API_KEY}`
        );
  
        if (response.status === 200) {
          const data = await response.json();
          const { lat, lng } = data.result.geometry.location;
          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          // Handle the selected place data as needed
        }
      } catch (error) {
        console.error('Error fetching place details:', error);
      }
    }
  
    this.setState({ inputValue: prediction.description, predictions: [] });
    // You can perform additional actions with the selected prediction here
  };

  renderPredictionItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.handlePredictionPress(item)}>
      <Text style={{ color: 'black', padding: 10 }}>{item.description}</Text>
    </TouchableOpacity>
  );

  render() {
    const { inputValue, predictions } = this.state;

    // Add a special item at the top for the current location
    const currentLocationItem = { description: 'Current Location', isCurrentLocation: true };

    return (
      <View>
        <TextInput
          style={{ borderWidth: 1, padding: 10 }}
          placeholder="Search for a place..."
          value={inputValue}
          onChangeText={this.handleInputChange}
        />
        <FlatList
          data={[currentLocationItem, ...predictions]} // Include the current location item at the top
          renderItem={this.renderPredictionItem}
          keyExtractor={(item) => (item.isCurrentLocation ? 'current_location' : item.place_id)}
        />
      </View>
    );
  }
}

export default SearchPlaces;