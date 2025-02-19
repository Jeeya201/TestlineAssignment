// components/Quiz.js
import React, { useState, useEffect } from 'react';
import Question from './Question';
import ProgressBar from './ProgressBar';
import Scoreboard from './Scoreboard';
import { fetchQuizData } from '../services/api';

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const loadQuizData = async () => {
      const data = await fetchQuizData();
      setQuizData(data);
    };
    loadQuizData();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    return <Scoreboard score={score} totalQuestions={quizData.length} />;
  }

  if (!quizData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProgressBar current={currentQuestionIndex + 1} total={quizData.length} />
      <Question
        question={quizData[currentQuestionIndex]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default Quiz;