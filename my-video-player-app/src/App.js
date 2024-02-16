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
    align-items: flex-start; /* Adjust alignment for row layout */
  }
`;
const VideoHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
const AppContent = styled.div`
  flex: 1; /* Ensure the content takes up available space */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
       <AppContent>
       <VideoHeader>Video Player</VideoHeader>
      <VideoPlayer video={playlist[currentVideoIndex]} autoplay={true}/>
      </AppContent>
      <Playlist
        videos={playlist}
        onVideoClick={handleVideoClick}
        onVideoReorder={handleVideoReorder}
      />
    </AppContainer>
  );
}

export default App;
