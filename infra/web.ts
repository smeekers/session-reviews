// Web frontend - runs Vite dev server locally during sst dev
// Accessible at http://localhost:3000 (configured in vite.config.ts)
export const web = new sst.x.DevCommand('SessionReviewsWeb', {
  dev: {
    autostart: true,
    command: 'pnpm dev',
    directory: 'packages/web',
  },
});

// Note: For production deployment, add a StaticSite here if needed
// For now, local dev is the priority

