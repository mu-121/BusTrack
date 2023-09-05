import React, { useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppNavigator from './Navigations/Drawernavigation';
const App = () => {
  return (
    <AppNavigator />
    //<AppNavigators />
  );
};

// Register your app component with AppRegistry
AppRegistry.registerComponent(appName, () => App);

export default App;



