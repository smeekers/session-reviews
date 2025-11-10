import type { AISuggestionStatus, AISuggestion, AISummaryComponent, SessionStatus } from './session';

/**
 * API request/response types
 */

export interface CreateSessionRequest {
  name?: string;
}

export interface UpdateAIFeedbackRequest {
  feedback: 0 | 1;
}

export interface UpdateSessionRequest {
  name?: string;
  status?: SessionStatus;
  startTime?: string;
  endTime?: string;
  videoUrl?: string;
  transcript?: string;
  aiSummary?: AISummaryComponent[];
  aiSuggestions?: AISuggestion[];
}

export interface AddBookmarkRequest {
  timestamp: number;
  note?: string;
}

export interface UpdateSuggestionStatusRequest {
  status: AISuggestionStatus;
}

/**
 * JSON-serializable value type
 */
type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

/**
 * Fetch options for API requests
 */
export interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: JSONValue;
}

