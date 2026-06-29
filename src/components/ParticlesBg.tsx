"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  alphaSpeed: number;
}

export default function ParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const colors = [
      "rgba(0, 240, 255, ", // Electric Blue
      "rgba(189, 0, 255, ", // Cosmic Purple
      "rgba(255, 255, 255, ", // Star white
    ];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(canvas.width, canvas.height, true));
    }

    function createParticle(w: number, h: number, isInitial = false): Particle {
      const colorBase = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * w,
        y: isInitial ? Math.random() * h : h + 10,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: -(Math.random() * 0.3 + 0.1), // Float upwards
        color: colorBase,
        alpha: Math.random() * 0.5 + 0.1,
        alphaSpeed: (Math.random() - 0.5) * 0.005,
      };
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      particles.forEach((p, index) => {
        // Apply micro-influence from mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let forceX = 0;
        let forceY = 0;
        
        if (dist < 200) {
          const force = (200 - dist) / 200; // 0 to 1
          forceX = (dx / dist) * force * 0.3;
          forceY = (dy / dist) * force * 0.3;
        }

        p.x += p.speedX + forceX;
        p.y += p.speedY + forceY;

        // Animate alpha (twinkle)
        p.alpha += p.alphaSpeed;
        if (p.alpha > 0.7 || p.alpha < 0.1) {
          p.alphaSpeed = -p.alphaSpeed;
        }
        p.alpha = Math.max(0.05, Math.min(0.8, p.alpha));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();

        // Check bounds
        if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[index] = createParticle(canvas.width, canvas.height, false);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
    />
  );
}
