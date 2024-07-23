import React from 'react';

const DifficultySelector = ({ setDifficulty, currentDifficulty }) => {
    const difficulties = ['easy', 'medium', 'hard'];

    return (
        <div className="difficulty-selector">
            {difficulties.map(difficulty => (
                <button
                    key={difficulty}
                    onClick={() => setDifficulty(difficulty)}
                    className={currentDifficulty === difficulty ? 'active' : ''}
                >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default DifficultySelector;
