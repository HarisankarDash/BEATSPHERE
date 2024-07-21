import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./home/Home";
import Songs from "./songs/Songs";
import MusicPlayer from "./songs/MusicPlayer";
const Stack = createStackNavigator();

function ScreenStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="/"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Songs"
        component={Songs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ScreenStack;
