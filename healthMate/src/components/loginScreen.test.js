import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from './loginScreen';

// Mock your navigation functions and any dependencies you need
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

// Mock any asynchronous calls or dependencies, like fetch
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
}));

// Mock your Redux actions and state
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('LoginScreen', () => {
  it('renders the component', () => {
    const { getByLabelText, getByText } = render(<LoginScreen />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('displays an error message for invalid input', async () => {
    const { getByText, getByLabelText, findByText } = render(<LoginScreen />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.press(loginButton);

    const errorMessage = await findByText('Invalid email');
    expect(errorMessage).toBeTruthy();
  });

  it('navigates to the LandingScreen on successful login', async () => {
    // Mock the fetch function to return a successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user_id: '123' }),
      })
    );

    const { getByLabelText, getByText } = render(<LoginScreen />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    // You can use waitFor and check navigation behavior here
    // For example, you can check if navigation.navigate('LandingScreen') was called.
  });

  it('displays an error message on failed login', async () => {
    // Mock the fetch function to return an error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const { getByLabelText, getByText, findByText } = render(<LoginScreen />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    const errorMessage = await findByText('Invalid email or password.');
    expect(errorMessage).toBeTruthy();
  });
});
