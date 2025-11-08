import { atom } from 'jotai';
import type { SessionStatus } from '../types';

type StatusFilter = Record<SessionStatus, boolean>;

const defaultStatusFilter: StatusFilter = {
  'ready': true,
  'in-progress': true,
  'processing': true,
  'completed': true,
  'reviewed': true,
};

const statusFilterAtom = atom<StatusFilter>(defaultStatusFilter);

export { statusFilterAtom };
export type { StatusFilter };
