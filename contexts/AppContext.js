import React, { createContext, useEffect, useState } from "react";
import { ALBUM_MOCK, ARTIST_MOCK, GENRE_MOCK, TOP_ALBUM_MOCK } from "../constants/common.constants";
import {  getAlbumMock, getArtistMock, getGenreMock, getTopAlbumMock } from "../utils/mock.util";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [topAlbums, setTopAlbums] = useState(getTopAlbumMock());
  const [albums, setAlbums] = useState(getAlbumMock());
  const [artists, setArtists] = useState(getArtistMock());
  const [genres, setGenres] = useState(getGenreMock());



  return (
    <AppContext.Provider
      value={{
        topAlbums,
        albums,
        artists,
        genres,
        setTopAlbums,
        setAlbums,
        setArtists,
        setGenres,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
