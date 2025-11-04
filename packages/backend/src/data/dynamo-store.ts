// DynamoDB adapter for sessions
// This implements the same interface as MemoryStore for easy migration
// Currently a skeleton - implement when ready to migrate

import { GetCommand, PutCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { dynamoClient, getSessionsTableName } from '../lib/aws';
import type { Session, Bookmark, AISuggestion, SessionStatus } from './memory-store';

class DynamoStore {
  private tableName = getSessionsTableName();

  // Sessions
  async getSession(uid: string): Promise<Session | undefined> {
    const result = await dynamoClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { uid },
      })
    );

    return result.Item as Session | undefined;
  }

  async getAllSessions(): Promise<Session[]> {
    const result = await dynamoClient.send(
      new ScanCommand({
        TableName: this.tableName,
      })
    );

    const sessions = (result.Items || []) as Session[];
    // Sort by startTime descending
    return sessions.sort((a, b) => {
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

    await dynamoClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: newSession,
      })
    );

    return newSession;
  }

  async updateSession(uid: string, updates: Partial<Session>): Promise<Session | undefined> {
    // Get existing session first
    const existing = await this.getSession(uid);
    if (!existing) {
      return undefined;
    }

    const updated: Session = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await dynamoClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: updated,
      })
    );

    return updated;
  }

  async deleteSession(uid: string): Promise<boolean> {
    const result = await dynamoClient.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { uid },
        ReturnValues: 'ALL_OLD',
      })
    );

    return !!result.Attributes;
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

export const dynamoStore = new DynamoStore();

