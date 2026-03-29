import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>QuizForge</h1>
        <p style={styles.tagline}>Test your knowledge. Track your progress. Beat the leaderboard.</p>
        <div style={styles.buttons}>
          <button style={styles.primary} onClick={() => navigate('/login')}>
            Login
          </button>
          <button style={styles.secondary} onClick={() => navigate('/register')}>
            Create Account
          </button>
          <button style={styles.ghost} onClick={() => navigate('/home')}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center', minHeight: '100vh',
    background: '#1a1a2e',
  },
  card: {
    background: '#fff', padding: '3rem',
    borderRadius: '16px', width: '100%',
    maxWidth: '440px', textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
  },
  logo: { fontSize: '2.5rem', color: '#e94560', marginBottom: '0.5rem' },
  tagline: { color: '#888', marginBottom: '2rem', lineHeight: '1.6' },
  buttons: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  primary: {
    padding: '0.85rem', background: '#e94560',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '1rem', cursor: 'pointer', fontWeight: '500'
  },
  secondary: {
    padding: '0.85rem', background: '#1a1a2e',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '1rem', cursor: 'pointer', fontWeight: '500'
  },
  ghost: {
    padding: '0.85rem', background: 'transparent',
    color: '#888', border: '1px solid #ddd', borderRadius: '8px',
    fontSize: '1rem', cursor: 'pointer', fontWeight: '500'
  }
};

export default Landing;

