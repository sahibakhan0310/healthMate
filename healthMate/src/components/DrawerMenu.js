import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { clearUserSession } from '../session';
import { connect } from 'react-redux';

const DrawerMenu = ({ navigation, user }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const handleLogout = () => {
    clearUserSession();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>{user.first_name} {user.last_name}</Text>
        <TouchableOpacity onPress={() => navigateToScreen('UserProfile')}>
        <Text style={styles.editProfile}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuItems}>
        <TouchableOpacity onPress={() => navigateToScreen('LandingScreen')}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('FitnessDashboard')}>
          <Text style={styles.menuItem}>Fitness Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('WaterIntakeScreen')}>
          <Text style={styles.menuItem}>Water Intake</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('WorkOutScreen')}>
          <Text style={styles.menuItem}>Workouts</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
  
      </View>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 100,
    backgroundColor: '#dfc9f5',
  },
  header: {
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#394240',
  },
  editProfile: {
    fontSize: 14,
    color: '#394240',
  },
  menuItems: {
    marginBottom: 50,
  },
  menuItem: {
    fontSize: 18,
    marginBottom: 30,
    color: '#394240',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  logout: {
    fontSize: 18,
    color: '#E74C3C',
    marginTop: 'auto',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.userDetails,
  };
};

export default connect(mapStateToProps)(DrawerMenu);
