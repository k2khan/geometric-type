import React from 'react';

function TextArea({ targetText, userText }) {
  return (
    <div className="text-area">
      <div className="target-text">{targetText}</div>
      <div className="user-text">
        {userText.split('').map((char, index) => (
          <span key={index} className={char === targetText[index] ? 'correct' : 'incorrect'}>
            {char}
          </span>
        ))}
      </div>
      <div className="cursor"></div>
    </div>
  );
}

export default TextArea;