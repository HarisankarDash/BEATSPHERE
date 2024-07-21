import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar, useTheme } from "react-native-paper";
import { AudioPlayerContext } from "../../contexts/AudioPlayerContext";
import { useNavigation } from "@react-navigation/native";
function FooterPlayer() {
  const [progress, setProgress] = useState(0);
  const {
    isPlaying,
    playPauseAudio,
    currentTime,
    duration,
    formatTime,
    currentTrack,
  } = React.useContext(AudioPlayerContext);
  const them = useTheme();
  const navigation = useNavigation();
  useEffect(() => {
    if (currentTime && duration) {
      setProgress(currentTime / duration);
    }
  }, [currentTime, duration]);

  return (
    <>
      <TouchableOpacity onPress={() => {
        navigation.navigate("Player");
      }}>
        <View
          style={{
            width: "100%",
            height: 80,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 2,
              backgroundColor: them.colors.secondary,
            }}
          >
            <Ionicons
              name={"musical-notes"}
              size={30}
              color={them.colors.primary}
            />
          </View>
          <View style={{ flex: 5, padding: 10 }}>
            <Text style={{ margin: 5, fontSize: 16, fontWeight: "bold" }}>
              {currentTrack.name}
            </Text>
            <Text style={{ margin: 5, fontSize: 10, fontWeight: "400" }}>
              {formatTime(currentTime)}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                playPauseAudio();
              }}
            >
              {isPlaying ? (
                <Ionicons
                  name={"pause-circle"}
                  size={40}
                  color={them.colors.primary}
                />
              ) : (
                <Ionicons
                  name={"play-circle"}
                  size={40}
                  color={them.colors.primary}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <ProgressBar progress={progress} color={them.colors.primary} />
      </TouchableOpacity>
    </>
  );
}

export default FooterPlayer;
