// components/ConfettiEffect.js
import React from 'react';
import Confetti from 'react-confetti';

const ConfettiEffect = ({ trigger, clickPosition }) => {
  if (!trigger || !clickPosition) return null;
  
  return (
    <Confetti
      width={300} // Smaller area for burst effect
      height={300}
      numberOfPieces={100}
      recycle={false}
      colors={['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0']}
      gravity={0.8}
      tweenDuration={2000}
      style={{
        position: 'fixed',
        left: clickPosition.x - 150, // Center the burst
        top: clickPosition.y - 150,
        pointerEvents: 'none',
      }}
      initialVelocityX={{ min: -10, max: 10 }} // Spread horizontally
      initialVelocityY={{ min: -10, max: 10 }} // Spread vertically
      spread={360} // Full circle burst
    />
  );
};

export default ConfettiEffect;