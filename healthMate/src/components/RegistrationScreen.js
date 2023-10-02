import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'; // Import Yup for validation
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function RegistrationScreen() {
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
    // Implement registration logic here
    // For example, validate and submit the registration data
    // You can add validation checks and registration API calls here
    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Successful login
        Alert.alert('Signup Successful', 'You are now logged in.');
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

          <TextInput
            label="Last Name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            style={{ marginVertical: 10 }}
          />
   <TextInput
            label="Phone"
            value={values.phone}
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            style={{ marginVertical: 10 }}
          />

          <TextInput
            label="Email"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={{ marginVertical: 10 }}
          />

       
          <TextInput
            label="Password"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            secureTextEntry={true}
            style={{ marginVertical: 10 }}
          />

          <TextInput
            label="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            secureTextEntry={true}
            style={{ marginVertical: 10 }}
          />

          {touched.password && errors.password && (
            <Text style={{ color: 'red' }}>{errors.password}</Text>
          )}

          {touched.confirmPassword && errors.confirmPassword && (
            <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
          )}

          <Button mode="contained" onPress={handleSubmit}>
            Register
          </Button>
        </View>
      )}
    </Formik>
  );
}

export default RegistrationScreen;
