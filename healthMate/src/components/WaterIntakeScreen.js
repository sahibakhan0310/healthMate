import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';
import * as Font from 'expo-font'; 

const WaterIntakeScreen = ({ user }) => {
  const [waterQuantity, setWaterQuantity] = useState(0);
  const [intakeLimit, setIntakeLimit] = useState(null);
  const [showSetIntake, setShowSetIntake] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [currentIntake, setCurrentIntake] = useState(0); 

  // const increaseWater = () => {
  //   if (waterQuantity < maxWaterQuantity) {
  //     const newWaterQuantity = waterQuantity + 250;
  //     setWaterQuantity(newWaterQuantity);
  //     setCurrentIntake(newWaterQuantity); // Update current intake when increasing
  //   }
  // };

  // const decreaseWater = () => {
  //   if (waterQuantity > 0) {
  //     const newWaterQuantity = waterQuantity - 250;
  //     setWaterQuantity(newWaterQuantity);
  //     setCurrentIntake(newWaterQuantity); // Update current intake when decreasing
  //   }
  // };
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
  const maxWaterQuantity = 4000;

  const increaseWater = () => {
    if (waterQuantity < maxWaterQuantity) {
      setWaterQuantity(waterQuantity + 250);
    }
  };

  const decreaseWater = () => {
    if (waterQuantity > 0) {
      setWaterQuantity(waterQuantity - 250);
    }
  };

  const viewGraph = () =>{
    setShowGraph(!showGraph);
  }
  const fetchWaterReminder = async () => {
    // Replace this with your API endpoint to check if water reminder exists for the user
    const response = await fetch(`http://localhost:3000/api/water_reminder?user_id=${user.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data[0])
      if (data[0].intake_target) {
        console.log("here")
        setIntakeLimit(data[0].intake_target);
        setCurrentIntake(data[0].current_intake)
        setShowSetIntake(false);
      } else {
        setShowSetIntake(true);
      }
    } else {
      // Handle error
      console.error('Error fetching water reminder:', response.status);
    }
  };

  const setWaterReminder = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/set_water_reminder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.user_id, intake_limit: parseInt(intakeLimit) }),
      });
  
      if (response.ok) {
        setShowSetIntake(false);
        Alert.alert('Water Intake Set', 'Your water intake target has been set successfully.');
      } else {
        // Handle error
        console.error('Error setting water reminder:', response.status);
      }
    } catch (error) {
      console.error('Error setting water reminder:', error);
    }
  };

  const setWaterIntake = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/add_water_intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.user_id, current_intake: parseInt(currentIntake) }),
      });

      if (response.ok) {
        setShowSetIntake(false);
        Alert.alert('Water Intake Set', 'Your water current intake has been set successfully.');
      } else {
        console.error('Error setting current intake:', response.status);
      }
    } catch (error) {
      console.error('Error setting current intake:', error);
    }
  };
  

  useEffect(() => {
    fetchWaterReminder();
  }, []);

  const weeklyIntakeData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [1800, 2200, 2600, 1400, 3000, 2800, 3500],
      },
    ],
  };
console.log(showSetIntake)
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/bottle.png')} style={styles.bottleImage} />

      <View style={styles.waterCounter}>
        <TouchableOpacity onPress={decreaseWater} style={styles.counterButton}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{waterQuantity / 1000} L</Text>
        <TouchableOpacity onPress={increaseWater} style={styles.counterButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.barGraph}>
        {showSetIntake ? (
          <View style={styles.setIntakeContainer}>
            <Text style={styles.setIntakeLabel}>Set Your Water Intake Target</Text>
            <TextInput
              placeholder="Enter target in mL"
              keyboardType="numeric"
              style={styles.setIntakeInput}
              onChangeText={(text) => setIntakeLimit(text)}
            />
            <Button mode="contained" onPress={setWaterReminder} style={styles.setIntakeButton}>
              Set Intake
            </Button>
          </View>
        ) : (
          <>
            <View style={styles.statsContainer}>
              <Text style={styles.statsLabel}>Intake Target: {intakeLimit} mL</Text>
              <Text style={styles.statsLabel}>Current Intake: {waterQuantity} mL</Text>
            </View>
            <Button mode="contained" onPress={setWaterIntake} style={styles.actionButton}>
              Set Current Intake
            </Button>
            <Button mode="contained" onPress={viewGraph} style={styles.actionButton}>
              View Weekly Stats
            </Button>
          </>
        )}
        {showGraph && (
          <BarChart
          data={weeklyIntakeData}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
        />
        )}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    fontFamily: 'SF-Pro-Display-Bold'
  },
  bottleImage: {
    width: 200,
    height: 400,
    alignSelf: 'center',
    marginTop: 32,
  },
  waterCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  counterButton: {
    backgroundColor: 'lightblue',
    padding: 16,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'SF-Pro-Display-Bold'
  },
  quantity: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  barGraph: {
    alignItems: 'center',
    marginTop: 32,
  },
  setIntakeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  setIntakeLabel: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'SF-Pro-Display-Bold'
  },
  setIntakeInput: {
    width: 200,
    marginBottom: 16,
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  setIntakeButton: {
    backgroundColor: 'blue',
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statsLabel: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'SF-Pro-Display-Bold'
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.user.userDetails,
  };
};
export default connect(mapStateToProps)(WaterIntakeScreen);
