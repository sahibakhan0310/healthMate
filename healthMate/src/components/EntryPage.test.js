import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EntryPage from './EntryPage';

describe('EntryPage', () => {
  it('renders the component', () => {
    const { getByText, getByTestId } = render(<EntryPage />);
    
    // You can use getByText or getByTestId to find elements in the rendered component
    const titleElement = getByText('HealthMate');
    const loginButton = getByText('Login');
    const signUpButton = getByText('Sign Up');

    expect(titleElement).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it('navigates to Login page when Login button is clicked', () => {
    const { getByText } = render(<EntryPage />);
    const loginButton = getByText('Login');

    fireEvent.click(loginButton);

    // You can assert navigation behavior here, depending on your navigation setup.
    // For example, if you're using react-navigation, you can check if navigation.navigate('Login') was called.
  });

  it('navigates to Registration page when Sign Up button is clicked', () => {
    const { getByText } = render(<EntryPage />);
    const signUpButton = getByText('Sign Up');

    fireEvent.click(signUpButton);

    // Similar to the Login button test, you can assert navigation behavior here.
  });
});
