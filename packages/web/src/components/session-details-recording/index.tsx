import { useRef } from 'react';
import { Add } from '@mui/icons-material';
import { Stack, Typography, Button, Paper } from '../../ui-library';
import VideoPlayer from '../video-player';
import type { VideoPlayerRef } from '../video-player/types';
import { useAddBookmark } from '../../hooks';
import type { Bookmark } from '../../types';
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
  const { addBookmark } = useAddBookmark(sessionUid);

  async function handleAddBookmark() {
    if (videoPlayerRef.current) {
      const timestamp = Math.floor(videoPlayerRef.current.getCurrentTime());
      try {
        await addBookmark({ timestamp });
      } catch (err) {
        console.error('Failed to add bookmark:', err);
      }
    }
  }

  function handleBookmarkClick(bookmark: Bookmark) {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.seekTo(bookmark.timestamp, 'seconds');
    }
  }

  function formatTimestamp(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

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

        <div className={styles.bookmarksSection}>
          <Stack className={styles.bookmarksHeader} direction="row" justifyContent="space-between">
            <Typography variant="h6">Bookmarks</Typography>
            <Button
              onClick={handleAddBookmark}
              size="small"
              startIcon={<Add />}
              variant="outlined"
            >
              Add
            </Button>
          </Stack>

          {bookmarks.length === 0 ? (
            <Typography color="text.secondary" variant="body2">
              It looks like you haven't added any bookmarks to this video. As you watch, you can add
              bookmarks to mark important moments or sections you want to return to.
            </Typography>
          ) : (
            <Stack spacing={1}>
              {bookmarks.map((bookmark) => (
                <button
                  className={styles.bookmarkItem}
                  key={bookmark.id}
                  onClick={() => handleBookmarkClick(bookmark)}
                  type="button"
                >
                  <Typography variant="body2">
                    {formatTimestamp(bookmark.timestamp)} {bookmark.note && `- ${bookmark.note}`}
                  </Typography>
                </button>
              ))}
            </Stack>
          )}
        </div>
      </Paper>
    </Stack>
  );
}

export default SessionDetailsRecording;

