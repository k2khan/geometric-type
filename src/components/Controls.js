import React from 'react';

function Controls({ startTest, resetTest }) {
  return (
    <div className="controls">
      <button onClick={startTest}>Start Test</button>
      <button onClick={resetTest}>Reset</button>
    </div>
  );
}

export default Controls;