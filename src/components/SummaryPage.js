import React, { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import { db } from '../Firebase';
import { collection, query, orderBy, limit, addDoc, getDocs, where } from 'firebase/firestore';
import '../styles/Modal.css';
import '../styles/Buttons.css';

const SummaryPage = ({ wpm, accuracy, resetTest, completedWords, completedChars, incorrectChars, wordAccuracy, difficulty }) => {
    const [scores, setScores] = useState([]);
    const [alias, setAlias] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState(difficulty);
    const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);

    useEffect(() => {
        fetchScores(selectedDifficulty);
    }, [selectedDifficulty]);

    const fetchScores = async (diff) => {
        const scoresCollection = collection(db, 'scores');
        const q = query(
            scoresCollection,
            where("difficulty", "==", diff),
            orderBy('wpm', 'desc'),
            limit(10)
        );
        const querySnapshot = await getDocs(q);
        const fetchedScores = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setScores(fetchedScores);
    };

    const addScore = async (newScore) => {
        try {
            await addDoc(collection(db, 'scores'), newScore);
            await fetchScores(selectedDifficulty);
            setAlias('');
            setIsScoreSubmitted(true);
        } catch (error) {
            console.error("Error adding score: ", error);
        }
    };

    const handleAddScore = () => {
        if (alias.trim() && !isScoreSubmitted) {
            const newScore = { wpm, accuracy, alias: alias.trim(), difficulty };
            addScore(newScore);
        } else if (!alias.trim()) {
            alert("Please enter an alias before adding to the leaderboard.");
        }
    };

    const handleDifficultyChange = (diff) => {
        setSelectedDifficulty(diff);
    };

    return (
        <div className="summary-overlay">
            <div className="summary-container">
                <h2 className="summary-title">Test Complete!</h2>
                <div className="summary-stats">
                    <div className="summary-stat">
                        <span className="summary-label">Words Per Minute (WPM)</span>
                        <span className="summary-value">{wpm}</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-label">Word Accuracy</span>
                        <span className="summary-value">{wordAccuracy}%</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-label">Total Words Typed</span>
                        <span className="summary-value">{completedWords}</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-label">Total Characters Typed</span>
                        <span className="summary-value">{completedChars}</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-label">Incorrect Characters</span>
                        <span className="summary-value">{incorrectChars}</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-label">Character Accuracy</span>
                        <span className="summary-value">{accuracy}%</span>
                    </div>
                </div>
                <div className="leaderboard-input-group">
                    <input
                        type="text"
                        placeholder="Enter your alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        className="summary-input"
                        disabled={isScoreSubmitted}
                    />
                    <button
                        className="summary-button"
                        onClick={handleAddScore}
                        disabled={isScoreSubmitted}
                    >
                        {isScoreSubmitted ? 'Added' : 'Add'}
                    </button>
                </div>
                <Leaderboard
                    scores={scores}
                    selectedDifficulty={selectedDifficulty}
                    onDifficultyChange={handleDifficultyChange}
                />
                <button className="summary-button try-again" onClick={resetTest}>
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default SummaryPage;