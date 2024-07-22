import React from 'react';

const DurationBanner = ({ setTestDuration, currentDuration }) => {
    const durations = [5, 15, 30, 60];

    const handleDurationChange = (duration) => {
        setTestDuration(duration);
    };

    return (
        <div className="duration-banner">
            {durations.map(duration => (
                <button
                    key={duration}
                    onClick={() => handleDurationChange(duration)}
                    className={currentDuration === duration ? 'active' : ''}
                >
                    {duration}s
                </button>
            ))}
        </div>
    );
};

export default DurationBanner;