import React, { useEffect, useRef } from 'react';

function VisualArea({ typedText }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const lastChar = typedText[typedText.length - 1];

    if (lastChar) {
      createVisualEffect(ctx, lastChar);
    }
  }, [typedText]);

  const createVisualEffect = (ctx, char) => {
    const x = Math.random() * ctx.canvas.width;
    const y = ctx.canvas.height;
    const size = Math.random() * 30 + 10;

    ctx.fillStyle = getRandomColor();
    ctx.font = `${size}px Arial`;
    ctx.fillText(char, x, y);

    animateChar(ctx, x, y, char, size);
  };

  const animateChar = (ctx, x, y, char, size) => {
    let frame = 0;
    const animate = () => {
      ctx.clearRect(x - size / 2, y - size, size, size);
      y -= 2;
      ctx.fillText(char, x, y);

      frame++;
      if (frame < 60) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(x - size / 2, y - size, size, size);
      }
    };
    requestAnimationFrame(animate);
  };

  const getRandomColor = () => {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
  };

  return <canvas ref={canvasRef} className="visual-area" width={800} height={200} />;
}

export default VisualArea;