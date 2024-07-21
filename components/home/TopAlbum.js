import React, { useEffect, useState } from "react";
import { StyleSheet,  TouchableOpacity } from "react-native";
import { getTopAlbums } from "../../services/app.services";
import { View, Text, ImageBackground } from "react-native";
import { AppContext } from "../../contexts/AppContext";
import { useNavigation } from "@react-navigation/native";

function TopAlbum() {
  const {topAlbums, setTopAlbums} = React.useContext(AppContext);
  const navigation = useNavigation();

  const getAlbumList = () => {
    getTopAlbums()
      .then((resp) => {
        if (resp.data.albums) {
          const albumList = resp.data.albums.items.map((album) => {
            return {
              url: album.images[0].url,
              id: album.id,
              name: album.name,
            };
          });
          setTopAlbums(albumList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(topAlbums.length === 0) {
      getAlbumList(); 
    }
  }, [topAlbums]);
  const handlePress = (albumId, name, type) => {
      navigation.navigate('Songs', {albumId, name, type });
  }

  return (
    <>
      {topAlbums?.map((album) => (
        <TouchableOpacity key={album.id} onPress={() => handlePress(album.id, album.name, 'album')} style={{flex: 1}}>
          <ImageBackground
            source={{ uri: album.url }} // Replace with your image URL
            style={styles.background}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={styles.overlay}>
              <Text style={styles.text}>{album.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  itemTitle: { fontSize: "20px", fontWeight: 500 },
  background: {
    flex: 1,
    width: 250,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional overlay to make text more readable
    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TopAlbum;
