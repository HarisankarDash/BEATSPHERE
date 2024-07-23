import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Appbar, Searchbar, useTheme, List } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { searchSongs } from '../../services/app.services';
import { AudioPlayerContext } from '../../contexts/AudioPlayerContext';
import { MaterialIcons } from '@expo/vector-icons'; // Import cross icon

const Search = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSongResult, setSearchSongResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastPlayedSongs, setLastPlayedSongs] = useState([]); // Track last played songs as an array

  const {
    loadAudio,
    setIsPlaying,
    setDuration,
    setCurrentTrack
  } = React.useContext(AudioPlayerContext);

  useEffect(() => {
    // Load any initial data or perform tasks on component mount
  }, []);

  const search = () => {
    setIsLoading(true);
    searchSongs(searchQuery)
      .then(resp => {
        const songsData = resp.data?.tracks;
        if (songsData) {
          setSearchSongResult(songsData.items.map(song => ({
            id: song.id,
            name: song.name,
            preview_url: song.preview_url,
            image: song?.album?.images[0]?.url
          })));
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let timer;
    if (searchQuery) {
      timer = setTimeout(() => {
        search();
      }, 500);
    } else {
      setSearchSongResult([]); // Clear search results if searchQuery is empty
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handlePlay = (item) => {
    setCurrentTrack(item);
    loadAudio(item.preview_url);
    setIsPlaying(false);
    setDuration(0);

    // Add current song to the beginning of the array
    setLastPlayedSongs([item, ...lastPlayedSongs]);

    navigation.navigate("Player");
  };

  const removeLastPlayed = (index) => {
    const updatedSongs = [...lastPlayedSongs];
    updatedSongs.splice(index, 1);
    setLastPlayedSongs(updatedSongs);
  };

  const renderLastPlayedSongs = () => {
    if (lastPlayedSongs.length > 0 && searchQuery === '') {
      return (
        <View style={styles.lastPlayedContainer}>
          <Text style={styles.lastPlayedHeaderText}>Recently Played</Text>
          {lastPlayedSongs.map((song, index) => (
            <View key={index} style={styles.lastPlayedContent}>
              <TouchableOpacity
                onPress={() => handlePlay(song)}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Image source={{ uri: song.image }} style={styles.lastPlayedImage} />
                <Text style={styles.lastPlayedText}>{song.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeLastPlayed(index)} style={styles.clearIcon}>
                <MaterialIcons name="clear" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity onPress={() => handlePlay(item)}>
      <List.Item
        title={item.name}
        left={() => <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />}
      />
    </TouchableOpacity>
  );

  const clearSearchQuery = () => {
    setSearchQuery('');
    setSearchSongResult([]);
  };

  const renderEmptyComponent = () => (
    <Text style={{ alignSelf: 'center', marginTop: 32 }}>
      {isLoading ? 'Loading...' : 'No results found'}
    </Text>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
          <Appbar.Content title="Search" />
        </Appbar.Header>
        <Searchbar
          placeholder="Search songs..."
          onChangeText={handleSearchQueryChange}
          value={searchQuery}
          style={{ marginHorizontal: 8, marginTop: 10 }}
          onIconPress={clearSearchQuery} // Clear button to clear search query
        />
        {renderLastPlayedSongs()}
        <View style={{ padding: 10, flex: 1 }}>
          {searchSongResult.length > 0 && (
            <FlatList
              data={searchSongResult}
              renderItem={renderSearchResult}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={renderEmptyComponent}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  lastPlayedContainer: {
    padding: 10,
    marginBottom: 10,
  },
  lastPlayedHeaderText: {
    fontSize: 18,
    marginBottom: 10,
  },
  lastPlayedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  lastPlayedImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  lastPlayedText: {
    flex: 1,
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 'auto',
  },
});

export default Search;
