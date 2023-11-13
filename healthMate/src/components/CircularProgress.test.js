import React from 'react';
import { render } from '@testing-library/react-native';
import CircularProgress from './CircularProgress';

test('renders CircularProgress component', () => {
  render(<CircularProgress percentage={50} size={100} strokeWidth={10} />);
});
test('renders CircularProgress with 75% progress', () => {
    render(<CircularProgress percentage={75} size={100} strokeWidth={10} />);
    // Add assertions here for the expected visual output based on 75% progress
  });
  
  test('renders CircularProgress with 25% progress', () => {
    render(<CircularProgress percentage={25} size={100} strokeWidth={10} />);
    // Add assertions here for the expected visual output based on 25% progress
  });
  test('renders CircularProgress with custom styles', () => {
    render(
      <CircularProgress
        percentage={50}
        size={150}
        strokeWidth={15}
        backgroundColor="lightgray"
        progressColor="green"
      />
    );
    // Add assertions here for the expected visual output based on custom styles
  });
    