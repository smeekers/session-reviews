import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import * as styles from './index.css';
import { bannerAtom } from '../../atoms/banner';
import { ROUTES } from '../../constants';
import { Alert, Button } from '../../ui-library';

function SessionBanner() {
  const [bannerState, setBannerState] = useAtom(bannerAtom);
  const navigate = useNavigate();

  if (bannerState.type === 'hidden') {
    return null;
  }

  function handleDismiss() {
    setBannerState({ type: 'hidden' });
  }

  function handleJoinNow() {
    if (bannerState.type === 'ready') {
      navigate(ROUTES.LIVE_SESSION(bannerState.sessionUid));
      setBannerState({ type: 'hidden' });
    }
  }

  if (bannerState.type === 'creating') {
    return (
      <Alert
        className={styles.banner}
        onClose={handleDismiss}
        severity="info"
      >
        Creating session...
      </Alert>
    );
  }

  if (bannerState.type === 'ready') {
    return (
      <Alert
        action={
          <Button onClick={handleJoinNow} size="small" variant="contained">
            Join Now
          </Button>
        }
        className={styles.banner}
        onClose={handleDismiss}
        severity="success"
      >
        Session ready{bannerState.sessionName ? `: ${bannerState.sessionName}` : ''}
      </Alert>
    );
  }

  return null;
}

export default SessionBanner;

