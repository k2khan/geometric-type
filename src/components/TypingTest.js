import React, { useState, useEffect, useRef } from 'react';
import WordGenerator from '../utils/WordGenerator';
import GeometryEffect from './GeometryEffect';
import SummaryPage from './SummaryPage';


const TypingTest = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testDuration, setTestDuration] = useState(5);
  const [typedText, setTypedText] = useState('');
  const [typedChars, setTypedChars] = useState([]);
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [lastTypedCorrect, setLastTypedCorrect] = useState(true);
  const [lastTypedChar, setLastTypedChar] = useState('');
  const [wordEffects, setWordEffects] = useState({});
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const wordsRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState(3);
  const wordsContainerRef = useRef(null);



  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    if (inputRef.current && !isTestComplete) {
      inputRef.current.focus();
    }
  }, [isTestComplete]);

  useEffect(() => {
    if (wordsContainerRef.current) {
      const containerHeight = wordsContainerRef.current.offsetHeight;
      const wordsContainer = document.querySelector('.words');
      if (wordsContainer) {
        wordsContainer.style.height = `${containerHeight * visibleLines}px`;
      }
    }
  }, [visibleLines]);

  useEffect(() => {
    if (startTime && !isTestComplete) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            endTest();
            return 0;
          }
          calculateStats();
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, isTestComplete]);

  useEffect(() => {
    calculateStats();
  }, [correctChars, incorrectChars]);

  useEffect(() => {
    updateCaretPosition();
  }, [currentWordIndex, currentCharIndex, typedChars]);

  const endTest = () => {
    setIsTestComplete(true);
    inputRef.current.disabled = true;
    calculateStats();
    console.log(`Test completed! WPM: ${wpm}, Accuracy: ${accuracy}%`);
  };

  const resetTest = () => {
    setWords(WordGenerator.generateWords(100));
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setTimeLeft(testDuration);
    setTypedText('');
    setTypedChars([]);
    setIsTestComplete(false); // Set isTestComplete to false after resetting
    setLastTypedCorrect(true);
    setLastTypedChar('');
    setWordEffects({});

    if (inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus(); // Focus the input field after resetting
    }
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
        setCurrentWordIndex(prevIndex => prevIndex + 1);
        setCurrentCharIndex(0);
        setTypedText('');
        setTypedChars([]);
        setWordEffects(prev => ({...prev, [currentWordIndex]: 'completed'}));
      }
    } else if (e.key === 'Backspace') {
      if (currentCharIndex > 0) {
        setCurrentCharIndex(prevIndex => prevIndex - 1);
        setTypedChars(prev => prev.slice(0, -1));
        if (typedChars[currentCharIndex - 1]?.isCorrect) {
          setCorrectChars(prev => prev - 1);
        } else {
          setIncorrectChars(prev => prev - 1);
        }
      } else if (currentWordIndex > 0) {
        setCurrentWordIndex(prevIndex => prevIndex - 1);
        setCurrentCharIndex(words[currentWordIndex - 1].length);
        setTypedChars([]);
      }
    } else if (currentCharIndex < currentWord.length && e.key.length === 1) {
      const isCorrect = e.key === currentWord[currentCharIndex];
      setTypedChars(prev => [...prev, { char: e.key, isCorrect }]);
      setCurrentCharIndex(prevIndex => prevIndex + 1);
      if (isCorrect) {
        setCorrectChars(prev => prev + 1);
        setWordEffects(prev => ({...prev, [currentWordIndex]: 'correct'}));
      } else {
        setIncorrectChars(prev => prev + 1);
        setWordEffects(prev => ({...prev, [currentWordIndex]: 'incorrect'}));
      }
      setLastTypedChar(e.key);
      setLastTypedCorrect(isCorrect);
    }
  };

  const calculateStats = () => {
    if (startTime) {
      const now = Date.now();
      const timeElapsed = (now - startTime) / 60000; // in minutes

      // Calculate WPM
      const totalWords = words.slice(0, currentWordIndex).reduce((acc, word) => acc + word.length, 0) / 5;
      const currentWpm = Math.round((totalWords / timeElapsed) || 0);

      // Use a weighted average to smooth out WPM
      setWpm(prevWpm => {
        const weight = 0.5; // Adjust this value to change how quickly WPM updates
        return Math.round(prevWpm * (1 - weight) + currentWpm * weight);
      });

      // Calculate Accuracy
      const totalChars = words.slice(0, currentWordIndex).join(' ').length;
      const newAccuracy = totalChars > 0
          ? Math.round((correctChars / totalChars) * 100)
          : 100;
      setAccuracy(newAccuracy);
    }
  };





  const updateCaretPosition = () => {
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
  };

  const renderWords = () => {
    const lines = [];
    let currentLine = [];

    words.forEach((word, wordIndex) => {
      const wordClass = `word ${wordIndex === currentWordIndex ? 'current' : ''} ${wordEffects[wordIndex] || ''}`;

      const wordChars = word.split('').map((char, charIndex) => {
        let charClass = '';
        if (wordIndex === currentWordIndex) {
          if (charIndex < typedChars.length) {
            charClass = typedChars[charIndex].isCorrect ? 'correct' : 'incorrect';
          } else if (charIndex === currentCharIndex) {
            charClass = 'current';
          }
        }
        return <span key={charIndex} className={charClass}>{char}</span>;
      });

      currentLine.push(
          <span key={wordIndex} className={wordClass}>
        {wordChars}
            {' '}
      </span>
      );

      if (currentLine.length >= 20 || wordIndex === words.length - 1) {
        lines.push(<div key={lines.length}>{currentLine}</div>);
        currentLine = [];
      }
    });

    return lines;
  };

  return (
      <div className="typing-test">
        <GeometryEffect char={lastTypedChar} correct={lastTypedCorrect} />
        {isTestComplete ? (
            <SummaryPage wpm={wpm} accuracy={accuracy} resetTest={resetTest} />
        ) : (
            <>
              <div className="words" ref={wordsRef} onClick={() => inputRef.current.focus()}>
                {renderWords()}
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
                <div>WPM: {wpm}</div>
                <div>Accuracy: {accuracy}%</div>
                <div>Time left: {timeLeft}s</div>
              </div>
            </>
        )}
      </div>
  );
};

export default TypingTest;