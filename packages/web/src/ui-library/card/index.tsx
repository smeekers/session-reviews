import type { CardProps as MuiCardProps } from '@mui/material/Card';
import type { CardActionAreaProps as MuiCardActionAreaProps } from '@mui/material/CardActionArea';
import type { CardActionsProps as MuiCardActionsProps } from '@mui/material/CardActions';
import type { CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import classNames from 'classnames';
import * as styles from './index.css';

type CardVariant = 'default' | 'accent-purple' | 'accent-orange' | 'accent-blue' | 'accent-green' | 'accent-red';

interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: CardVariant;
}
interface CardActionAreaProps extends MuiCardActionAreaProps {}
interface CardActionsProps extends MuiCardActionsProps {}
interface CardContentProps extends MuiCardContentProps {}

function UiCard({ className, variant = 'default', ...props }: CardProps) {
  const variantClassMap: Record<Exclude<CardVariant, 'default'>, string> = {
    'accent-purple': styles.accentPurple,
    'accent-orange': styles.accentOrange,
    'accent-blue': styles.accentBlue,
    'accent-green': styles.accentGreen,
    'accent-red': styles.accentRed,
  };
  const variantClass = variant !== 'default' ? variantClassMap[variant] : undefined;
  return <Card className={classNames(styles.root, variantClass, className)} {...props} />;
}

function UiCardActionArea(props: CardActionAreaProps) {
  return <CardActionArea {...props} />;
}

function UiCardActions(props: CardActionsProps) {
  return <CardActions {...props} />;
}

function UiCardContent({ className, ...props }: CardContentProps) {
  return <CardContent className={classNames(styles.content, className)} {...props} />;
}

export { UiCard, UiCardActionArea, UiCardActions, UiCardContent };
export type { CardActionAreaProps, CardActionsProps, CardContentProps, CardProps };
