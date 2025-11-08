import type { CardProps as MuiCardProps } from '@mui/material/Card';
import type { CardActionAreaProps as MuiCardActionAreaProps } from '@mui/material/CardActionArea';
import type { CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import classNames from 'classnames';
import * as styles from './index.css';

interface CardProps extends MuiCardProps {}
interface CardActionAreaProps extends MuiCardActionAreaProps {}
interface CardContentProps extends MuiCardContentProps {}

function UiCard({ className, ...props }: CardProps) {
  return <Card className={classNames(styles.root, className)} {...props} />;
}

function UiCardActionArea(props: CardActionAreaProps) {
  return <CardActionArea {...props} />;
}

function UiCardContent({ className, ...props }: CardContentProps) {
  return <CardContent className={classNames(styles.content, className)} {...props} />;
}

export { UiCard, UiCardActionArea, UiCardContent };
export type { CardActionAreaProps, CardContentProps, CardProps };
