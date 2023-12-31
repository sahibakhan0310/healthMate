import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ErrorScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Error</Text>
      {/* Display an error message */}
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

export default ErrorScreen;
