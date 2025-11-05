export const ROUTES = {
  HOME: '/',
  SESSION_DETAILS: (uid: string) => `/sessions/${uid}`,
  LIVE_SESSION: (uid: string) => `/live-session/${uid}`,
  WHITEBOARD: (uid: string) => `/whiteboard/${uid}`,
} as const;

