import { useState } from 'react';
import { useSetAtom } from 'jotai';
import * as styles from './index.css';
import { bannerAtom } from '../../atoms/banner';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '../../ui-library';
import { useCreateSession } from '../../hooks';

interface NewSessionDialogProps {
  open: boolean;
  onClose: () => void;
  onSessionCreated: (sessionUid: string, sessionName?: string) => void;
}

function NewSessionDialog({ open, onClose, onSessionCreated }: NewSessionDialogProps) {
  const [name, setName] = useState('');
  const { createSession } = useCreateSession();
  const setBannerState = useSetAtom(bannerAtom);

  function handleCancel() {
    setName('');
    onClose();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Enter' && name.trim()) {
      event.preventDefault();
      handleCreate();
    }
  }

  async function handleCreate() {
    const trimmedName = name.trim();
    
    const tempUid = `temp_${Date.now()}`;
    setBannerState({ type: 'creating', sessionUid: tempUid });
    
    setName('');
    onClose();

    try {
      const session = await createSession({ name: trimmedName || undefined });
      setBannerState({
        type: 'ready',
        sessionUid: session.uid,
        sessionName: session.name,
      });
      onSessionCreated(session.uid, session.name);
    } catch (error) {
      setBannerState({ type: 'hidden' });
      console.error('Failed to create session:', error);
    }
  }

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle>New Session</DialogTitle>
      <DialogContent>
        <Stack className={styles.content} spacing={2}>
          <TextField
            autoFocus
            disabled={false}
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
        <Button onClick={handleCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleCreate} variant="contained">
          Create Session
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewSessionDialog;

