import { Box, Container, Typography } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Session Reviews
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the Session Reviews application.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;

