import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, ShieldCheck } from 'lucide-react';
import { protectionChecklist } from '../data/mockData';
import SectionHeading from './SectionHeading';
import GlowCard from './GlowCard';

export default function ProtectionChecklist() {
  const [checked, setChecked] = useState({});

  const toggle = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalImpact = protectionChecklist.reduce((s, i) => s + i.impact, 0);
  const currentImpact = protectionChecklist.reduce((s, i) => s + (checked[i.id] ? i.impact : 0), 0);
  const percentage = Math.round((currentImpact / totalImpact) * 100);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <section className="py-16 md:py-20">
      <SectionHeading title="Protection Checklist" subtitle="Take action to reduce your digital exposure. Each step lowers your risk." />

      {/* Progress Header */}
      <GlowCard className="mb-8" hover={false}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="#1E1E2E" strokeWidth="6" />
              <motion.circle
                cx="40" cy="40" r="36" fill="none"
                stroke={percentage >= 70 ? '#22C55E' : percentage >= 40 ? '#FF8C00' : '#FF4444'}
                strokeWidth="6" strokeLinecap="round"
                strokeDasharray={226} 
                initial={{ strokeDashoffset: 226 }}
                animate={{ strokeDashoffset: 226 - (226 * percentage) / 100 }}
                transition={{ duration: 0.8 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-heading font-bold text-text-primary">{percentage}%</span>
            </div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-heading font-bold text-xl text-text-primary mb-1">Protection Level</h3>
            <p className="text-sm text-text-muted">{checkedCount} of {protectionChecklist.length} actions completed. {percentage >= 70 ? 'Great progress!' : 'Complete more steps to improve your protection.'}</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-btn" style={{ background: percentage >= 70 ? 'rgba(34,197,94,0.1)' : 'rgba(255,68,68,0.1)', border: `1px solid ${percentage >= 70 ? '#22C55E' : '#FF4444'}30` }}>
            {percentage >= 70 ? <ShieldCheck size={18} className="text-safe" /> : <Shield size={18} className="text-accent" />}
            <span className="text-sm font-medium" style={{ color: percentage >= 70 ? '#22C55E' : '#FF4444' }}>
              Risk reduced by {currentImpact}pts
            </span>
          </div>
        </div>
      </GlowCard>

      {/* Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {protectionChecklist.map((item, i) => {
          const isChecked = checked[item.id];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <button onClick={() => toggle(item.id)} className="w-full text-left glass rounded-card p-4 transition-all duration-300 hover:shadow-glow group" style={isChecked ? { borderColor: '#22C55E40' } : {}}>
                <div className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${isChecked ? 'bg-safe' : 'border border-border group-hover:border-accent'}`}>
                    {isChecked && <Check size={14} className="text-bg" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium transition-colors ${isChecked ? 'text-text-muted line-through' : 'text-text-primary'}`}>{item.label}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-safe/10 text-safe shrink-0 ml-2">-{item.impact}pts</span>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Hopeful Message */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-12 text-center">
        <div className="inline-flex items-center gap-3 glass rounded-card px-8 py-5">
          <ShieldCheck size={28} className="text-safe" />
          <div className="text-left">
            <p className="font-heading font-bold text-text-primary text-lg">Awareness is the first step to protection.</p>
            <p className="text-sm text-text-muted">Every action you take makes you harder to track.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
