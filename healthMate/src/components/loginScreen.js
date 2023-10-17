import { React, useEffect, useState } from 'react';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { View, Alert, StyleSheet, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'; // Import Yup for validation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import * as Font from 'expo-font'; // Import Animatable
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { addUserDetails } from '../actions/userActions';

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const bcrypt = require('bcryptjs');
  const [userDetails, setUserDetails] = useState({});
  const dispatch = useDispatch();
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
  const theme = useTheme();
  // Define the initial form values
  const initialValues = {
    email: '',
    password: '',
  };

  // Define a validation schema using Yup
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const getUserDetails = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/userdetails?user_id=${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Successful
        const data = await response.json();

        // Now you can work with the data, e.g., update your app's state or UI
        console.log("here data",data)
        dispatch(addUserDetails(data));

        setUserDetails(data);
        navigation.navigate('FitnessDashboard');
      } else {
        // Failed registration

        Alert.alert('Login Failed', 'An error occurred while registering.');
      }
    } catch (error) {
      console.error('login error:', error);
      Alert.alert('login Error', 'An error occurred while registering.');
    }
  };
  const getUserProfileDetails = async (user_id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users?user_id=${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Successful
        const data = await response.json();

        // Now you can work with the data, e.g., update your app's state or UI

        dispatch(addUserName(data));

        //setUserDetails(data);
      } else {
        // Failed registration

        Alert.alert('Login Failed', 'An error occurred while registering.');
      }
    } catch (error) {
      console.error('login error:', error);
      Alert.alert('login Error', 'An error occurred while registering.');
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      // Send the email and password to the server
      const requestData = {
        email: values.email,
        password: values.password,
      };
      //console.log(password)
      fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then(async (response) => {
          if (response.ok) {
            // Successful login
            const data = await response.json();
            console.log("after login", data.user_id);
            getUserDetails(data.user_id);
            

          } else {
            // Failed login
            Alert.alert('Login Failed', 'Invalid email or password.');
          }
        })
        .catch((error) => {
          console.error('Login error:', error);
          Alert.alert('Login Error', 'An error occurred while logging in.');
        });
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'An error occurred while logging in.');
    }
  };

  return (
    <><ImageBackground
      source={require('../../assets/bg.jpg')} // Provide the path to your background image
      style={styles.backgroundImage}><Animatable.View animation="fadeIn" duration={1000} style={styles.container}>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <TextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.input}
                theme={theme} // Use the theme for the TextInput
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    <Icon name="alert-circle" size={16} color="#FF0000" /> {errors.email}
                  </Text>
                </View>
              )}

              <TextInput
                label="Password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={true}
                style={styles.input}
                theme={theme} // Use the theme for the TextInput
                autoCapitalize="none"
              />
              {touched.password && errors.password && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    <Icon name="alert-circle" size={16} color="#FF0000" /> {errors.password}
                  </Text>
                </View>
              )}

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.button}
                theme={theme} // Use the theme for the Button
              >
                Login
              </Button>
            </View>
          )}
        </Formik>
      </Animatable.View></ImageBackground></>
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
    fontWeight: '500',
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

export default LoginScreen;
