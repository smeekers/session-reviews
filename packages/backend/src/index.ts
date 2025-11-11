import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedStore } from './data/seed';
import { store } from './data';
import { MemoryStore } from './data/memory-store';
import { sessionsRouter } from './routes/sessions';

const app = express();
const PORT = process.env.PORT || 3001;

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Serve static assets (for fake MP4 files)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Seed mock data on startup (only for memory store)
if (process.env.USE_DYNAMODB !== 'true' && store instanceof MemoryStore) {
  seedStore(store).catch((err) => {
    console.error('Failed to seed mock data:', err);
  });
}

// API routes
app.use('/api/sessions', sessionsRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
