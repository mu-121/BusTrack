import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regno, setRegno] = useState('');
  const [contact, setContact] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();

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
  const handleSignup = async () => {
    try {
      setError(''); // Resetting the error state

      if (name && email && password && regno && contact && confirmpassword) {
        if (password !== confirmpassword) {
          setError('Passwords do not match.');
          return;
        }

        const userExists = await firestore()
          .collection('users')
          .where('email', '==', email)
          .get();

        if (!userExists.empty) {
          setError('Email address is already in use.');
          return;
        }

        const regNoExists = await firestore()
          .collection('users')
          .where('regno', '==', regno)
          .get();

        if (!regNoExists.empty) {
          setError('Registration number is already in use.');
          return;
        }

        const userCredential = await auth().createUserWithEmailAndPassword(email, password);

        await firestore().collection('users').doc(userCredential.user.uid).set({
          name: name,
          email: email,
          regno: regno,
          contact: contact,
          password: password,
        });

        // Resetting state variables
        setName('');
        setEmail('');
        setPassword('');
        setRegno('');
        setContact('');
        setConfirmpassword('');

        setError('Signup successful! User data added to Firestore.');
      } else {
        setError('All fields are required.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError(`Error signing up: ${error.message}`);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <Image
          source={require('../trackon-bus-1.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>University Bus Tracking System</Text>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="id-card" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Registration Number"
              value={regno}
              onChangeText={setRegno}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="envelope" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#666"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="phone" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={contact}
              onChangeText={setContact}
              placeholderTextColor="#666"
              keyboardType="phone-pad"
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

          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmpassword}
              onChangeText={setConfirmpassword}
              placeholderTextColor="#666"
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Signup</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Login</Text>
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
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    marginTop: 0,
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
    marginBottom: 20,
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
    paddingHorizontal: 40,
    fontSize: 16,
    color: '#333',
  },
  signupButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#187bcd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  loginText: {
    color: '#333',
  },
  loginLink: {
    color: '#187bcd',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    
  },
 
});

export default Signup;
