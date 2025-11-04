import { secret } from './secrets';
import { recordingsBucket, sessionsTable } from './storage';

// API stack for local development
export const api = new sst.x.DevCommand('SessionReviewsApi', {
  dev: {
    autostart: true,
    command: 'pnpm dev',
    directory: 'packages/backend',
    env: {
      PORT: '3001',
      RECORDINGS_BUCKET_NAME: recordingsBucket.name,
      SESSIONS_TABLE_NAME: sessionsTable.name,
    },
  },
  link: [
    secret.AwsAccessKeyId,
    secret.AwsSecretAccessKey,
    secret.AwsRegion,
    secret.LiveblocksPublicKey,
    secret.LiveblocksSecretKey,
    recordingsBucket,
    sessionsTable,
  ],
});
