import React, { useState } from 'react';
import '../styles/Modal.css';
import Leaderboard from './Leaderboard';

const SummaryPage = ({ wpm, accuracy, resetTest, completedWords, completedChars, incorrectChars, wordAccuracy }) => {
    const [scores, setScores] = useState(() => {
        const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
        return storedScores;
    });
    const [alias, setAlias] = useState('');

    const addScore = (newScore) => {
        const updatedScores = [...scores, newScore];
        updatedScores.sort((a, b) => b.wpm - a.wpm);
        setScores(updatedScores);
        localStorage.setItem('scores', JSON.stringify(updatedScores));
        setAlias(''); // Reset the alias input after adding a score
    };

    const handleAddScore = () => {
        const newScore = { wpm, accuracy, alias };
        addScore(newScore);
    };

    return (
        <div className="summary-overlay">
            <div className="summary-container">
                <h2 className="summary-title">Test Complete!</h2>
                <div className="summary-grid">
                    <div className="summary-item">
                        <span className="summary-label">WPM:</span>
                        <span className="summary-value">{wpm}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Accuracy:</span>
                        <span className="summary-value">{accuracy}%</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Completed Words:</span>
                        <span className="summary-value">{completedWords}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Completed Characters:</span>
                        <span className="summary-value">{completedChars}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Incorrect Characters:</span>
                        <span className="summary-value">{incorrectChars}</span>
                    </div>
                    <div className="summary-item">
                        <span className="summary-label">Word Accuracy:</span>
                        <span className="summary-value">{wordAccuracy}%</span>
                    </div>
                </div>
                <input
                    type="text"
                    placeholder="Enter your alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                />
                <button className="summary-button" onClick={resetTest}>
                    Try Again
                </button>
                <button className="summary-button" onClick={handleAddScore}>
                    Add to Leaderboard
                </button>
                <Leaderboard scores={scores} />
            </div>
        </div>
    );
};

export default SummaryPage;