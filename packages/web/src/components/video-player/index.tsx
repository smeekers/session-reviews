import type { ReactPlayerProps } from 'react-player';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import ReactPlayer from 'react-player';
import * as styles from './index.css';
import type { VideoPlayerRef } from './types';

interface VideoPlayerProps extends Omit<Partial<ReactPlayerProps>, 'onEnded' | 'onPause' | 'onPlay' | 'onReady'> {
  className?: string;
  currentTime?: number;
  onEnded?: (player: VideoPlayerRef | null) => void;
  onPause?: (player: VideoPlayerRef | null) => void;
  onPlay?: (player: VideoPlayerRef | null) => void;
  onReady?: (player: VideoPlayerRef | null) => void;
  url: string;
}

const VideoPlayer = forwardRef<VideoPlayerRef | null, VideoPlayerProps>(
  function VideoPlayer(
    {
      className,
      currentTime,
      onEnded,
      onPause,
      onPlay,
      onReady,
      url,
      ...videoPlayerProps
    },
    ref
  ) {
    const innerRef = useRef<VideoPlayerRef | null>(null);
    const playerReady = useRef(false);

    function handlePlay() {
      const currentPlayer = innerRef.current;
      onPlay?.(currentPlayer);
    }

    function handlePause() {
      const currentPlayer = innerRef.current;
      onPause?.(currentPlayer);
    }

    function handleEnded() {
      const currentPlayer = innerRef.current;
      onEnded?.(currentPlayer);
    }

    function handleReady(player: ReactPlayer) {
      playerReady.current = true;
      onReady?.(player as VideoPlayerRef);
    }

    const callbackRef = useCallback((player: VideoPlayerRef | null) => {
      innerRef.current = player;
    }, []);

    useImperativeHandle<VideoPlayerRef | null, VideoPlayerRef | null>(ref, () => innerRef.current ?? null);

    useEffect(() => {
      const currentPlayer = innerRef.current;
      if (typeof currentTime === 'number' && currentTime >= 0 && currentPlayer && playerReady.current) {
        currentPlayer.seekTo(currentTime, 'seconds');
      }
    }, [currentTime]);

    return (
      <div className={className}>
        <ReactPlayer
          className={styles.player}
          controls
          height="100%"
          ref={callbackRef}
          width="100%"
          {...videoPlayerProps}
          onEnded={handleEnded}
          onPause={handlePause}
          onPlay={handlePlay}
          onReady={handleReady}
          url={url}
        />
      </div>
    );
  }
);

export default VideoPlayer;

