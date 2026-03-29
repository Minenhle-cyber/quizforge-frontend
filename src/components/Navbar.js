import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>QuizForge</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/leaderboard" style={styles.link}>Leaderboard</Link>
        {username ? (
          <>
            <span style={styles.username}>👤 {username}</span>
            <button style={styles.logout} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.linkButton}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '1rem 2rem',
    background: '#1a1a2e', color: 'white',
  },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#e94560' },
  links: { display: 'flex', gap: '1.5rem', alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none', fontWeight: '500' },
  linkButton: {
    color: 'white', textDecoration: 'none',
    background: '#e94560', padding: '0.4rem 1rem',
    borderRadius: '6px', fontWeight: '500'
  },
  username: { color: '#e94560', fontWeight: '500' },
  logout: {
    background: 'transparent', color: 'white',
    border: '1px solid white', borderRadius: '6px',
    padding: '0.4rem 1rem', cursor: 'pointer'
  }
};

export default Navbar;