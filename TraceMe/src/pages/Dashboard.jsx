import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Shield } from 'lucide-react';
import { samplePersona } from '../data/mockData';
import ExposureMap from '../components/ExposureMap';
import StalkerTimeline from '../components/StalkerTimeline';
import RiskDashboard from '../components/RiskDashboard';
import ProtectionChecklist from '../components/ProtectionChecklist';

function LoadingScreen() {
  const steps = ['Scanning public profiles...', 'Mapping digital footprint...', 'Analyzing exposure risks...', 'Building timeline...'];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((p) => (p < steps.length - 1 ? p + 1 : p)), 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 bg-bg z-50 flex flex-col items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 rounded-full border-2 border-border border-t-accent mb-8" />
      <div className="space-y-3 text-center">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0.3 }} animate={{ opacity: i <= step ? 1 : 0.3 }} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${i <= step ? 'bg-accent' : 'bg-border'}`} />
            <span className={`text-sm ${i <= step ? 'text-text-primary' : 'text-text-muted'}`}>{s}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 w-48 h-1 bg-border rounded-full overflow-hidden">
        <motion.div className="h-full bg-accent rounded-full" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 3.2, ease: 'easeInOut' }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const userData = location.state?.userData || samplePersona;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      {!loading && (
        <div className="min-h-screen bg-bg noise-overlay">
          {/* Ambient glow */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse, rgba(255,68,68,0.04) 0%, transparent 60%)' }} />

          {/* Navigation Bar */}
          <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="sticky top-0 z-40 glass-strong border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
              <button onClick={() => navigate('/input')} className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm">
                <ArrowLeft size={16} /> Back
              </button>
              <div className="text-center">
                <span className="font-heading font-bold text-sm gradient-text">TraceMe</span>
                <span className="text-text-muted text-xs block">{userData.name || 'Analysis'}</span>
              </div>
              <button onClick={() => navigate('/share', { state: { userData } })} className="flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm">
                <Share2 size={16} /> Share
              </button>
            </div>
          </motion.nav>

          {/* Hero Banner */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-4">
            <div className="glass rounded-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0" style={{ background: 'radial-gradient(circle, rgba(255,68,68,0.2) 0%, rgba(255,68,68,0.05) 70%)', border: '2px solid #FF444440' }}>
                <span className="font-heading text-2xl font-bold text-accent">{(userData.name || 'U')[0]}</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-1">{userData.name || 'User'}</h1>
                <p className="text-sm text-text-muted">{userData.profession} • {userData.city}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-btn bg-accent/10 border border-accent/20">
                <Shield size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Simulated Analysis</span>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Sections */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-20">
            <ExposureMap userName={userData.name} />
            <StalkerTimeline />
            <RiskDashboard />
            <ProtectionChecklist />
          </div>
        </div>
      )}
    </>
  );
}
