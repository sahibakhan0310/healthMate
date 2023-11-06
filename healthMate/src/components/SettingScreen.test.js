import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from './SettingsScreen';

describe('SettingsScreen', () => {
  it('displays Edit Profile and Logout options', () => {
    const onEditProfile = jest.fn();
    const onLogout = jest.fn();
    const onClose = jest.fn();

    const { getByText } = render(
      <SettingsScreen visible={true} onEditProfile={onEditProfile} onLogout={onLogout} onClose={onClose} />
    );

    const editProfileButton = getByText('Edit Profile');
    const logoutButton = getByText('Logout');
    const closeButton = getByText('Close');

    expect(editProfileButton).toBeTruthy();
    expect(logoutButton).toBeTruthy();
    expect(closeButton).toBeTruthy();
  });

  it('calls the appropriate function when Edit Profile and Logout are pressed', () => {
    const onEditProfile = jest.fn();
    const onLogout = jest.fn();
    const onClose = jest.fn();

    const { getByText } = render(
      <SettingsScreen visible={true} onEditProfile={onEditProfile} onLogout={onLogout} onClose={onClose} />
    );

    const editProfileButton = getByText('Edit Profile');
    const logoutButton = getByText('Logout');

    fireEvent.press(editProfileButton);
    expect(onEditProfile).toHaveBeenCalledTimes(1);

    fireEvent.press(logoutButton);
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('calls the onClose function when the Close button is pressed', () => {
    const onEditProfile = jest.fn();
    const onLogout = jest.fn();
    const onClose = jest.fn();

    const { getByText } = render(
      <SettingsScreen visible={true} onEditProfile={onEditProfile} onLogout={onLogout} onClose={onClose} />
    );

    const closeButton = getByText('Close');

    fireEvent.press(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
