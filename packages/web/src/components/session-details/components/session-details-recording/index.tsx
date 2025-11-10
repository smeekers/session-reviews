import { useRef } from 'react';
import { Stack, Typography, Paper } from '../../../../ui-library';
import VideoPlayer from '../../../../components/video-player';
import type { VideoPlayerRef } from '../../../../types/video-player';
import Bookmarks from '../../../../components/bookmarks';
import type { Bookmark } from '../../../../types';
import * as styles from './index.css';

interface SessionDetailsRecordingProps {
  bookmarks?: Bookmark[];
  sessionUid: string;
  videoUrl?: string;
}

function SessionDetailsRecording({
  bookmarks = [],
  sessionUid,
  videoUrl,
}: SessionDetailsRecordingProps) {
  const videoPlayerRef = useRef<VideoPlayerRef | null>(null);

  if (!videoUrl) {
    return null;
  }

  return (
    <Stack className={styles.root} spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5">Session Recording</Typography>
        <Typography color="text.secondary" variant="body2">
          Catch up or revisit key moments from the session recording.
        </Typography>
      </Stack>

      <Paper className={styles.videoContainer}>
        <div className={styles.videoWrapper}>
          <VideoPlayer
            className={styles.videoPlayer}
            ref={videoPlayerRef}
            url={videoUrl}
          />
        </div>

        <Bookmarks
          bookmarks={bookmarks}
          sessionUid={sessionUid}
          videoPlayerRef={videoPlayerRef}
        />
      </Paper>
    </Stack>
  );
}

export default SessionDetailsRecording;
