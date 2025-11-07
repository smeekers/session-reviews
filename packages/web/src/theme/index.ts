import { createTheme } from '@mui/material/styles';

// Professional, low-tone color palette
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Standard MUI blue
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0', // Purple for accents
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32', // Professional green
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    // Custom colors for session sections
    active: {
      main: '#3f51b5', // Muted blue-purple
      light: '#e8eaf6', // Very light blue-purple for content area
      dark: '#283593', // Darker for header
      contrastText: '#ffffff',
    },
    past: {
      main: '#388e3c', // Muted green
      light: '#e8f5e9', // Very light green for content area
      dark: '#2e7d32', // Darker for header
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

// Type augmentation for custom palette colors
declare module '@mui/material/styles' {
  interface Palette {
    active: Palette['primary'];
    past: Palette['primary'];
  }

  interface PaletteOptions {
    active?: PaletteOptions['primary'];
    past?: PaletteOptions['primary'];
  }
}

