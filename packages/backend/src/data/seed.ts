import { MOCK_VIDEO_URL } from '../constants/video';
import { generateMockSummary, generateMockSuggestions, generateMockTranscript } from '../lib/mock-ai';
import { MemoryStore } from './memory-store';
import type { AISuggestion, Bookmark, Session } from './memory-store';

/**
 * Seed the memory store with mock data for local development
 */
export async function seedStore(store: MemoryStore): Promise<void> {
  store.sessions.clear();

  const now = new Date();

  function daysAgo(days: number): Date {
    const date = new Date(now);
    date.setDate(date.getDate() - days);
    return date;
  }

  function createSession(
    uid: string,
    status: Session['status'],
    startTime: Date,
    endTime?: Date,
    options?: {
      hasSummary?: boolean;
      hasSuggestions?: boolean;
      hasBookmarks?: boolean;
      summaryFeedback?: 0 | 1;
      suggestionsFeedback?: 0 | 1;
      videoUrl?: string;
      name?: string;
    }
  ): Session {
    const bookmarks: Bookmark[] = options?.hasBookmarks
      ? [
          {
            id: `bookmark_${uid}_1`,
            timestamp: 120,
            note: 'Important discussion point',
            createdAt: new Date(startTime.getTime() + 120000).toISOString(),
          },
          {
            id: `bookmark_${uid}_2`,
            timestamp: 540,
            note: 'Key concept explained',
            createdAt: new Date(startTime.getTime() + 540000).toISOString(),
          },
          {
            id: `bookmark_${uid}_3`,
            timestamp: 1020,
            note: 'Action item to follow up',
            createdAt: new Date(startTime.getTime() + 1020000).toISOString(),
          },
        ]
      : [];

    const aiSuggestions: AISuggestion[] = options?.hasSuggestions
      ? generateMockSuggestions(Math.floor(Math.random() * 3) + 3).map((suggestion, idx) => ({
          id: `suggestion_${uid}_${idx + 1}`,
          content: suggestion.content,
          status: (idx === 0 ? 'done' : idx === 1 ? 'dismissed' : 'pending') as AISuggestion['status'],
          createdAt: endTime ? new Date(endTime.getTime() + idx * 60000).toISOString() : new Date().toISOString(),
        }))
      : [];

    return {
      uid,
      name: options?.name,
      videoUrl: options?.videoUrl || (endTime ? MOCK_VIDEO_URL : undefined),
      transcript: endTime && options?.hasSummary ? generateMockTranscript() : undefined,
      aiSummary: endTime && options?.hasSummary ? generateMockSummary() : undefined,
      aiSummaryFeedback: options?.summaryFeedback,
      aiSuggestions: endTime && options?.hasSuggestions ? aiSuggestions : undefined,
      aiSuggestionsFeedback: options?.suggestionsFeedback,
      liveblocksRoom: `room_${uid}`,
      status,
      bookmarks: options?.hasBookmarks ? bookmarks : undefined,
      startTime: startTime.toISOString(),
      endTime: endTime?.toISOString(),
      createdAt: startTime.toISOString(),
      updatedAt: endTime ? endTime.toISOString() : startTime.toISOString(),
    };
  }

  const readyStart = new Date(now.getTime() - 5 * 60000);
  await store.createSession(
    createSession('session_001', 'ready', readyStart, undefined, {
      hasBookmarks: false,
      name: 'React Patterns Discussion',
    })
  );

  const ready2Start = new Date(now.getTime() - 30 * 60000);
  await store.createSession(
    createSession('session_002', 'ready', ready2Start, undefined, {
      hasBookmarks: false,
      name: 'TypeScript Best Practices',
    })
  );

  const processingStart = daysAgo(1);
  const processingEnd = new Date(processingStart.getTime() + 25 * 60000);
  await store.createSession(
    createSession('session_003', 'processing', processingStart, processingEnd, {
      hasBookmarks: true,
    })
  );

  const completedStart = daysAgo(2);
  const completedEnd = new Date(completedStart.getTime() + 30 * 60000);
  await store.createSession(
    createSession('session_004', 'completed', completedStart, completedEnd, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
      name: 'System Design Deep Dive',
    })
  );

  const reviewedStart = daysAgo(3);
  const reviewedEnd = new Date(reviewedStart.getTime() + 20 * 60000);
  await store.createSession(
    createSession('session_005', 'reviewed', reviewedStart, reviewedEnd, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
      summaryFeedback: 1,
      suggestionsFeedback: 1,
    })
  );

  const completed2Start = daysAgo(4);
  const completed2End = new Date(completed2Start.getTime() + 35 * 60000);
  await store.createSession(
    createSession('session_006', 'completed', completed2Start, completed2End, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
    })
  );

  const reviewed2Start = daysAgo(5);
  const reviewed2End = new Date(reviewed2Start.getTime() + 18 * 60000);
  await store.createSession(
    createSession('session_007', 'reviewed', reviewed2Start, reviewed2End, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
      summaryFeedback: 0,
      suggestionsFeedback: 0,
    })
  );

  const completed3Start = daysAgo(6);
  const completed3End = new Date(completed3Start.getTime() + 45 * 60000);
  await store.createSession(
    createSession('session_008', 'completed', completed3Start, completed3End, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
    })
  );

  const processing2Start = daysAgo(0.5);
  const processing2End = new Date(processing2Start.getTime() + 22 * 60000);
  await store.createSession(
    createSession('session_009', 'processing', processing2Start, processing2End, {
      hasBookmarks: true,
    })
  );

  console.log(`✅ Seeded ${store.sessions.size} mock sessions`);
}
