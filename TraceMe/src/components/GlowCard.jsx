import React from 'react';
import { motion } from 'framer-motion';

export default function GlowCard({ children, className = '', delay = 0, hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -4, boxShadow: '0 0 30px rgba(255,68,68,0.2)' } : {}}
      className={`glass rounded-card p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
