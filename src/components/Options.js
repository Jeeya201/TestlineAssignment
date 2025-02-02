import React from 'react';

function Options({ options, selectedAnswer, onOptionSelect, disabled }) {
  return (
    <div className="options">
      {options.map(option => {
        let optionClass = 'option';
        
        if (selectedAnswer !== undefined) {
          if (option.id === selectedAnswer) {
            optionClass += option.is_correct ? ' correct' : ' incorrect';
          } else if (option.is_correct) {
            optionClass += ' correct';
          }
        }

        return (
          <div 
            key={option.id}
            className={optionClass}
            onClick={(e) => !disabled && onOptionSelect(option.id, e)}
            style={{ cursor: disabled ? 'default' : 'pointer' }}
          >
            {option.description}
          </div>
        );
      })}
    </div>
  );
}

export default Options;
