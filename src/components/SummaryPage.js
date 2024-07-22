import React, { useState, useEffect } from 'react';
import '../styles/Modal.css';
import Leaderboard from './Leaderboard';
import { db } from '../Firebase';
import { collection, addDoc, query, orderBy, limit, getDocs } from 'firebase/firestore';

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