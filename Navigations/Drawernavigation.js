import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import AppNavigators from './StackNavigation';
import BusSchedule from '../components/BusSchedule';
import ArrivalTime from '../components/ArrivalTime';
import NearStops from '../components/NearByStops';
import AlarmScreen from '../components/AlarmScreen';
import LogoutScreen from '../components/LogoutScreen';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="BusTracking"
        drawerStyle={styles.drawer}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: '#0066cc',
          drawerInactiveTintColor: 'black',
        }}
      >
        <Drawer.Screen
          name="BusTracking"
          component={AppNavigators}
          options={{
            drawerLabel: 'Home',
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? '#0066cc' : 'black'}
                style={styles.drawerIcon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="BusSchedule"
          component={BusSchedule}
          options={{
            drawerLabel: 'Bus Schedule',
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="bus"
                size={20}
                color={focused ? '#0066cc' : 'black'}
                style={styles.drawerIcon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="ArrivalTime"
          component={ArrivalTime}
          options={{
            drawerLabel: 'Arrival Time',
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="clock"
                size={20}
                color={focused ? '#0066cc' : 'black'}
                style={styles.drawerIcon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="NearByStops"
          component={NearStops}
          options={{
            drawerLabel: 'Nearby Stops',
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="map-marker"
                size={20}
                color={focused ? '#0066cc' : 'black'}
                style={styles.drawerIcon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="AlarmScreen"
          component={AlarmScreen}
          options={{
            drawerLabel: 'Set Alarm',
            drawerIcon: ({ focused }) => (
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? '#0066cc' : 'black'}
                style={styles.drawerIcon}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{ drawerLabel: 'Logout' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const CustomDrawerContent = ({ navigation, state }) => {
  const user = "John Doe";
  const drawerItems = [
    { route: 'BusTracking', label: 'Home' },
    { route: 'BusSchedule', label: 'Bus Schedule' },
    { route: 'ArrivalTime', label: 'Arrival Time' },
    { route: 'NearByStops', label: 'Nearby Stops' },
    { route: 'AlarmScreen', label: 'Set Alarm' },
    { route: 'Logout', label: 'Logout' },
  ];

  const renderDrawerItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.drawerItem,
        state.index === index && styles.drawerItemFocused,
      ]}
      onPress={() => navigation.navigate(item.route)}
    >
      <FontAwesome5
        name={
          item.route === 'BusTracking'
            ? 'home'
            : item.route === 'BusSchedule'
            ? 'bus'
            : item.route === 'ArrivalTime'
            ? 'clock'
            : item.route === 'NearByStops'
            ? 'map-marker'
            : item.route === 'AlarmScreen'
            ? 'bell'
            : 'question'
        }
        size={20}
        color={state.index === index ? '#0066cc' : 'black'}
        style={styles.drawerIcon}
      />
      <Text style={styles.drawerLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.userContainer}>
        <Image
          source={require('../trackon-bus-1.jpg')}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{user}</Text>
      </View>
      {drawerItems.map(renderDrawerItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: 'white',
    width: 250,
  },
  drawerContainer: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  drawerLabel: {
    fontWeight: 'semibold',
    fontSize: 16,
    color: 'black',
    marginLeft: 0,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginLeft: 10,
  },
  drawerItemFocused: {
    backgroundColor: '#f0f0f0',
  },
  drawerIcon: {
    width: 20,
    marginRight: 10,
  },
});

export default AppNavigator;
