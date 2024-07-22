import React, { useEffect } from 'react';
import './styles/App.css';
import TypingTest from './components/TypingTest';
import DynamicBackground from './components/DynamicBackground';
import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-BJ6VGF3MET'; // Your Google Analytics measurement ID

function App() {
    useEffect(() => {
        ReactGA.initialize(MEASUREMENT_ID);
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }, []);

    return (
        <div className="App">
            <DynamicBackground />
            <TypingTest />
        </div>
    );
}

export default App;