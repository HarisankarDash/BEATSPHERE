import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Appbar, Searchbar, useTheme, List } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { searchSongs } from '../../services/app.services';
import { AudioPlayerContext } from '../../contexts/AudioPlayerContext';
const Search = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSongResult, setSearchSongResult] = useState([]);
  const {
    loadAudio,
    setIsPlaying,
    setDuration,
    setCurrentTrack
  } = React.useContext(AudioPlayerContext);
  const search = () => {
    setIsLoading(true);
    searchSongs(searchQuery)
      .then(resp => {
        const songsData = resp.data?.tracks;
        if (songsData) {
          setSearchSongResult(songsData.items.map(song => {
            return {
              id: song.id,
              name: song.name,
              preview_url: song.preview_url,
              image: song?.album?.images[0]?.url
            };
          }));
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
    setCurrentTrack(item)
    loadAudio(item.preview_url);
    setIsPlaying(false);
    setDuration(0);
    navigation.navigate("Player");
  }

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity onPress={() => handlePlay(item)}>
      <List.Item
        title={item.name}
        left={() => <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: theme.colors.secondary }}>
        <Appbar.Content title="Search" />
      </Appbar.Header>
      <Searchbar
        placeholder="Search songs..."
        onChangeText={handleSearchQueryChange}
        value={searchQuery}
        style={{ margin: 8 }}
      />
      <View style={{padding: 10}}>
        {isLoading ? (
          <ActivityIndicator style={{ marginTop: 16 }} size="large" color={theme.colors.primary} />
        ) : (
          <FlatList
            data={searchSongResult}
            renderItem={renderSearchResult}
            
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text style={{ alignSelf: 'center', marginTop: 32 }}>No results found</Text>}
          />
        )}
      </View>
    </View>
  );
};

export default Search;
