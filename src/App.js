import React from 'react';
import {
    BrowserRouter as Router,
    Route, Routes, Link
} from 'react-router-dom';
import Playlist from './Playlist';
import Search from './Search';
import AddSong from './AddSong';
import { useState } from 'react';

function App() {
    const [isSongadded,setSongadded]=useState(false)
    return (
        <>
            <AddSong update={setSongadded} value={isSongadded}/>
            {/* <Playlist /> */}
            <Search value={isSongadded} />
        </>
    );
}

export default App;
