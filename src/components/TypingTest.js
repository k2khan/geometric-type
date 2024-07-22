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
  const [testDuration, setTestDuration] = useState(15);
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
    if (startTime && !isTestComplete) {
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
  }, [startTime, isTestComplete]);

  useEffect(() => {
    if (!isTestComplete) {
      calculateStats();
    }
  }, [correctChars, incorrectChars, isTestComplete]);

  useEffect(() => {
    updateCaretPosition();
    scrollToCurrentWord();
  }, [currentWordIndex, currentCharIndex, typedChars]);

  useEffect(() => {
    if (currentWordIndex >= words.length - 20) {
      addMoreWords();
    }
  }, [currentWordIndex, words]);

  useEffect(() => {
    const handleResize = () => {
      setWords(prevWords => [...prevWords]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addMoreWords = () => {
    const newWords = WordGenerator.generateWords(50);
    setWords((prevWords) => [...prevWords, ...newWords]);
  };

  const endTest = () => {
    setIsTestComplete(true);
    if (inputRef.current) inputRef.current.disabled = true;
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
    setIsTestComplete(false);
    setLastTypedCorrect(true);
    setLastTypedChar('');
    setWordEffects({});

    if (inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
  };

  const calculateStats = () => {
    if (startTime && isTestComplete) {
      const now = Date.now();
      const timeElapsed = (now - startTime) / 60000; // Time elapsed in minutes
      const totalChars = words.slice(0, currentWordIndex).join('').length;
      const grossWpm = (totalChars / 5) / timeElapsed; // Gross WPM
      const netWpm = Math.round(grossWpm - (incorrectChars / timeElapsed)); // Net WPM
      setWpm(netWpm);

      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
      setAccuracy(accuracy);
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
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setCurrentCharIndex(0);
        setTypedText('');
        setTypedChars([]);
        setWordEffects((prev) => ({ ...prev, [currentWordIndex]: 'completed' }));
        calculateStats();
      }
    } else if (e.key === 'Backspace') {
      if (currentCharIndex > 0) {
        setCurrentCharIndex((prevIndex) => prevIndex - 1);
        setTypedChars((prev) => prev.slice(0, -1));
        if (typedChars[currentCharIndex - 1]?.isCorrect) {
          setCorrectChars((prev) => prev - 1);
        } else {
          setIncorrectChars((prev) => prev - 1);
        }
      } else if (currentWordIndex > 0) {
        setCurrentWordIndex((prevIndex) => prevIndex - 1);
        setCurrentCharIndex(words[currentWordIndex - 1].length);
        setTypedChars([]);
      }
    } else if (currentCharIndex < currentWord.length && e.key.length === 1) {
      const isCorrect = e.key === currentWord[currentCharIndex];
      setTypedChars((prev) => [...prev, { char: e.key, isCorrect }]);
      setCurrentCharIndex((prevIndex) => prevIndex + 1);
      if (isCorrect) {
        setCorrectChars((prev) => prev + 1);
        setWordEffects((prev) => ({ ...prev, [currentWordIndex]: 'correct' }));
      } else {
        setIncorrectChars((prev) => prev + 1);
        setWordEffects((prev) => ({ ...prev, [currentWordIndex]: 'incorrect' }));
      }
      setLastTypedChar(e.key);
      setLastTypedCorrect(isCorrect);
    }
  };

  const renderWords = () => {
    const wordsPerLine = 5;
    return words.map((word, index) => {
      const isCurrentWord = index === currentWordIndex;
      const wordClass = `word ${isCurrentWord ? 'current' : ''} ${wordEffects[index] || ''}`;
      const isWordCompleted = wordEffects[index] === 'completed';

      return (
          <React.Fragment key={index}>
            {index % wordsPerLine === 0 && index !== 0 && <br />}
            <span className={wordClass}>
            {word.split('').map((char, charIndex) => {
              let charClass = '';
              if (isCurrentWord) {
                if (charIndex < typedChars.length) {
                  charClass = typedChars[charIndex].isCorrect ? 'correct' : 'incorrect';
                }
              } else if (isWordCompleted) {
                charClass = 'completed';
              }
              return <span key={charIndex} className={charClass}>{char}</span>;
            })}
              {' '}
          </span>
          </React.Fragment>
      );
    });
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

  const scrollToCurrentWord = () => {
    if (wordsContainerRef.current && wordsRef.current) {
      const containerHeight = wordsContainerRef.current.offsetHeight;
      const lineHeight = 48; // Adjust this value based on your CSS
      const currentLineNumber = Math.floor(currentWordIndex / 5);
      const scrollTop = currentLineNumber * lineHeight - containerHeight / 2 + lineHeight / 2;

      wordsContainerRef.current.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: 'smooth'
      });
    }
  };

  return (
      <div className="typing-test">
        <GeometryEffect char={lastTypedChar} correct={lastTypedCorrect} />
        {isTestComplete ? (
            <SummaryPage
                wpm={wpm}
                accuracy={accuracy}
                resetTest={resetTest}
                completedWords={words.slice(0, currentWordIndex).length}
                completedChars={correctChars + incorrectChars}
                incorrectChars={incorrectChars}
                wordAccuracy={Math.round((correctChars / (correctChars + incorrectChars)) * 100)}
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
