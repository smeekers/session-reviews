/**
 * Bookmark-related UI strings
 */

export const BOOKMARK_STRINGS = {
  TITLE: 'Bookmarks',
  ADD: 'Add',
  ADD_BOOKMARK: 'Add Bookmark',
  DIALOG_TITLE: 'Add Bookmark',
  NOTE_LABEL: 'Note (optional)',
  NOTE_PLACEHOLDER: 'Add a note about this moment...',
  TIMESTAMP_LABEL: 'Timestamp:',
  EMPTY_STATE_MESSAGE: 'It looks like you haven\'t added any bookmarks to this video. As you watch, you can add bookmarks to mark important moments or sections you want to return to.',
  JUMP_TO_BOOKMARK: (timestamp: string, note?: string) =>
    note ? `Jump to bookmark at ${timestamp}: ${note}` : `Jump to bookmark at ${timestamp}`,
} as const;

