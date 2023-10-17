import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CircularProgress = ({ percentage, size, strokeWidth, backgroundColor, progressColor, innerText, innerTextStyle }) => {
  // Calculate the circle's radius based on the provided size and stroke width
  const radius = (size - strokeWidth) / 2;
  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius;
  // Calculate the offset to create the progress effect
  const offset = ((100 - percentage) / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: size, height: size }]}>
        <View style={[styles.background, { width: size, height: size, borderColor: backgroundColor }]}>
          <View style={[styles.progress, { width: size, height: size, borderColor: progressColor, borderWidth: strokeWidth, borderLeftColor: 'transparent', borderBottomColor: 'transparent', transform: [{ rotate: `-${offset}rad` }] }]} />
        </View>
        <View style={styles.innerCircle}>
          <Text style={[styles.innerText, innerTextStyle]}>{innerText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  progressBar: {
    position: 'relative',
  },
  background: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
  },
  progress: {
    position: 'absolute',
    borderRadius: 999,
    borderWidth: 1,
  },
  innerCircle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  innerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CircularProgress;
