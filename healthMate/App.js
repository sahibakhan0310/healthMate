import React, { useState, useEffect } from 'react';

import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import MainContainer from './src/mainContainer';
import { createStore,combineReducers } from 'redux';
import themeColors from './themeColors.json';
import userReducer from './src/reducers/userReducer';
import { Pedometer } from 'expo-sensors';
import { useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';
import { updateStepCount } from './src/actions/userActions'; // Import your action creator
//import StepCountBackground from './src/components/stepCountBackground';


const theme = {
  ...DefaultTheme,
  colors: themeColors.colors,
};

export default function App() {

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const rootReducer = combineReducers({
    user: userReducer, // Rename to your existing reducer key

  });
  useEffect(() => {
    // Request permissions for push notifications
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to receive push notifications denied.');
      }
    };

    requestPermissions();
  }, []);

  const store = createStore(rootReducer);
  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);
  useEffect(() => {
    const subscription = subscribe();

    return () => {
      if (subscription) {
        subscription.remove();
        // Update the step count in the Redux state and database
        dispatch(updateStepCount(currentStepCount));
        // You can also make an API call to update the server with the new step count
        // For example: api.updateStepCount(currentStepCount);
      }
    };
  }, [currentStepCount]);

  // Run a background task every day at 23:59 to update the database
  useEffect(() => {
    const backgroundTask = async () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      // Update the step count in the Redux state and database
      dispatch(updateStepCount(currentStepCount));
      // You can also make an API call to update the server with the new step count
      // For example: api.updateStepCount(currentStepCount);
    };

    const backgroundTaskId = Notifications.addNotificationReceivedListener(async () => {
      // Background task logic
      await backgroundTask();
    });

    // Schedule the task to run every day at 23:59
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Step Count Update',
        body: 'Updating step count...',
      },
      trigger: {
        hour: 23,
        minute: 59,
        repeats: true,
      },
    });

    return () => {
      // Remove the listener and cancel the scheduled task when the component unmounts
      Notifications.removeNotificationSubscription(backgroundTaskId);
      Notifications.cancelAllScheduledNotificationsAsync();
    };
  }, [currentStepCount]);

  console.log("pedi",isPedometerAvailable)
  console.log("pedo last",pastStepCount)
  console.log("pedo curr",currentStepCount)
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Handle the received notification
        console.log('Notification received:', notification);
      }
    );
  
    return () => {
      if (notificationListener) {
        notificationListener.remove();
      }
    };
  }, []);
  

  return (
    <Provider store={store} accessibilityLabel="app-root">
      <PaperProvider theme={theme}>
        <MainContainer stepCount={currentStepCount} accessibilityLabel="main-root"/>
        {/* <StepCountBackground /> */}
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
