import { secret } from './secrets';

// Conditionally import storage - only if ENABLE_AWS_STORAGE is set
let recordingsBucket: sst.aws.Bucket | undefined;
let sessionsTable: sst.aws.Dynamo | undefined;

try {
  if (process.env.ENABLE_AWS_STORAGE === 'true') {
    const storage = await import('./storage');
    recordingsBucket = storage.recordingsBucket;
    sessionsTable = storage.sessionsTable;
  }
} catch {
  // Storage not available, will use defaults
}

// Build environment variables - use defaults if storage not enabled
const env: Record<string, string> = {
  PORT: '3001',
  RECORDINGS_BUCKET_NAME: recordingsBucket?.name || 'session-reviews-recordings-local',
  SESSIONS_TABLE_NAME: sessionsTable?.name || 'session-reviews-sessions-local',
};

// Build link array
const linkItems: any[] = [
  secret.AwsAccessKeyId,
  secret.AwsSecretAccessKey,
  secret.AwsRegion,
  secret.LiveblocksPublicKey,
  secret.LiveblocksSecretKey,
];

// Only link storage resources if they exist
if (recordingsBucket) {
  linkItems.push(recordingsBucket);
}

if (sessionsTable) {
  linkItems.push(sessionsTable);
}

// API stack for local development
export const api = new sst.x.DevCommand('SessionReviewsApi', {
  dev: {
    autostart: true,
    command: 'pnpm dev',
    directory: 'packages/backend',
    env,
  },
  link: linkItems,
});
