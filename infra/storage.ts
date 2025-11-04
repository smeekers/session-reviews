import { secret } from './secrets';

// S3 bucket for storing session recordings
export const recordingsBucket = new sst.aws.Bucket('SessionRecordings', {
  public: false,
});

// DynamoDB table for sessions (for future use)
export const sessionsTable = new sst.aws.Dynamo('SessionsTable', {
  fields: {
    uid: 'string',
  },
  primaryKey: 'uid',
});

