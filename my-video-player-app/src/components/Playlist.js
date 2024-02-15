import React, { useState } from 'react';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  flex: 1;
  max-width: 25%;
`;

const PlaylistHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const PlaylistItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;

  img {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    border-radius: 4px;
  }

  span {
    font-size: 1rem;
  }
`;

const Playlist = ({ videos, onVideoClick, onVideoReorder }) => {
  const [playlist, setPlaylist] = useState(videos);

  const handleSortEnd = (oldIndex, newIndex) => {
    const newPlaylist = [...playlist];
    const [removed] = newPlaylist.splice(oldIndex, 1);
    newPlaylist.splice(newIndex, 0, removed);
    setPlaylist(newPlaylist);
    onVideoReorder(newPlaylist);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    handleSortEnd(oldIndex, newIndex);
  };

  return (
    <PlaylistContainer>
      <PlaylistHeader>Playlist</PlaylistHeader>
      <ul>
        {playlist.map((video, index) => (
          <PlaylistItem
            key={index}
            onClick={() => onVideoClick(index)}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <img src={video.thumb} alt={video.title} />
            <span>{video.title}</span>
          </PlaylistItem>
        ))}
      </ul>
    </PlaylistContainer>
  );
};

export default Playlist;
