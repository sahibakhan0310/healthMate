import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';

const WaterIntakeScreen = () => {
  const [waterQuantity, setWaterQuantity] = useState(0); // Initialize with 0
  const maxWaterQuantity = 4000; // Maximum water quantity in milliliters (4 liters)

  const increaseWater = () => {
    if (waterQuantity < maxWaterQuantity) {
      setWaterQuantity(waterQuantity + 250); // Increment by 250 ml
    }
  };

  const decreaseWater = () => {
    if (waterQuantity > 0) {
      setWaterQuantity(waterQuantity - 250); // Decrement by 250 ml
    }
  };

  // Sample data for the weekly intake bar graph
  const weeklyIntakeData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [1800, 2200, 2600, 1400, 3000, 2800, 3500], // Sample values for each day
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Bottle-shaped filler */}
      {/* Add your bottle-shaped filler component here */}

      {/* Water quantity counter */}
      <View style={styles.waterCounter}>
        <TouchableOpacity onPress={increaseWater}>
          <Text style={styles.button}>+</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{waterQuantity / 1000} L</Text>
        <TouchableOpacity onPress={decreaseWater}>
          <Text style={styles.button}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Weekly intake bar graph */}
      <View style={styles.barGraph}>
        <BarChart
          data={weeklyIntakeData}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue bars
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black labels
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  waterCounter: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
  },
  button: {
    fontSize: 36,
    color: 'blue',
  },
  quantity: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  barGraph: {
    alignItems: 'center',
    marginTop: 32,
  },
});

export default WaterIntakeScreen;
