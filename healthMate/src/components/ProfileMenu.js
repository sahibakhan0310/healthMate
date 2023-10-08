import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Menu, Divider } from 'react-native-paper';

const ProfileMenu = () => {
  const [visible, setVisible] = useState(false);
  const anchor = useRef(null);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Appbar.Action
        icon="dots-vertical"
        onPress={openMenu}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={anchor.current} // Render the anchor inside the JSX
      >
        <Menu.Item onPress={() => {}} title="Edit Profile" />
        <Divider />
        {/* Add more menu items here */}
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileMenu;
