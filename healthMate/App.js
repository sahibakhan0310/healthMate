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
  console.log("pedi",isPedometerAvailable)
  console.log("pedo last",pastStepCount)
  console.log("pedo curr",currentStepCount)

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <MainContainer stepCount={currentStepCount} />
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
