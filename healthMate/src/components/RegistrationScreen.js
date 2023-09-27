import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View } from 'react-native';

function RegistrationScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Implement registration logic here
    // For example, validate and submit the registration data
    // You can add validation checks and registration API calls here
    console.log('Registration data:', {
      firstName,
      lastName,
      email,
      phone,
      password,
    });
  };

  return (
    <View style={{ margin: 20 }}>
      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={{ marginVertical: 10 }}
      />

      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={{ marginVertical: 10 }}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ marginVertical: 10 }}
      />

      <TextInput
        label="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
        style={{ marginVertical: 10 }}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={{ marginVertical: 10 }}
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry={true}
        style={{ marginVertical: 10 }}
      />

      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
    </View>
  );
}

export default RegistrationScreen;
