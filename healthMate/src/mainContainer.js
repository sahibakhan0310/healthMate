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
import LandingScreen from './components/LandingScreen';
import WaterIntakeScreen from './components/WaterIntakeScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerNavigator from './components/CustomDrawerNavigator';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
       <Drawer.Navigator
        initialRouteName="EntryPage"
        drawerContent={(props) => <CustomDrawerNavigator {...props} />} // Use your custom drawer content
      >
        <Drawer.Screen name="EntryPage" component={EntryPage} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Registration" component={RegistrationScreen} />
        <Drawer.Screen name="Success" component={Success} />
        <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
        <Drawer.Screen name="LandingScreen" component={LandingScreen} />
        <Drawer.Screen name="FitnessDashboard" component={FitnessDashboard} />
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
        <Drawer.Screen name="WaterIntakeScreen" component={WaterIntakeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});



export default MainContainer;
