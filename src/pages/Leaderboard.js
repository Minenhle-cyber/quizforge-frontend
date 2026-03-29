import React, { useState } from 'react';

function Leaderboard() {
  const [scores] = useState([
    { rank: 1, name: 'Alice', quiz: 'Java Basics', score: 10, total: 10 },
    { rank: 2, name: 'Bob', quiz: 'Python Basics', score: 9, total: 10 },
    { rank: 3, name: 'Charlie', quiz: 'Spring Boot', score: 8, total: 10 },
    { rank: 4, name: 'Diana', quiz: 'Java Basics', score: 7, total: 10 },
    { rank: 5, name: 'Eve', quiz: 'Python Basics', score: 6, total: 10 },
  ]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Leaderboard</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Rank</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Quiz</th>
            <th style={styles.th}>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(s => (
            <tr key={s.rank} style={styles.tr}>
              <td style={styles.td}>{s.rank}</td>
              <td style={styles.td}>{s.name}</td>
              <td style={styles.td}>{s.quiz}</td>
              <td style={styles.td}>{s.score} / {s.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '800px', margin: '0 auto' },
  title: { fontSize: '2rem', color: '#1a1a2e', marginBottom: '1.5rem' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    background: '#1a1a2e', color: 'white',
    padding: '0.75rem 1rem', textAlign: 'left'
  },
  tr: { borderBottom: '1px solid #ddd' },
  td: { padding: '0.75rem 1rem', color: '#333' }
};

export default Leaderboard;