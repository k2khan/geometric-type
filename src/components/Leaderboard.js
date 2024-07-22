import React from 'react';
import '../styles/Leaderboard.css';

const Leaderboard = ({ scores }) => {
    return (
        <div className="leaderboard">
            <h3 className="leaderboard-title">Leaderboard</h3>
            <div className="leaderboard-table-container">
                <table className="leaderboard-table">
                    <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Alias</th>
                        <th>WPM</th>
                        <th>Accuracy</th>
                        <th>Difficulty</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((score, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score.alias}</td>
                            <td>{score.wpm}</td>
                            <td>{score.accuracy}%</td>
                            <td>{score.difficulty}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;