import React from 'react';
import '../styles/Modal.css';

const SummaryPage = ({ wpm, accuracy, resetTest }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Test Complete!</h2>
                <div className="summary-stats">
                    <div className="stat">
                        <span className="stat-label">WPM:</span>
                        <span className="stat-value">{wpm}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Accuracy:</span>
                        <span className="stat-value">{accuracy}%</span>
                    </div>
                </div>
                <button className="replay-button" onClick={resetTest}>
                    Replay
                </button>
            </div>
        </div>
    );
};

export default SummaryPage;