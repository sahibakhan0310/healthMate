import React, { useEffect } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import * as Font from 'expo-font';

const Success = ({ navigation, route }) => {
  const rotateValue = new Animated.Value(0);

  async function loadFonts() {
    await Font.loadAsync({
      'SF-Pro-Display-Bold': require('../../assets/fonts/SF-Pro-Display-Bold.otf'),
    });
  }

  useEffect(() => {
    // Load fonts when the component mounts
    loadFonts().then(() => {
      // Animate the rotation of the checkmark icon when fonts are loaded
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Function to determine the next screen based on the previous screen
  const navigateToNextScreen = () => {
    const previousScreen = route.params?.previousScreen;
    console.log(route)
    if (previousScreen === 'SignUp') {
      navigation.replace('UserProfile');
    } else if (previousScreen === 'UserProfile') {
      navigation.replace('FitnessDashboard');
    } else {
      // Handle other previous screens or add a default behavior
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <AntDesign name="checkcircle" size={150} color="green" />
      </Animated.View>
      <Text style={{ marginTop: 20, fontSize: 24, fontFamily: 'SF-Pro-Display-Bold' }}>
        Sign Up Successful!
      </Text>
      <Button
        mode="contained"
        onPress={navigateToNextScreen}
        style={styles.button}
        labelStyle={{ fontFamily: 'SF-Pro-Display-Bold' }}
      >
        Continue
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default Success;
