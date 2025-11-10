type SessionStatus = 'ready' | 'in-progress' | 'processing' | 'completed' | 'reviewed';

interface Bookmark {
  id: string;
  timestamp: number;
  note?: string;
  createdAt: string;
}

type AISuggestionStatus = 'pending' | 'done' | 'dismissed';

type AISuggestionType = 'task' | 'feedback' | 'idea';

interface AISuggestion {
  id: string;
  title: string;
  content: string;
  status: AISuggestionStatus;
  type: AISuggestionType;
  createdAt: string;
}

interface AISummaryComponent {
  component_type: string;
  component_order: number;
  content: string;
  content_details?: AISuggestion[] | unknown;
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

export type { AISuggestion, AISuggestionStatus, AISuggestionType, AISummaryComponent, Bookmark, Session, SessionStatus };
