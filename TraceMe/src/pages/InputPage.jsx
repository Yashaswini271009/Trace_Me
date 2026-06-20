import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Briefcase, Instagram, Linkedin, ToggleLeft, ToggleRight, Eye, ArrowLeft } from 'lucide-react';
import { samplePersona } from '../data/mockData';
import ParticleField from '../components/ParticleField';

export default function InputPage() {
  const navigate = useNavigate();
  const [useSample, setUseSample] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', profession: '', instagram: '', linkedin: '' });

  const handleToggle = () => {
    const next = !useSample;
    setUseSample(next);
    if (next) {
      setForm({
        name: samplePersona.name,
        city: samplePersona.city,
        profession: samplePersona.profession,
        instagram: samplePersona.instagram,
        linkedin: samplePersona.linkedin,
      });
    } else {
      setForm({ name: '', city: '', profession: '', instagram: '', linkedin: '' });
    }
  };

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard', { state: { userData: form } });
  };

  const canSubmit = form.name.trim() && form.city.trim() && form.profession.trim();

  const fields = [
    { name: 'name', label: 'Full Name', icon: User, placeholder: 'Enter your name', required: true },
    { name: 'city', label: 'City', icon: MapPin, placeholder: 'Enter your city', required: true },
    { name: 'profession', label: 'Profession', icon: Briefcase, placeholder: 'Enter your profession', required: true },
    { name: 'instagram', label: 'Instagram Handle', icon: Instagram, placeholder: '@handle (optional)', required: false },
    { name: 'linkedin', label: 'LinkedIn Handle', icon: Linkedin, placeholder: 'username (optional)', required: false },
  ];

  return (
    <div className="relative min-h-screen bg-bg flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <ParticleField count={25} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,68,68,0.06) 0%, transparent 60%)' }} />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm"
      >
        <ArrowLeft size={16} /> Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Enter Your Details</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-text-muted text-sm">
            We'll simulate how your public footprint could be reconstructed.
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-strong rounded-card p-6 md:p-8 space-y-5"
        >
          {/* Sample Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-bg/50 border border-border">
            <span className="text-sm text-text-muted">Use Sample Persona</span>
            <button type="button" onClick={handleToggle} className="text-accent transition-transform hover:scale-110">
              {useSample ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-text-muted" />}
            </button>
          </div>

          {/* Fields */}
          {fields.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}>
                <label className="block text-xs font-medium text-text-muted mb-1.5 uppercase tracking-wider">{f.label} {f.required && <span className="text-accent">*</span>}</label>
                <div className="relative">
                  <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className="w-full pl-10 pr-4 py-3 rounded-btn bg-bg border border-border text-text-primary text-sm placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 focus:shadow-glow transition-all duration-300"
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={canSubmit ? { scale: 1.02, boxShadow: '0 0 30px rgba(255,68,68,0.25)' } : {}}
            whileTap={canSubmit ? { scale: 0.98 } : {}}
            className={`w-full py-3.5 rounded-btn font-heading font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${canSubmit ? 'bg-gradient-to-r from-accent to-red-700 text-white cursor-pointer' : 'bg-border text-text-muted cursor-not-allowed'}`}
          >
            <Eye size={16} />
            Reveal My Footprint
          </motion.button>

          <p className="text-xs text-text-muted text-center mt-3">No real data is collected. Everything is simulated.</p>
        </motion.form>
      </motion.div>
    </div>
  );
}
