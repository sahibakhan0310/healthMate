import React, { useEffect } from 'react';
import { View, Text, Animated, Easing,Alert , StyleSheet,ImageBackground} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // You may need to install the 'expo-vector-icons' package
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable'; 
import * as Font from 'expo-font';// Import Animatable
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import the Button component

const Success = ({ navigation }) => {
  const rotateValue = new Animated.Value(0);
  async function loadFonts() {
    await Font.loadAsync({
      'SF-Pro-Display-Bold': require('../../assets/fonts/SF-Pro-Display-Bold.otf'),
    });
  }
  useEffect(() => {
    // Load fonts when the component mounts
    loadFonts().then(() => {
      // Start the fade-in animation when fonts are loaded
      if (fadeAnimRef.current) {
        fadeAnimRef.current.fadeIn(1000); // Adjust the duration as needed
      }
    });
  }, []);
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
    <><ImageBackground
    source={require('../../assets/bg.jpg')} // Provide the path to your background image
    style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text>"helloo"</Text>

      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <AntDesign name="checkcircle" size={100} color="green" />

      </Animated.View>
      <Text style={{ marginTop: 20, fontSize: 20 }}>Sign Up Successful!</Text>
      <Button mode="contained" onPress={() => navigation.replace('UserProfile')} style={styles.button}
                theme={theme}>
        Continue
      </Button>
    </View>
</ImageBackground>
</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginVertical: 10,
    fontFamily: 'SF-Pro-Display-Bold', // Set 'SF-Pro' font for TextInput
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    fontWeight:'500',
    fontFamily: 'SF-Pro-Display-Bold',
  },
  button: {
    marginTop: 20,
    fontFamily: 'SF-Pro-Display-Bold', // Set 'SF-Pro' font for Button
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'center' or other options
  },
});

export default Success;
