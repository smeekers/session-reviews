import { useState, useMemo } from 'react';
import { Add } from '@mui/icons-material';
import { BOOKMARK_STRINGS, COMMON_STRINGS } from '../../constants';
import { Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '../../ui-library';
import type { VideoPlayerRef } from '../../types/video-player';
import { useAddBookmark } from '../../hooks';
import { formatTimestamp } from '../../helpers/session-time';
import type { Bookmark } from '../../types';
import * as styles from './index.css';

interface BookmarksProps {
  bookmarks?: Bookmark[];
  sessionUid: string;
  videoPlayerRef?: React.RefObject<VideoPlayerRef | null>;
  getCurrentTime?: () => number;
  disabled?: boolean;
}

function Bookmarks({ bookmarks = [], sessionUid, videoPlayerRef, getCurrentTime, disabled = false }: BookmarksProps) {
  const { addBookmark } = useAddBookmark(sessionUid);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [note, setNote] = useState('');
  const [pendingTimestamp, setPendingTimestamp] = useState<number | null>(null);

  const sortedBookmarks = useMemo(() => {
    return [...bookmarks].sort((a, b) => a.timestamp - b.timestamp);
  }, [bookmarks]);

  function handleAddBookmarkClick() {
    let timestamp: number | null = null;
    
    if (getCurrentTime) {
      timestamp = Math.floor(getCurrentTime());
    } else if (videoPlayerRef?.current) {
      timestamp = Math.floor(videoPlayerRef.current.getCurrentTime());
    }

    if (timestamp !== null) {
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
    if (videoPlayerRef?.current) {
      videoPlayerRef.current.seekTo(bookmark.timestamp, 'seconds');
    }
  }

  return (
    <>
      <div className={styles.bookmarksSection}>
        <Stack className={styles.bookmarksHeader} direction="row" justifyContent="space-between">
          <Typography variant="h6">{BOOKMARK_STRINGS.TITLE}</Typography>
          <Button
            className={styles.addButton}
            disabled={disabled}
            onClick={handleAddBookmarkClick}
            size="small"
            startIcon={<Add />}
            variant="contained"
          >
            {BOOKMARK_STRINGS.ADD}
          </Button>
        </Stack>

        {bookmarks.length === 0 ? (
          <Typography color="text.secondary" variant="body2">
            {BOOKMARK_STRINGS.EMPTY_STATE_MESSAGE}
          </Typography>
        ) : (
          <Stack spacing={1}>
            {sortedBookmarks.map((bookmark) => {
              const bookmarkLabel = BOOKMARK_STRINGS.JUMP_TO_BOOKMARK(
                formatTimestamp(bookmark.timestamp),
                bookmark.note
              );
              return (
                <button
                  aria-label={bookmarkLabel}
                  className={styles.bookmarkItem}
                  key={bookmark.id}
                  onClick={() => handleBookmarkClick(bookmark)}
                  type="button"
                >
                  <Typography variant="body2">
                    {formatTimestamp(bookmark.timestamp)} {bookmark.note && `- ${bookmark.note}`}
                  </Typography>
                </button>
              );
            })}
          </Stack>
        )}
      </div>

      <Dialog onClose={handleDialogClose} open={dialogOpen}>
        <DialogTitle>{BOOKMARK_STRINGS.DIALOG_TITLE}</DialogTitle>
        <DialogContent>
          <Stack className={styles.dialogContent} spacing={2}>
            {pendingTimestamp !== null && (
              <Typography color="text.secondary" variant="body2">
                {BOOKMARK_STRINGS.TIMESTAMP_LABEL} {formatTimestamp(pendingTimestamp)}
              </Typography>
            )}
            <TextField
              autoFocus
              fullWidth
              label={BOOKMARK_STRINGS.NOTE_LABEL}
              multiline
              onChange={(e) => setNote(e.target.value)}
              placeholder={BOOKMARK_STRINGS.NOTE_PLACEHOLDER}
              rows={3}
              value={note}
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">
            {COMMON_STRINGS.CANCEL}
          </Button>
          <Button onClick={handleSaveBookmark} variant="contained">
            {BOOKMARK_STRINGS.ADD_BOOKMARK}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Bookmarks;

