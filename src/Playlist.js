import React,
{
    useEffect,
    useState
} from 'react';
import axios from 'axios';
import './App.css';

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlistSongs, setPlaylistSongs] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:5000/api/playlists")
            .then((res) => {
                setPlaylists(res.data);
            })
            .catch((err) => {
                console.error("Error fetching playlists:", err);
            });
    }, []);

    const fetchSongDetails = async (playlistSongs) => {
        try {
            const response =
                await axios.get("http://localhost:5000/api/songs");
            const allSongs = response.data;
            const matchingSongs =
                playlistSongs.map((playlistSong) => {
                    return allSongs.find(
                        (song) =>
                            song.title === playlistSong);
                });
            return matchingSongs.filter(Boolean); 
            // Filter out undefined/null values
        } catch (error) {
            console.error("Error fetching song details:", error);
            return [];
        }
    };

    const handlePlaylistClick = async (playlistName) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/playlists/${encodeURIComponent(
                    playlistName
                )}/songs`
            );
            const songs = response.data;
            const matchingSongs =
                await fetchSongDetails(songs);
            setPlaylistSongs(matchingSongs);
            setSelectedPlaylist(playlistName);
        } catch (error) {
            console.error("Error fetching playlist songs:", error);
        }
    };




    return (
        <div className="playlist-container">
            <h1 className="playlist-heading">Playlists</h1>
            <ul className="playlist-list">
                {
                    playlists.map((playlist, index) => (
                        <li
                            key={index}
                            className="playlist-item"
                            onClick={
                                () =>
                                    handlePlaylistClick(playlist.name)
                            }>
                            {playlist.name}
                        </li>
                    ))
                }
            </ul>
            {selectedPlaylist && (
                <div className="playlist-songs">
                    <h3>Songs in {selectedPlaylist}:</h3>
                    <ul>
                        {
                            playlistSongs.map((song, index) => (
                                <li key={index}>
                                    {song.title} - {song.artist}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Playlist;
