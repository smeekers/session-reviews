import { useState, useMemo } from 'react';
import { Add } from '@mui/icons-material';
import { Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '../../ui-library';
import type { VideoPlayerRef } from '../video-player/types';
import { useAddBookmark } from '../../hooks';
import formatTimestamp from '../../helpers/format-timestamp';
import type { Bookmark } from '../../types';
import * as styles from './index.css';

interface BookmarksProps {
  bookmarks?: Bookmark[];
  sessionUid: string;
  videoPlayerRef: React.RefObject<VideoPlayerRef | null>;
}

function Bookmarks({ bookmarks = [], sessionUid, videoPlayerRef }: BookmarksProps) {
  const { addBookmark } = useAddBookmark(sessionUid);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [note, setNote] = useState('');
  const [pendingTimestamp, setPendingTimestamp] = useState<number | null>(null);

  const sortedBookmarks = useMemo(() => {
    return [...bookmarks].sort((a, b) => a.timestamp - b.timestamp);
  }, [bookmarks]);

  function handleAddBookmarkClick() {
    if (videoPlayerRef.current) {
      const timestamp = Math.floor(videoPlayerRef.current.getCurrentTime());
      setPendingTimestamp(timestamp);
      setDialogOpen(true);
    }
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setNote('');
    setPendingTimestamp(null);
  }

  async function handleSaveBookmark() {
    if (pendingTimestamp !== null) {
      try {
        await addBookmark({
          timestamp: pendingTimestamp,
          note: note.trim() || undefined,
        });
        handleDialogClose();
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

  return (
    <>
      <div className={styles.bookmarksSection}>
        <Stack className={styles.bookmarksHeader} direction="row" justifyContent="space-between">
          <Typography variant="h6">Bookmarks</Typography>
          <Button
            className={styles.addButton}
            onClick={handleAddBookmarkClick}
            size="small"
            startIcon={<Add />}
            variant="contained"
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
            {sortedBookmarks.map((bookmark) => (
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

      <Dialog onClose={handleDialogClose} open={dialogOpen}>
        <DialogTitle>Add Bookmark</DialogTitle>
        <DialogContent>
          <Stack className={styles.dialogContent} spacing={2}>
            {pendingTimestamp !== null && (
              <Typography color="text.secondary" variant="body2">
                Timestamp: {formatTimestamp(pendingTimestamp)}
              </Typography>
            )}
            <TextField
              autoFocus
              fullWidth
              label="Note (optional)"
              multiline
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about this moment..."
              rows={3}
              value={note}
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveBookmark} variant="contained">
            Add Bookmark
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Bookmarks;

