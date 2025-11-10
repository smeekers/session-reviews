import { useEffect, useRef, useState } from 'react';
import { Videocam, VideocamOff } from '@mui/icons-material';
import { IconButton, Paper, Stack, Typography } from '../../ui-library';
import * as styles from './index.css';

interface WebcamPanelProps {
  onStreamReady?: (stream: MediaStream | null) => void;
}

function WebcamPanel({ onStreamReady }: WebcamPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function handleToggleVideo() {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  }

  useEffect(() => {
    async function startWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        onStreamReady?.(stream);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to access webcam';
        setError(message);
        onStreamReady?.(null);
      }
    }

    startWebcam();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [onStreamReady]);

  if (error) {
    return (
      <Paper className={styles.root}>
        <Stack alignItems="center" className={styles.errorContainer} justifyContent="center" spacing={1}>
          <VideocamOff color="error" />
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper className={styles.root}>
      <Stack className={styles.header} direction="row" justifyContent="space-between">
        <Typography variant="subtitle2">Camera</Typography>
        <IconButton onClick={handleToggleVideo} size="small">
          {isVideoEnabled ? <Videocam /> : <VideocamOff />}
        </IconButton>
      </Stack>
      <div className={styles.videoContainer}>
        <video
          autoPlay
          className={styles.video}
          muted
          playsInline
          ref={videoRef}
        />
      </div>
    </Paper>
  );
}

export default WebcamPanel;

