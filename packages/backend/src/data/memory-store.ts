// In-memory data store for local development
// This will be replaced with DynamoDB in production

export type SessionStatus = 'ready' | 'in-progress' | 'processing' | 'completed' | 'reviewed';

export type AISuggestionStatus = 'pending' | 'done' | 'dismissed';

export type AISuggestionType = 'task' | 'feedback' | 'idea';

export interface Bookmark {
  id: string;
  timestamp: number;
  note?: string;
  createdAt: string;
}

export interface AISuggestion {
  id: string;
  title: string;
  content: string;
  status: AISuggestionStatus;
  type: AISuggestionType;
  createdAt: string;
}

export interface AISummaryComponent {
  component_type: string;
  component_order: number;
  content: string;
  content_details?: AISuggestion[] | unknown;
}

export interface Session {
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

export class MemoryStore {
  sessions: Map<string, Session> = new Map();

  async getSession(uid: string): Promise<Session | undefined> {
    return this.sessions.get(uid);
  }

  async getAllSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values()).sort((a, b) => {
      const aTime = a.startTime ? new Date(a.startTime).getTime() : new Date(a.createdAt).getTime();
      const bTime = b.startTime ? new Date(b.startTime).getTime() : new Date(b.createdAt).getTime();
      return bTime - aTime;
    });
  }

  async createSession(session: Omit<Session, 'createdAt' | 'updatedAt'>): Promise<Session> {
    const now = new Date().toISOString();
    const newSession: Session = {
      ...session,
      createdAt: now,
      updatedAt: now,
    };
    this.sessions.set(session.uid, newSession);
    return newSession;
  }

  async updateSession(uid: string, updates: Partial<Session>): Promise<Session | undefined> {
    const session = this.sessions.get(uid);
    if (!session) {
      return undefined;
    }
    const updated: Session = {
      ...session,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.sessions.set(uid, updated);
    return updated;
  }

  async deleteSession(uid: string): Promise<boolean> {
    return this.sessions.delete(uid);
  }

  async addBookmark(
    sessionUid: string,
    bookmark: Omit<Bookmark, 'id' | 'createdAt'>
  ): Promise<Bookmark | undefined> {
    const session = await this.getSession(sessionUid);
    if (!session) {
      return undefined;
    }

    const newBookmark: Bookmark = {
      ...bookmark,
      id: `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    const bookmarks = session.bookmarks || [];
    bookmarks.push(newBookmark);

    await this.updateSession(sessionUid, { bookmarks });
    return newBookmark;
  }

  async updateBookmark(
    sessionUid: string,
    bookmarkId: string,
    updates: Partial<Bookmark>
  ): Promise<Bookmark | undefined> {
    const session = await this.getSession(sessionUid);
    if (!session) {
      return undefined;
    }

    const bookmarks = session.bookmarks || [];
    const bookmarkIndex = bookmarks.findIndex((b) => b.id === bookmarkId);
    if (bookmarkIndex === -1) {
      return undefined;
    }

    const updated = { ...bookmarks[bookmarkIndex], ...updates };
    bookmarks[bookmarkIndex] = updated;

    await this.updateSession(sessionUid, { bookmarks });
    return updated;
  }

  async deleteBookmark(sessionUid: string, bookmarkId: string): Promise<boolean> {
    const session = await this.getSession(sessionUid);
    if (!session) {
      return false;
    }

    const bookmarks = session.bookmarks || [];
    const bookmarkIndex = bookmarks.findIndex((b) => b.id === bookmarkId);
    if (bookmarkIndex === -1) {
      return false;
    }

    bookmarks.splice(bookmarkIndex, 1);
    await this.updateSession(sessionUid, { bookmarks });
    return true;
  }

  async addAISuggestion(
    sessionUid: string,
    suggestion: Omit<AISuggestion, 'id' | 'createdAt'>
  ): Promise<AISuggestion | undefined> {
    const session = await this.getSession(sessionUid);
    if (!session) {
      return undefined;
    }

    const newSuggestion: AISuggestion = {
      ...suggestion,
      id: `suggestion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    const suggestions = session.aiSuggestions || [];
    suggestions.push(newSuggestion);

    await this.updateSession(sessionUid, { aiSuggestions: suggestions });
    return newSuggestion;
  }

  async updateAISuggestionStatus(
    sessionUid: string,
    suggestionId: string,
    status: AISuggestionStatus
  ): Promise<AISuggestion | undefined> {
    const session = await this.getSession(sessionUid);
    if (!session) {
      return undefined;
    }

    let updated: AISuggestion | undefined;

    // Update in summary (preferred location)
    if (session.aiSummary) {
      const suggestionsComponent = session.aiSummary.find((c) => c.component_type === 'suggestions');
      if (suggestionsComponent && Array.isArray(suggestionsComponent.content_details)) {
        const suggestions = suggestionsComponent.content_details as AISuggestion[];
        const suggestionIndex = suggestions.findIndex((s) => s.id === suggestionId);
        if (suggestionIndex !== -1) {
          updated = { ...suggestions[suggestionIndex], status };
          suggestions[suggestionIndex] = updated;
          suggestionsComponent.content_details = suggestions;
        }
      }
    }

    // Also update in legacy aiSuggestions field for backward compatibility
    const legacySuggestions = session.aiSuggestions || [];
    const legacySuggestionIndex = legacySuggestions.findIndex((s) => s.id === suggestionId);
    if (legacySuggestionIndex !== -1) {
      updated = { ...legacySuggestions[legacySuggestionIndex], status };
      legacySuggestions[legacySuggestionIndex] = updated;
    }

    if (!updated) {
      return undefined;
    }

    await this.updateSession(sessionUid, { aiSummary: session.aiSummary, aiSuggestions: legacySuggestions });
    return updated;
  }
}
