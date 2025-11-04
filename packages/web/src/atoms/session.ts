import { atom } from 'jotai';
import type { Session } from '../types';

export const sessionCacheAtom = atom<Map<string, Session>>(new Map());

