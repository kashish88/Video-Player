import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;


const PlayerContainer = styled.div`
  flex: 1;
  margin-top: 1rem;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const PlayButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TimeLabel = styled.span`
  margin: 0 0.5rem;
`;

const PlaybackRateSelect = styled.select`
  margin-left: 0.5rem;
  padding: 0.5rem;
`;

const VolumeControl = styled.input`
  width: 100px;
`;

const FullscreenButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const VideoPlayer = ({ video }) => {
  const [playing, setPlaying] = useState(true);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [seeking, setSeeking] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [fullscreen, setFullscreen] = useState(false);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

  
  

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = ({ playedSeconds }) => {
    if (!seeking) {
      setPlayedSeconds(playedSeconds);
    }
  };

  const handleSeekStart = () => {
    setSeeking(true);
  };

  const handleSeekEnd = () => {
    playerRef.current.seekTo(playedSeconds);
    setSeeking(false);
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
  };

  const handleFullscreen = () => {
    if (!fullscreen) {
      if (playerContainerRef.current) {
        playerContainerRef.current.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <PlayerContainer ref={playerContainerRef}>
      <ReactPlayer
        ref={playerRef}
        url={video.sources}
        playing={playing}
        playbackRate={playbackRate}
        volume={volume}
        onProgress={handleProgress}
        onEnded={() => console.log('Video ended')}
        onDuration={(duration) => setDuration(duration)}
        onReady={() => setPlaying(true)}
        width="100%"
          height="100%"
      />
      <ControlBar>
        <PlayButton onClick={handlePlayPause}>
          {playing ? 'Pause' : 'Play'}
        </PlayButton>
        <VolumeControl
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
        />
         <FullscreenButton onClick={handleFullscreen}>
          {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </FullscreenButton>
        <div>
          <TimeLabel>{formatTime(playedSeconds)}</TimeLabel>
          <input
            type="range"
            min={0}
            max={duration}
            value={playedSeconds}
            onChange={(e) => setPlayedSeconds(parseFloat(e.target.value))}
            onMouseDown={handleSeekStart}
            onMouseUp={handleSeekEnd}
          />
          <TimeLabel>{formatTime(duration)}</TimeLabel>
          <PlaybackRateSelect
            value={playbackRate}
            onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </PlaybackRateSelect>
        </div>
      </ControlBar>
    </PlayerContainer>
  );
};
export default VideoPlayer;
