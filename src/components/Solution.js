import React from 'react';

function Solution({ detailedSolution, isVisible, options }) {
  if (!isVisible || !options) return null;

  const correctOption = options.find(option => option.is_correct);
  const correctAnswer = correctOption ? correctOption.description : 'Not available';

  return (
    <div className="solution-container">
      <div className="solution-content">
        <span className="correct-answer">Correct answer is: </span>
        <span className="answer-text">"{correctAnswer}"</span>
      </div>
    </div>
  );
}

export default Solution; 