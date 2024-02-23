import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { initializeApp } from 'firebase/app';
import firestore from '@react-native-firebase/firestore';

const firebaseConfig = {
  // Your Firebase config
};

//const app = initializeApp(firebaseConfig);

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore().collection('users').doc('user_id').get();
        if (userDoc.exists) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      await firestore().collection('users').doc('user_id').update({
        name,
        email,
      });
      setEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      <View style={styles.profileInfo}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={editing ? name : userData.name}
          onChangeText={text => setName(text)}
          editable={editing}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={editing ? email : userData.email}
          onChangeText={text => setEmail(text)}
          editable={editing}
        />
      </View>

      {!editing && (
        <View style={styles.editButtonContainer}>
          <Text style={styles.editButton} onPress={() => setEditing(true)}>
            Edit Profile
          </Text>
        </View>
      )}

      {editing && (
        <View style={styles.saveButtonContainer}>
          <Text style={styles.saveButton} onPress={handleSave}>
            Save Changes
          </Text>
        </View>
      )}
    </View>
  );
};

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
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'black',
  },
  editButtonContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  editButton: {
    color: '#187bcd',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  saveButtonContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  saveButton: {
    color: '#187bcd',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default UserProfile;
