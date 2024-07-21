import React from 'react';

function Stats({ wpm, accuracy }) {
  return (
    <div className="stats">
      <div className="stat">
        <span className="stat-label">WPM:</span>
        <span className="stat-value">{wpm}</span>
      </div>
      <div className="stat">
        <span className="stat-label">Accuracy:</span>
        <span className="stat-value">{accuracy}%</span>
      </div>
    </div>
  );
}

export default Stats;