import React, { useState,useEffect } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Alert, StyleSheet,ImageBackground,Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'; // Import Yup for validation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Success from './Success';
import * as Animatable from 'react-native-animatable'; 
import * as Font from 'expo-font';// Import Animatable
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function RegistrationScreen({navigation}) {

  async function loadFonts() {
    await Font.loadAsync({
      'SF-Pro-Display-Bold': require('../../assets/fonts/SF-Pro-Display-Bold.otf'),
    });
  }
  useEffect(() => {
    // Load fonts when the component mounts
    loadFonts().then(() => {
      // Start the fade-in animation when fonts are loaded
      // if (fadeAnimRef.current) {
      //   fadeAnimRef.current.fadeIn(1000); // Adjust the duration as needed
      // }
    });
  }, []);
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  };

  // Define a validation schema using Yup
  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleRegister = async (values) => {
    try {
      const { ...rest } = values;

      // Create a new object without the password
      const registrationData = { ...rest };
      console.log(registrationData)

      // Continue with your registration logic
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        // Successful registration
        console.log('Registration successful');
        navigation.navigate('Success', { previousScreen: 'Registration' });

      } else {
        // Failed registration
        Alert.alert('Registration Failed', 'An error occurred while registering.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration Error', 'An error occurred while registering.');
    }
  };
  

  return (
    <><ImageBackground
    source={require('../../assets/bg.jpg')} // Provide the path to your background image
    style={styles.backgroundImage}>
      <Animatable.View animation="fadeIn" duration={1000} style={styles.container}>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleRegister}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={{ margin: 20 }}>
          <TextInput
            label="First Name"
            value={values.firstName}
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            style={{ marginVertical: 10 }}
          />
 {touched.firstName && errors.firstName && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    <Icon name="alert-circle" size={16} color="#FF0000" /> {errors.firstName}
                  </Text>
                </View>
              )}
          <TextInput
            label="Last Name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            style={{ marginVertical: 10 }}
          />
           {touched.lastName && errors.lastName && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    <Icon name="alert-circle" size={16} color="#FF0000" /> {errors.lastName}
                  </Text>
                </View>
              )}
   <TextInput
            label="Phone"
            value={values.phone}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            style={{ marginVertical: 10 }}
          />
 {touched.phone && errors.phone && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    <Icon name="alert-circle" size={16} color="#FF0000" /> {errors.phone}
                  </Text>
                </View>
              )}
          <TextInput
            label="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={{ marginVertical: 10 }}
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
            style={{ marginVertical: 10 }}
          />
 {touched.password && errors.password && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    <Icon name="alert-circle" size={16} color="#FF0000" /> {errors.password}
                  </Text>
                </View>
              )}
          <TextInput
  label="Confirm Password"
  value={values.confirmPassword}
  onChangeText={handleChange('confirmPassword')}
  onBlur={handleBlur('confirmPassword')}
  secureTextEntry={true}
  style={{ marginVertical: 10 }}
/>
{touched.confirmPassword && errors.confirmPassword && (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>
      <Icon name="alert-circle" size={16} color="#FF0000" /> {errors.confirmPassword}
    </Text>
  </View>
)}

     
           
          

          <Button mode="contained" onPress={handleSubmit} style={styles.button}>
            Register
          </Button>
        </View>
      )}
    </Formik>
    </Animatable.View>
    </ImageBackground>
    </>
  );
}
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
  errorContainer: {
    alignSelf: 'flex-start', // Add this property to make the background cover only the text width
    backgroundColor: 'white',
  paddingRight:10,

    borderRadius: 5,

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
export default RegistrationScreen;