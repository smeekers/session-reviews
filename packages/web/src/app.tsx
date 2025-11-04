import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LiveSession from './pages/live-session';
import SessionDetails from './pages/session-details';
import Whiteboard from './pages/whiteboard';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions/:sessionUid" element={<SessionDetails />} />
        <Route path="/live-session/:sessionUid" element={<LiveSession />} />
        <Route path="/whiteboard/:sessionUid" element={<Whiteboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

