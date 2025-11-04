import { atom } from 'jotai';
import type { Session } from '../types';

export const sessionsAtom = atom<Session[]>([]);
export const sessionsLoadingAtom = atom<boolean>(false);
export const sessionsErrorAtom = atom<Error | null>(null);

