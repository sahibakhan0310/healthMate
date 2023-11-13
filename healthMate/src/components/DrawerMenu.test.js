import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import DrawerMenu from './DrawerMenu';

// Test 1: Render Test
test('renders DrawerMenu without crashing', () => {
  render(<DrawerMenu />);
});

// Test 2: Header Content Test
test('displays user name and "Edit Profile"', () => {
  const user = { first_name: 'John', last_name: 'Doe' };
  render(<DrawerMenu user={user} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Edit Profile')).toBeInTheDocument();
});

// Test 3: Navigation Test
test('navigates to the correct screen on press', () => {
  const mockNavigation = { navigate: jest.fn() };
  render(<DrawerMenu navigation={mockNavigation} />);
  
  fireEvent.press(screen.getByText('Home'));
  expect(mockNavigation.navigate).toHaveBeenCalledWith('EntryPage');

  fireEvent.press(screen.getByText('Fitness Dashboard'));
  expect(mockNavigation.navigate).toHaveBeenCalledWith('FitnessDashboard');

  fireEvent.press(screen.getByText('Water Intake'));
  expect(mockNavigation.navigate).toHaveBeenCalledWith('WaterIntakeScreen');

  fireEvent.press(screen.getByText('Workouts'));
  expect(mockNavigation.navigate).toHaveBeenCalledWith('WorkOutScreen');
});

// Test 4: Logout Test
test('calls handleLogout on "Logout" press', () => {
  const mockNavigation = { reset: jest.fn() };
  render(<DrawerMenu navigation={mockNavigation} />);
  
  fireEvent.press(screen.getByText('Logout'));
  expect(mockNavigation.reset).toHaveBeenCalledWith({
    index: 0,
    routes: [{ name: 'Login' }],
  });
});
