import React from 'react';

const Leaderboard = ({ scores }) => {
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <table>
                <thead>
                <tr>
                    <th>Alias</th>
                    <th>WPM</th>
                    <th>Accuracy</th>
                </tr>
                </thead>
                <tbody>
                {scores.map((score, index) => (
                    <tr key={index}>
                        <td>{score.alias}</td>
                        <td>{score.wpm}</td>
                        <td>{score.accuracy}%</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
