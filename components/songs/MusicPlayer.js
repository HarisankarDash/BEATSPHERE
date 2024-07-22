import  { useRoute, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { Appbar, useTheme, ProgressBar} from "react-native-paper";
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";

export default function MusicPlayer() {
  const route = useRoute();
  const navigation = useNavigation();
  const them = useTheme();
  const [ progress, setProgress] = useState(0)
  const {
    isPlaying,
    playPauseAudio,
    currentTime,
    duration,
    formatTime,
    currentTrack
    
  } = React.useContext(AudioPlayerContext);

  const _goBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    if(currentTime && duration) {
      console.log(currentTime)
      setProgress(currentTime/duration)
    }
  }, [currentTime, duration])


  return (
    <>
      <Appbar.Header style={{ backgroundColor: them.colors.secondary }}>
      <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title={currentTrack.name} />
      </Appbar.Header>
      <View style={styles.container}>
        <View
          style={{
            flex: 6,
            backgroundColor: them.colors.secondary,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          {currentTrack.image ? <Image source={{ uri: currentTrack.image }} style={{ width: 380, height: 380 }} /> : <Ionicons
            name={"musical-notes"}
            size={180}
            color={them.colors.primary}
          />}
     
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>{currentTrack.name}</Text>
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            padding: 10,
            justifyContent: "center",
          }}
        >
          <ProgressBar progress={progress} color={them.colors.primary} />
          <View style={{width: '100%', display: 'flex' , flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{margin:5, fontSize: 16}}>{formatTime(currentTime)}</Text>

            <Text style={{margin:5, fontSize: 16}}>{formatTime(duration)}</Text>

          </View>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: 'space-evenly'
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <Ionicons
              name={"play-back-circle"}
              size={50}
              color={them.colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            playPauseAudio()
          }}>
           
            {isPlaying ? (
                <Ionicons
                  name={"pause-circle"}
                  size={80}
                  color={them.colors.primary}
                />
            ) : (
              <Ionicons
                name={"play-circle"}
                size={80}
                color={them.colors.primary}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons
              name={"play-forward-circle"}
              size={50}
              color={them.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    width: "100%",
  },
});
