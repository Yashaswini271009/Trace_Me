import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import { Download, Linkedin, ArrowLeft, Shield, AlertTriangle, MapPin, Eye, Users } from 'lucide-react';
import { samplePersona, riskScores } from '../data/mockData';
import ParticleField from '../components/ParticleField';

export default function SharePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const userData = location.state?.userData || samplePersona;

  const topExposures = riskScores.categories
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const exposureIcons = {
    'Location Exposure': MapPin,
    'Identity Exposure': Eye,
    'Routine Exposure': AlertTriangle,
    'Network Exposure': Users,
  };

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: '#0A0A0F',
        pixelRatio: 2,
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = 'traceme-results.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    }
  }, []);

  const handleLinkedInShare = useCallback(() => {
    const text = encodeURIComponent('I checked my digital footprint with TraceMe. Have you? #CyberstalkingAwareness #DigitalSafety');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}&summary=${text}`, '_blank');
  }, []);

  const levelColor = (level) => level === 'high' ? '#FF4444' : level === 'medium' ? '#FF8C00' : '#22C55E';

  return (
    <div className="relative min-h-screen bg-bg flex flex-col items-center justify-center px-4 py-16">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <ParticleField count={20} />

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/dashboard', { state: { userData } })}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm"
      >
        <ArrowLeft size={16} /> Dashboard
      </motion.button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-2"><span className="gradient-text">Your Results</span></h1>
        <p className="text-text-muted text-sm">Share your digital awareness journey</p>
      </motion.div>

      {/* Share Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div
          ref={cardRef}
          className="rounded-card overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #12121A 0%, #0A0A0F 100%)', border: '1px solid #1E1E2E' }}
        >
          {/* Card Header Gradient */}
          <div className="relative px-6 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, rgba(255,68,68,0.15) 0%, rgba(255,140,0,0.08) 50%, transparent 100%)' }}>
            <div className="flex items-center gap-2 mb-6">
              <Shield size={20} className="text-accent" />
              <span className="font-heading font-bold text-sm gradient-text tracking-wide">TRACEME</span>
            </div>
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-1">{userData.name}</h2>
            <p className="text-sm text-text-muted">{userData.profession} • {userData.city}</p>
          </div>

          {/* Risk Score */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs text-text-muted uppercase tracking-wider">Overall Risk Score</span>
                <div className="text-4xl font-heading font-bold text-accent mt-1">{riskScores.overall}<span className="text-lg text-text-muted">/100</span></div>
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'radial-gradient(circle, rgba(255,68,68,0.2) 0%, transparent 70%)', border: '2px solid #FF444440' }}>
                <AlertTriangle size={24} className="text-accent" />
              </div>
            </div>

            {/* Top Exposures */}
            <div className="space-y-3 mb-6">
              <span className="text-xs text-text-muted uppercase tracking-wider">Top Exposures</span>
              {topExposures.map((exp) => {
                const Icon = exposureIcons[exp.name] || AlertTriangle;
                const color = levelColor(exp.level);
                return (
                  <div key={exp.name} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid #1E1E2E' }}>
                    <div className="flex items-center gap-3">
                      <Icon size={16} style={{ color }} />
                      <span className="text-sm text-text-primary">{exp.name}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color }}>{exp.score}%</span>
                  </div>
                );
              })}
            </div>

            {/* Message */}
            <div className="text-center p-4 rounded-lg" style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}>
              <p className="text-sm text-safe font-medium">Awareness is the first step to protection.</p>
            </div>

            {/* Tagline */}
            <p className="text-center text-xs text-text-muted mt-4">
              I checked my digital footprint. Have you?<br />
              <span className="text-accent">#CyberstalkingAwareness</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-md">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-btn font-heading font-semibold text-sm text-white transition-all duration-300 hover:shadow-glow-accent"
          style={{ background: 'linear-gradient(135deg, #FF4444, #CC2222)' }}
        >
          <Download size={16} /> Download as Image
        </button>
        <button
          onClick={handleLinkedInShare}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-btn font-heading font-semibold text-sm text-text-primary glass border border-border transition-all duration-300 hover:border-accent/40 hover:shadow-glow"
        >
          <Linkedin size={16} /> Share on LinkedIn
        </button>
      </motion.div>
    </div>
  );
}
