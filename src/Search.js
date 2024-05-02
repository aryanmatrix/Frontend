// Search.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [audioSrc, setAudioSrc] = useState('');
    const [audioTitle, setAudioTitle] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();

    useEffect(() => {
        const fetchAllSongs = async () => {
            try {
                const response = await axios.get("https://musicplaylist.azurewebsites.net/api/songs");
                setAllSongs(response.data);
            } catch (error) {
                console.error("Error fetching all songs:", error);
            }
        };
        fetchAllSongs();
    }, [props.value]);

    const handleSearch = () => {
        axios.get(`https://musicplaylist.azurewebsites.net/api/songs?title=${searchTerm}`)
            .then(res => {
                setSearchResults(res.data);
            })
            .catch(err => {
                console.error('Error searching for songs:', err);
            });
    };

    const handleSongClick = (song) => () => {
        console.log('Clicked song:', song);
        console.log('Current audio source:', audioSrc);
        if (song.audioUrl !== audioSrc) {
            console.log('Setting new audio source:', song.audioUrl);
            setAudioSrc(song.audioUrl);
            setAudioTitle(song.title);
            setIsPlaying(true);
        } else {
            console.log('Toggling play/pause');
            setIsPlaying(prevState => !prevState); // Toggle play/pause if the same song is clicked again
        }
        audioRef.current.play()
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    const handlePauseClick = () => {
        setIsPlaying(false);
    };

    const handleDeleteSong = async (songId) => {
        try {
            await axios.delete(`https://musicplaylist.azurewebsites.net/api/songs/${songId}`);
            setAllSongs(allSongs.filter(song => song._id !== songId));
            // Optionally, you can also update other state variables that may depend on the song list
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    return (
        <div className="search-container">
            <h1 className="search-heading">Search</h1>
            <input
                type="text"
                className="search-input"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
            <ul className="search-results">
                {searchResults.map(song => (
                    <li key={song._id} className="search-item">
                        {song.title} - {song.artist}
                        <button onClick={() => handleDeleteSong(song._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h1>All Songs</h1>
            {audioSrc && (
                <div>
                    <h2>Now Playing: {audioTitle}</h2>
                    <audio ref={audioRef} src={audioSrc} onEnded={handleAudioEnded} />
                    <button onClick={() => audioRef.current.play()} className="search-button">Play</button>
                    <button onClick={() => audioRef.current.pause()} className="search-button">Pause</button>
                </div>
            )}
            <div className="all-songs">
                {allSongs.map(song => (
                    <div key={song._id} className="all-song" onClick={handleSongClick(song)}>
                        {song.title} - {song.artist}
                        <button className='del-btn' onClick={() => handleDeleteSong(song._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
