import React, { useEffect, useState } from 'react';
import '../styles/GeometryEffect.css';

const colors = ['#e2b714', '#ca4754', '#4ae0e0', '#9eff66', '#ff66d9'];

const GeometryEffect = ({ char, correct }) => {
    const [shapes, setShapes] = useState([]);

    useEffect(() => {
        if (char) {
            const newShape = {
                id: Date.now(),
                char,
                style: {
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    color: correct ? colors[Math.floor(Math.random() * colors.length)] : '#ca4754'
                }
            };
            setShapes(prevShapes => [...prevShapes, newShape]);

            setTimeout(() => {
                setShapes(prevShapes => prevShapes.filter(shape => shape.id !== newShape.id));
            }, 3000);
        }
    }, [char, correct]);

    return (
        <div className="geometry-effect">
            {shapes.map(shape => (
                <div key={shape.id} className="shape" style={shape.style}>
                    {shape.char}
                </div>
            ))}
        </div>
    );
};

export default GeometryEffect;