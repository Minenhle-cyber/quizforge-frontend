import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', username);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
        <p style={styles.subtitle}>Login to track your scores</p>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleLogin}>Login</button>
        <p style={styles.link}>
          No account? <span style={styles.linkText} onClick={() => navigate('/register')}>Register</span>
        </p>
        <p style={styles.link}>
          <span style={styles.linkText} onClick={() => navigate('/')}>Continue as Guest</span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center', minHeight: '80vh'
  },
  card: {
    background: '#fff', padding: '2.5rem',
    borderRadius: '12px', width: '100%',
    maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
  },
  title: { fontSize: '1.8rem', color: '#1a1a2e', marginBottom: '0.25rem' },
  subtitle: { color: '#888', marginBottom: '1.5rem' },
  error: { color: '#e74c3c', marginBottom: '1rem' },
  input: {
    width: '100%', padding: '0.75rem',
    marginBottom: '1rem', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '1rem',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%', padding: '0.75rem',
    background: '#e94560', color: 'white',
    border: 'none', borderRadius: '8px',
    fontSize: '1rem', cursor: 'pointer',
    marginBottom: '1rem'
  },
  link: { textAlign: 'center', color: '#888', marginTop: '0.5rem' },
  linkText: { color: '#e94560', cursor: 'pointer', fontWeight: '500' }
};

export default Login;