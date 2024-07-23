import * as React from 'react';
import { Appbar, useTheme, Avatar, TextInput, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

function Profile() {
  const theme = useTheme();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout button pressed');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <View style={styles.avatarContainer}>
        <Avatar.Image size={230} source={require('../../assets/avatar.png')} />
        <TextInput
          label="Name"
          value="John Doe"  // Replace with actual user name
          mode="outlined"
          disabled
          style={styles.textInput}
        />
        <TextInput
          label="Email"
          value="johndoe@example.com"  // Replace with actual user email
          mode="outlined"
          disabled
          style={styles.textInput}
        />
        <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
          Logout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  textInput: {
    width: '80%',
    marginTop: 40,
  },
  logoutButton: {
    marginTop: 40,
    width: '80%',
  },
});

export default Profile;
