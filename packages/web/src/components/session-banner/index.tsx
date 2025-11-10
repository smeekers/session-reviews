import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { COMMON_STRINGS } from '../../constants';
import * as styles from './index.css';
import { bannerAtom, getBannerConfig } from '../../atoms/banner';
import { Alert, Button } from '../../ui-library';

function SessionBanner() {
  const [bannerState, setBannerState] = useAtom(bannerAtom);
  const navigate = useNavigate();

  const config = getBannerConfig(bannerState);

  function handleDismiss() {
    setBannerState({ type: 'hidden' });
  }

  function handleAction(route: string) {
    navigate(route);
    setBannerState({ type: 'hidden' });
  }

  if (!config) {
    return null;
  }

  const actionButton = config.actionButton;

  return (
    <Alert
      action={
        <div className={styles.actionContainer}>
          {actionButton && (
            <Button
              onClick={() => handleAction(actionButton.route)}
              size="small"
              variant="contained"
            >
              {actionButton.label}
            </Button>
          )}
          <Button
            className={styles.closeButton}
            onClick={handleDismiss}
            size="small"
            variant="text"
          >
            {COMMON_STRINGS.DISMISS}
          </Button>
        </div>
      }
      className={styles.banner}
      severity={config.severity}
    >
      {config.message}
    </Alert>
  );
}

export default SessionBanner;

