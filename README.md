# Session Reviews

A monorepo for managing and reviewing session recordings with collaborative whiteboard capabilities.

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Infrastructure**: SST v3+ (local-only development)
- **Backend**: Node.js + Express (mock API with in-memory storage)
- **Frontend**: React 19 + Vite + TypeScript
- **UI**: Material-UI (MUI) v6
- **State Management**: Jotai + Jotai DevTools
- **Routing**: React Router v7
- **Collaboration**: Excalidraw + y-excalidraw + Liveblocks (mock)
- **Video Playback**: Video.js
- **E2E Testing**: Playwright
- **Validation**: Zod
- **Utilities**: lodash-es

## Project Structure

```
session-reviews/
├── infra/               # SST infrastructure configuration
│   ├── sst.config.ts    # Main SST configuration
│   ├── api.ts          # API stack definition
│   └── secrets.ts      # Secret definitions
├── packages/
│   ├── backend/         # Mock API server (Express)
│   │   ├── src/
│   │   │   ├── data/    # In-memory data store
│   │   │   ├── routes/  # API route handlers
│   │   │   └── index.ts # Server entry point
│   │   └── package.json
│   ├── web/            # React frontend application
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   ├── app.tsx      # Main app component
│   │   │   └── main.tsx     # Entry point
│   │   └── package.json
│   └── playwright/    # E2E tests
│       ├── tests/      # Test files
│       └── package.json
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json
```

## Getting Started

### Prerequisites

- Node.js (version managed via `.nvmrc` if present)
- pnpm 9.15.9 or later
- SST CLI (installed as dev dependency)

### Installation

1. Install dependencies:
```bash
pnpm install
```

### Development

#### Start Everything (Recommended)

Start SST dev mode, which will automatically start the backend API server:

```bash
pnpm sst dev
```

This will:
- Start the SST local development environment
- Automatically start the backend API server on port 3001
- Make secrets available to the backend
- Provide a local development URL

In a separate terminal, start the frontend:

```bash
pnpm web:dev
```

The frontend will be available at `http://localhost:3000` and will proxy API requests to the backend.

#### Run Individual Services

**Backend only:**
```bash
pnpm backend:dev
```

**Frontend only:**
```bash
pnpm web:dev
```

## Secrets Management

Secrets are managed through SST and can be set using the CLI:

```bash
# Set a secret
pnpm sst secret set OpenAiApiKey <your-api-key>

# Secrets are automatically available to services that link them
# See infra/api.ts and infra/secrets.ts for configuration
```

Currently defined secrets:
- `OpenAiApiKey` - OpenAI API key for AI features

## API Endpoints

The mock API server provides the following endpoints:

### Users
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Sessions
- `GET /api/sessions` - List all sessions (optional `?userId=...` query)
- `GET /api/sessions/:id` - Get session by ID
- `POST /api/sessions` - Create session
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session

### Bookmarks
- `GET /api/bookmarks` - List bookmarks (optional `?sessionId=...` or `?userId=...` query)
- `GET /api/bookmarks/:id` - Get bookmark by ID
- `POST /api/bookmarks` - Create bookmark
- `PUT /api/bookmarks/:id` - Update bookmark
- `DELETE /api/bookmarks/:id` - Delete bookmark

### Summaries
- `GET /api/summaries` - List all summaries
- `GET /api/summaries/:id` - Get summary by ID
- `GET /api/summaries/session/:sessionId` - Get summary for a session
- `POST /api/summaries` - Create summary
- `PUT /api/summaries/:id` - Update summary
- `DELETE /api/summaries/:id` - Delete summary

### Suggestions
- `GET /api/suggestions` - List suggestions (optional `?sessionId=...` or `?userId=...` query)
- `GET /api/suggestions/:id` - Get suggestion by ID
- `POST /api/suggestions` - Create suggestion
- `PUT /api/suggestions/:id` - Update suggestion
- `DELETE /api/suggestions/:id` - Delete suggestion

### Health Check
- `GET /health` - Health check endpoint

**Note**: All data is stored in-memory and will be lost when the server restarts.

## Testing

### E2E Tests

Run Playwright tests:

```bash
pnpm test:e2e
```

This will:
- Start the web dev server automatically
- Run all E2E tests
- Generate a test report

**Other test commands:**
- `pnpm --filter playwright test:ui` - Run tests with UI mode
- `pnpm --filter playwright test:debug` - Run tests in debug mode
- `pnpm --filter playwright test:update-snapshots` - Update snapshots

## Code Quality

### Linting

```bash
# Check for linting errors
pnpm lint

# Auto-fix linting errors
pnpm lint-fix
```

### Formatting

```bash
# Check formatting
pnpm prettify

# Auto-format code
pnpm prettify-fix
```

## Building

### Frontend

```bash
cd packages/web
pnpm build
```

### Backend

```bash
cd packages/backend
pnpm build
```

## Next Steps

1. **Set up secrets**: Use `pnpm sst secret set` to configure any required API keys
2. **Start developing**: The infrastructure is ready - you can now start building out features
3. **Add features**: 
   - Build out React components in `packages/web/src/components/`
   - Add API routes in `packages/backend/src/routes/`
   - Write tests in `packages/playwright/tests/`

## Development Notes

- **Local-only**: This setup is configured for local development only. No AWS resources are deployed.
- **In-memory storage**: The backend uses in-memory storage for simplicity. Data will be lost on server restart.
- **TypeScript**: All packages use TypeScript with strict mode enabled.
- **Workspace dependencies**: Cross-package dependencies use pnpm workspace protocol (`workspace:*`).

## Troubleshooting

### Port conflicts

If ports 3000 or 3001 are already in use:
- Frontend: Change port in `packages/web/vite.config.ts`
- Backend: Change `PORT` environment variable or in `packages/backend/src/index.ts`

### SST not starting

Make sure you have the latest SST CLI:
```bash
pnpm install
```

### TypeScript errors

Run type checking:
```bash
cd packages/web && pnpm type-check
```

## License

Private project
