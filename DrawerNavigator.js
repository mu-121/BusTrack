import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BusTrackingMap from './components/maps';
import BusSchedule from './components/BusSchedule';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="BusTrackingMap">
      <Drawer.Screen name="BusTrackingMap" component={BusTrackingMap} />
      <Drawer.Screen name="BusSchedule" component={BusSchedule} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
