import { useParams } from 'react-router-dom';

function Whiteboard() {
  const { sessionUid } = useParams<{ sessionUid: string }>();
  return <div>Whiteboard - {sessionUid} - Coming Soon</div>;
}

export default Whiteboard;

