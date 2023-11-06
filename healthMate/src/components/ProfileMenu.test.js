import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProfileMenu from './ProfileMenu';

describe('ProfileMenu', () => {
  it('displays the menu when the action button is pressed', () => {
    const { getByTestId, queryByTestId } = render(<ProfileMenu />);
    const actionButton = getByTestId('action-button');
    const menu = queryByTestId('menu');

    expect(menu).toBeNull(); // Menu should not be visible initially

    fireEvent.press(actionButton);

    const updatedMenu = queryByTestId('menu');
    expect(updatedMenu).toBeTruthy(); // Menu should be visible after button press
  });

  it('closes the menu when an item is pressed', () => {
    const { getByTestId, queryByTestId } = render(<ProfileMenu />);
    const actionButton = getByTestId('action-button');
    const menu = queryByTestId('menu');

    fireEvent.press(actionButton);

    const menuItems = queryByTestId('menu-item');
    expect(menuItems).toBeTruthy(); // Menu items should be visible

    fireEvent.press(menuItems);

    const updatedMenu = queryByTestId('menu');
    expect(updatedMenu).toBeNull(); // Menu should be closed after clicking an item
  });

  it('displays the "Edit Profile" menu item', () => {
    const { getByTestId } = render(<ProfileMenu />);
    const actionButton = getByTestId('action-button');

    fireEvent.press(actionButton);

    const editProfileItem = getByTestId('menu-item-edit-profile');
    expect(editProfileItem).toBeTruthy();
  });

  // Add more test cases for additional menu items if necessary
});
