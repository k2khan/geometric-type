import React, { useState } from 'react';
import './App.css';
import TypingTest from './components/TypingTest';

function App() {
  const [theme] = useState('default');

  return (
    <div className={`App theme-${theme}`}>
      <TypingTest />
    </div>
  );
}

export default App;