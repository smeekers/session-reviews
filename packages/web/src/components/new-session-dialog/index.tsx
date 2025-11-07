import { useState } from 'react';
import { useAtom } from 'jotai';
import * as styles from './index.css';
import { bannerAtom } from '../../atoms/banner';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '../../ui-library';
import useCreateSession from '../../hooks/use-create-session';

interface NewSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onSessionCreated: (sessionUid: string, sessionName?: string) => void;
}

function NewSessionDialog({ open, onClose, onSessionCreated }: NewSessionDialogProps) {
  const [name, setName] = useState('');
  const { createSession, isLoading } = useCreateSession();
  const [, setBannerState] = useAtom(bannerAtom);

  function handleCancel() {
    setName('');
    onClose();
  }

  async function handleCreate() {
    if (isLoading) {
      return;
    }

    const trimmedName = name.trim();
    
    // Show creating banner immediately
    const tempUid = `temp_${Date.now()}`;
    setBannerState({ type: 'creating', sessionUid: tempUid });

    try {
      const session = await createSession({ name: trimmedName || undefined });
      setName('');
      onClose();
      onSessionCreated(session.uid, session.name);
    } catch (error) {
      // Error handling - reset banner on error
      setBannerState({ type: 'hidden' });
      console.error('Failed to create session:', error);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && !isLoading && name.trim()) {
      event.preventDefault();
      handleCreate();
    }
  }

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle>New Session</DialogTitle>
      <DialogContent>
        <Stack className={styles.content} spacing={2}>
          <TextField
            autoFocus
            disabled={isLoading}
            fullWidth
            label="Session Name (optional)"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a name for this session"
            value={name}
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={handleCancel} variant="outlined">
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleCreate} variant="contained">
          {isLoading ? 'Creating...' : 'Create Session'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewSessionDialog;

