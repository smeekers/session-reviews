import { useState } from 'react';
import { useAtom } from 'jotai';
import * as styles from './index.css';
import { statusFilterAtom } from '../../atoms/filters';
import { statusOptions } from '../../constants/session-status';
import { Button, Checkbox, Menu, MenuItem, Stack, Typography } from '../../ui-library';
import type { SessionStatus } from '../../types';

function SessionFilters() {
  const [statusFilter, setStatusFilter] = useAtom(statusFilterAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleStatusToggle(status: SessionStatus, event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setStatusFilter((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  }

  const checkedCount = Object.values(statusFilter).filter(Boolean).length;
  const allChecked = checkedCount === statusOptions.length;

  return (
    <Stack className={styles.root} direction="row" spacing={2}>
      <Button
        aria-controls={open ? 'status-filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        Status {allChecked ? '' : `(${checkedCount})`}
      </Button>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        id="status-filter-menu"
        onClose={handleClose}
        open={open}
      >
        {statusOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={(e) => handleStatusToggle(option.value, e)}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Checkbox checked={statusFilter[option.value]} size="small" />
            <Typography>{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
      {/* More filters can be added here later */}
    </Stack>
  );
}

export default SessionFilters;

