import * as styles from './index.css';
import { FormControl, InputLabel, MenuItem, Select, Stack } from '../../ui-library';
import type { SessionStatus } from '../../types';

interface SessionFiltersProps {
  statusFilter: SessionStatus | 'all';
  onStatusFilterChange: (status: SessionStatus | 'all') => void;
}

const statusOptions: Array<{ label: string; value: SessionStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Processing', value: 'processing' },
  { label: 'Completed', value: 'completed' },
  { label: 'Reviewed', value: 'reviewed' },
];

function SessionFilters({ statusFilter, onStatusFilterChange }: SessionFiltersProps) {
  return (
    <Stack className={styles.root} direction="row" spacing={2}>
      <FormControl className={styles.filter} size="small">
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          onChange={(e) => onStatusFilterChange(e.target.value as SessionStatus | 'all')}
          value={statusFilter}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}

export default SessionFilters;

