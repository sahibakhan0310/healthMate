// session.js

import AsyncStorage from '@react-native-async-storage/async-storage';

// Store user session data
export const storeUserSession = async (userData) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('userSession', jsonValue);
  } catch (error) {
    console.error('Error storing user session:', error);
  }
};

// Retrieve user session data
export const getUserSession = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userSession');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving user session:', error);
    return null;
  }
};

// Clear user session data
export const clearUserSession = async () => {
  try {
    await AsyncStorage.removeItem('userSession');
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};
