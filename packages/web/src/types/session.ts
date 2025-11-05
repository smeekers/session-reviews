export type SessionStatus = 'ready' | 'in-progress' | 'processing' | 'completed' | 'reviewed';

export interface Bookmark {
  id: string;
  timestamp: number;
  note?: string;
  createdAt: string;
}

export interface AISuggestion {
  id: string;
  content: string;
  feedback?: 0 | 1;
  createdAt: string;
}

export interface Session {
  uid: string;
  name?: string;
  videoUrl?: string;
  transcript?: string;
  aiSummary?: string;
  aiSummaryFeedback?: 0 | 1;
  aiSuggestions?: AISuggestion[];
  liveblocksRoom: string;
  status: SessionStatus;
  bookmarks?: Bookmark[];
  startTime: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}

