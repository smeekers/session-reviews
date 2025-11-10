import { Add, Remove } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '../../ui-library';
import * as styles from './index.css';

interface SessionSectionProps {
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  title: string;
  variant: 'active' | 'past';
  headerActions?: React.ReactNode;
}

function SessionSection({ children, expanded, onToggle, title, variant, headerActions }: SessionSectionProps) {
  const variantStyles = styles.variants[variant];

  return (
    <div className={styles.section}>
      <Stack className={variantStyles.header} direction="row" justifyContent="space-between" alignItems="center">
        <Stack className={styles.titleContainer} direction="row" spacing={2} alignItems="center">
          <Typography className={variantStyles.title} variant="h5">
            {title}
          </Typography>
          {headerActions}
        </Stack>
        <IconButton
          aria-label={expanded ? 'Collapse' : 'Expand'}
          className={variantStyles.expandButton}
          color={variant}
          onClick={onToggle}
          size="small"
        >
          {expanded ? <Remove /> : <Add />}
        </IconButton>
      </Stack>

      {expanded && <div className={variantStyles.content}>{children}</div>}
    </div>
  );
}

export default SessionSection;

