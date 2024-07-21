import React from "react";
import { ScrollView, View, Text} from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Album from "./Album";
import TopAlbum from "./TopAlbum";
import Artist from "./Artist";
import Genres from "./Generes";

function Home() {
  const them = useTheme();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: them.colors.secondary }}>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <ScrollView style={{ flex: 1, paddingTop: 20 }}>
        <View style={{ ...styles.container, flex: 1 }}>
          <Text style={styles.itemTitle}>Top Picks for You</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <TopAlbum />
          </ScrollView>
        </View>
        <View style={{ flex: 3, ...styles.container }}>
          <Text style={styles.itemTitle}>Albums</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <Album />
          </ScrollView>
        </View>
        <View style={{ flex: 3, ...styles.container }}>
          <Text style={styles.itemTitle}>Artist</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <Artist />
          </ScrollView>
        </View>
        {/* <View style={{ flex: 3, ...styles.container }}>
          <Text style={styles.itemTitle}>Episodes</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <Episodes />
          </ScrollView>
        </View> */}
        <View style={{ flex: 3, ...styles.container }}>
          <Text style={styles.itemTitle}>Genres</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <Genres />
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  itemTitle: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  container: {
    padding: 10,
  },
  scrollView: {
    flexDirection: "row",
  },
});

export default Home;
