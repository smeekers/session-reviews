import { atom } from 'jotai';

export type BannerState = 
  | { type: 'hidden' }
  | { type: 'creating'; sessionUid: string }
  | { type: 'ready'; sessionUid: string; sessionName?: string };

export const bannerAtom = atom<BannerState>({ type: 'hidden' });

