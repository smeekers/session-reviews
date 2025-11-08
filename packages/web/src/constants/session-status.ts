import type { SessionStatus } from '../types';

const statusColors: Record<SessionStatus, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'> = {
  ready: 'secondary',
  'in-progress': 'primary',
  processing: 'warning',
  completed: 'default',
  reviewed: 'success',
};

const statusLabels: Record<SessionStatus, string> = {
  ready: 'Ready',
  'in-progress': 'In Progress',
  processing: 'Processing',
  completed: 'Completed',
  reviewed: 'Reviewed',
};

const statusOptions: Array<{ label: string; value: SessionStatus }> = [
  { label: statusLabels.ready, value: 'ready' },
  { label: statusLabels['in-progress'], value: 'in-progress' },
  { label: statusLabels.processing, value: 'processing' },
  { label: statusLabels.completed, value: 'completed' },
  { label: statusLabels.reviewed, value: 'reviewed' },
];

export { statusColors, statusLabels, statusOptions };
