import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const CustomDrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>My App</Text>
      </View>
      <DrawerItem
        label="Home"
        onPress={() => {
          navigation.navigate('LandingScreen');
        }}
      />
      <DrawerItem
        label="Fitness Dashboard"
        onPress={() => {
          navigation.navigate('FitnessDashboard');
        }}
      />
      <DrawerItem
        label="UserProfile"
        onPress={() => {
          navigation.navigate('UserProfile');
        }}
      />
      <DrawerItem
        label="Water Intake"
        onPress={() => {
          navigation.navigate('WaterIntakeScreen');
        }}
      />
      <DrawerItem
        label="Settings"
        onPress={() => {
          navigation.navigate('SettingsScreen');
        }}
      />
      <DrawerItem
        label="Logout"
        onPress={() => {
          // Implement your logout logic here
        }}
      />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const CustomDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="LandingScreen"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* Your existing screens */}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomDrawerNavigator;
