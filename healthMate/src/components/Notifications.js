// For Expo Notifications
import * as Notifications from 'expo-notifications';

Notifications.scheduleNotificationAsync({
  content: {
    title: 'Drink Water',
    body: 'It\'s time to drink water!',
  },
  trigger: {
    hour: 0, // Adjust as needed
    repeats: true,
  },
});

// For React Native Push Notification
// Follow the library's documentation for scheduling notifications
