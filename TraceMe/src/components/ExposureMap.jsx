import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { exposureNodes } from '../data/mockData';
import useIsMobile from '../hooks/useIsMobile';
import GlowCard from './GlowCard';
import SectionHeading from './SectionHeading';

/* ======= Custom Node Component ======= */
function ExposureNode({ data }) {
  const Icon = LucideIcons[data.icon] || LucideIcons.Globe;
  const riskColors = {
    high: { bg: 'rgba(255,68,68,0.15)', border: '#FF4444', text: '#FF4444' },
    medium: { bg: 'rgba(255,140,0,0.15)', border: '#FF8C00', text: '#FF8C00' },
    low: { bg: 'rgba(34,197,94,0.15)', border: '#22C55E', text: '#22C55E' },
  };
  const colors = riskColors[data.risk] || riskColors.medium;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      onClick={() => data.onSelect(data.nodeId)}
      className="cursor-pointer rounded-xl px-4 py-3 flex items-center gap-3 node-pulse"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 0 20px ${colors.border}33`,
        minWidth: 160,
      }}
    >
      <Icon size={20} style={{ color: colors.text }} />
      <div>
        <div className="text-sm font-semibold text-text-primary">{data.label}</div>
        <div className="text-xs capitalize" style={{ color: colors.text }}>
          {data.risk} risk
        </div>
      </div>
    </motion.div>
  );
}

/* ======= Center Node ======= */
function CenterNode({ data }) {
  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: 100,
        height: 100,
        background: 'radial-gradient(circle, rgba(255,68,68,0.3) 0%, rgba(255,68,68,0.05) 70%)',
        border: '2px solid #FF4444',
        boxShadow: '0 0 40px rgba(255,68,68,0.3)',
      }}
    >
      <div className="text-center">
        <LucideIcons.User size={28} className="mx-auto text-accent mb-1" />
        <span className="text-xs font-semibold text-text-primary">{data.label}</span>
      </div>
    </div>
  );
}

const nodeTypes = {
  exposure: ExposureNode,
  center: CenterNode,
};

/* ======= Detail Panel ======= */
function DetailPanel({ node, onClose }) {
  if (!node) return null;
  const Icon = LucideIcons[node.icon] || LucideIcons.Globe;
  const severityColors = { high: '#FF4444', medium: '#FF8C00', low: '#22C55E' };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="glass-strong rounded-card p-5 w-full max-w-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: `${node.color}20`, border: `1px solid ${node.color}40` }}
            >
              <Icon size={20} style={{ color: node.color }} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-text-primary">{node.label}</h3>
              <span className="text-xs capitalize" style={{ color: node.color }}>
                {node.risk} risk
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-accent transition-colors">
            <LucideIcons.X size={18} />
          </button>
        </div>
        <div className="space-y-3">
          {node.details.map((detail, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg p-3"
              style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid #1E1E2E' }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-text-muted">{detail.label}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full capitalize"
                  style={{
                    background: `${severityColors[detail.severity]}15`,
                    color: severityColors[detail.severity],
                  }}
                >
                  {detail.severity}
                </span>
              </div>
              <p className="text-sm text-text-primary">{detail.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ======= Mobile Cards ======= */
function MobileExposureCards({ onSelect, selectedNode }) {
  return (
    <div className="space-y-3">
      {exposureNodes.map((node, i) => {
        const Icon = LucideIcons[node.icon] || LucideIcons.Globe;
        const isSelected = selectedNode?.id === node.id;
        return (
          <GlowCard key={node.id} delay={i * 0.08}>
            <button
              onClick={() => onSelect(isSelected ? null : node.id)}
              className="w-full text-left"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${node.color}20`, border: `1px solid ${node.color}40` }}
                >
                  <Icon size={18} style={{ color: node.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-text-primary text-sm">{node.label}</h4>
                  <span className="text-xs capitalize" style={{ color: node.color }}>
                    {node.risk} risk
                  </span>
                </div>
                <LucideIcons.ChevronDown
                  size={16}
                  className={`text-text-muted transition-transform ${isSelected ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 border-t border-border space-y-2">
                    {node.details.map((detail, j) => {
                      const severityColors = { high: '#FF4444', medium: '#FF8C00', low: '#22C55E' };
                      return (
                        <div
                          key={j}
                          className="rounded-lg p-3"
                          style={{ background: 'rgba(10,10,15,0.6)', border: '1px solid #1E1E2E' }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-text-muted">{detail.label}</span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full capitalize"
                              style={{
                                background: `${severityColors[detail.severity]}15`,
                                color: severityColors[detail.severity],
                              }}
                            >
                              {detail.severity}
                            </span>
                          </div>
                          <p className="text-sm text-text-primary">{detail.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlowCard>
        );
      })}
    </div>
  );
}

/* ======= Main Component ======= */
export default function ExposureMap({ userName }) {
  const isMobile = useIsMobile();
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const selectedNode = exposureNodes.find((n) => n.id === selectedNodeId) || null;

  const handleSelect = useCallback((id) => {
    setSelectedNodeId((prev) => (prev === id ? null : id));
  }, []);

  /* Build React Flow nodes */
  const flowNodes = useMemo(() => {
    const centerX = 400;
    const centerY = 300;
    const radius = 250;
    const angleStep = (2 * Math.PI) / exposureNodes.length;

    const nodes = [
      {
        id: 'center',
        type: 'center',
        position: { x: centerX - 50, y: centerY - 50 },
        data: { label: userName || 'You' },
        draggable: false,
      },
    ];

    exposureNodes.forEach((node, i) => {
      const angle = angleStep * i - Math.PI / 2;
      nodes.push({
        id: node.id,
        type: 'exposure',
        position: {
          x: centerX + Math.cos(angle) * radius - 80,
          y: centerY + Math.sin(angle) * radius - 25,
        },
        data: {
          ...node,
          nodeId: node.id,
          onSelect: handleSelect,
        },
      });
    });

    return nodes;
  }, [userName, handleSelect]);

  const flowEdges = useMemo(() => {
    return exposureNodes.map((node) => ({
      id: `center-${node.id}`,
      source: 'center',
      target: node.id,
      animated: true,
      style: { stroke: node.color, strokeWidth: 1.5, opacity: 0.5 },
    }));
  }, []);

  const [nodes, , onNodesChange] = useNodesState(flowNodes);
  const [edges, , onEdgesChange] = useEdgesState(flowEdges);

  return (
    <section className="py-16 md:py-20">
      <SectionHeading
        title="Exposure Map"
        subtitle="Interactive visualization of your digital footprint across platforms."
      />

      {isMobile ? (
        <MobileExposureCards onSelect={handleSelect} selectedNode={selectedNode} />
      ) : (
        <div className="flex gap-6">
          <div
            className="flex-1 glass rounded-card overflow-hidden relative"
            style={{ height: 620 }}
          >
            {/* Ambient glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,68,68,0.08) 0%, transparent 70%)',
              }}
            />
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              minZoom={0.5}
              maxZoom={1.5}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#1E1E2E" gap={40} size={1} />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>

          <AnimatePresence mode="wait">
            {selectedNode && (
              <DetailPanel
                key={selectedNode.id}
                node={selectedNode}
                onClose={() => setSelectedNodeId(null)}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
