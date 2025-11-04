// S3 upload helper for session recordings
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, getRecordingsBucketName } from './aws';

export interface UploadResult {
  url: string;
  key: string;
}

/**
 * Upload a video file to S3
 * @param file - The file buffer or stream
 * @param sessionUid - The session UID (used as part of the key)
 * @param contentType - MIME type of the file (default: video/webm)
 * @returns The S3 URL and key of the uploaded file
 */
export async function uploadRecording(
  file: Buffer,
  sessionUid: string,
  contentType = 'video/webm'
): Promise<UploadResult> {
  const bucketName = getRecordingsBucketName();
  const key = `recordings/${sessionUid}/${Date.now()}.webm`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // For local development, construct a URL (in production this would be a CloudFront URL)
  const region = process.env.AWS_REGION || process.env.AwsRegion || 'us-west-2';
  const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

  return { url, key };
}

