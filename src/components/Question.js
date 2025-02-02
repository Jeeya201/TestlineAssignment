import React, { useState, useEffect } from 'react';
import Options from './Options';
import Solution from './Solution';
import ConfettiEffect from './ConfettiEffect';

function Question({ 
  question, 
  selectedAnswer, 
  onAnswerSelect,
  onQuestionComplete,
  onPreviousQuestion,
  hasPreviousQuestion,
  currentQuestionIndex,
  totalQuestions,
  onViewResults
}) {
  const [showSolution, setShowSolution] = useState(false);
  const [timer, setTimer] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clickPosition, setClickPosition] = useState(null);

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  useEffect(() => {
    if (selectedAnswer) {
      setShowSolution(true);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [timer, selectedAnswer, question.id]);

  const handleOptionSelect = (optionId, event) => {
    if (!question || !question.options) return;
    
    const selectedOption = question.options.find(opt => opt.id === optionId);
    if (!selectedOption) return;

    onAnswerSelect(question.id, optionId);
    setShowSolution(true);

    // Show confetti if answer is correct
    if (selectedOption.is_correct) {
      setClickPosition({
        x: event.clientX,
        y: event.clientY
      });
      setShowConfetti(true);
      // Hide confetti after 2 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setClickPosition(null);
      }, 2000);
    }

    // Set automatic navigation timer
    const newTimer = setTimeout(() => {
      handleNextClick();
    }, 5000);
    setTimer(newTimer);
  };

  const handleNextClick = () => {
    if (timer) clearTimeout(timer);
    
    if (!question || !question.options || !selectedAnswer) return;
    
    const selectedOption = question.options.find(opt => opt.id === selectedAnswer);
    if (!selectedOption) return;

    onQuestionComplete(selectedOption.is_correct);
    setShowSolution(false);
  };

  const handlePreviousClick = () => {
    if (timer) clearTimeout(timer);
    onPreviousQuestion();
  };

  if (!question || !question.options) {
    return <div>Loading question...</div>;
  }

  return (
    <div className="question">
      <ConfettiEffect 
        trigger={showConfetti} 
        clickPosition={clickPosition}
      />
      <h2>{question.description}</h2>
      <Options 
        options={question.options}
        selectedAnswer={selectedAnswer}
        onOptionSelect={handleOptionSelect}
        disabled={selectedAnswer !== undefined}
      />
      <Solution 
        detailedSolution={question.detailed_solution}
        isVisible={showSolution}
        options={question.options}
      />
      <div className="navigation-buttons">
        <button 
          onClick={handlePreviousClick}
          disabled={!hasPreviousQuestion}
          className="nav-button"
        >
          Previous
        </button>
        {selectedAnswer && (
          <button 
            onClick={isLastQuestion ? onViewResults : handleNextClick}
            className={`nav-button ${isLastQuestion ? 'results' : 'next'}`}
          >
            {isLastQuestion ? 'View Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Question;
