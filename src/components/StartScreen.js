import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function StartScreen() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="start-screen">
      <h2>Ready to begin?</h2>
      <Button 
        variant="contained" 
        color="primary"
        size="large"
        onClick={handleStartQuiz}
      >
        Start Quiz
      </Button>
    </div>
  );
}

export default StartScreen;