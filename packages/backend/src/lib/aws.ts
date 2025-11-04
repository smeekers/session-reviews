// AWS client setup for local development
// Credentials are provided via SST secrets and linked to the dev command

import { S3Client } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// Get AWS credentials from environment (set by SST)
const awsConfig = {
  region: process.env.AWS_REGION || process.env.AwsRegion || 'us-west-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || process.env.AwsAccessKeyId || '',
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY || process.env.AwsSecretAccessKey || '',
  },
};

// S3 client for uploading recordings
export const s3Client = new S3Client(awsConfig);

// DynamoDB client (for future use)
export const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient(awsConfig));

// Helper to get bucket name from SST resource
// In local dev, this will be available via SST environment
export function getRecordingsBucketName(): string {
  // This will be set by SST when resources are linked
  return process.env.RECORDINGS_BUCKET_NAME || 'session-reviews-recordings';
}

// Helper to get DynamoDB table name
export function getSessionsTableName(): string {
  // This will be set by SST when resources are linked
  return process.env.SESSIONS_TABLE_NAME || 'session-reviews-sessions';
}

