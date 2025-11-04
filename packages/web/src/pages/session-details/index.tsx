import { useParams } from 'react-router-dom';

function SessionDetails() {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  return <div>Session Details - {sessionUid} - Coming Soon</div>;
}

export default SessionDetails;

