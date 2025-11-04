// In-memory data store for local development
// This will be replaced with DynamoDB in production

export type SessionStatus = 'in-progress' | 'processing' | 'completed' | 'reviewed';

export interface Bookmark {
  id: string;
  timestamp: number;
  note?: string;
  createdAt: string;
}

export interface AISuggestion {
  id: string;
  content: string;
  feedback?: 0 | 1; // 0 = thumbs-down, 1 = thumbs-up, undefined/null = no feedback
  createdAt: string;
}

export interface Session {
  uid: string;
  videoUrl?: string;
  transcript?: string;
  aiSummary?: string;
  aiSummaryFeedback?: 0 | 1; // 0 = thumbs-down, 1 = thumbs-up, undefined/null = no feedback
  aiSuggestions?: AISuggestion[];
  liveblocksRoom: string;
  status: SessionStatus;
  bookmarks?: Bookmark[];
  startTime: string;
  endTime?: string;
  createdAt: string;
  updatedAt: string;
}

export class MemoryStore {
  sessions: Map<string, Session> = new Map();

  // Sessions - all methods are async to match DynamoStore interface
  async getSession(uid: string): Promise<Session | undefined> {
    return this.sessions.get(uid);
  }

  async getAllSessions(): Promise<Session[]> {
    return Array.from(this.sessions.values()).sort((a, b) => {
      return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
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

  // Bookmarks
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

  // AI Suggestions
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

  async updateAISuggestionFeedback(
    sessionUid: string,
    suggestionId: string,
    feedback: 0 | 1
  ): Promise<AISuggestion | undefined> {
    const session = await this.getSession(sessionUid);
    if (!session) {
      return undefined;
    }

    const suggestions = session.aiSuggestions || [];
    const suggestionIndex = suggestions.findIndex((s) => s.id === suggestionId);
    if (suggestionIndex === -1) {
      return undefined;
    }

    const updated = { ...suggestions[suggestionIndex], feedback };
    suggestions[suggestionIndex] = updated;

    await this.updateSession(sessionUid, { aiSuggestions: suggestions });
    return updated;
  }
}

// Note: store is exported from index.ts
// This allows switching between MemoryStore and DynamoStore
export type { Session, Bookmark, AISuggestion };
