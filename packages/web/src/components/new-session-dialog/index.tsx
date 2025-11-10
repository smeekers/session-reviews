import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { COMMON_STRINGS, DIALOG_STRINGS } from '../../constants';
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
      <DialogTitle>{DIALOG_STRINGS.NEW_SESSION.TITLE}</DialogTitle>
      <DialogContent>
        <Stack className={styles.content} spacing={2}>
          <TextField
            autoFocus
            disabled={false}
            fullWidth
            label={DIALOG_STRINGS.NEW_SESSION.SESSION_NAME_LABEL}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={DIALOG_STRINGS.NEW_SESSION.SESSION_NAME_PLACEHOLDER}
            value={name}
            variant="outlined"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="outlined">
          {COMMON_STRINGS.CANCEL}
        </Button>
        <Button onClick={handleCreate} variant="contained">
          {DIALOG_STRINGS.NEW_SESSION.CREATE_BUTTON}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewSessionDialog;

