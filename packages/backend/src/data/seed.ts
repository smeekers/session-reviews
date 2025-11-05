import { generateMockSummary, generateMockSuggestions, generateMockTranscript } from '../lib/mock-ai';
import { MemoryStore } from './memory-store';
import type { AISuggestion, Bookmark, Session } from './memory-store';

/**
 * Seed the memory store with mock data for local development
 */
export async function seedStore(store: MemoryStore): Promise<void> {
  // Clear existing data
  store.sessions.clear();

  const now = new Date();
  const sessions: Session[] = [];

  // Helper to create a date in the past
  function daysAgo(days: number): Date {
    const date = new Date(now);
    date.setDate(date.getDate() - days);
    return date;
  }

  // Helper to create a session with bookmarks and AI content
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
      videoUrl?: string; // Override default video URL
      name?: string; // Optional session name
    }
  ): Session {
    const bookmarks: Bookmark[] = options?.hasBookmarks
      ? [
          {
            id: `bookmark_${uid}_1`,
            timestamp: 120, // 2 minutes
            note: 'Important discussion point',
            createdAt: new Date(startTime.getTime() + 120000).toISOString(),
          },
          {
            id: `bookmark_${uid}_2`,
            timestamp: 540, // 9 minutes
            note: 'Key concept explained',
            createdAt: new Date(startTime.getTime() + 540000).toISOString(),
          },
          {
            id: `bookmark_${uid}_3`,
            timestamp: 1020, // 17 minutes
            note: 'Action item to follow up',
            createdAt: new Date(startTime.getTime() + 1020000).toISOString(),
          },
        ]
      : [];

    const aiSuggestions: AISuggestion[] = options?.hasSuggestions
      ? generateMockSuggestions(Math.floor(Math.random() * 3) + 3).map((content, idx) => ({
          id: `suggestion_${uid}_${idx + 1}`,
          content,
          feedback: idx === 0 ? 1 : idx === 1 ? 0 : undefined, // Mix of feedback
          createdAt: endTime ? new Date(endTime.getTime() + idx * 60000).toISOString() : new Date().toISOString(),
        }))
      : [];

    return {
      uid,
      name: options?.name,
      videoUrl: options?.videoUrl || (endTime ? `https://example.com/videos/${uid}.mp4` : undefined),
      transcript: endTime && options?.hasSummary ? generateMockTranscript() : undefined,
      aiSummary: endTime && options?.hasSummary ? generateMockSummary() : undefined,
      aiSummaryFeedback: options?.summaryFeedback,
      aiSuggestions: endTime && options?.hasSuggestions ? aiSuggestions : undefined,
      liveblocksRoom: `room_${uid}`,
      status,
      bookmarks: options?.hasBookmarks ? bookmarks : undefined,
      startTime: startTime.toISOString(),
      endTime: endTime?.toISOString(),
      createdAt: startTime.toISOString(),
      updatedAt: endTime ? endTime.toISOString() : startTime.toISOString(),
    };
  }

  // Session 1: Ready (created but not started recording)
  const readyStart = new Date(now.getTime() - 5 * 60000); // Created 5 minutes ago
  sessions.push(
    createSession('session_001', 'ready', readyStart, undefined, {
      hasBookmarks: false,
      name: 'React Patterns Discussion',
    })
  );

  // Session 2: Ready (another ready session)
  const ready2Start = new Date(now.getTime() - 30 * 60000); // Created 30 minutes ago
  sessions.push(
    createSession('session_002', 'ready', ready2Start, undefined, {
      hasBookmarks: false,
      name: 'TypeScript Best Practices',
    })
  );

  // Session 3: Processing (just finished, uploading/processing)
  const processingStart = daysAgo(1);
  const processingEnd = new Date(processingStart.getTime() + 25 * 60000); // 25 minute session
  sessions.push(
    createSession('session_003', 'processing', processingStart, processingEnd, {
      hasBookmarks: true,
    })
  );

  // Configure your S3 bucket URL here
  // Example: 'https://my-bucket.s3.us-west-2.amazonaws.com'
  const S3_BASE_URL = process.env.S3_BASE_URL || 'https://example.com/videos';

  // Session 4: Completed (ready for review, no feedback yet)
  const completedStart = daysAgo(2);
  const completedEnd = new Date(completedStart.getTime() + 30 * 60000); // 30 minute session
  sessions.push(
    createSession('session_003', 'completed', completedStart, completedEnd, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
      name: 'System Design Deep Dive',
      videoUrl: `${S3_BASE_URL}/session_003.mp4`, // Replace with your actual video
    })
  );

  // Session 5: Reviewed (with feedback)
  const reviewedStart = daysAgo(3);
  const reviewedEnd = new Date(reviewedStart.getTime() + 20 * 60000); // 20 minute session
  sessions.push(
    createSession('session_004', 'reviewed', reviewedStart, reviewedEnd, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
      summaryFeedback: 1, // Thumbs up
      videoUrl: `${S3_BASE_URL}/session_005.mp4`, // Replace with your actual video
    })
  );

  // Session 6: Completed (another one ready for review)
  const completed2Start = daysAgo(4);
  const completed2End = new Date(completed2Start.getTime() + 35 * 60000); // 35 minute session
  sessions.push(
    createSession('session_005', 'completed', completed2Start, completed2End, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
      videoUrl: `${S3_BASE_URL}/session_005.mp4`, // Replace with your actual video
    })
  );

  // Session 7: Reviewed (with negative feedback)
  const reviewed2Start = daysAgo(5);
  const reviewed2End = new Date(reviewed2Start.getTime() + 18 * 60000); // 18 minute session
  sessions.push(
    createSession('session_006', 'reviewed', reviewed2Start, reviewed2End, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
      summaryFeedback: 0, // Thumbs down
      videoUrl: `${S3_BASE_URL}/session_007.mp4`, // Replace with your actual video
    })
  );

  // Session 8: Completed (longer session)
  const completed3Start = daysAgo(6);
  const completed3End = new Date(completed3Start.getTime() + 45 * 60000); // 45 minute session
  sessions.push(
    createSession('session_007', 'completed', completed3Start, completed3End, {
      hasSummary: true,
      hasSuggestions: true,
      hasBookmarks: true,
      videoUrl: `${S3_BASE_URL}/session_007.mp4`, // Replace with your actual video
    })
  );

  // Session 9: Processing (another one being processed)
  const processing2Start = daysAgo(0.5); // 12 hours ago
  const processing2End = new Date(processing2Start.getTime() + 22 * 60000); // 22 minute session
  sessions.push(
    createSession('session_008', 'processing', processing2Start, processing2End, {
      hasBookmarks: true,
    })
  );

  // Insert all sessions
  for (const session of sessions) {
    await store.createSession(session);
  }

  console.log(`✅ Seeded ${sessions.length} mock sessions`);
}

