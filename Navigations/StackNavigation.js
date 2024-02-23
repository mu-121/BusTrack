import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../components/SignUpPage';
import Login from '../components/LoginPage';
import ArrivalTime from '../components/ArrivalTime';
import BusTrackingMap from '../components/maps';
import SearchPlaces from '../components/SearchPlaces';
const Stack = createStackNavigator();

const AppNavigators = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ArrivalTime" component={ArrivalTime} />
      <Stack.Screen name="BusTrackingMap" component={BusTrackingMap} />
      <Stack.Screen name="SearchPlaces"  component={SearchPlaces}  />
    </Stack.Navigator>
  );
};

export default AppNavigators;
