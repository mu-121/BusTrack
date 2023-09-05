import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Perform logout actions here (e.g., clear authentication, navigate to login screen)
    // For now, let's just navigate back to the Login screen
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to logout?</Text>
      <Button title="Logout" onPress={handleLogout} color="#187bcd" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#187bcd',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
});

export default LogoutScreen;
