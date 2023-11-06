import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LandingScreen from './LandingScreen';

// Mock your navigation functions
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('LandingScreen', () => {
  it('navigates to FitnessDashboard when Fitness Tracking card is pressed', () => {
    const { getByText } = render(<LandingScreen />);
    const fitnessCard = getByText('Fitness Tracking');

    fireEvent.press(fitnessCard);

    // You can assert navigation behavior here, depending on your navigation setup.
    // For example, you can check if navigation.navigate('FitnessDashboard') was called.
  });

  it('navigates to WaterIntakeScreen when Water Intake card is pressed', () => {
    const { getByText } = render(<LandingScreen />);
    const waterIntakeCard = getByText('Water Intake');

    fireEvent.press(waterIntakeCard);

    // You can assert navigation behavior here, depending on your navigation setup.
    // For example, you can check if navigation.navigate('WaterIntakeScreen') was called.
  });

  it('navigates to WorkoutScreen when Workouts card is pressed', () => {
    const { getByText } = render(<LandingScreen />);
    const workoutsCard = getByText('Workouts');

    fireEvent.press(workoutsCard);

    // You can assert navigation behavior here, depending on your navigation setup.
    // For example, you can check if navigation.navigate('WorkoutScreen') was called.
  });
});
