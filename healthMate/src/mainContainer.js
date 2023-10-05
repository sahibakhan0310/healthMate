import React from 'react';
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

const Stack = createNativeStackNavigator();

const MainContainer = () => {
  const theme = useTheme();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default MainContainer;
