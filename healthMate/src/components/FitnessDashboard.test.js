import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import FitnessDashboard from './FitnessDashboard';

// Mock any dependencies or functions that are not relevant to this component
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    reset: jest.fn(),
  }),
}));

// Mock your Redux store and the mapStateToProps function
jest.mock('react-redux', () => ({
  connect: () => (Component) => Component,
}));

describe('FitnessDashboard', () => {
  it('renders the component with user data', () => {
    const user = {
      first_name: 'John',
      last_name: 'Doe',
      height: 180,
      weight: 75,
      step_count: 7500,
    };

    const { getByText } = render(<FitnessDashboard user={user} />);

    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Height: 180 cm')).toBeTruthy();
    expect(getByText('Weight: 75 kg')).toBeTruthy();
    expect(getByText('75%')).toBeTruthy();
  });

  it('fetches and displays step count data', async () => {
    // Mock the fetch function to return a response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ activity_date: '2023-11-01', steps_taken: 6000 }]),
      })
    );

    const user = {
      user_id: '123',
    };

    const { getByText } = render(<FitnessDashboard user={user} />);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(getByText('Step Count in the Last Week')).toBeTruthy();
      expect(getByText('2023-11-01')).toBeTruthy();
      expect(getByText('6000')).toBeTruthy();
    });
  });

  it('navigates to UserProfile when edit profile is clicked', () => {
    const { getByText } = render(<FitnessDashboard user={{}} />);
    const editProfileButton = getByText('Edit Profile');

    fireEvent.press(editProfileButton);

    // You can assert navigation behavior here, depending on your navigation setup.
    // For example, if you're using react-navigation, you can check if navigation.navigate('UserProfile') was called.
  });

  it('logs out and navigates to Login when the logout button is clicked', () => {
    const { getByText } = render(<FitnessDashboard user={{}} />);
    const logoutButton = getByText('Logout');

    fireEvent.press(logoutButton);

    // You can assert logout and navigation behavior here.
    // For example, you can check if the clearUserSession function was called and if navigation.reset was called with the correct parameters.
  });
});
