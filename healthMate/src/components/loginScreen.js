import React from 'react';
import { TextInput,Button } from 'react-native-paper';
import { View } from 'react-native';

function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState(''); // Corrected the variable name

  return (
    <View>
      <TextInput
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={{ margin: 15 }}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)} // Corrected the variable name
        style={{ margin: 15 }}
      />
       <Button  mode="contained" onPress={() => console.log('Pressed')}>
    Login
  </Button>
    </View>
  );
}

export default LoginScreen;
