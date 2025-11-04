import { useParams } from 'react-router-dom';

function LiveSession() {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  return <div>Live Session - {sessionUid} - Coming Soon</div>;
}

export default LiveSession;

