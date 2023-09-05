import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const BusTrackingSetting = () => {
  const [busTrackingEnabled, setBusTrackingEnabled] = useState(false);

  const handleBusTrackingToggle = () => {
    setBusTrackingEnabled(!busTrackingEnabled);
    // Update the bus tracking setting in your app's state or storage
  };

  return (
    <View style={styles.settingItem}>
      <Text style={styles.settingTitle}>Bus Tracking Settings</Text>
      <Switch
        value={busTrackingEnabled}
        onValueChange={handleBusTrackingToggle}
      />
      {/* Add more bus tracking settings components as needed */}
    </View>
  );
};

const NotificationSetting = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
    // Update the notification setting in your app's state or storage
  };

  return (
    <View style={styles.settingItem}>
      <Text style={styles.settingTitle}>Notification Settings</Text>
      <Switch
        value={notificationEnabled}
        onValueChange={handleNotificationToggle}
      />
      {/* Add more notification settings components as needed */}
    </View>
  );
};

const ProfileSetting = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    // Add more profile data fields as needed
  });

  const handleProfileUpdate = (updatedData) => {
    setProfileData(updatedData);
    // Update the profile data in your app's state or storage
  };

  return (
    <View style={styles.settingItem}>
      <Text style={styles.settingTitle}>Profile Settings</Text>
      <Text>Edit your profile information here.</Text>
      {/* Add profile editing components and invoke handleProfileUpdate */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#187bcd',
    textAlign: 'center',
  },
  settingItem: {
    marginBottom: 20,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});

export default SettingScreen;
