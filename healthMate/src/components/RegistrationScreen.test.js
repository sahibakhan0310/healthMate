import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegistrationScreen from './RegistrationScreen';

describe('RegistrationScreen', () => {
  it('displays input fields and allows registration', async () => {
    const { getByText, getByPlaceholderText, getByTestId, getByLabel } = render(
      <RegistrationScreen />
    );

    // Assert the presence of input fields
    expect(getByText('First Name')).toBeTruthy();
    expect(getByText('Last Name')).toBeTruthy();
    expect(getByText('Phone')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Confirm Password')).toBeTruthy();

    // Fill in the input fields
    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const phoneInput = getByPlaceholderText('Phone');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(phoneInput, '123-456-7890');
    fireEvent.changeText(emailInput, 'johndoe@example.com');
    fireEvent.changeText(passwordInput, 'P@ssw0rd');
    fireEvent.changeText(confirmPasswordInput, 'P@ssw0rd');

    // Assert the input values
    expect(firstNameInput.props.value).toBe('John');
    expect(lastNameInput.props.value).toBe('Doe');
    expect(phoneInput.props.value).toBe('123-456-7890');
    expect(emailInput.props.value).toBe('johndoe@example.com');
    expect(passwordInput.props.value).toBe('P@ssw0rd');
    expect(confirmPasswordInput.props.value).toBe('P@ssw0rd');

    // Submit the registration form
    const registerButton = getByText('Register');
    fireEvent.press(registerButton);

    // You can use waitFor to check if the registration is completed
    await waitFor(() => {
      // Implement assertions to check if the registration was successful
    });
  });
});
