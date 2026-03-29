import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/scores/leaderboard')
      .then(res => setScores(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏆 Leaderboard</h1>
      {scores.length === 0 ? (
        <p style={styles.empty}>No scores yet — be the first!</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Rank</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Quiz</th>
              <th style={styles.th}>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, index) => (
              <tr key={s.id} style={styles.tr}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{s.username}</td>
                <td style={styles.td}>{s.quiz.title}</td>
                <td style={styles.td}>{s.score} / {s.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
  title: { fontSize: '2rem', color: '#1a1a2e', marginBottom: '1.5rem' },
  empty: { color: '#888' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { background: '#1a1a2e', color: 'white', padding: '0.75rem 1rem', textAlign: 'left' },
  tr: { borderBottom: '1px solid #ddd' },
  td: { padding: '0.75rem 1rem', color: '#333' }
};

export default Leaderboard;