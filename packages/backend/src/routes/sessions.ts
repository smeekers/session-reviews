import { Router } from 'express';
import { z } from 'zod';
import { store } from '../data';
import type { SessionStatus } from '../data';

export const sessionsRouter = Router();

const createSessionSchema = z.object({
  uid: z.string().min(1),
  liveblocksRoom: z.string().min(1),
  status: z.enum(['in-progress', 'processing', 'completed', 'reviewed']).default('in-progress'),
  date: z.string().optional(),
});

const updateSessionSchema = z.object({
  videoUrl: z.string().url().optional(),
  transcript: z.string().optional(),
  aiSummary: z.string().optional(),
  aiSummaryFeedback: z.union([z.literal(0), z.literal(1)]).optional(),
  status: z.enum(['in-progress', 'processing', 'completed', 'reviewed']).optional(),
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
        feedback: z.union([z.literal(0), z.literal(1)]).optional(),
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
    const date = data.date || new Date().toISOString();
    const session = await store.createSession({
      ...data,
      date,
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
    const session = await store.updateSession(req.params.uid, data);
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

// PUT /api/sessions/:uid/ai-suggestions/:suggestionId/feedback - Update AI suggestion feedback
sessionsRouter.put('/:uid/ai-suggestions/:suggestionId/feedback', async (req, res) => {
  try {
    const data = updateAIFeedbackSchema.parse(req.body);
    const suggestion = await store.updateAISuggestionFeedback(
      req.params.uid,
      req.params.suggestionId,
      data.feedback
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
