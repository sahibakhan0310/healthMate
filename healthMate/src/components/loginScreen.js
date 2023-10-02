import React from 'react';
import { TextInput, Button,Text } from 'react-native-paper';
import { View,Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'; // Import Yup for validation
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const LoginScreen = () => {
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

  // Handle form submission
  const handleSubmit = async (values) => {
    // Here, you can perform any actions with the form values (e.g., API request)
    console.log('Form values:', values);
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Successful login
        Alert.alert('Login Successful', 'You are now logged in.');
      } else {
        // Failed login
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Error', 'An error occurred while logging in.');
    }
  };

  return (
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
            style={{ margin: 15 }}
          />
          {touched.email && errors.email && (
            <Text style={{ color: 'red' }}>{errors.email}</Text>
          )}

          <TextInput
            label="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry={true}
            style={{ margin: 15 }}
          />
          {touched.password && errors.password && (
            <Text style={{ color: 'red' }}>{errors.password}</Text>
          )}

          <Button mode="contained" onPress={handleSubmit}>
            Login
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;
