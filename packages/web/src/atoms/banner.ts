import { atom } from 'jotai';

type BannerState =
  | { type: 'hidden' }
  | { type: 'creating'; sessionUid: string }
  | { type: 'ready'; sessionUid: string; sessionName?: string };

const bannerAtom = atom<BannerState>({ type: 'hidden' });

export { bannerAtom };
export type { BannerState };
