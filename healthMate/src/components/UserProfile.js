import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TextInput,Alert } from 'react-native';
import { Button,useTheme,Switch } from 'react-native-paper';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-message'; 
import { useNavigation } from '@react-navigation/native';

//import WheelPicker from 'react-native-wheel-picker';

///*** implement get api to retrieve user id from users tables and send it in form */

function ProfileScreen({ user }) {
  const [userID,setUserID]=useState();
  const navigation = useNavigation();
  const theme = useTheme();
  const [initialWaterReminder, setInitialWaterReminder] = useState(user?.water_reminder === 1);
  console.log(user)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3000/api/users', {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       if (response.ok) {
  //         // Successful API response
  //         const data = await response.json();

  //         if (data && data.userID) {
  //           // Set the userID in your component state
  //           setUserID(data.userID);
  //         } else {
  //           // Handle the case where userID is not present in the API response
  //           Alert.alert('UserID not found');
  //         }
  //       } else {
  //         // Handle the case where the API request failed
  //         Alert.alert('Cannot retrieve userID');
  //       }
  //     } catch (error) {
  //       console.error('Cannot retrieve userID:', error);
  //       Alert.alert('Cannot retrieve userID');
  //     }
  //   };

  //   // Call the fetchData function when the component mounts
  //   fetchData();
  // }, []);
  const initialValues = {
    user_id:user?.user_id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    height: user?.height,
    weight: user?.weight,
    step: user?.step_count,
    waterReminder: initialWaterReminder,
    waterInterval: '1',
  };
  const isInteger = (value) => {
    return /^[0-9]+$/.test(value);
  };
  const [selectedHeightIndex, setSelectedHeightIndex] = useState(3); // Default height index (5'3")
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(170); // Default weight (170 lbs)

  const heightValues = [
    '4',
    '4\'1"',
    '4\'2"',
    '4\'3"',
    '4\'4"',
    '4\'5"',
    '4\'6"',
    '4\'7"',
    '4\'8"',
    '4\'9"',
    '4\'10"',
    '4\'11"',
    '5',
    '5\'1"',
    '5\'2"',
    '5\'3"',
    '5\'4"',
    '5\'5"',
    '5\'6"',
    '5\'7"',
    '5\'8"',
    '5\'9"',
    '5\'10"',
    '5\'11"',
    '6',
    '6\'1"',
    '6\'2"',
    '6\'3"',
    '6\'4"',
    '6\'5"',
    '6\'6"',
    '6\'7"',
    '6\'8"',
    '6\'9"',
    '6\'10"',
    '6\'11"',
    '7',
    '7\'1"',
    '7\'2"',
    '7\'3"',
    '7\'4"',
    '7\'5"',
    '7\'6"',
    '7\'7"',
    '7\'8"',
    '7\'9"',
    '7\'10"',
    '7\'11"',
  ];

  const weightValues = Array.from({ length: 250 }, (_, i) => String(i + 50)); // Weight values from 50 to 299 lbs
  const handleRegister = async (values) => {
    try {
      values.weight = parseInt(values.weight); // Parse weight as an integer
      values.step = parseInt(values.step); // Parse step as an integer
      values.waterReminder = values.waterReminder ? 1 : 0;
  
      const { ...rest } = values;

      const profileData = { ...rest };
      console.log(profileData);

      // Continue with your registration logic
      const response = await fetch(`http://localhost:3000/api/details?user_id=${user.user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        // Successful registration
        console.log('update successful');
        // Show a success banner
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Update Successful',
          visibilityTime: 3000, // Adjust the duration as needed
        });
        navigation.navigate('Success');
      } else {
        // Failed registration
        Alert.alert('update Failed', 'An error occurred while updating.');
      }
    } catch (error) {
      console.error('Update error:', error);
      Alert.alert('update Error', 'An error occurred while updating.');
    }
  };
  const handleSubmit = (values) => {
    // Implement logic to save profile data
    handleRegister(values);
  };
  
  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>Edit Profile</Text> */}
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <>
            <Text style={styles.label}>First Name</Text>
            <Text style={styles.text}>{values.firstName}</Text>

            <Text style={styles.label}>Last Name</Text>
            <Text style={styles.text}>{values.lastName}</Text>

            {/* <Text style={styles.label}>Email</Text>
            <Text style={styles.text}>{values.email}</Text>

            <Text style={styles.label}>Phone</Text>
            <Text style={styles.text}>{values.phone}</Text> */}

            <Text style={styles.label}>Height (feet)</Text>
            <TextInput
              placeholder="Height (feet)"
              value={values.height}
              onChangeText={(text) => {
                if (isInteger(text)) {
                  handleChange('height')(text);
                }
              }}
              onBlur={handleBlur('height')}
              style={styles.input}
            />

            <Text style={styles.label}>Weight (lbs)</Text>
            <TextInput
              placeholder="Weight (lbs)"
              value={values.weight}
              onChangeText={(text) => {
                if (isInteger(text)) {
                  handleChange('weight')(text);
                }
              }}
              onBlur={handleBlur('weight')}
              style={styles.input}
            />

<Text style={styles.label}>Daily Step Goal</Text>
            <TextInput
              placeholder="Daily step goal"
              value={values.step}
              onChangeText={(text) => {
                if (isInteger(text)) {
                  handleChange('step')(text);
                }
              }}
              onBlur={handleBlur('step')}
              style={styles.input}
            />
<Text style={styles.label}>Water Reminder</Text>
            <View style={styles.toggleContainer}>
              <Text>Off</Text>
              <Switch
                value={values.waterReminder}
                onValueChange={(value) => setFieldValue('waterReminder', value)}
              />
              <Text>On</Text>
            </View>
            {/* Add more input fields here */}
            <Button mode="contained" onPress={handleSubmit}>
              Save
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user.userDetails,
  };
};
export default connect(mapStateToProps)(ProfileScreen);