import { useState, useRef, useEffect } from 'react';
import { Edit } from '@mui/icons-material';
import { SESSION_STRINGS } from '../../../../constants';
import { TextField, Typography } from '../../../../ui-library';
import * as styles from './index.css';

interface EditableSessionTitleProps {
  name?: string;
  onSave: (name: string | undefined) => Promise<void>;
  placeholder?: string;
}

function EditableSessionTitle({ name, onSave, placeholder = SESSION_STRINGS.TITLE_PLACEHOLDER }: EditableSessionTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(name || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setLocalValue(name || '');
    }
  }, [name, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function handleClick() {
    setIsEditing(true);
  }

  function handleDivKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsEditing(true);
    }
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current?.blur();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setLocalValue(name || '');
      setIsEditing(false);
    }
  }

  async function handleBlur() {
    setIsEditing(false);
    const trimmedValue = localValue.trim();
    const finalValue = trimmedValue || undefined;

    if (finalValue !== name) {
      await onSave(finalValue);
    } else {
      setLocalValue(name || '');
    }
  }

  if (isEditing) {
    return (
      <div className={styles.root}>
        <TextField
          className={styles.input}
          inputRef={inputRef}
          onBlur={handleBlur}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          value={localValue}
          variant="standard"
        />
      </div>
    );
  }

  return (
    <div
      aria-label={SESSION_STRINGS.EDIT_TITLE_LABEL}
      className={styles.root}
      onClick={handleClick}
      onKeyDown={handleDivKeyDown}
      role="button"
      tabIndex={0}
    >
      <Typography
        className={name ? styles.title : styles.placeholder}
        color={name ? 'text.primary' : 'text.secondary'}
        variant="h4"
      >
        {name || placeholder}
      </Typography>
      <Edit className={styles.icon} fontSize="small" />
    </div>
  );
}

export default EditableSessionTitle;

