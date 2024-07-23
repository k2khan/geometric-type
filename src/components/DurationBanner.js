import React from 'react';

const DurationBanner = ({ setTestDuration, currentDuration }) => {
    const durations = [15, 30, 60];

    return (
        <div className="duration-banner">
            {durations.map(duration => (
                <button
                    key={duration}
                    onClick={() => setTestDuration(duration)}
                    className={currentDuration === duration ? 'active' : ''}
                >
                    {duration}s
                </button>
            ))}
        </div>
    );
};

export default DurationBanner;