import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for AddSong

const AddSong = (props) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [duration, setDuration] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const handleAddSong = async () => {
        try {
            await axios.post('http://localhost:5000/api/songs', { title, artist, album, duration, audioUrl });
            // Optionally, you can update the state or trigger any other action after successful addition
            setTitle('');
            setArtist('');
            setAlbum('');
            setDuration('');
            setAudioUrl('');
            props.update(!props.value);
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    return (
        <div className="add-song-container">
            <h1 className="search-heading">Music App</h1>
            <h1 className="playlist-heading">Add Songs</h1>
            <div className="add-song-form">
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Artist:</label>
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} />
                <label>Album:</label>
                <input type="text" value={album} onChange={(e) => setAlbum(e.target.value)} />
                <label>Duration:</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
                <label>Audio URL:</label>
                <input type="text" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} />
                <button onClick={handleAddSong}>Add Song</button>
            </div>
        </div>
    );
};

export default AddSong;