import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import WheelPicker from 'react-native-wheel-picker';

///*** implement get api to retrieve user id from users tables and send it in form */

function ProfileScreen() {
  const [userID,setUserID]=useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Successful API response
          const data = await response.json();

          if (data && data.userID) {
            // Set the userID in your component state
            setUserID(data.userID);
          } else {
            // Handle the case where userID is not present in the API response
            Alert.alert('UserID not found');
          }
        } else {
          // Handle the case where the API request failed
          Alert.alert('Cannot retrieve userID');
        }
      } catch (error) {
        console.error('Cannot retrieve userID:', error);
        Alert.alert('Cannot retrieve userID');
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);
  const initialValues = {
    user_id:userID,
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    height: '5.3',
    weight: '170',
    step: '10000',
    waterReminder: false,
    waterInterval: '1',
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

  const handleSubmit = () => {
    // Implement logic to save profile data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Edit Profile</Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Text style={styles.label}>First Name</Text>
            <Text style={styles.text}>{values.firstName}</Text>

            <Text style={styles.label}>Last Name</Text>
            <Text style={styles.text}>{values.lastName}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.text}>{values.email}</Text>

            <Text style={styles.label}>Phone</Text>
            <Text style={styles.text}>{values.phone}</Text>

            <Text style={styles.label}>Height</Text>
            <WheelPicker
              style={styles.wheelPicker}
              isCurved
              data={heightValues}
              selectedItem={selectedHeightIndex}
              onItemSelected={(index) => setSelectedHeightIndex(index)}
            />
            <Text style={styles.text}>{heightValues[selectedHeightIndex]}</Text>

            <Text style={styles.label}>Weight</Text>
            <WheelPicker
              style={styles.wheelPicker}
              isCurved
              data={weightValues}
              selectedItem={selectedWeightIndex - 50} // Adjust for the offset
              onItemSelected={(index) => setSelectedWeightIndex(index + 50)} // Adjust for the offset
            />
            <Text style={styles.text}>{selectedWeightIndex} lbs</Text>

            <Text style={styles.label}>Daily Step Goal</Text>
            <TextInput
              placeholder="Daily step goal"
              value={values.step}
              onChangeText={handleChange('step')}
              onBlur={handleBlur('step')}
              style={styles.input}
            />

            {/* Add more input fields here */}
            <Button mode="contained" title="Save" onPress={handleSubmit} />
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
  wheelPicker: {
    width: 200,
    height: 150,
    alignSelf: 'center',
  },
});

export default function ProfileScreenWithTheme() {
  return (
    <PaperProvider>
      <ProfileScreen />
    </PaperProvider>
  );
}
