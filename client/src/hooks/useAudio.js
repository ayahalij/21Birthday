import { useRef, useEffect, useState } from 'react';

export const useAudio = (src, options = {}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(src);
    const audio = audioRef.current;

    audio.loop = options.loop || false;
    audio.volume = options.volume || 0.3;

    const handleLoadedData = () => setIsLoaded(true);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('ended', handleEnded);

    // Listen for any user interaction to enable audio
    const enableAudio = () => {
      setHasUserInteracted(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };

    document.addEventListener('click', enableAudio);
    document.addEventListener('keydown', enableAudio);
    document.addEventListener('touchstart', enableAudio);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      // Clean up event listeners
      document.removeEventListener('click', enableAudio);
      document.removeEventListener('keydown', enableAudio);
      document.removeEventListener('touchstart', enableAudio);
    };
  }, [src, options.loop, options.volume]);

  const play = async () => {
    if (audioRef.current && isLoaded && hasUserInteracted) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        return true;
      } catch (error) {
        console.log('Audio play failed:', error);
        return false;
      }
    }
    return false;
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return { play, pause, toggle, isPlaying, isLoaded, hasUserInteracted };
};