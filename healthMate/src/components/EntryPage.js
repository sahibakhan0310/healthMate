import React from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function EntryPage({ navigation }) {
  return (
    <View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        // Remove the "label" prop, as it's not needed
      >
        Login
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Registration')}
        // Remove the "label" prop, as it's not needed
      >
        Sign Up
      </Button>
    </View>
  );
}

export default EntryPage;
