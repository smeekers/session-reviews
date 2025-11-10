import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Typography } from '../../ui-library';
import { useAddBookmark } from '../../hooks';
import formatTimestamp from '../../helpers/format-timestamp';
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
        Add Bookmark
      </Button>

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

export default AddBookmarkButton;

