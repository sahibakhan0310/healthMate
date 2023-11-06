import React, { useEffect, useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native'; // Import ImageBackground
import * as Animatable from 'react-native-animatable';
import * as Font from 'expo-font';

const SplashScreenComponent = () => {
  const fadeAnimRef = useRef(null);

  async function loadFonts() {
    await Font.loadAsync({
      'SF-Pro-Display-Bold': require('../../assets/fonts/SF-Pro-Display-Bold.otf'), // Correct font name
    });
  }

  useEffect(() => {
    // Load fonts when the component mounts
    loadFonts().then(() => {
      // Start the fade-in animation when fonts are loaded
      // if (fadeAnimRef.current) {
      //   fadeAnimRef.current.fadeIn(2000); // Adjust the duration as needed
      // }
    });
  }, []);

  return (
    <ImageBackground // Use ImageBackground to set the background image
      source={require('../../assets/bg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Animatable.Image
          ref={fadeAnimRef}
          animation="fadeIn"
          duration={2000}
          source={require('../../assets/bg.jpg')} // Replace with your logo
          style={styles.logo}
        />
        <Text style={[styles.text, { fontFamily: 'SF-Pro-Display-Bold',fontWeight: 'medium' }]}>
          HealthMate
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain' as per your preference
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'SF-Pro-Display-Bold',
    color: 'black',
  },
});

export default SplashScreenComponent;
