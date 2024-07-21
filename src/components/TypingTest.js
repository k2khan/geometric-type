import React, { useState, useEffect, useRef } from 'react';
import WordGenerator from '../utils/WordGenerator';

const TypingTest = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testDuration, setTestDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const wordsRef = useRef(null);

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    if (startTime) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  useEffect(() => {
    updateCaretPosition();
  }, [currentWordIndex, currentCharIndex]);

  const resetTest = () => {
    setWords(WordGenerator.generateWords(100));
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setCorrectChars(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(testDuration);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const currentWord = words[currentWordIndex];

    if (e.key === ' ') {
      e.preventDefault();
      if (currentCharIndex === currentWord.length) {
        setCurrentWordIndex(currentWordIndex + 1);
        setCurrentCharIndex(0);
      }
    } else if (e.key === 'Backspace') {
      if (currentCharIndex > 0) {
        setCurrentCharIndex(currentCharIndex - 1);
      } else if (currentWordIndex > 0) {
        setCurrentWordIndex(currentWordIndex - 1);
        setCurrentCharIndex(words[currentWordIndex - 1].length);
      }
    } else if (currentCharIndex < currentWord.length) {
      if (e.key === currentWord[currentCharIndex]) {
        setCorrectChars(correctChars + 1);
      }
      setCurrentCharIndex(currentCharIndex + 1);
    }

    calculateStats();
  };

  const calculateStats = () => {
    const timeElapsed = (Date.now() - startTime) / 60000; // in minutes
    const wordsTyped = currentWordIndex + (currentCharIndex > 0 ? 1 : 0);
    const newWpm = Math.round((wordsTyped / timeElapsed) || 0);
    setWpm(newWpm);

    const totalChars = words.slice(0, currentWordIndex).join(' ').length + currentCharIndex;
    const newAccuracy = Math.round((correctChars / totalChars) * 100) || 100;
    setAccuracy(newAccuracy);
  };

  const endTest = () => {
    // Implement end of test logic
  };

  const updateCaretPosition = () => {
    if (caretRef.current && wordsRef.current) {
      const wordElements = wordsRef.current.querySelectorAll('.word');
      const currentWordElement = wordElements[currentWordIndex];
      
      if (currentWordElement) {
        const chars = currentWordElement.querySelectorAll('span');
        let targetRect;
        
        if (currentCharIndex < chars.length) {
          targetRect = chars[currentCharIndex].getBoundingClientRect();
        } else {
          // If at the end of the word, position after the last character
          targetRect = chars[chars.length - 1].getBoundingClientRect();
          targetRect = {
            ...targetRect,
            left: targetRect.right,
          };
        }

        const wordsRect = wordsRef.current.getBoundingClientRect();
        caretRef.current.style.left = `${targetRect.left - wordsRect.left}px`;
        caretRef.current.style.top = `${targetRect.top - wordsRect.top}px`;
        caretRef.current.style.height = `${targetRect.height}px`;
      }
    }
  };

  const renderWords = () => {
    return words.map((word, wordIndex) => {
      if (wordIndex < currentWordIndex) {
        return <span key={wordIndex} className="word completed">{word} </span>;
      }
      if (wordIndex === currentWordIndex) {
        return (
          <span key={wordIndex} className={`word current word-${wordIndex}`}>
            {word.split('').map((char, charIndex) => {
              let charClass = '';
              if (charIndex < currentCharIndex) {
                charClass = char === words[currentWordIndex][charIndex] ? 'correct' : 'incorrect';
              }
              return <span key={charIndex} className={charClass}>{char}</span>;
            })}
          </span>
        );
      }
      return <span key={wordIndex} className="word">{word} </span>;
    });
  };

  return (
    <div className="typing-test">
      <div className="words" ref={wordsRef} onClick={() => inputRef.current.focus()}>
        {renderWords()}
        <div ref={caretRef} className="caret"></div>
      </div>
      <input
        ref={inputRef}
        type="text"
        onKeyDown={handleKeyDown}
        className="typing-input"
      />
      <div className="stats">
        <div>WPM: {wpm}</div>
        <div>Accuracy: {accuracy}%</div>
        <div>Time left: {timeLeft}s</div>
      </div>
      <button onClick={resetTest}>Reset</button>
    </div>
  );
};

export default TypingTest;