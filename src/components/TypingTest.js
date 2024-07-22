import React, { useState, useEffect, useRef, useCallback } from 'react';
import WordGenerator from '../utils/WordGenerator';
import GeometryEffect from './GeometryEffect';
import SummaryPage from './SummaryPage';
import DurationBanner from './DurationBanner';
import '../styles/Buttons.css';

const TypingTest = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testDuration, setTestDuration] = useState(15);
  const [typedText, setTypedText] = useState('');
  const [typedChars, setTypedChars] = useState([]);
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [lastTypedCorrect, setLastTypedCorrect] = useState(true);
  const [lastTypedChar, setLastTypedChar] = useState('');
  const [completedWords, setCompletedWords] = useState([]);
  const [correctWords, setCorrectWords] = useState(0);
  const [totalAttemptedWords, setTotalAttemptedWords] = useState(0);

  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const wordsRef = useRef(null);
  const wordsContainerRef = useRef(null);
  const correctCharsRef = useRef(0);
  const incorrectCharsRef = useRef(0);

  const updateCaretPosition = useCallback(() => {
    if (caretRef.current && !isTestComplete) {
      const currentWordElement = document.querySelector(`.word.current`);
      if (currentWordElement) {
        const chars = currentWordElement.querySelectorAll('span');
        let rect;
        if (currentCharIndex < chars.length) {
          rect = chars[currentCharIndex].getBoundingClientRect();
        } else {
          const lastChar = chars[chars.length - 1];
          rect = lastChar.getBoundingClientRect();
          rect = {
            ...rect,
            left: rect.right,
          };
        }
        const wordsRect = wordsRef.current.getBoundingClientRect();
        caretRef.current.style.left = `${rect.left - wordsRect.left}px`;
        caretRef.current.style.top = `${rect.top - wordsRect.top}px`;
        caretRef.current.style.height = `${rect.height}px`;
      }
    }
  }, [isTestComplete, currentCharIndex]);

  const scrollToCurrentWord = useCallback(() => {
    if (wordsContainerRef.current && wordsRef.current) {
      const containerHeight = wordsContainerRef.current.offsetHeight;
      const lineHeight = 60; // Increased from 48
      const currentLineNumber = Math.floor(currentWordIndex / 5); // Keep this as 5
      const scrollTop = currentLineNumber * lineHeight - containerHeight / 2 + lineHeight / 2;

      wordsContainerRef.current.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      });
    }
  }, [currentWordIndex]);

  const endTest = useCallback(() => {
    setIsTestComplete(true);
    if (inputRef.current) inputRef.current.disabled = true;

    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 60000;

    const totalCharsTyped = correctCharsRef.current + incorrectCharsRef.current;
    const totalWordsTyped = totalCharsTyped / 5;

    const wpm = Math.round(totalWordsTyped / timeElapsed);
    setWpm(wpm);

    const accuracy = totalCharsTyped > 0 ? Math.round((correctCharsRef.current / totalCharsTyped) * 100) : 100;
    setAccuracy(accuracy);
  }, [startTime]);

  const resetTest = useCallback(() => {
    setWords(WordGenerator.generateWords(100));
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    correctCharsRef.current = 0;
    incorrectCharsRef.current = 0;
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(testDuration);
    setTypedText('');
    setTypedChars([]);
    setIsTestComplete(false);
    setLastTypedCorrect(true);
    setLastTypedChar('');
    setCompletedWords([]);
    setCorrectWords(0);
    setTotalAttemptedWords(0);

    if (inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
  }, [testDuration]);

  useEffect(() => {
    resetTest();
  }, [testDuration, resetTest]);

  useEffect(() => {
    if (inputRef.current && !isTestComplete) {
      inputRef.current.focus();
    }
  }, [isTestComplete]);

  useEffect(() => {
    let timer;
    if (startTime && !isTestComplete) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [startTime, isTestComplete, endTest]);

  useEffect(() => {
    updateCaretPosition();
    scrollToCurrentWord();
  }, [currentWordIndex, currentCharIndex, typedChars, updateCaretPosition, scrollToCurrentWord]);

  useEffect(() => {
    if (currentWordIndex >= words.length - 20) {
      addMoreWords();
    }
  }, [currentWordIndex, words]);

  useEffect(() => {
    const handleResize = () => {
      setWords((prevWords) => [...prevWords]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addMoreWords = () => {
    const newWords = WordGenerator.generateWords(80); // Increased from 50
    setWords((prevWords) => [...prevWords, ...newWords]);
  };

  const handleKeyDown = (e) => {
    if (isTestComplete) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    const currentWord = words[currentWordIndex];

    if (e.key === ' ') {
      e.preventDefault();
      if (currentCharIndex === currentWord.length) {
        const isWordCorrect = typedChars.every(char => char.isCorrect);
        setCompletedWords(prev => [...prev, typedChars]);
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setCurrentCharIndex(0);
        setTypedText('');
        setTypedChars([]);
        setTotalAttemptedWords(prev => prev + 1);
        if (isWordCorrect) {
          setCorrectWords(prev => prev + 1);
        }
      }
    } else if (e.key === 'Backspace') {
      if (currentCharIndex > 0) {
        setCurrentCharIndex((prevIndex) => prevIndex - 1);
        setTypedChars((prev) => prev.slice(0, -1));
        if (typedChars[currentCharIndex - 1]?.isCorrect) {
          correctCharsRef.current--;
        } else {
          incorrectCharsRef.current--;
        }
      } else if (currentWordIndex > 0) {
        setCurrentWordIndex((prevIndex) => prevIndex - 1);
        const previousWord = completedWords[currentWordIndex - 1];
        setCurrentCharIndex(previousWord.length);
        setTypedChars(previousWord);
        setCompletedWords(prev => prev.slice(0, -1));
        setTotalAttemptedWords(prev => prev - 1);
        if (previousWord.every(char => char.isCorrect)) {
          setCorrectWords(prev => prev - 1);
        }
      }
    } else if (currentCharIndex < currentWord.length && e.key.length === 1) {
      const isCorrect = e.key === currentWord[currentCharIndex];
      setTypedChars((prev) => [...prev, { char: e.key, isCorrect }]);
      setCurrentCharIndex((prevIndex) => prevIndex + 1);
      if (isCorrect) {
        correctCharsRef.current++;
      } else {
        incorrectCharsRef.current++;
      }
      setLastTypedChar(e.key);
      setLastTypedCorrect(isCorrect);
    }
  };

  const renderWords = () => {
    const wordsPerLine = 5; // Keep this the same as before
    return words.map((word, wordIndex) => {
      const isCurrentWord = wordIndex === currentWordIndex;
      const isCompletedWord = wordIndex < currentWordIndex;
      const wordClass = `word ${isCurrentWord ? 'current' : ''} ${isCompletedWord ? 'completed' : ''}`;

      return (
          <React.Fragment key={wordIndex}>
            {wordIndex % wordsPerLine === 0 && wordIndex !== 0 && <br />}
            <span className={wordClass}>
          {word.split('').map((char, charIndex) => {
            let charClass = '';
            if (isCurrentWord) {
              if (charIndex < typedChars.length) {
                charClass = typedChars[charIndex].isCorrect ? 'correct' : 'incorrect';
              }
            } else if (isCompletedWord) {
              const completedChars = completedWords[wordIndex];
              if (completedChars && charIndex < completedChars.length) {
                charClass = completedChars[charIndex].isCorrect ? 'correct' : 'incorrect';
              }
            }
            return <span key={charIndex} className={charClass}>{char}</span>;
          })}
              {' '}
        </span>
          </React.Fragment>
      );
    });
  };

  return (
      <div className="typing-test">
        <DurationBanner setTestDuration={setTestDuration} />
        <GeometryEffect char={lastTypedChar} correct={lastTypedCorrect} />
        {isTestComplete ? (
            <SummaryPage
                wpm={wpm}
                accuracy={accuracy}
                resetTest={resetTest}
                completedWords={words.slice(0, currentWordIndex).length}
                completedChars={correctCharsRef.current + incorrectCharsRef.current}
                incorrectChars={incorrectCharsRef.current}
                wordAccuracy={totalAttemptedWords > 0 ? Math.round((correctWords / totalAttemptedWords) * 100) : 100}
            />
        ) : (
            <>
              <div className="words-container" ref={wordsContainerRef}>
                <div className="words" ref={wordsRef}>
                  {renderWords()}
                </div>
                <div ref={caretRef} className="caret blinking"></div>
              </div>
              <input
                  ref={inputRef}
                  type="text"
                  onKeyDown={handleKeyDown}
                  value={typedText}
                  onChange={(e) => setTypedText(e.target.value)}
                  className="typing-input"
              />
              <div className="stats">
                <div className="time-left-container">
                  <div>Time left: {timeLeft}s</div>
                  <button className="retry-button" onClick={resetTest}>
                    Retry
                  </button>
                </div>
              </div>
            </>
        )}
      </div>
  );
};

export default TypingTest;