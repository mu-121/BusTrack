import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../components/SignUpPage';
import Login from '../components/LoginPage';
import BusTrackingMap from '../components/maps';

const Stack = createStackNavigator();

const AppNavigators = () => {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="BusTrackingMap" component={BusTrackingMap} />
    </Stack.Navigator>
  );
};

export default AppNavigators;
