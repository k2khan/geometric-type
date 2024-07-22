import React, { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import { db } from '../Firebase';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';
import '../styles/Modal.css';
import '../styles/Buttons.css';

const SummaryPage = ({ wpm, accuracy, resetTest, completedWords, completedChars, incorrectChars, wordAccuracy }) => {
    const [scores, setScores] = useState([]);
    const [alias, setAlias] = useState('');

    useEffect(() => {
        fetchScores();
    }, []);

    const fetchScores = async () => {
        const scoresCollection = collection(db, 'scores');
        const q = query(scoresCollection, orderBy('wpm', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedScores = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setScores(fetchedScores);
    };

    const addScore = async (newScore) => {
        try {
            await addDoc(collection(db, 'scores'), newScore);
            await fetchScores();
            setAlias('');
        } catch (error) {
            console.error("Error adding score: ", error);
        }
    };

    const handleAddScore = () => {
        if (alias.trim()) {
            const newScore = { wpm, accuracy, alias: alias.trim() };
            addScore(newScore);
        } else {
            alert("Please enter an alias before adding to the leaderboard.");
        }
    };

    return (
        <div className="summary-overlay">
            <div className="summary-container">
                <h2 className="summary-title">Test Complete!</h2>
                <div className="summary-stats">
                    <div className="summary-stat">
                        <span className="summary-label">WPM</span>
                        <span className="summary-value">{wpm}</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-label">Accuracy</span>
                        <span className="summary-value">{accuracy}%</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-label">Words</span>
                        <span className="summary-value">{completedWords}</span>
                    </div>
                    <div className="summary-stat">
                        <span className="summary-label">Characters</span>
                        <span className="summary-value">{completedChars}</span>
                    </div>
                </div>
                <div className="leaderboard-input-group">
                    <input
                        type="text"
                        placeholder="Enter your alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        className="summary-input"
                    />
                    <button className="summary-button" onClick={handleAddScore}>
                        Add to Leaderboard
                    </button>
                </div>
                <Leaderboard scores={scores} />
                <button className="summary-button try-again" onClick={resetTest}>
                    Try Again
                </button>
            </div>
        </div>
    );
};

export default SummaryPage;