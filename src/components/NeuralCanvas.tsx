import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isAccent: boolean;
  pulsePhase: number;
  connections: number[];
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export default function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const initNodes = useCallback((width: number, height: number) => {
    const nodeCount = Math.floor((width * height) / 18000);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.8,
        isAccent: Math.random() < 0.12,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    // Pre-compute connections
    const maxDist = 150;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          nodes[i].connections.push(j);
        }
      }
    }

    return nodes;
  }, []);

  const spawnPulse = useCallback(() => {
    const nodes = nodesRef.current;
    if (nodes.length < 2) return;

    const fromNode = Math.floor(Math.random() * nodes.length);
    if (nodes[fromNode].connections.length === 0) return;

    const toNode = nodes[fromNode].connections[Math.floor(Math.random() * nodes[fromNode].connections.length)];

    pulsesRef.current.push({
      fromNode,
      toNode,
      progress: 0,
      speed: 0.008 + Math.random() * 0.012,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      dimensionsRef.current = { width, height };

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      nodesRef.current = initNodes(width, height);
      pulsesRef.current = [];
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let lastPulseTime = 0;
    const pulseInterval = 300;

    const animate = (time: number) => {
      const { width, height } = dimensionsRef.current;
      const nodes = nodesRef.current;
      const pulses = pulsesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      const repulsionRadius = 120;
      const repulsionStrength = 0.8;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Mouse repulsion
        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < repulsionRadius && dist > 0) {
          const force = (repulsionRadius - dist) / repulsionRadius * repulsionStrength;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Apply velocity with damping
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.98;
        node.vy *= 0.98;

        // Boundary bounce
        if (node.x < 0 || node.x > width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(height, node.y));
        }

        // Pulse phase for glow effect
        node.pulsePhase += 0.02;
      }

      // Draw connections
      const maxDist = 150;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        for (const j of node.connections) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.15;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Accent connections glow
            if (node.isAccent || other.isAccent) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.4})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      // Draw pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];

        if (!from || !to) {
          pulses.splice(p, 1);
          continue;
        }

        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 4);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.4)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Spawn new pulses
      if (time - lastPulseTime > pulseInterval) {
        spawnPulse();
        lastPulseTime = time;
        if (Math.random() < 0.4) spawnPulse(); // Sometimes spawn two
      }

      // Draw nodes
      for (const node of nodes) {
        const pulseIntensity = Math.sin(node.pulsePhase) * 0.3 + 0.7;

        if (node.isAccent) {
          // Glow effect for accent nodes
          const glowRadius = node.radius * 8;
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, glowRadius
          );
          gradient.addColorStop(0, `rgba(59, 130, 246, ${0.4 * pulseIntensity})`);
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.15 * pulseIntensity})`);
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${0.7 * pulseIntensity})`;
          ctx.fill();
        } else {
          // Regular node
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + pulseIntensity * 0.2})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initNodes, spawnPulse]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
