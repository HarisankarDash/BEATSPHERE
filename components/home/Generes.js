import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getGenres } from "../../services/app.services";
import {  View, Text } from "react-native";
import { AppContext } from "../../contexts/AppContext";


const getColor = () => Math.floor(Math.random()*16777215).toString(16);

function Genres() {
  const {genres, setGenres} = React.useContext(AppContext)

  const getGenresList = () => {
    getGenres()
      .then((resp) => {
        if (resp.data) {
          setGenres(resp.data.genres.map(genre => ({name: genre, color: `#${getColor()}`})));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(genres.length === 0) {
      getGenresList()

    }
  }, [genres]);

  return (
    <>
      {genres?.map((genre) => (
          <View key={genre.name} style={{...styles.container, backgroundColor: genre.color}} >
             <Text style={styles.text}>{genre.name}</Text>
          </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  itemTitle: { fontSize: "20px", fontWeight: 500 },
  container: {
    flex: 1,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 10
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Genres;
