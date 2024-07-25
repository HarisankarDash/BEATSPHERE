import React, { useState, useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContextProvider } from './contexts/AppContext';
import { AudioPlayerProvider } from './contexts/AudioPlayerContext';
import NavBar from './components/NavBar';
import MusicPlayer from './components/songs/MusicPlayer';
import GetStarted from "./components/screen/GetStarted";
import loginpage from "./components/screen/loginpage";
import signuppage from "./components/screen/signuppage"
import * as Font from 'expo-font';


// Define custom theme for react-native-paper
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#9b40c9',
    secondary: '#f2e8f7',
  },
};

// Function to load custom fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'Poppins-Regular': require('./assets/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/Poppins-Bold.ttf'),
    // Add more fonts as needed
  });
};

// Create a Stack navigator
const Stack = createStackNavigator();

// Main App component
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAppResourcesAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAppResourcesAsync();
  }, []);

  if (!fontsLoaded) {
    return null; // Return a loading indicator here if needed
  }

  return (
    <AudioPlayerProvider>
      <PaperProvider theme={theme}>
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="GetStarted">
              <Stack.Screen
                name="Dashboard"
                component={NavBar}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Player"
                component={MusicPlayer}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={loginpage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={signuppage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GetStarted"
                component={GetStarted}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>
      </PaperProvider>
    </AudioPlayerProvider>
  );
}