import { ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import { useThemeCSSVariables } from './theme/css-variables';
import Home from './pages/home';
import LiveSessionPage from './pages/live-session';
import SessionDetails from './pages/session-details';
import Whiteboard from './pages/whiteboard';

function ThemeVariablesSetter() {
  const theme = useTheme();
  useThemeCSSVariables(theme);
  return null;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ThemeVariablesSetter />
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions" element={<Home />} />
        <Route path="/sessions/:sessionUid" element={<SessionDetails />} />
        <Route path="/live-session/:sessionUid" element={<LiveSessionPage />} />
        <Route path="/whiteboard/:sessionUid" element={<Whiteboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

