import { style } from '@vanilla-extract/css';

const section = style({
  borderRadius: '0.5rem',
  overflow: 'hidden',
});

const titleContainer = style({
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
});

const baseHeader = style({
  alignItems: 'center',
  borderRadius: '0.5rem 0.5rem 0 0',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1rem 1.5rem',
});

const baseTitle = style({
  fontSize: '1.125rem',
  fontWeight: 700,
});

const baseExpandButton = style({});

const baseContent = style({
  borderRadius: '0 0 0.5rem 0.5rem',
  padding: '1.5rem',
});

const activeHeader = style([
  baseHeader,
  {
    backgroundColor: 'var(--theme-active-dark)',
  },
]);

const activeTitle = style([
  baseTitle,
  {
    color: 'var(--theme-active-contrast)',
  },
]);

const activeExpandButton = style([
  baseExpandButton,
  {
    color: 'var(--theme-active-contrast)',
  },
]);

const activeContent = style([
  baseContent,
  {
    backgroundColor: 'var(--theme-active-light)',
  },
]);

const pastHeader = style([
  baseHeader,
  {
    backgroundColor: 'var(--theme-past-dark)',
  },
]);

const pastTitle = style([
  baseTitle,
  {
    color: 'var(--theme-past-contrast)',
  },
]);

const pastExpandButton = style([
  baseExpandButton,
  {
    color: 'var(--theme-past-contrast)',
  },
]);

const pastContent = style([
  baseContent,
  {
    backgroundColor: 'var(--theme-past-light)',
  },
]);

const variants = {
  active: {
    content: activeContent,
    expandButton: activeExpandButton,
    header: activeHeader,
    title: activeTitle,
  },
  past: {
    content: pastContent,
    expandButton: pastExpandButton,
    header: pastHeader,
    title: pastTitle,
  },
};

export { section, titleContainer, variants };
