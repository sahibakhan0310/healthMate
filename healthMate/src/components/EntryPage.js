import { useEffect, React } from 'react';
import { Button, useTheme } from 'react-native-paper';
import { View, StyleSheet, Image, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';




function EntryPage({ theme }) {
  const navigation = useNavigation();
  useEffect(() => {
    const scheduleTestNotification = async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Test Notification',
          body: 'This is a test notification.',
        },
        trigger: {
          seconds: 20, // Schedule the notification after 5 seconds for testing
        },
      });
    };

    scheduleTestNotification();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/bg.jpg')} // Provide the path to your background image
        style={styles.backgroundImage}
      />
      <Animatable.View animation="slideInLeft" duration={1000} style={styles.content}>
        <Text style={[styles.title, { fontFamily: 'SF-Pro-Display-Bold', color:"#fff" }]}>
          HealthMate
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
          labelStyle={{ fontFamily: 'SF-Pro-Display-Bold' }}
        >
          Login
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Registration')}
          style={styles.button}
          labelStyle={{ fontFamily: 'SF-Pro-Display-Bold' }}
        >
          Sign Up
        </Button>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' as needed
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align content to the left
    paddingLeft: 20, // Adjust as needed for margin from the left edge
  },
  title: {
    fontSize: 36,
    color: 'black',
  },
  button: {
    marginVertical: 10,
    width: '80%', // Adjust button width as needed
  },
});

export default EntryPage;
