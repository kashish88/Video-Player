import React, { useState } from 'react';
import './App.css';
import VideoPlayer from './components/VideoPlayer';
import mediaJSON from './media';

function App() {
  const [playlist, setPlaylist] = useState(mediaJSON.categories[0].videos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  return (
    <div >
      <VideoPlayer video={playlist[currentVideoIndex]}/>
    </div>
  );
}

export default App;
