import React, { useState, useEffect } from 'react';
import Question from '../components/Question';
import { fetchQuizData } from '../services/api';
import '../styles/QuizPage.css';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';

function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setLoading(true);
        const data = await fetchQuizData();
        console.log('Data received:', data); // Debug log
        setQuizData(data);
      } catch (err) {
        setError('Failed to load quiz data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuizData();
  }, []); // Empty dependency array to load once

  const handleAnswerSelect = (questionId, optionId) => {
    if (answeredQuestions.has(questionId)) return;

    const currentQuestion = quizData.questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(opt => opt.id === optionId);

    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));

    setAnsweredQuestions(prev => new Set([...prev, questionId]));

    // Update scores immediately when answer is selected
    if (selectedOption.is_correct) {
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
      setScore(prev => prev + 0);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionComplete = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleTimeUp = () => {
    setIsQuizComplete(true);
    // Calculate final score and show results
    // You can add more logic here for when time is up
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

  // Add this for debugging
  useEffect(() => {
    console.log('Correct Answers:', correctAnswers);
    console.log('Incorrect Answers:', incorrectAnswers);
    console.log('Total Answered:', answeredQuestions.size);
  }, [correctAnswers, incorrectAnswers, answeredQuestions]);

  if (loading) {
    return <div className="loading">Loading quiz...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return <div className="error">No questions available</div>;
  }

  if (showResults || isQuizComplete) {
    return (
      <div className="quiz-results">
        <h2>Quiz Results</h2>
        <div className="results-stats">
          <div className="stat-card">
            <div className="stat-label">Total Score</div>
            <div className="stat-value">{score}</div>
          </div>
          <div className="stat-card correct">
            <div className="stat-label">Correct Answers</div>
            <div className="stat-value">{correctAnswers}</div>
          </div>
          <div className="stat-card incorrect">
            <div className="stat-label">Incorrect Answers</div>
            <div className="stat-value">{incorrectAnswers}</div>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="restart-button"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{quizData.title}</h1>
        <Timer 
          initialMinutes={15} 
          onTimeUp={handleTimeUp}
        />
      </div>
      
      <ProgressBar 
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizData.questions.length}
      />
      
      <Question
        question={currentQuestion}
        selectedAnswer={selectedAnswers[currentQuestion.id]}
        onAnswerSelect={handleAnswerSelect}
        onQuestionComplete={handleQuestionComplete}
        onPreviousQuestion={handlePreviousQuestion}
        hasPreviousQuestion={currentQuestionIndex > 0}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quizData.questions.length}
        onViewResults={handleViewResults}
      />

      {/* <div className="navigation-buttons">
        <button 
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
      </div> */}

      {/* Optional: Debug information */}
      {/* {process.env.NODE_ENV === 'development' && (
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
          <div>Current Question: {currentQuestionIndex + 1}</div>
        </div>
      )} */}
    </div>
  );
}

export default QuizPage;