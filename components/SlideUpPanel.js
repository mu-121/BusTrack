import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PanResponder } from 'react-native';

const SlideUpPanel = ({ onClose }) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // You can use gestureState to get information about the movement
        // For example: gestureState.dy gives you vertical movement
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -50) {
          // Swipe-up detected, do something (e.g., show the panel)
        } else if (gestureState.dy > 50) {
          // Swipe-down detected, do something (e.g., close the panel)
          onClose();
        }
      }
    })
  ).current;

  return (
    <View style={styles.panelContainer} {...panResponder.panHandlers}>
      <TouchableOpacity onPress={onClose}>
        <Text>Close</Text>
      </TouchableOpacity>
      <View style={styles.panelContent}>
        {/* Content for the panel goes here */}
        <Text>Panel Content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%', // Adjust the height as needed
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  panelContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SlideUpPanel;
