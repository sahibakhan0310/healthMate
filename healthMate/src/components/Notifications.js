// notification.js
import * as Notifications from 'expo-notifications';

const scheduleNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Drink Water',
      body: "It's time to drink water!",
    },
    trigger: {
      hour: 0, // Adjust as needed
      repeats: true,
    },
  });
};

scheduleNotification();
