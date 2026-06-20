import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-10 ${className}`}
    >
      <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-3">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-text-muted text-base md:text-lg max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}
