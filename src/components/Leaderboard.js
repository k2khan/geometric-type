import React from 'react';

const Leaderboard = ({ scores }) => {
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ol>
                {scores.map((score, index) => (
                    <li key={index}>
                        <span>{score.alias}</span>
                        <span>WPM: {score.wpm}</span>
                        <span>Accuracy: {score.accuracy}%</span>
                    </li>
                ))}
            </ol>
        </div>
    );
};
export default Leaderboard;