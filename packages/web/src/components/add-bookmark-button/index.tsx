import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { BOOKMARK_STRINGS, COMMON_STRINGS } from '../../constants';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Typography } from '../../ui-library';
import { useAddBookmark } from '../../hooks';
import { formatTimestamp } from '../../helpers/session-time';
import * as styles from './index.css';

interface AddBookmarkButtonProps {
  disabled?: boolean;
  getCurrentTime: () => number;
  sessionUid: string;
}

function AddBookmarkButton({ disabled = false, getCurrentTime, sessionUid }: AddBookmarkButtonProps) {
  const { addBookmark } = useAddBookmark(sessionUid);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [note, setNote] = useState('');
  const [pendingTimestamp, setPendingTimestamp] = useState<number | null>(null);

  function handleAddBookmarkClick() {
    const timestamp = Math.floor(getCurrentTime());
    setPendingTimestamp(timestamp);
    setDialogOpen(true);
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

  return (
    <>
      <Button
        className={styles.addButton}
        disabled={disabled}
        onClick={handleAddBookmarkClick}
        size="small"
        startIcon={<Add />}
        variant="contained"
      >
        {BOOKMARK_STRINGS.ADD_BOOKMARK}
      </Button>

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

export default AddBookmarkButton;

