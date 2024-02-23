import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { initializeApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyCV1UW_QBiSU6tRfgE5xgPXM1QnBpUm6Xc",
  authDomain: "my-project-b7ecb.firebaseapp.com",
  projectId: "my-project-b7ecb",
  databaseURL:'https://console.firebase.google.com/project/my-project-b7ecb/firestore/data/~2Fusers~2F562lT7Jj0EMk3g0EIJqR',
  storageBucket: "my-project-b7ecb.appspot.com",
  messagingSenderId: "1052885078165",
  appId: "1:1052885078165:web:f472c88a1cd18a1ff60b9c",
  measurementId: "G-6XY6P7DH3H",
};

const app = initializeApp(firebaseConfig);

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      setErrorText('');

      if (!username || !password) {
        setErrorText('Both registration number and password are required.');
        return;
      }

      const userSnapshot = await firestore()
        .collection('users')
        .where('regno', '==', username)
        .get();

      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password === password) {
          navigation.navigate('BusTrackingMap', { bus: userData.bus });
        } else {
          setErrorText('Invalid password');
        }
      } else {
        setErrorText('User not found');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  


  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Image
            source={require('../trackon-bus-1.jpg')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>University Bus Tracking System</Text>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="id-card" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Registration Number"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#666"
              secureTextEntry
            />
          </View>

          <Text style={styles.errorText}>{errorText}</Text>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={navigateToSignup}>
              <Text style={styles.signupLink}>Signup</Text>
            </TouchableOpacity>
          </View>
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
  inputContainer: {
    position: 'relative',
    marginBottom: 5,
  },
  inputIcon: {
    position: 'absolute',
    top: 12,
    left: 10,
    zIndex: 1,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 40,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#187bcd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: -9,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  signupText: {
    color: '#333',
  },
  signupLink: {
    color: '#187bcd',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;
