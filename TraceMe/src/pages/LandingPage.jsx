import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Shield, Eye, AlertTriangle } from 'lucide-react';
import NetworkBackground from '../components/NetworkBackground';
import ParticleField from '../components/ParticleField';
import useMousePosition from '../hooks/useMousePosition';

export default function LandingPage() {
  const navigate = useNavigate();
  const mouse = useMousePosition();

  return (
    <div className="relative min-h-screen bg-bg overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      {/* Network background */}
      <NetworkBackground />

      {/* Particles */}
      <ParticleField count={50} />

      {/* Radial spotlight following mouse */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: mouse.x - 200,
          top: mouse.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,68,68,0.06) 0%, transparent 70%)',
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
        }}
      />

      {/* Ambient glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(255,68,68,0.08) 0%, transparent 60%)' }} />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-text-muted">
            <Shield size={14} className="text-accent" />
            Cyberstalking Awareness Tool
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-tight"
        >
          <span className="text-text-primary">You think you're </span>
          <span className="gradient-text">private.</span>
          <br />
          <span className="text-text-primary">You're </span>
          <span className="gradient-text">not.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-text-muted text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Trace how your public digital footprint can be reconstructed by cyberstalkers using publicly visible information.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,68,68,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/input')}
          className="relative px-8 py-4 rounded-btn font-heading font-semibold text-base text-white overflow-hidden group"
          style={{ background: 'linear-gradient(135deg, #FF4444, #CC2222)' }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Eye size={18} />
            Check Your Digital Footprint
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex items-center gap-8 mt-12"
        >
          {[
            { value: '8+', label: 'Platforms Analyzed' },
            { value: '7', label: 'Day Scenario' },
            { value: '100%', label: 'Simulated Data' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-xl font-heading font-bold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-10 flex items-center gap-2 text-xs text-text-muted"
        >
          <AlertTriangle size={12} className="text-accent-secondary shrink-0" />
          <span>This tool uses simulated data for cybersecurity awareness only. No real data is collected.</span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-text-muted"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
