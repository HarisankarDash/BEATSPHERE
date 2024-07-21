import { AppToken } from "../constants/common.constants";
import { API } from "../constants/endpoint.constant";
import axios from "axios";

export const getTopAlbums = () => {
  return axios.get(API.TOP_ALBUMS, {
      headers: {
        Authorization: "Bearer " + AppToken,
      },
    })
}

export const getAlbums = () => {
    return axios.get(API.ALBUMS, {
        headers: {
          Authorization: "Bearer " + AppToken,
        },
      })
}

export const getArtist = () => {
  return axios.get(API.ARTIST, {
      headers: {
        Authorization: "Bearer " + AppToken,
      },
    })
}

export const getGenres = () => {
  return axios.get(API.GENRES, {
      headers: {
        Authorization: "Bearer " + AppToken,
      },
    })
}

export const getAlbumTracks = (album_id) => {
  return axios.get(API.ALBUM_TRACKS.replace('[TRACK_ID]', album_id), {
    headers: {
      Authorization: "Bearer " + AppToken,
    },
  })
}