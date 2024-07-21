import {
  ARTIST_MOCK,
  GENRE_MOCK,
  TOP_ALBUM_MOCK,
  ALBUM_MOCK
} from "../constants/common.constants";
export const getColor = () => Math.floor(Math.random() * 16777215).toString(16);

export const getTopAlbumMock = () => {
  return TOP_ALBUM_MOCK.map((album) => {
    return {
      url: album.images[0].url,
      id: album.id,
      name: album.name,
    };
  });
};

export const getAlbumMock = () => {
  return ALBUM_MOCK.map((album) => {
    return {
      url: album.images[0].url,
      id: album.id,
      name: album.name,
    };
  });
};

export const getArtistMock = () => {
  return ARTIST_MOCK.map((artist) => {
    return {
      url: artist.images[0].url,
      id: artist.id,
      name: artist.name,
    };
  });
};

export const getGenreMock = () => {
  return GENRE_MOCK.map((genre) => ({ name: genre, color: `#${getColor()}` }));
};
