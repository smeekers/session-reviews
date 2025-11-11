import { useMemo, useState } from 'react';
import { useAtom } from 'jotai';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { COMMON_STRINGS } from '../../../../constants';
import * as styles from './index.css';
import { statusFilterAtom } from '../../../../atoms/filters';
import { statusOptions } from '../../../../constants/session-status';
import { Button, Checkbox, Menu, MenuItem, Stack, Typography } from '../../../../ui-library';
import type { SessionStatus } from '../../../../types';

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

  function handleStatusToggle(status: SessionStatus) {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setStatusFilter((prev) => ({
        ...prev,
        [status]: !prev[status],
      }));
    };
  }

  const checkedCount = useMemo(
    () => Object.values(statusFilter).filter(Boolean).length,
    [statusFilter]
  );

  const allChecked = useMemo(() => checkedCount === statusOptions.length, [checkedCount]);

  return (
    <Stack className={styles.root} direction="row" spacing={2}>
      <Button
        aria-controls={open ? 'status-filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        aria-label={`${COMMON_STRINGS.STATUS} filter${allChecked ? '' : `: ${checkedCount} selected`}`}
        endIcon={open ? <ExpandLess /> : <ExpandMore />}
        onClick={handleClick}
        variant="outlined"
      >
        {COMMON_STRINGS.STATUS} {allChecked ? '' : `(${checkedCount})`}
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
            onClick={handleStatusToggle(option.value)}
            onMouseDown={(e) => e.preventDefault()}
          >
            <Checkbox
              aria-label={`${option.label} filter${statusFilter[option.value] ? ' (selected)' : ''}`}
              checked={statusFilter[option.value]}
              size="small"
            />
            <Typography>{option.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
      {/* TODO: add more filters */}
    </Stack>
  );
}

export default SessionFilters;

