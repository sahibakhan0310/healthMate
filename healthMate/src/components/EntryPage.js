import React from 'react';
import { Button,useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();



function EntryPage() {
  const navigation = useNavigation(); 
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      >
        Login
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Registration')}
        style={styles.button}
      >
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff', // Change the background color as needed
  },
  button: {
    marginVertical: 10,
    width: '40%', // Make the buttons span the full width
  },
});

export default EntryPage;
