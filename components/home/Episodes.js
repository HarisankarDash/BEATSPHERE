import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getAlbums } from "../../services/app.services";
import { ScrollView, View, Text, ImageBackground } from "react-native";

function Episodes() {
  const [albums, setAlbums] = useState([]);

  const getAlbumList = () => {
    getAlbums()
      .then((resp) => {
        if (resp.data.albums) {
          const albumList = resp.data.albums.map((album) => {
            return {
              url: album.images[0].url,
              id: album.id,
              name: album.name,
            };
          });
          setAlbums(albumList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // getAlbumList();
  }, []);

  return (
    <>
      {albums?.map((album) => (
        <ImageBackground
          key={album.id}
          source={{ uri: album.url }} // Replace with your image URL
          style={styles.background}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.overlay}>
            {/* <Text style={styles.text}>{album.name}</Text> */}
          </View>
        </ImageBackground>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  itemTitle: { fontSize: "20px", fontWeight: 500 },
  background: {
    flex: 1,
    width: 150,
    height: 150,
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

export default Episodes;
