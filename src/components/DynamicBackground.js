import React, { useEffect, useRef } from 'react';
import colorInterpolate from 'color-interpolate';
import '../styles/DynamicBackground.css';

const DynamicBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.5,
                dy: (Math.random() - 0.5) * 0.5
            });
        }

        const colorPalette = ['#e2b714', '#ca4754', '#4ae0e0', '#9eff66', '#ff66d9'];
        let colorIndex = 0;
        let nextColorIndex = 1;
        let colorT = 0;
        const colorSpeed = 0.005;

        const getInterpolatedColor = () => {
            const interpolate = colorInterpolate([colorPalette[colorIndex], colorPalette[nextColorIndex]]);
            return interpolate(colorT);
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update color interpolation
            colorT += colorSpeed;
            if (colorT >= 1) {
                colorT = 0;
                colorIndex = nextColorIndex;
                nextColorIndex = (nextColorIndex + 1) % colorPalette.length;
            }

            const currentColor = getInterpolatedColor();

            particles.forEach(particle => {
                particle.x += particle.dx;
                particle.y += particle.dy;

                if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = currentColor;
                ctx.fill();
            });

            // Add a subtle gradient overlay
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, `${currentColor.replace('rgb', 'rgba').replace(')', ', 0.13)')}`);  // 13% opacity
            gradient.addColorStop(1, `${currentColor.replace('rgb', 'rgba').replace(')', ', 0)')}`);  // fully transparent
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="dynamic-background" />;
};

export default DynamicBackground;
