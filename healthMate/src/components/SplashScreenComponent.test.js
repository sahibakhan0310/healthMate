import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import SplashScreenComponent from './SplashScreenComponent';

afterEach(cleanup);

describe('SplashScreenComponent', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<SplashScreenComponent />);

    // Ensure that the "HealthMate" text is present
    const healthMateText = getByText('HealthMate');
    expect(healthMateText).toBeTruthy();

    // Ensure that the logo is displayed
    const logoImage = getByTestId('logo-image');
    expect(logoImage).toBeTruthy();

    // Ensure that the background image is present
    const backgroundImage = getByTestId('background-image');
    expect(backgroundImage).toBeTruthy();
  });

  it('loads fonts and starts the fade-in animation', () => {
    // Mock the Font.loadAsync function
    jest.spyOn(Font, 'loadAsync').mockImplementation(() => Promise.resolve());

    // Mock the fade-in animation function
    const fadeIn = jest.fn();
    const fadeAnimRef = {
      current: {
        fadeIn,
      },
    };

    // Render the SplashScreenComponent with the mocked references
    render(<SplashScreenComponent />);
    
    // Assert that Font.loadAsync is called
    expect(Font.loadAsync).toHaveBeenCalledTimes(1);

    // Assert that the fade-in animation is triggered
    expect(fadeIn).toHaveBeenCalledTimes(1);
  });
});
