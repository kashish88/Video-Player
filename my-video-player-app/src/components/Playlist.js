import React, { useState } from 'react';
import styled from 'styled-components';

const PlaylistContainer = styled.div`
  flex: 1;
  max-width: 25%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 1rem; /* Add padding for better spacing */

  input {
    margin-bottom: 0.5rem;
    padding: 0.5rem; /* Add padding to input */
    border: 1px solid #ccc; /* Add border for better visibility */
    border-radius: 4px; /* Add border radius */
    font-size: 1rem; /* Adjust font size */
  }
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
  padding: 0.5rem;
  transition: background-color 0.3s;
  border-radius: 4px; /* Add border radius */

  img {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
    border-radius: 4px;
  }

  span {
    font-size: 1rem;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Playlist = ({ videos, onVideoClick, onVideoReorder }) => {
  const [playlist, setPlaylist] = useState(videos);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlaylist = playlist.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleItemClick = (index) => {

    const originalIndex = playlist.findIndex((video) => video === filteredPlaylist[index]);
    onVideoClick(originalIndex);
  };
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

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    const oldIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    handleSortEnd(oldIndex, newIndex);
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <PlaylistContainer>
      <PlaylistHeader>Playlist</PlaylistHeader>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredPlaylist.map((video, index) => (
          <PlaylistItem
            key={index}
            onClick={() => handleItemClick(index)}
            draggable
            onDragStart={e => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, index)}
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
