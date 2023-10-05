import React, { useEffect } from 'react';
import { View, Text, Animated, Easing,Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // You may need to install the 'expo-vector-icons' package
import { Button } from 'react-native-paper'; // Import the Button component

const Success = ({ navigation }) => {
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    // Animate the rotation of the checkmark icon
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>"helloo"</Text>

      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <AntDesign name="checkcircle" size={100} color="green" />

      </Animated.View>
      <Text style={{ marginTop: 20, fontSize: 20 }}>Sign Up Successful!</Text>
      <Button mode="contained" onPress={() => navigation.replace('UserProfile')}>
        Continue
      </Button>
    </View>
  );
};

export default Success;
