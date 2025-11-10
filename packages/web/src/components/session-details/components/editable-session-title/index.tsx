import { useState, useRef, useEffect } from 'react';
import { Edit } from '@mui/icons-material';
import { TextField, Typography } from '../../../../ui-library';
import * as styles from './index.css';

interface EditableSessionTitleProps {
  name?: string;
  onSave: (name: string | undefined) => Promise<void>;
  placeholder?: string;
}

function EditableSessionTitle({ name, onSave, placeholder = 'Add a title...' }: EditableSessionTitleProps) {
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
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
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          value={localValue}
          variant="standard"
        />
      </div>
    );
  }

  return (
    <div className={styles.root} onClick={handleClick}>
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

