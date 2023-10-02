import React, { useEffect } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // You may need to install the 'expo-vector-icons' package

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
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <AntDesign name="checkcircle" size={100} color="green" />
      </Animated.View>
      <Text style={{ marginTop: 20, fontSize: 20 }}>Sign Up Successful!</Text>
    </View>
  );
};

export default Success;
