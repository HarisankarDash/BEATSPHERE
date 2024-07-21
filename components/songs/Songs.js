import React, { useEffect, useState } from "react";
import { Appbar, useTheme } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { getAlbumTracks } from "../../services/app.services";
import { ScrollView, TouchableOpacity } from "react-native";
import { List} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { getColor } from "../../utils/mock.util";
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";
function Songs() {
  const [tracks, setTracks] = useState([]);
  const them = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { albumId, name, type } = route.params;
  const {
    loadAudio,
    setIsPlaying,
    setDuration,
    setCurrentTrack
  } = React.useContext(AudioPlayerContext);
  const _goBack = () => {
    navigation.goBack();
  };

  const getAlbumSongs = () => {
    getAlbumTracks(albumId)
      .then((resp) => {
        if (resp.data) {
          setTracks(resp.data.items);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSongs = (type) => {
    switch (type) {
      case "album":
        getAlbumSongs();
        break;
    }
  };

  useEffect(() => {
    if (albumId && type) {
      getSongs(type);
    }
  }, [albumId, name, type]);

  const handlePress = (track) => {
    setCurrentTrack(track)
    loadAudio(track.preview_url);
    setIsPlaying(false);
    setDuration(0)
    navigation.navigate("Player");
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: them.colors.secondary }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={name} style={{ color: "red" }}></Appbar.Content>
      </Appbar.Header>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        <List.Section>
          {tracks.map((track) => (
            <TouchableOpacity
              key={track.id}
              onPress={() => handlePress(track)}
              style={{ flex: 1 }}
            >
              <List.Item
                title={track.name}
                description={`Artists: ${track.artists.map(
                  (artist) => artist.name
                )}`}
                left={() => (
                  <Ionicons
                    name={"musical-notes"}
                    size={25}
                    color={`#${getColor()}`}
                  />
                )}
              />
            </TouchableOpacity>
          ))}
        </List.Section>
      </ScrollView>
    </>
  );
}

export default Songs;
