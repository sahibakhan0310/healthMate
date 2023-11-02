import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, List, Button, Divider } from 'react-native-paper';

function SettingsScreen({ visible, onClose, onEditProfile, onLogout }) {
  return (
    <Modal visible={visible} onDismiss={onClose}>
      <View style={styles.modalContent}>
        <List.Section>
          <List.Item
            title="Edit Profile"
            left={() => <List.Icon icon="account-edit" />}
            onPress={onEditProfile}
          />
          <Divider />
          <List.Item
            title="Logout"
            left={() => <List.Icon icon="logout" />}
            onPress={onLogout}
          />
        </List.Section>
        <Button icon="close" mode="outlined" onPress={onClose}>
          Close
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
  },
});

export default SettingsScreen;
