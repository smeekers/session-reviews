import { atom } from 'jotai';
import type { SessionStatus } from '../types';

export type StatusFilter = Record<SessionStatus, boolean>;

const defaultStatusFilter: StatusFilter = {
  'ready': true,
  'in-progress': true,
  'processing': true,
  'completed': true,
  'reviewed': true,
};

export const statusFilterAtom = atom<StatusFilter>(defaultStatusFilter);

