import type ReactPlayer from 'react-player';

export type VideoPlayerRef = ReactPlayer & {
  seekTo: (amount: number, type: 'seconds' | 'fraction') => void;
  getCurrentTime: () => number;
  getSecondsLoaded: () => number;
  getDuration: () => number;
};

