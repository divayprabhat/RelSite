import React, { useState, useRef } from 'react';
import ScrollExpandMedia from './components/ui/scroll-expansion-hero';
import FluidGlass from './components/FluidGlass';
import GradualBlur from './components/GradualBlur';
import InfiniteMenu from './components/InfiniteMenu';

import Particles from './components/Particles';
import DependencyGraph from './components/DependencyGraph';

import ScrollFloat from './components/ScrollFloat';
import ScrollStack from './components/ScrollStack';
import { BentoCard, MagicBento } from './components/MagicBento';
import GooeyNav from './components/GooeyNav';

// ─── Section wrapper with ScrollFloat heading + scroll-stack card ────────────
const Section = ({ id, title, children, accent = '#6366F1' }) => {
  return (
    <section
      id={id}
      style={{
        minHeight: '100vh',
        padding: '80px 0 60px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '48px',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            overflow: 'hidden',
          }}
        >
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=20%"
            scrollEnd="bottom bottom-=20%"
            stagger={0.03}
          >
            {title}
          </ScrollFloat>
        </h2>
        {children}
      </div>
    </section>
  );
};

// ─── Divider between sections ─────────────────────────────────────────────────
const SectionDivider = () => (
  <div
    style={{
      width: '100%',
      height: '1px',
      background:
        'linear-gradient(to right, transparent, rgba(99,102,241,0.4), transparent)',
      margin: '0 auto',
      maxWidth: '800px',
    }}
  />
);

function App() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  const navItems = [
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Analysis', href: '#analysis' },
    { label: 'Predictions', href: '#predictions' },
    { label: 'Docs', href: '#docs' },
    { label: 'Settings', href: '#settings' },
  ];

  const graphControls = [
    'Zoom In', 'Zoom Out', 'Fit View', 'Reset', 'Export PNG', 'Share', 'Center', 'Toggle Labels',
  ];

  const bentoDashboardCards = [
    {
      colSpan: 2,
      height: '180px',
      content: (
        <div style={{ padding: '24px', height: '100%' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AI Engine Status</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#fff', fontSize: '20px', fontWeight: '600' }}>Active • Real-time Analysis</span>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', gap: '24px' }}>
            {[['847', 'Dependencies Mapped'], ['96%', 'Accuracy'], ['< 50ms', 'Latency']].map(([val, label]) => (
              <div key={label}>
                <div style={{ color: '#6366F1', fontSize: '22px', fontWeight: '700' }}>{val}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      height: '180px',
      content: (
        <div style={{ padding: '24px', height: '100%' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Predicted GPA</div>
          <div style={{ color: '#fff', fontSize: '42px', fontWeight: '700', lineHeight: 1 }}>3.42</div>
          <div style={{ color: '#10B981', fontSize: '13px', marginTop: '8px' }}>↑ 0.15 from baseline</div>
        </div>
      ),
    },
    {
      height: '180px',
      content: (
        <div style={{ padding: '24px', height: '100%' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dropout Risk</div>
          <div style={{ color: '#fff', fontSize: '42px', fontWeight: '700', lineHeight: 1 }}>23%</div>
          <div style={{ color: '#F59E0B', fontSize: '13px', marginTop: '8px' }}>Moderate risk level</div>
        </div>
      ),
    },
    {
      height: '180px',
      content: (
        <div style={{ padding: '24px', height: '100%' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confidence</div>
          <div style={{ color: '#fff', fontSize: '42px', fontWeight: '700', lineHeight: 1 }}>94%</div>
          <div style={{ color: '#10B981', fontSize: '13px', marginTop: '8px' }}>High confidence</div>
        </div>
      ),
    },
  ];

  const stackCards = [
    // Card 1 — Graph
    <div
      key="graph"
      style={{
        background: 'rgba(14,14,20,0.9)',
        border: '1px solid rgba(42,42,53,0.8)',
        borderRadius: '20px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}
    >
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(42,42,53,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ color: '#fff', fontWeight: '600', margin: 0 }}>Dependency Graph Visualization</h3>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px' }}>Drag nodes • Hover for details • Scroll to zoom</span>
      </div>
      <FluidGlass mode="lens">
        <div style={{ height: '500px', background: 'rgba(0,0,0,0.3)', position: 'relative' }}>
          <DependencyGraph />
        </div>
      </FluidGlass>
      <div style={{ padding: '16px', borderTop: '1px solid rgba(42,42,53,0.6)' }}>
        <InfiniteMenu items={graphControls} />
      </div>
    </div>,

    // Card 2 — Controls
    <div
      key="controls"
      style={{
        background: 'rgba(14,14,20,0.9)',
        border: '1px solid rgba(42,42,53,0.8)',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '16px',
      }}
    >
      <h3 style={{ color: '#fff', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'block', width: '4px', height: '18px', background: '#6366F1', borderRadius: '2px' }} />
        Input Variables
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {['Study Hours', 'Sleep Hours', 'Previous GPA', 'Attendance', 'Stress Level'].map((label, i) => (
          <div key={i}>
            <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '8px' }}>{label}</label>
            <input type="range" style={{ width: '100%', height: '4px', accentColor: '#6366F1', cursor: 'pointer' }} defaultValue={50} />
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '4px' }}>
              <span>Low</span><span>Medium</span><span>High</span>
            </div>
          </div>
        ))}
      </div>
      <button style={{ marginTop: '24px', width: '100%', padding: '12px', background: '#6366F1', border: 'none', borderRadius: '10px', color: '#fff', fontWeight: '600', cursor: 'pointer', fontSize: '15px', transition: 'all 0.2s' }}>
        Analyze Dependencies
      </button>
    </div>,

    // Card 3 — Impact
    <div
      key="impact"
      style={{
        background: 'rgba(14,14,20,0.9)',
        border: '1px solid rgba(42,42,53,0.8)',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '16px',
      }}
    >
      <h3 style={{ color: '#fff', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'block', width: '4px', height: '18px', background: '#10B981', borderRadius: '2px' }} />
        Impact Analysis
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { label: 'Study Hours → Final GPA', impact: '+0.42', color: '#10B981' },
          { label: 'Sleep → Performance', impact: '+0.38', color: '#F59E0B' },
          { label: 'Stress → Dropout Risk', impact: '+0.51', color: '#EF4444' },
          { label: 'Attendance → GPA', impact: '+0.35', color: '#10B981' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(42,42,53,0.6)' }}>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>{item.label}</span>
            <span style={{ color: item.color, fontWeight: '700', fontSize: '16px' }}>{item.impact}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '10px', display: 'flex', gap: '10px' }}>
        <span style={{ color: '#6366F1', fontSize: '20px' }}>⚡</span>
        <div>
          <div style={{ color: '#fff', fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>AI Insight</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>Optimal study hours: 6–8. Beyond 10 shows diminishing returns due to stress correlation.</div>
        </div>
      </div>
    </div>,
  ];

  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="https://www.youtube.com/embed/HCDVN7DCzYE"
      title="Dep Mapper"
      date="AI Dependency Analysis"
      scrollToExpand="Scroll to explore"
      textBlend
    >
      <div className="relative min-h-screen font-inter overflow-x-hidden">
        {/* ReactBits Particles — fixed fullscreen */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <Particles
            particleColors={['#6366f1', '#8b5cf6', '#06b6d4', '#ffffff']}
            particleCount={250}
            particleSpread={12}
            speed={0.08}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            particleHoverFactor={0.5}
            alphaParticles={true}
            sizeRandomness={1.2}
            disableRotation={false}
          />
        </div>

        {/* Fixed GooeyNav header */}
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: '16px 32px',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #6366F1, #10B981)', borderRadius: '10px', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }} />
              <div>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '18px', letterSpacing: '-0.02em' }}>
                  Dep<span style={{ color: '#6366F1' }}>✧</span>Mapper
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>AI Relationship Analyzer</div>
              </div>
            </div>

            <GooeyNav
              items={navItems}
              initialActiveIndex={activeNavIndex}
              animationTime={600}
              particleCount={12}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>
        </header>

        {/* Main content */}
        <main style={{ paddingTop: '80px', position: 'relative', zIndex: 10 }}>

          {/* ── DASHBOARD section ── */}
          <Section id="dashboard" title="Discover Hidden Dependencies">
            {/* MagicBento stats grid */}
            <MagicBento
              cardData={bentoDashboardCards}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              particleCount={18}
              spotlightRadius={350}
              glowColor="rgba(99,102,241,0.6)"
              style={{ marginBottom: '0' }}
            />
          </Section>

          <SectionDivider />

          {/* ── ANALYSIS section — ScrollStack ── */}
          <Section id="analysis" title="Analysis Engine">
            <ScrollStack
              itemDistance={120}
              itemScale={0.04}
              itemStackZIndex={10}
              scaleEndPoint={0.92}
            >
              {stackCards}
            </ScrollStack>
          </Section>

          <SectionDivider />

          {/* ── PREDICTIONS section ── */}
          <Section id="predictions" title="Prediction Engine">
            <MagicBento
              cardData={[
                {
                  colSpan: 1,
                  height: '220px',
                  content: (
                    <div style={{ padding: '28px' }}>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Predicted Final GPA</div>
                      <div style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.2), transparent)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ color: '#fff', fontSize: '48px', fontWeight: '700', lineHeight: 1 }}>3.42</div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>/ 4.0</div>
                        <div style={{ color: '#10B981', fontSize: '13px', marginTop: '8px' }}>↑ 0.15 from baseline</div>
                      </div>
                    </div>
                  ),
                },
                {
                  colSpan: 1,
                  height: '220px',
                  content: (
                    <div style={{ padding: '28px' }}>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dropout Risk</div>
                      <div style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.2), transparent)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ color: '#fff', fontSize: '48px', fontWeight: '700', lineHeight: 1 }}>23%</div>
                        <div style={{ color: '#F59E0B', fontSize: '13px', marginTop: '8px' }}>Moderate risk level</div>
                      </div>
                    </div>
                  ),
                },
                {
                  colSpan: 1,
                  height: '220px',
                  content: (
                    <div style={{ padding: '28px' }}>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Confidence Score</div>
                      <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), transparent)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ color: '#fff', fontSize: '48px', fontWeight: '700', lineHeight: 1 }}>94%</div>
                        <div style={{ color: '#10B981', fontSize: '13px', marginTop: '8px' }}>High confidence</div>
                      </div>
                    </div>
                  ),
                },
              ]}
              enableStars={true}
              enableSpotlight={true}
              particleCount={12}
            />
          </Section>

          <SectionDivider />

          {/* ── FOOTER ── */}
          <section style={{ padding: '60px 32px 40px', position: 'relative', zIndex: 10 }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <GradualBlur position="bottom" height="8rem" animated={true}>
                <div style={{ background: 'rgba(14,14,20,0.6)', border: '1px solid rgba(42,42,53,0.6)', backdropFilter: 'blur(12px)', borderRadius: '20px', padding: '24px', textAlign: 'center' }}>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: '0 0 12px' }}>
                    Dependency Mapping Engine v1.0 • Powered by Graph Neural Networks
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                    <span>🔗 847 Dependencies Mapped</span>
                    <span>🎯 96% Prediction Accuracy</span>
                    <span>⚡ Real-time Analysis</span>
                  </div>
                </div>
              </GradualBlur>
            </div>
          </section>
        </main>
      </div>
    </ScrollExpandMedia>
  );
}

export default App;
