import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function NetworkBackground() {
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
    }));
  }, []);

  const edges = useMemo(() => {
    const result = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 30) {
          result.push({ id: `${i}-${j}`, from: nodes[i], to: nodes[j], dist });
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {edges.map((edge) => (
          <motion.line
            key={edge.id}
            x1={`${edge.from.x}%`}
            y1={`${edge.from.y}%`}
            x2={`${edge.to.x}%`}
            y2={`${edge.to.y}%`}
            stroke="#FF4444"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </svg>
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            background: 'radial-gradient(circle, #FF4444 0%, transparent 70%)',
          }}
          animate={{
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 6 + 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
