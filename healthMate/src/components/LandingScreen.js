import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LandingScreen = () => {
  const navigation = useNavigation();

  const navigateToFitness = () => {
    navigation.navigate('FitnessDashboard');
  };

  const navigateToWaterIntake = () => {
    navigation.navigate('WaterIntakeScreen');
  };

  const navigateToWorkouts = () => {
    navigation.navigate('WorkoutScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={navigateToFitness}>
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['#C39BD3', '#FF6347']}
            style={styles.card}
          >
            <View style={styles.cardContent}>
            <Image
        source={require('../../assets/running.png')} // Provide the path to your background image
        //style={styles.backgroundImage}
      />
              <Text style={styles.cardText}>Fitness Tracking</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToWaterIntake}>
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['#C39BD3', '#00BFFF']}
            style={styles.card}
          >
            <View style={styles.cardContent}>
            <Image
        source={require('../../assets/water.png')} // Provide the path to your background image
        //style={styles.backgroundImage}
      />
              <Text style={styles.cardText}>Water Intake</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToWorkouts}>
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['#C39BD3', '#58D68D']}
            style={styles.card}
          >
            <View style={styles.cardContent}>
            <Image
        source={require('../../assets/weights.png')} // Provide the path to your background image
        //style={styles.backgroundImage}
      />
              <Text style={styles.cardText}>Workouts</Text>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  cardContainer: {
    width: '100%',
  },
  card: {
    width: 400,
    height: 150,
    borderRadius: 10,
    marginVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'100%'
  },
  cardText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    padding:30,
    alignContent:'center'
  },
});

export default LandingScreen;
