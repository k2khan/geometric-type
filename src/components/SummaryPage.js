import React from 'react';
import '../styles/Modal.css';

const SummaryPage = ({ wpm, accuracy, resetTest, completedWords, completedChars, incorrectChars, wordAccuracy }) => {
    return (
        <div className="summary-overlay">
            <div className="summary-container">
                <h2 className="summary-title">Test Complete!</h2>
                <div className="summary-grid">
                    <div className="summary-item">
                        <span className="summary-label">WPM</span>
                        <span className="summary-value">{wpm}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Accuracy</span>
                        <span className="summary-value">{accuracy}%</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Words</span>
                        <span className="summary-value">{completedWords}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Characters</span>
                        <span className="summary-value">{completedChars}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Errors</span>
                        <span className="summary-value">{incorrectChars}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Word Accuracy</span>
                        <span className="summary-value">{wordAccuracy}%</span>
                    </div>
                </div>
                <button className="summary-button" onClick={resetTest}>
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default SummaryPage;