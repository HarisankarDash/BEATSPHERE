import { PaperProvider, DefaultTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import { AppContextProvider } from "./contexts/AppContext";
import Songs from "./components/songs/Songs";
import { createStackNavigator } from "@react-navigation/stack";
import { AudioPlayerProvider } from "./contexts/AudioPlayerContext";
import MusicPlayer from "./components/songs/MusicPlayer";
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#9b40c9",
    secondary: "#f2e8f7",
  },
};

export default function App() {
  return (
    <AudioPlayerProvider>
      <PaperProvider theme={theme}>
        <AppContextProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="DashBoard">
              <Stack.Screen
                name="DashBoard"
                component={NavBar}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Player"
                component={MusicPlayer}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContextProvider>
      </PaperProvider>
    </AudioPlayerProvider>
  );
}
