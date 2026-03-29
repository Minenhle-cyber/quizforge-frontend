import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/quizzes')
      .then(response => setQuizzes(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Available Quizzes</h1>
      <div style={styles.grid}>
        {quizzes.length === 0 ? (
          <p style={styles.empty}>No quizzes available yet.</p>
        ) : (
          quizzes.map(quiz => (
            <div key={quiz.id} style={styles.card}>
              <h3>{quiz.title}</h3>
              <p>{quiz.category}</p>
              <p>⏱ {quiz.timeLimit} minutes</p>
              <button
                style={styles.button}
                onClick={() => navigate(`/quiz/${quiz.id}`)}>
                Start Quiz
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem' },
  title: { fontSize: '2rem', marginBottom: '1.5rem', color: '#1a1a2e' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '1.5rem' },
  card: {
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '1.5rem',
    width: '250px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    background: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  empty: { color: '#888' }
};

export default Home;