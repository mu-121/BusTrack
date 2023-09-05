import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AlarmScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleAddAlarm = () => {
    if (selectedTime) {
      const newAlarm = {
        id: Date.now().toString(),
        time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        repeat: 'Daily', // You can add the option to choose repeat frequency if needed
      };
      setAlarms((prevAlarms) => [...prevAlarms, newAlarm]);
      setSelectedTime(null);
    } else {
      Alert.alert('Error', 'Please select the alarm time.');
    }
  };

  const handleDeleteAlarm = (id) => {
    Alert.alert('Delete Alarm', 'Are you sure you want to delete this alarm?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => deleteAlarm(id) },
    ]);
  };

  const deleteAlarm = (id) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(updatedAlarms);
  };

  const renderAlarmItem = ({ item }) => (
    <View style={styles.alarmItem}>
      <View style={styles.alarmDetails}>
        <Text style={styles.alarmText}>Time:</Text>
        <Text style={styles.alarmTime}>{item.time}</Text>
      </View>
      <Text style={styles.repeatText}>Repeat: {item.repeat}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteAlarm(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirmTime = (selectedTime) => {
    hideTimePicker();
    if (selectedTime) {
      setSelectedTime(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Alarm</Text>
      <TouchableOpacity style={styles.timePickerButton} onPress={showTimePicker}>
        <Text style={styles.timePickerButtonText}>Select Alarm Time</Text>
        {selectedTime ? (
          <Text style={styles.timePickerText}>
            {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        ) : (
          <Text style={styles.timePickerPlaceholderText}>Select Time</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.setAlarmButton} onPress={handleAddAlarm}>
        <Text style={styles.setAlarmButtonText}>Set Alarm</Text>
      </TouchableOpacity>

      <FlatList
        data={alarms}
        renderItem={renderAlarmItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No alarms set</Text>}
      />

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        is24Hour
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
      />
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
  timePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 20,
  },
  timePickerButtonText: {
    fontSize: 16,
    color: '#187bcd',
  },
  timePickerText: {
    fontSize: 16,
    color: '#333',
  },
  timePickerPlaceholderText: {
    fontSize: 16,
    color: '#999',
  },
  setAlarmButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#187bcd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  setAlarmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alarmItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  alarmDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alarmText: {
    fontSize: 16,
    color: '#333',
  },
  alarmTime: {
    fontSize: 16,
    color: '#187bcd',
    marginLeft: 5,
  },
  repeatText: {
    fontSize: 16,
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#ff6666',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default AlarmScreen;
