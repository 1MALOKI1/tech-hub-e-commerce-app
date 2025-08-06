import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from 'react-router'; // Using react-router-dom
import { Box, TextField, Button, Container, Typography, Alert, CircularProgress } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Simple string for message
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear message on submit
    
    // Simple validation
    if (!email || !password) {
      setMessage("Please enter both your email and password.");
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      navigate('/products');
    } else {
      setMessage(res.error || "Login failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      
      {message && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      
      <Box 
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Log In
          </Button>
        )}
      </Box>
    </Container>
  );
}