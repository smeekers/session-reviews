// S3 upload helper for session recordings
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { s3Client, getRecordingsBucketName } from './aws';

export interface UploadResult {
  url: string;
  key: string;
}

/**
 * Determine file extension from content type
 */
function getFileExtension(contentType: string): string {
  const contentTypeMap: Record<string, string> = {
    'video/webm': 'webm',
    'video/mp4': 'mp4',
    'video/x-matroska': 'mkv',
    'video/quicktime': 'mov',
  };

  return contentTypeMap[contentType] || 'webm';
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
  const extension = getFileExtension(contentType);
  const timestamp = Date.now();
  const key = `recordings/${sessionUid}/${timestamp}.${extension}`;

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

/**
 * Download a recording from S3
 * @param key - The S3 key of the file to download
 * @returns The file buffer
 */
export async function downloadRecording(key: string): Promise<Buffer> {
  const bucketName = getRecordingsBucketName();

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const response = await s3Client.send(command);
  
  if (!response.Body) {
    throw new Error('No file body returned from S3');
  }

  // Convert stream to buffer
  // AWS SDK v3 returns Body as a stream that can be consumed
  const chunks: Uint8Array[] = [];
  
  // Handle different body types
  if (response.Body instanceof ReadableStream) {
    const reader = response.Body.getReader();
    try {
      let result = await reader.read();
      while (!result.done) {
        if (result.value) {
          chunks.push(result.value);
        }
        result = await reader.read();
      }
    } finally {
      reader.releaseLock();
    }
  } else if (response.Body && typeof response.Body === 'object') {
    // Node.js stream or other iterable
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stream = response.Body as any;
    if (typeof stream[Symbol.asyncIterator] === 'function') {
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
    } else {
      throw new Error('Unsupported stream type');
    }
  } else {
    throw new Error('Unexpected response body type');
  }

  return Buffer.concat(chunks);
}

