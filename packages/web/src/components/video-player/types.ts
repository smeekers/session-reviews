import type ReactPlayer from 'react-player';

type VideoPlayerRef = ReactPlayer & {
  seekTo: (amount: number, type: 'seconds' | 'fraction') => void;
  getCurrentTime: () => number;
  getSecondsLoaded: () => number;
  getDuration: () => number;
};

export type { VideoPlayerRef };
