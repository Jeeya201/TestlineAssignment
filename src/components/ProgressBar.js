import React from 'react';

function ProgressBar({ currentQuestion, totalQuestions }) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="progress-container">
      <div className="progress-stats">
        <span>Question {currentQuestion} of {totalQuestions}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
