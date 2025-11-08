type SessionStatus = 'ready' | 'in-progress' | 'processing' | 'completed' | 'reviewed';

interface Bookmark {
  id: string;
  timestamp: number;
  note?: string;
  createdAt: string;
}

type AISuggestionStatus = 'pending' | 'done' | 'dismissed';

interface AISuggestion {
  id: string;
  content: string;
  status: AISuggestionStatus;
  createdAt: string;
}

interface AISummaryComponent {
  component_type: string;
  component_order: number;
  content: string;
  content_details?: unknown;
}

interface Session {
  uid: string;
  name?: string;
  videoUrl?: string;
  transcript?: string;
  aiSummary?: AISummaryComponent[];
  aiSummaryFeedback?: 0 | 1;
  aiSuggestions?: AISuggestion[];
  aiSuggestionsFeedback?: 0 | 1;
  liveblocksRoom: string;
  status: SessionStatus;
  bookmarks?: Bookmark[];
  startTime?: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}

export type { AISuggestion, AISuggestionStatus, AISummaryComponent, Bookmark, Session, SessionStatus };
