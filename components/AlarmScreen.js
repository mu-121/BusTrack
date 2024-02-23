import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Sound from 'react-native-sound';

const AlarmScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formattedSelectedTime, setFormattedSelectedTime] = useState(null);
  const [selectedAmPm, setSelectedAmPm] = useState('AM');

  const alarmSound = new Sound('alarm.wav', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.error('Failed to load the sound', error);
    }
  });

  useEffect(() => {
    requestAudioPermission();

    PushNotification.configure({
      onNotification: (notification) => {
        console.log('Notification received:', notification);
        if (notification.id) {
          alarmSound.play();
        }
      },
    });

    // Check for alarms on component mount
    checkAlarms();
  }, [alarmSound]);

  const requestAudioPermission = async () => {
    const status = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MEDIA_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );

    if (status === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Blocked',
        'Audio permission is blocked. Please go to app settings and enable the permission.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
    }

    console.log('Audio Permission Status:', status);
  };

  const handleAddAlarm = () => {
    if (selectedTime) {
      const newAlarm = {
        id: Date.now().toString(),
        time: formattedSelectedTime,
        repeat: 'Daily',
      };

      scheduleNotification(newAlarm);
      setAlarms((prevAlarms) => [...prevAlarms, newAlarm]);
      setSelectedTime(null);
      setFormattedSelectedTime(null);
      setSelectedAmPm('AM');
    } else {
      Alert.alert('Error', 'Please select the alarm time.');
    }
  };

  const scheduleNotification = (alarm) => {
    const alarmTime = new Date();
    const [hours, minutes, ampm] = alarm.time.split(/:| /);
    const parsedHours = parseInt(hours, 10) % 12 + (ampm === 'PM' ? 12 : 0);
    alarmTime.setHours(parsedHours);
    alarmTime.setMinutes(parseInt(minutes, 10));

    PushNotification.localNotificationSchedule({
      id: alarm.id,
      title: 'Alarm',
      message: `Time to wake up!`,
      date: alarmTime,
      repeatType: 'day',
      soundName: 'default',
    });
  };

  const handleDeleteAlarm = (id) => {
    Alert.alert('Delete Alarm', 'Are you sure you want to delete this alarm?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => deleteAlarm(id) },
    ]);
  };

  const deleteAlarm = (id) => {
    const alarm = alarms.find((a) => a.id === id);
    cancelNotification(alarm);

    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(updatedAlarms);
  };

  const cancelNotification = (alarm) => {
    PushNotification.cancelLocalNotifications({ id: alarm.id });
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
      const [hours, minutes, ampm] = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).split(/:| /);
      const parsedHours = parseInt(hours, 10);
      const formattedHours = parsedHours % 12 || 12;
      const formattedTime = `${formattedHours}:${minutes} ${ampm}`;
      setSelectedTime(selectedTime);
      setFormattedSelectedTime(formattedTime);

      // Schedule the alarm for the selected time
      scheduleAlarmForSelectedTime(selectedTime);
    }
  };

  const scheduleAlarmForSelectedTime = (selectedTime) => {
    const currentTime = new Date();
    const timeDiff = selectedTime - currentTime;

    if (timeDiff > 0) {
      // Schedule the alarm notification with the time difference
      setTimeout(() => {
        alarmSound.play();
      }, timeDiff);
    } else {
      // The selected time has already passed
      Alert.alert('Selected time has already passed. Please select a future time.');
    }
  };

  const checkAlarms = () => {
    // Check existing alarms and schedule them if their time has not passed
    alarms.forEach((alarm) => {
      const alarmTime = new Date();
      const [hours, minutes, ampm] = alarm.time.split(/:| /);
      const parsedHours = parseInt(hours, 10) % 12 + (ampm === 'PM' ? 12 : 0);
      alarmTime.setHours(parsedHours);
      alarmTime.setMinutes(parseInt(minutes, 10));

      const timeDiff = alarmTime - new Date();
      if (timeDiff > 0) {
        // Schedule the alarm notification with the time difference
        setTimeout(() => {
          alarmSound.play();
        }, timeDiff);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Alarm</Text>
      <TouchableOpacity style={styles.timePickerButton} onPress={showTimePicker}>
        <Text style={styles.timePickerButtonText}>Select Alarm Time</Text>
        <Text style={styles.timePickerText}>
          {formattedSelectedTime || 'Select Time'}
        </Text>
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
        is24Hour={false} // Set to false to enable 12-hour format
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
