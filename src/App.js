<<<<<<< HEAD
import React, { useState } from 'react';
import './App.css';
import TypingTest from './components/TypingTest';

function App() {
  const [theme] = useState('default');

  return (
    <div className={`App theme-${theme}`}>
      <TypingTest />
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
>>>>>>> f9e6f21 (Initialize project using Create React App)
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> f9e6f21 (Initialize project using Create React App)
