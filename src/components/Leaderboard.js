import React from 'react';
import '../styles/Leaderboard.css';

const Leaderboard = ({ scores, selectedDifficulty, onDifficultyChange }) => {
    const difficulties = ['easy', 'medium', 'hard'];

    return (
        <div className="leaderboard">
            <h3 className="leaderboard-title">Leaderboard</h3>
            <div className="difficulty-selector">
                {difficulties.map(diff => (
                    <button
                        key={diff}
                        className={`difficulty-button ${selectedDifficulty === diff ? 'active' : ''}`}
                        onClick={() => onDifficultyChange(diff)}
                    >
                        {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </button>
                ))}
            </div>
            <div className="leaderboard-table-container">
                <table className="leaderboard-table">
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Alias</th>
                        <th>WPM</th>
                        <th>Accuracy</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score.alias}</td>
                            <td>{score.wpm}</td>
                            <td>{score.accuracy}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;