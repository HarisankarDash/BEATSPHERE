import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import Search from "./search/Search";
import Profile from "./profile/Profile";
import { Ionicons } from "@expo/vector-icons";
import ScreenStack from "./ScreenStack";
import FooterPlayer from "./songs/FooterPlayer";
import { useNavigationState } from "@react-navigation/native";
import { AudioPlayerContext } from "../contexts/AudioPlayerContext";
const Tab = createBottomTabNavigator();

const BottomNavigationBar = ({ navigation, state, descriptors, insets }) => {
  const { currentTrack} = React.useContext(AudioPlayerContext);
  const screenName = useNavigationState((state) => state.routes[state.index].name)

  return (
    <>
       {currentTrack && screenName !== 'Player' && <FooterPlayer />}
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({ focused, color, size: 24 });
          }

          return null;
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.title;

          return label;
        }}
      />
    </>
  );
};

export default function NavBar() {
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigationBar
          navigation={navigation}
          state={state}
          descriptors={descriptors}
          insets={insets}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={ScreenStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name={"home"} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name={"search"} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="My Account"
        component={Profile}
        options={{
          tabBarLabel: "My Account",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name={"person-sharp"} size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
