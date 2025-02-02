import React, { useState, useEffect } from 'react';

function Timer({ initialMinutes = 15, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Add warning class when less than 2 minutes remaining
  const timerClass = `quiz-timer ${timeLeft <= 120 ? 'warning' : ''}`;

  return (
    <div className={timerClass}>
      <span className="timer-icon">⏱</span>
      <span className="timer-text">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

export default Timer;
