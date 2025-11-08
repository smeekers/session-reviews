import { Router } from 'express';
import { z } from 'zod';
import { MOCK_VIDEO_URL } from '../constants/video';
import { store } from '../data';

export const sessionsRouter = Router();

const createSessionSchema = z.object({
  name: z.string().optional(),
});

const aiSummaryComponentSchema = z.object({
  component_type: z.string(),
  component_order: z.number(),
  content: z.string(),
  content_details: z.unknown().optional(),
});

const updateSessionSchema = z.object({
  name: z.string().optional(),
  videoUrl: z.string().url().optional(),
  transcript: z.string().optional(),
  aiSummary: z.array(aiSummaryComponentSchema).optional(),
  aiSummaryFeedback: z.union([z.literal(0), z.literal(1)]).optional(),
  aiSuggestionsFeedback: z.union([z.literal(0), z.literal(1)]).optional(),
  status: z.enum(['ready', 'in-progress', 'processing', 'completed', 'reviewed']).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  bookmarks: z
    .array(
      z.object({
        id: z.string(),
        timestamp: z.number().int().nonnegative(),
        note: z.string().optional(),
        createdAt: z.string(),
      })
    )
    .optional(),
  aiSuggestions: z
    .array(
      z.object({
        id: z.string(),
        content: z.string(),
        status: z.enum(['pending', 'done', 'dismissed']),
        createdAt: z.string(),
      })
    )
    .optional(),
});

const addBookmarkSchema = z.object({
  timestamp: z.number().int().nonnegative(),
  note: z.string().optional(),
});

const updateAIFeedbackSchema = z.object({
  feedback: z.union([z.literal(0), z.literal(1)]), // 0 = thumbs-down, 1 = thumbs-up
});

// GET /api/sessions - List all sessions
sessionsRouter.get('/', async (_req, res) => {
  try {
    const sessions = await store.getAllSessions();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/sessions/:uid - Get session by UID
sessionsRouter.get('/:uid', async (req, res) => {
  try {
    const session = await store.getSession(req.params.uid);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/sessions - Create new session
sessionsRouter.post('/', async (req, res) => {
  try {
    const data = createSessionSchema.parse(req.body);
    
    // Generate session UID and liveblocks room name
    const uid = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const liveblocksRoom = `room_${uid}`;
    
    const session = await store.createSession({
      uid,
      name: data.name,
      liveblocksRoom,
      status: 'ready',
      bookmarks: [],
      aiSuggestions: [],
    });
    res.status(201).json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/sessions/:uid - Update session
sessionsRouter.put('/:uid', async (req, res) => {
  try {
    const data = updateSessionSchema.parse(req.body);
    
    // Get existing session to check current state
    const existingSession = await store.getSession(req.params.uid);
    if (!existingSession) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Auto-set video URL when session ends (status changes to processing/completed with endTime)
    const updates: typeof data = { ...data };
    const statusChangedToProcessingOrCompleted = 
      (data.status === 'processing' || data.status === 'completed') &&
      existingSession.status !== 'processing' &&
      existingSession.status !== 'completed';
    
    // Also set video URL if endTime is provided and session doesn't have one yet
    const hasEndTime = data.endTime || existingSession.endTime;
    const needsVideoUrl = !existingSession.videoUrl && !data.videoUrl;
    
    if ((statusChangedToProcessingOrCompleted || hasEndTime) && needsVideoUrl) {
      // Simulate S3 upload - set mock YouTube URL
      updates.videoUrl = MOCK_VIDEO_URL;
    }

    const session = await store.updateSession(req.params.uid, updates);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/sessions/:uid - Delete session
sessionsRouter.delete('/:uid', async (req, res) => {
  try {
    const deleted = await store.deleteSession(req.params.uid);
    if (!deleted) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/sessions/:uid/bookmarks - Add bookmark to session
sessionsRouter.post('/:uid/bookmarks', async (req, res) => {
  try {
    const data = addBookmarkSchema.parse(req.body);
    const bookmark = await store.addBookmark(req.params.uid, data);
    if (!bookmark) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(201).json(bookmark);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/sessions/:uid/bookmarks/:bookmarkId - Update bookmark
sessionsRouter.put('/:uid/bookmarks/:bookmarkId', async (req, res) => {
  try {
    const updates = z
      .object({
        timestamp: z.number().int().nonnegative().optional(),
        note: z.string().optional(),
      })
      .parse(req.body);

    const bookmark = await store.updateBookmark(req.params.uid, req.params.bookmarkId, updates);
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.json(bookmark);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/sessions/:uid/bookmarks/:bookmarkId - Delete bookmark
sessionsRouter.delete('/:uid/bookmarks/:bookmarkId', async (req, res) => {
  try {
    const deleted = await store.deleteBookmark(req.params.uid, req.params.bookmarkId);
    if (!deleted) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/sessions/:uid/ai-summary-feedback - Update AI summary feedback
sessionsRouter.put('/:uid/ai-summary-feedback', async (req, res) => {
  try {
    const data = updateAIFeedbackSchema.parse(req.body);
    const session = await store.updateSession(req.params.uid, {
      aiSummaryFeedback: data.feedback,
    });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/sessions/:uid/ai-suggestions/:suggestionId/status - Update AI suggestion status
const updateSuggestionStatusSchema = z.object({
  status: z.enum(['pending', 'done', 'dismissed']),
});

sessionsRouter.put('/:uid/ai-suggestions/:suggestionId/status', async (req, res) => {
  try {
    const data = updateSuggestionStatusSchema.parse(req.body);
    const suggestion = await store.updateAISuggestionStatus(
      req.params.uid,
      req.params.suggestionId,
      data.status
    );
    if (!suggestion) {
      return res.status(404).json({ error: 'Suggestion not found' });
    }
    res.json(suggestion);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/sessions/:uid/ai-suggestions-feedback - Update AI suggestions list feedback
sessionsRouter.put('/:uid/ai-suggestions-feedback', async (req, res) => {
  try {
    const data = updateAIFeedbackSchema.parse(req.body);
    const session = await store.updateSession(req.params.uid, {
      aiSuggestionsFeedback: data.feedback,
    });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/sessions/:uid/mark-reviewed - Mark session as reviewed
sessionsRouter.put('/:uid/mark-reviewed', async (req, res) => {
  try {
    const session = await store.updateSession(req.params.uid, {
      status: 'reviewed',
    });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
