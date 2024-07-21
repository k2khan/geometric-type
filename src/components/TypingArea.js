import React, { useRef, useEffect } from 'react';

function TypingArea({ text, typedText, onType }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInput = (e) => {
    onType(e.target.value);
  };

  return (
    <div className="typing-area">
      <div className="text-display">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={
              typedText[index] === char
                ? 'correct'
                : typedText[index]
                ? 'incorrect'
                : ''
            }
          >
            {char}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={typedText}
        onChange={handleInput}
        className="typing-input"
      />
    </div>
  );
}

export default TypingArea;