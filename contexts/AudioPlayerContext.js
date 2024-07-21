import React, { createContext, useEffect, useState } from "react";
import { Audio } from "expo-av";

export const AudioPlayerContext = createContext();

export const AudioPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState();
  const [sound, setSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songFinished, setSongFinished] = useState(false);
  

  useEffect(() => {

    return () => {
      if (sound) {
        sound.unloadAsync();
        setIsPlaying(false)
      }
    };
  }, [sound]);

  const loadAudio = async (audioURL) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioURL }, // Update the path to your audio file
      { shouldPlay: false }
    );
    setSound(sound);

    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setCurrentTime(status.positionMillis);

      if (status.didJustFinish) {
        console.log(status.didJustFinish)
        setIsPlaying(false);
        setSongFinished(true);
        setCurrentTime(0)
        
      }
    }
  };

  useEffect(() => {
     if(songFinished) {
      loadAudio(currentTrack.preview_url)
     }
  }, [songFinished, currentTrack])



  const playPauseAudio = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      console.log(songFinished)
      if(!songFinished) {
        if (status.isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      } else {
        await sound.playAsync();
        setIsPlaying(true);
        setSongFinished(false)
      }
 
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const timeLeft = duration - currentTime;



  return (
    <AudioPlayerContext.Provider
      value={{
        loadAudio,
        playPauseAudio,
        isPlaying,
        currentTime,
        duration,
        setIsPlaying,
        setDuration,
        formatTime,
        setCurrentTrack,
        currentTrack
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};
