import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';

const GenerateReports = () => {
  const [busNumber, setBusNumber] = useState('');
  const [route, setRoute] = useState('');

  const handleGenerateReport = () => {
    // Replace this placeholder logic with actual report generation logic
    console.log('Generating report for Bus:', busNumber, 'Route:', route);
    // Implement your report generation logic here
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Image
            source={require('../trackon-bus-1.jpg')} // Replace with your app logo
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>University Bus Tracking System</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Bus Number"
            value={busNumber}
            onChangeText={setBusNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Route"
            value={route}
            onChangeText={setRoute}
          />

          <TouchableOpacity style={styles.generateButton} onPress={handleGenerateReport}>
            <Text style={styles.generateButtonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 40,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: '90%',
    height: 500,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginTop: -50,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#187bcd',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  generateButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#187bcd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GenerateReports;
