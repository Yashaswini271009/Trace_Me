import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { Shield, AlertTriangle, TrendingUp } from 'lucide-react';
import { riskScores } from '../data/mockData';
import SectionHeading from './SectionHeading';
import GlowCard from './GlowCard';

function AnimatedCounter({ value, duration = 2 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const inc = value / (duration * 60);
    const t = setInterval(() => {
      start += inc;
      if (start >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(t);
  }, [value, duration]);
  return <span>{count}</span>;
}

function RiskGauge({ score }) {
  const color = score >= 70 ? '#FF4444' : score >= 40 ? '#FF8C00' : '#22C55E';
  const data = [{ value: score, fill: color }];
  return (
    <div className="relative w-full" style={{ maxWidth: 280, margin: '0 auto' }}>
      <ResponsiveContainer width="100%" height={280}>
        <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={225} endAngle={-45} barSize={14}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={10} background={{ fill: '#1E1E2E' }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-heading font-bold" style={{ color }}><AnimatedCounter value={score} /></span>
        <span className="text-sm text-text-muted mt-1">Risk Score</span>
      </div>
    </div>
  );
}

function SubscoreCard({ category, index }) {
  const cfg = {
    high: { color: '#FF4444', bg: 'rgba(255,68,68,0.1)', icon: AlertTriangle },
    medium: { color: '#FF8C00', bg: 'rgba(255,140,0,0.1)', icon: TrendingUp },
    low: { color: '#22C55E', bg: 'rgba(34,197,94,0.1)', icon: Shield },
  }[category.level] || { color: '#FF8C00', bg: 'rgba(255,140,0,0.1)', icon: TrendingUp };
  const Icon = cfg.icon;
  return (
    <GlowCard delay={index * 0.1}>
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: cfg.bg, border: `1px solid ${cfg.color}30` }}>
          <Icon size={20} style={{ color: cfg.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-heading font-semibold text-text-primary text-sm">{category.name}</h4>
            <span className="text-lg font-bold font-heading" style={{ color: cfg.color }}><AnimatedCounter value={category.score} />%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-border overflow-hidden mb-2">
            <motion.div initial={{ width: 0 }} whileInView={{ width: `${category.score}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 + index * 0.1 }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${cfg.color}80, ${cfg.color})`, boxShadow: `0 0 10px ${cfg.color}40` }} />
          </div>
          <p className="text-xs text-text-muted leading-relaxed">{category.description}</p>
        </div>
      </div>
    </GlowCard>
  );
}

export default function RiskDashboard() {
  return (
    <section className="py-16 md:py-20">
      <SectionHeading title="Risk Assessment" subtitle="Your overall digital exposure score based on simulated public data analysis." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlowCard className="lg:col-span-1 flex flex-col items-center justify-center">
          <RiskGauge score={riskScores.overall} />
          <div className="text-center mt-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
              <AlertTriangle size={14} /> High Exposure Detected
            </span>
          </div>
        </GlowCard>
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {riskScores.categories.map((cat, i) => <SubscoreCard key={cat.name} category={cat} index={i} />)}
        </div>
      </div>
    </section>
  );
}
