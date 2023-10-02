import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EntryPage from './components/EntryPage'; // Import your EntryPage component
import LoginScreen from './components/loginScreen';
import RegistrationScreen from './components/RegistrationScreen'

const Stack = createStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Your styles here
});

export default MainContainer;
