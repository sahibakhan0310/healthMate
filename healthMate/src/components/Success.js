import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SuccessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Success!</Text>
      {/* Display a success message */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SuccessScreen;
