import React, { useState } from 'react';
import { Appbar, useTheme, Avatar, TextInput, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

function Profile() {
  const navigation = useNavigation(); // Initialize navigation

  const theme = useTheme();

  // State variables for username and email
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleLogout = () => {
 

    // Navigate to "GetStarted" or another screen after logout
    navigation.navigate('GetStarted'); // Replace 'GetStarted' with your screen name
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
          value={username} // Display username dynamically
          mode="outlined"
          disabled
          style={styles.textInput}
        />
        <TextInput
          label="Email"
          value={email} // Display email dynamically
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
