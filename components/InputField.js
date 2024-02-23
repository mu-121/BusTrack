import React from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InputField = ({ placeholder, iconPath, onChangeText, value, border }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.searchContainer, {borderWidth: border}]}>
      <Image
        source={iconPath} // Pass the icon image path as a prop
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder} // Pass the placeholder text as a prop
        onChangeText={onChangeText} // Pass the onChangeText function as a prop
        onPressIn={() => navigation.navigate('SearchPlaces')}
        value={value} // Pass the value from state as a prop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#888',
  },
  input: {
    flex: 1,
    padding: 10,
    margin: 0,
  },
});

export default InputField