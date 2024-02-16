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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    margin-top: 1em;
  }
`;

const ControlBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem; /* Add some vertical spacing between controls */

  @media (min-width: 768px) {
    flex-direction: row;
  }
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
  padding: 0.5rem;
`;

const VolumeControlContainer = styled.div`
  display: flex;
  align-items: center;
`;

const VolumeLabel = styled.span`
  margin-right: 0.5rem;
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

const EnableSoundButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;

  &:hover {
    background-color: #218838;
  }
`;
const VideoPlayer = ({ video,autoplay }) => {
  const [playing, setPlaying] = useState(false); 
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [seeking, setSeeking] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [fullscreen, setFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);

    useEffect(() => {
    if (autoplay) {
      setPlaying(true);
    }
  }, [autoplay]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setFullscreen(
        !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        )
      );
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, []);

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
      if (playerContainerRef.current.requestFullscreen) {
        playerContainerRef.current.requestFullscreen();
      } else if (playerContainerRef.current.mozRequestFullScreen) {
        playerContainerRef.current.mozRequestFullScreen();
      } else if (playerContainerRef.current.webkitRequestFullscreen) {
        playerContainerRef.current.webkitRequestFullscreen();
      } else if (playerContainerRef.current.msRequestFullscreen) {
        playerContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => console.error('Exit fullscreen error:', err));
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const volumePercentage = Math.round(volume * 100);

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
        width="100%"
        height="100%"
        muted={!soundEnabled}
      />
      <ControlBar>
        <PlayButton onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</PlayButton>
        <VolumeControlContainer>
          <VolumeLabel>{volumePercentage}%</VolumeLabel>
          <VolumeControl
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </VolumeControlContainer>
        {fullscreen ? (
          <FullscreenButton onClick={handleFullscreen}>Exit Fullscreen</FullscreenButton>
        ) : (
          <FullscreenButton onClick={handleFullscreen}>Fullscreen</FullscreenButton>
        )}
       {soundEnabled || (
          <EnableSoundButton onClick={() => setSoundEnabled(true)}>Enable Sound</EnableSoundButton>
        )}
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
