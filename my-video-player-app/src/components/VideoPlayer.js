import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ video }) => {
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [seeking, setSeeking] = useState(false); 

  const playerRef = useRef(null);

  useEffect(() => {
    setPlaying(true);
  }, [video]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = ({ playedSeconds, loadedSeconds }) => {
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="w-full md:w-3/4">
      <ReactPlayer
        ref={playerRef}
        url={video.sources}
        playing={playing}
        controls
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onEnded={() => console.log('Video ended')}
        onDuration={(duration) => setDuration(duration)}
      />
      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePlayPause}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <div className="flex items-center">
          <span>{formatTime(playedSeconds)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={playedSeconds}
            onChange={(e) => setPlayedSeconds(parseFloat(e.target.value))}
            onMouseDown={handleSeekStart} 
            onMouseUp={handleSeekEnd} 
          />
          <span>{formatTime(duration)}</span>
          <select
            value={playbackRate}
            onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
