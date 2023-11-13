import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomDrawerNavigator from './CustomDrawerNavigator';

test('navigates to LandingScreen when Home is pressed', () => {
  const { getByText, getByTestId } = render(<CustomDrawerNavigator />);
  fireEvent.press(getByText('Home'));

  // Assertion: Check if the navigation was successful
  expect(getByTestId('landing-screen')).toBeTruthy();
});

test('navigates to FitnessDashboard when Fitness Dashboard is pressed', () => {
  const { getByText, getByTestId } = render(<CustomDrawerNavigator />);
  fireEvent.press(getByText('Fitness Dashboard'));

  // Assertion: Check if the navigation was successful
  expect(getByTestId('fitness-dashboard-screen')).toBeTruthy();
});

test('navigates to UserProfile when UserProfile is pressed', () => {
  const { getByText, getByTestId } = render(<CustomDrawerNavigator />);
  fireEvent.press(getByText('UserProfile'));

  // Assertion: Check if the navigation was successful
  expect(getByTestId('user-profile-screen')).toBeTruthy();
});

test('navigates to WaterIntakeScreen when Water Intake is pressed', () => {
  const { getByText, getByTestId } = render(<CustomDrawerNavigator />);
  fireEvent.press(getByText('Water Intake'));

  // Assertion: Check if the navigation was successful
  expect(getByTestId('water-intake-screen')).toBeTruthy();
});

test('navigates to SettingsScreen when Settings is pressed', () => {
  const { getByText, getByTestId } = render(<CustomDrawerNavigator />);
  fireEvent.press(getByText('Settings'));

  // Assertion: Check if the navigation was successful
  expect(getByTestId('settings-screen')).toBeTruthy();
});
