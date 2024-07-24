import React from 'react';
import './styles/App.css';
import TypingTest from './components/TypingTest';
import DynamicBackground from './components/DynamicBackground';

function App() {
    return (
        <div className="App">
            <DynamicBackground />
            <TypingTest />
        </div>
    );
}

export default App;