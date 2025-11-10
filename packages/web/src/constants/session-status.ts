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

const actionTexts: Record<SessionStatus, string> = {
  'ready': 'Start Session',
  'in-progress': 'Join Session',
  'processing': 'View Whiteboard',
  'completed': 'Review Now',
  'reviewed': 'Review Again',
};

const statusMessages: Record<SessionStatus, string> = {
  'ready': 'Session is ready! You can begin recording and start your session.',
  'in-progress': 'Session is currently in progress. You can join now and collaborate on the whiteboard.',
  'processing': 'Session is being processed. The recording is being uploaded and analyzed. You can still access the whiteboard while you wait.',
  'completed': '',
  'reviewed': '',
};

export { actionTexts, statusColors, statusLabels, statusMessages, statusOptions };
