import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryPage from './components/EntryPage';
import LoginScreen from './components/loginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import Success from './components/Success';
import UserProfileScreen from './components/UserProfile';
import FitnessDashboard from './components/FitnessDashboard';
import * as SplashScreen from 'expo-splash-screen';
import SplashScreenComponent from './components/SplashScreenComponent';
import * as Font from 'expo-font';
import SettingsScreen from './components/SettingsScreen';

const Stack = createNativeStackNavigator();

const MainContainer = ({theme}) => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  async function loadFonts() {
    await Font.loadAsync({
      'SF-Pro-Display-Bold': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
    });
  }

  useEffect(() => {
    loadFonts().then(() => {
      SplashScreen.preventAutoHideAsync()
        .then(() => {
          setTimeout(async () => {
            SplashScreen.hideAsync()
              .then(() => {
                setSplashVisible(false);
              })
              .catch(error => {
                console.warn('SplashScreen.hideAsync error:', error);
              });
          }, 10000);
        })
        .catch(error => {
          console.warn('SplashScreen.preventAutoHideAsync error:', error);
        });
    });
  }, []);
  if (isSplashVisible) {
    // Render a splash screen component here (e.g., an image or animation).
    // You can use Expo's AppLoading component or a custom solution.
    return <SplashScreenComponent theme={theme} />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EntryPage">
        <Stack.Screen
          name="EntryPage"
          component={EntryPage}
          options={{ title: 'Entry Page' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: 'Registration' }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{ title: 'Success' }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{ title: 'UserProfile' }}
        />
        <Stack.Screen
          name="FitnessDashboard"
          component={FitnessDashboard}
          options={{ title: 'FitnessDashboard' }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: 'SettingsScreen' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});



export default MainContainer;
