import React from 'react';
import { TextInput, Button,Text } from 'react-native-paper';
import { View,Alert } from 'react-native';

function EntryPage() {
    const handleSubmit=(e)=>{
        if(e.target.value=="login"){
            
        }

    }
  return (
   <View>
     <Button mode="contained" value="login" onPress={(e)=>handleSubmit(e)}>
            Login
          </Button>
          <Button mode="contained" value="signup" onPress={(e)=>handleSubmit(e)}>
            Sign Up
          </Button>
   </View>
  )
}

export default EntryPage