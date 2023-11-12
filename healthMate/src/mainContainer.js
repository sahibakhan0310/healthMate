import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import LandingScreen from './components/LandingScreen';
import WaterIntakeScreen from './components/WaterIntakeScreen';
import DrawerMenu from './components/DrawerMenu';
import { clearUserSession } from './session';
import WorkOutScreen from './components/WorkOutScreen';
import YouTubeScreen from './components/YouTubeScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainContainer = ({ theme }) => {
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
    return <SplashScreenComponent theme={theme} />;
  }

  return (
    <NavigationContainer accessibilityLabel="main-container">
      <Drawer.Navigator
         initialRouteName="MainContainer"
         screenOptions={{ headerShown: false }} 
        drawerContent={(props) => <DrawerMenu {...props} />}
      >
        <Drawer.Screen name="StackScreens" screenOptions={{
              headerShown: false
            }}>
          {() => (
            <Stack.Navigator initialRouteName="EntryPage" >
              <Stack.Screen name="EntryPage" component={EntryPage} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
              <Stack.Screen name="Success" component={Success} />
              <Stack.Screen name="UserProfile" component={UserProfileScreen} />
              <Stack.Screen name="LandingScreen" component={LandingScreen} />
              <Stack.Screen name="FitnessDashboard" component={FitnessDashboard} />
              <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
              <Stack.Screen name="WaterIntakeScreen" component={WaterIntakeScreen} />
              <Stack.Screen name="WorkOutScreen" component={WorkOutScreen} />
              <Stack.Screen name="YouTubeScreen" component={YouTubeScreen} />
            </Stack.Navigator>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default MainContainer;
