import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppNavigator from './Navigations/Drawernavigation'; 

const App = () => {
  return (
    <AppNavigator/>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
