import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UserInfoScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get the currently authenticated user
        const user = auth().currentUser;

        if (user) {
          // Fetch user information from Firestore using UID
          const userDoc = await firestore().collection('users').doc(user.uid).get();

          if (userDoc.exists) {
            // User found, set user information
            setUserInfo(userDoc.data());
          } else {
            // User not found
            console.warn('User not found in Firestore');
          }
        } else {
          // No user is currently authenticated
          console.warn('No authenticated user');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#187bcd" />
      ) : userInfo ? (
        <View>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{userInfo.name}</Text>

          <Text style={styles.label}>Registration Number:</Text>
          <Text style={styles.text}>{userInfo.regNo}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userInfo.email}</Text>

          <Text style={styles.label}>Contact Number:</Text>
          <Text style={styles.text}>{userInfo.contactNumber}</Text>
        </View>
      ) : (
        <Text style={styles.errorText}>User information not available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default UserInfoScreen;
