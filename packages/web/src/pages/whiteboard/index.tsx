import { useParams } from 'react-router-dom';
import { Container } from '../../ui-library';
import Whiteboard from '../../components/whiteboard';
import * as styles from './index.css';

function WhiteboardPage() {
  const { sessionUid } = useParams<{ sessionUid: string }>();

  if (!sessionUid) {
    return (
      <Container maxWidth="lg">
        <div>Session not found</div>
      </Container>
    );
  }

  // Use session UID as the room ID (Liveblocks room name = session UID)
  return (
    <Container className={styles.container} maxWidth={false}>
      <Whiteboard roomId={sessionUid} />
    </Container>
  );
}

export default WhiteboardPage;

