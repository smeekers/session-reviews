type SessionStatus = 'ready' | 'in-progress' | 'processing' | 'completed' | 'reviewed';

interface Bookmark {
  id: string;
  timestamp: number;
  note?: string;
  createdAt: string;
}

interface AISuggestion {
  id: string;
  content: string;
  feedback?: 0 | 1;
  createdAt: string;
}

interface Session {
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
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}

export type { AISuggestion, Bookmark, Session, SessionStatus };
