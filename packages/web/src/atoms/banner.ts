import { atom } from 'jotai';
import { ROUTES } from '../constants/routes';

type BannerState =
  | { type: 'hidden' }
  | { type: 'creating'; sessionUid: string }
  | { type: 'ready'; sessionUid: string; sessionName?: string }
  | { type: 'processing'; sessionUid: string; sessionName?: string }
  | { type: 'completed'; sessionUid: string; sessionName?: string };

interface BannerConfig {
  actionButton?: {
    label: string;
    route: string;
  };
  message: string;
  severity: 'info' | 'success';
}

function getBannerConfig(state: BannerState): BannerConfig | null {
  switch (state.type) {
    case 'hidden':
      return null;
    case 'creating':
      return {
        message: 'Creating session...',
        severity: 'info',
      };
    case 'ready': {
      const sessionName = state.sessionName ? `: ${state.sessionName}` : '';
      return {
        actionButton: {
          label: 'Join Now',
          route: ROUTES.LIVE_SESSION(state.sessionUid),
        },
        message: `Session ready${sessionName}`,
        severity: 'success',
      };
    }
    case 'processing': {
      const sessionName = state.sessionName ? `: ${state.sessionName}` : '';
      return {
        message: `Processing session${sessionName}...`,
        severity: 'info',
      };
    }
    case 'completed': {
      const sessionName = state.sessionName ? `: ${state.sessionName}` : '';
      return {
        actionButton: {
          label: 'View Now',
          route: ROUTES.SESSION_DETAILS(state.sessionUid),
        },
        message: `Session processing complete${sessionName}`,
        severity: 'success',
      };
    }
    default:
      return null;
  }
}

const bannerAtom = atom<BannerState>({ type: 'hidden' });

export { bannerAtom, getBannerConfig };
export type { BannerConfig, BannerState };
