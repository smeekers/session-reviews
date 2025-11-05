# Recording Strategy

## Status Flow
1. **`ready`** - Session created, waiting to start recording
2. **`in-progress`** - Recording is actively happening
3. **`processing`** - Recording finished, uploading to S3 and processing
4. **`completed`** - Ready for review (has video, transcript, AI content)
5. **`reviewed`** - User has reviewed the session

## Recording Implementation Options

### Option 1: Screen + Audio/Video (Recommended)
- Use `navigator.mediaDevices.getDisplayMedia()` for screen capture
- Use `navigator.mediaDevices.getUserMedia()` for camera/mic
- Combine streams using MediaRecorder API
- **Pros**: Captures everything (whiteboard, screen, user)
- **Cons**: More complex, requires user to grant screen share permission

### Option 2: Audio/Video Only (Simpler)
- Use `navigator.mediaDevices.getUserMedia()` for camera/mic only
- **Pros**: Simpler, standard webcam recording
- **Cons**: Doesn't capture screen/whiteboard

### Implementation Approach
1. **Start Recording**: 
   - Request media permissions
   - Create MediaRecorder instance
   - Start recording to chunks
   - Update session status to `in-progress`

2. **During Recording**:
   - Store chunks in memory or upload incrementally
   - Handle page close/unload (save what we have)

3. **Stop Recording**:
   - Stop MediaRecorder
   - Combine chunks into blob
   - Upload to S3 (via backend API endpoint)
   - Update session status to `processing`
   - After upload completes, generate transcript/AI content
   - Update status to `completed`

4. **Page Close During Recording**:
   - Use `beforeunload` or `visibilitychange` events
   - Auto-stop recording and upload
   - Move to `processing` status

## Technical Details

### MediaRecorder API
```javascript
const stream = await navigator.mediaDevices.getDisplayMedia({
  video: true,
  audio: true
});

const recorder = new MediaRecorder(stream, {
  mimeType: 'video/webm;codecs=vp9'
});

recorder.ondataavailable = (event) => {
  chunks.push(event.data);
};

recorder.start();
```

### Upload Strategy
- Option A: Upload entire file after recording stops
- Option B: Stream chunks to backend during recording (more complex)
- Option C: Use S3 multipart upload for large files

## Next Steps
1. Create recording hook/component
2. Implement MediaRecorder setup
3. Create backend endpoint for S3 upload
4. Handle page close scenarios
5. Add progress indicators

