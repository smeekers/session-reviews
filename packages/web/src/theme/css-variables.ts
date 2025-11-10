import { useEffect } from 'react';
import type { Theme } from '@mui/material/styles';

/**
 * Sets CSS variables from the theme on the document root
 * This allows vanilla-extract to access theme values via CSS variables
 */
export function useThemeCSSVariables(theme: Theme): void {
  useEffect(() => {
    const root = document.documentElement;

    // Active session colors
    root.style.setProperty('--theme-active-main', theme.palette.active.main);
    root.style.setProperty('--theme-active-light', theme.palette.active.light);
    root.style.setProperty('--theme-active-dark', theme.palette.active.dark);
    root.style.setProperty('--theme-active-contrast', theme.palette.active.contrastText);

    // Past session colors
    root.style.setProperty('--theme-past-main', theme.palette.past.main);
    root.style.setProperty('--theme-past-light', theme.palette.past.light);
    root.style.setProperty('--theme-past-dark', theme.palette.past.dark);
    root.style.setProperty('--theme-past-contrast', theme.palette.past.contrastText);

    // Standard palette colors
    root.style.setProperty('--theme-primary-main', theme.palette.primary.main);
    root.style.setProperty('--theme-primary-light', theme.palette.primary.light);
    root.style.setProperty('--theme-primary-dark', theme.palette.primary.dark);
    root.style.setProperty('--theme-primary-contrast', theme.palette.primary.contrastText);

    root.style.setProperty('--theme-error-main', theme.palette.error.main);
    root.style.setProperty('--theme-error-light', theme.palette.error.light);
    root.style.setProperty('--theme-success-main', theme.palette.success.main);
    root.style.setProperty('--theme-success-light', theme.palette.success.light);
    root.style.setProperty('--theme-warning-main', theme.palette.warning.main);
    root.style.setProperty('--theme-warning-light', theme.palette.warning.light);
    root.style.setProperty('--theme-info-main', theme.palette.info.main);
    root.style.setProperty('--theme-info-light', theme.palette.info.light);
    root.style.setProperty('--theme-secondary-light', theme.palette.secondary.light);
    root.style.setProperty('--theme-secondary-dark', theme.palette.secondary.dark);
    root.style.setProperty('--theme-secondary-contrast', theme.palette.secondary.contrastText);
    root.style.setProperty('--theme-secondary-main', theme.palette.secondary.main);

    root.style.setProperty('--theme-background-default', theme.palette.background.default);
    root.style.setProperty('--theme-background-paper', theme.palette.background.paper);

    root.style.setProperty('--theme-text-primary', theme.palette.text.primary);
    root.style.setProperty('--theme-text-secondary', theme.palette.text.secondary);
  }, [theme]);
}

