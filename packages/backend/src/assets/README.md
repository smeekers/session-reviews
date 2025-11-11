# Fake Recording Assets

This folder contains fake MP4 files used for development and testing when actual screen recording is not available.

## Setup

1. Place a fake MP4 file named `fake-recording.mp4` in this directory
2. The file will be served at `http://localhost:3001/assets/fake-recording.mp4`
3. When ending a session with mocked recording, the system will automatically fetch and upload this file to S3

## File Requirements

- Format: MP4
- Any duration is fine (short test videos work well)
- The file will be uploaded to S3 with the session UID as part of the key

## Example

You can use any MP4 file. For testing, a short video (10-30 seconds) is recommended.

