/**
 * Timing constants used throughout the application
 */

// Time conversions (in milliseconds)
export const MILLISECONDS_PER_SECOND = 1000;
export const SECONDS_PER_MINUTE = 60;
export const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;

// UI timing constants
export const SHARE_BUTTON_RESET_DELAY_MS = 2000; // 2 seconds

// Recording constants
export const MEDIA_RECORDER_TIMESLICE_MS = 1000; // 1 second chunks

// YJS/Excalidraw constants
export const UNDO_MANAGER_CAPTURE_TIMEOUT_MS = 500; // 500ms

// React Query constants
export const QUERY_STALE_TIME_MINUTES = 5;
export const QUERY_STALE_TIME_MS = QUERY_STALE_TIME_MINUTES * MILLISECONDS_PER_MINUTE;

