import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getArtist } from "../../services/app.services";
import { View, Text, ImageBackground } from "react-native";
import { AppContext } from "../../contexts/AppContext";

function Artist() {
  const {artists, setArtists} = React.useContext(AppContext)

  const getArtistList = () => {
    getArtist()
      .then((resp) => {
        if (resp.data.artists) {
          const artistList = resp.data.artists.map((artist) => {
            return {
              url: artist.images[0].url,
              id: artist.id,
              name: artist.name,
            };
          });
          setArtists(artistList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(artists.length === 0) {
      getArtistList();
    }
  }, [artists]);

  return (
    <>
      {artists?.map((artist) => (
        <View key={artist.id} >
          <ImageBackground
            
            source={{ uri: artist.url }} // Replace with your image URL
            style={styles.background}
            imageStyle={{ borderRadius: 10 }}
          >
          </ImageBackground>
          <Text style={styles.text}>{artist.name}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  itemTitle: { fontSize: "20px", fontWeight: 500 },
  background: {
    flex: 1,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    margin: 5
  },
});

export default Artist;
