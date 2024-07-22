import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, useTheme, Title, Headline } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState(null);
  const { colors } = useTheme();

  const handlePress = (page, button) => {
    setActiveButton(button);
    setTimeout(() => {
      setActiveButton(null);
      navigation.navigate(page);
    }, 200);
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.header}>Welcome to BeatSphere!</Headline>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Title style={styles.caption}>Discover the world of music</Title>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => handlePress("Signup", "Signup")}
          style={[
            styles.button,
            { backgroundColor: activeButton === "Signup" ? colors.primary : colors.surface },
          ]}
          labelStyle={{
            color: activeButton === "Signup" ? "white" : colors.primary,
            fontSize: 18,
          }}
        >
          Sign Up
        </Button>
        <Button
          mode="contained"
          onPress={() => handlePress("Login", "Login")}
          style={[
            styles.button,
            { backgroundColor: activeButton === "Login" ? colors.primary : colors.surface },
          ]}
          labelStyle={{
            color: activeButton === "Login" ? "white" : colors.primary,
            fontSize: 18,
          }}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    marginBottom: 20,
    color: "#990099",
    textAlign: "center",
    fontWeight: "bold",
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  caption: {
    fontSize: 24,
    marginBottom: 40,
    color: "#b300b3",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 30,
  },
});

export default GetStarted;
