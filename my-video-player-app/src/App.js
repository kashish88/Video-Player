import React, { useState } from 'react';
import './App.css';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import mediaJSON from './media';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

function App() {
  const [playlist, setPlaylist] = useState(mediaJSON.categories[0].videos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoClick = (index) => {
    setCurrentVideoIndex(index);
  };

  const handleVideoReorder = (newPlaylist) => {
    setPlaylist(newPlaylist);
  };
  return (
    <AppContainer>
      <VideoPlayer video={playlist[currentVideoIndex]}/>
      <Playlist
        videos={playlist}
        onVideoClick={handleVideoClick}
        onVideoReorder={handleVideoReorder}
      />
    </AppContainer>
  );
}

export default App;
