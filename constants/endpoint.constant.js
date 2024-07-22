
import { ARTIST_IDS, ALBUMS } from "./common.constants"

export const API = {
    TOP_ALBUMS: "https://api.spotify.com/v1/browse/new-releases?limit=10&offset=1",
    ALBUMS: "https://api.spotify.com/v1/browse/new-releases?limit=30&offset=5",
    ARTIST: "https://api.spotify.com/v1/artists?ids="+ARTIST_IDS.join('%2C'),
    GENRES: "https://api.spotify.com/v1/recommendations/available-genre-seeds",
    ALBUM_TRACKS: "https://api.spotify.com/v1/albums/[TRACK_ID]/tracks?limit=20&offset=0",
    SERCH_SONG: "https://api.spotify.com/v1/search?q=[SONG_NAME]&type=track"
}