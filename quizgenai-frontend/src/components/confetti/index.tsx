// components/Confetti.js
import React, { useRef, useEffect } from "react";
import confetti from "canvas-confetti";

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const duration = 3 * 1000; // Duration in milliseconds
    const animationEnd = Date.now() + duration;
    let intervalId = 0;

    (function frame() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(intervalId);
      }

      myConfetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });

      intervalId = requestAnimationFrame(frame);
    })();

    // Clean up the canvas when the component unmounts
    return () => {
      clearInterval(intervalId);
      myConfetti.reset(); // Clean up confetti particles
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 100,
      }}
    />
  );
};

export default Confetti;
