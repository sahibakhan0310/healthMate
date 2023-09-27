import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function UserProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>User Profile</Text>
      {/* Display user profile data */}
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

export default UserProfileScreen;
