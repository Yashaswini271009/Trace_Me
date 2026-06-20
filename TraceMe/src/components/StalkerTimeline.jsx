import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { timelineData } from '../data/mockData';
import SectionHeading from './SectionHeading';

const severityColors = {
  medium: '#FF8C00',
  high: '#FF4444',
  critical: '#FF4444',
};

export default function StalkerTimeline() {
  return (
    <section className="py-16 md:py-20">
      <SectionHeading
        title="Stalker Timeline"
        subtitle="How a cyberstalker could reconstruct your life in just 7 days using public information."
      />

      <div className="relative">
        {/* Glowing Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
          <div className="absolute inset-0 bg-gradient-to-b from-accent via-accent-secondary to-accent opacity-30" />
          <motion.div
            className="absolute left-0 w-full"
            style={{
              background: 'linear-gradient(to bottom, transparent, #FF4444, transparent)',
              height: '30%',
            }}
            animate={{ top: ['0%', '70%', '0%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="space-y-8 md:space-y-12">
          {timelineData.map((item, i) => {
            const Icon = LucideIcons[item.icon] || LucideIcons.AlertTriangle;
            const color = severityColors[item.severity] || '#FF8C00';
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative flex items-start gap-4 md:gap-0 ${
                  isLeft
                    ? 'md:flex-row md:pr-[52%]'
                    : 'md:flex-row-reverse md:pl-[52%]'
                } pl-14 md:pl-0`}
              >
                {/* Node Dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                  <motion.div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: color,
                      boxShadow: `0 0 20px ${color}60`,
                    }}
                    whileHover={{ scale: 1.3 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-bg" />
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -3, boxShadow: `0 0 25px ${color}20` }}
                  className="glass rounded-card p-5 w-full transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color }}
                      >
                        Day {item.day}
                      </span>
                      <h3 className="font-heading font-semibold text-text-primary text-sm">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
