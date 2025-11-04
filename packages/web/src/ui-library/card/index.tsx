import type { CardProps as MuiCardProps } from '@mui/material/Card';
import type { CardActionAreaProps as MuiCardActionAreaProps } from '@mui/material/CardActionArea';
import type { CardContentProps as MuiCardContentProps } from '@mui/material/CardContent';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';

export interface CardProps extends MuiCardProps {}
export interface CardActionAreaProps extends MuiCardActionAreaProps {}
export interface CardContentProps extends MuiCardContentProps {}

function UiCard(props: CardProps) {
  return <Card {...props} />;
}

function UiCardActionArea(props: CardActionAreaProps) {
  return <CardActionArea {...props} />;
}

function UiCardContent(props: CardContentProps) {
  return <CardContent {...props} />;
}

export { UiCard, UiCardActionArea, UiCardContent };

