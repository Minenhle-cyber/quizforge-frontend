import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/questions/quiz/${id}`)
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[current].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const username = localStorage.getItem('username');
    if (username) {
      try {
        await axios.post('http://localhost:8080/api/scores', {
          username,
          score,
          total: questions.length,
          quizId: parseInt(id)
        });
      } catch (err) {
        console.error('Failed to save score', err);
      }
    }
    setFinished(true);
  };

  if (finished) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Quiz Complete!</h1>
        <p style={styles.score}>Your score: {score} / {questions.length}</p>
        <button style={styles.button} onClick={() => navigate('/home')}>
          Back to Home
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div style={styles.container}>Loading questions...</div>;
  }

  const q = questions[current];

  return (
    <div style={styles.container}>
      <p style={styles.counter}>Question {current + 1} of {questions.length}</p>
      <h2 style={styles.question}>{q.questionText}</h2>
      <div style={styles.options}>
        {['A', 'B', 'C', 'D'].map(opt => (
          <button
            key={opt}
            style={{
              ...styles.option,
              background: selected === opt
                ? opt === q.correctAnswer ? '#2ecc71' : '#e74c3c'
                : '#f0f0f0'
            }}
            onClick={() => handleAnswer(opt)}
            disabled={selected !== null}
          >
            {opt}. {q[`option${opt}`]}
          </button>
        ))}
      </div>
      {selected && (
        <button style={styles.button} onClick={handleNext}>
          {current + 1 < questions.length ? 'Next Question' : 'Finish Quiz'}
        </button>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '700px', margin: '0 auto' },
  title: { fontSize: '2rem', color: '#1a1a2e' },
  score: { fontSize: '1.5rem', margin: '1rem 0' },
  counter: { color: '#888', marginBottom: '0.5rem' },
  question: { fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1a1a2e' },
  options: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  option: {
    padding: '0.75rem 1rem', borderRadius: '8px',
    border: 'none', cursor: 'pointer',
    fontSize: '1rem', textAlign: 'left',
  },
  button: {
    marginTop: '1.5rem', padding: '0.75rem 1.5rem',
    background: '#e94560', color: 'white',
    border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '1rem',
  }
};

export default Quiz;