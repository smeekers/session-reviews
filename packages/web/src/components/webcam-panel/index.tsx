import { useEffect, useRef, useState } from 'react';
import { FiberManualRecord, Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';
import { WEBCAM_STRINGS } from '../../constants';
import { IconButton, Paper, Stack, Typography, Chip } from '../../ui-library';
import AddBookmarkButton from '../add-bookmark-button';
import * as styles from './index.css';

interface WebcamPanelProps {
  getCurrentTime?: () => number;
  isRecording?: boolean;
  onStreamReady?: (stream: MediaStream | null) => void;
  sessionUid?: string;
}

function WebcamPanel({ getCurrentTime, isRecording = false, onStreamReady, sessionUid }: WebcamPanelProps) {
  // Variable definitions
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const onStreamReadyRef = useRef(onStreamReady);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Functions
  function handleToggleVideo() {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach((track) => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  }

  function handleToggleAudio() {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach((track) => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  }

  // useEffects
  useEffect(() => {
    onStreamReadyRef.current = onStreamReady;
  }, [onStreamReady]);

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

        onStreamReadyRef.current?.(stream);
        setError(null);
      } catch (err) {
        const message = err instanceof Error ? err.message : WEBCAM_STRINGS.ERROR_ACCESS;
        setError(message);
        onStreamReadyRef.current?.(null);
      }
    }

    startWebcam();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Renders/returns
  if (error) {
    return (
      <Paper className={styles.root}>
        <Stack alignItems="center" className={styles.errorContainer} justifyContent="center" spacing={1}>
          <VideocamOff color="error" />
          <Typography color="error" role="alert" variant="body2">
            {error}
          </Typography>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper className={styles.root}>
      <Stack className={styles.header} direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1}>
          {isRecording && (
            <Chip
              color="error"
              icon={<FiberManualRecord />}
              label={WEBCAM_STRINGS.RECORDING}
              size="small"
            />
          )}
        </Stack>
        <Stack direction="row" spacing={0.5}>
          <IconButton aria-label={isAudioEnabled ? WEBCAM_STRINGS.MUTE_AUDIO : WEBCAM_STRINGS.UNMUTE_AUDIO} onClick={handleToggleAudio} size="small">
            {isAudioEnabled ? <Mic /> : <MicOff />}
          </IconButton>
          <IconButton aria-label={isVideoEnabled ? WEBCAM_STRINGS.TURN_OFF_VIDEO : WEBCAM_STRINGS.TURN_ON_VIDEO} onClick={handleToggleVideo} size="small">
            {isVideoEnabled ? <Videocam /> : <VideocamOff />}
          </IconButton>
        </Stack>
      </Stack>
      <div className={styles.videoContainer}>
        <video
          aria-label={WEBCAM_STRINGS.WEBCAM_FEED}
          autoPlay
          className={styles.video}
          muted
          playsInline
          ref={videoRef}
        />
      </div>
      {getCurrentTime && sessionUid && (
        <Stack className={styles.bookmarkButtonContainer} spacing={1}>
          <AddBookmarkButton
            disabled={!isRecording}
            getCurrentTime={getCurrentTime}
            sessionUid={sessionUid}
          />
        </Stack>
      )}
    </Paper>
  );
}

export default WebcamPanel;
