'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { PROBLEMS, PATTERNS } from '@/lib/problems';
import { supabase, getSolvedProblems } from '@/lib/supabase';

export default function ProgressPage() {
  const [solved, setSolved] = useState(new Set());
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) {
        const s = await getSolvedProblems(u.id);
        setSolved(new Set(s.map(x => x.problem_slug)));
      } else {
        const local = JSON.parse(localStorage.getItem('svit_solved') || '[]');
        setSolved(new Set(local));
      }
    });
  }, []);

  const total = PROBLEMS.length;
  const totalSolved = solved.size;
  const pct = Math.round((totalSolved / total) * 100);

  const diff = { Easy: { total: 0, solved: 0 }, Medium: { total: 0, solved: 0 }, Hard: { total: 0, solved: 0 } };
  PROBLEMS.forEach(p => {
    diff[p.difficulty].total++;
    if (solved.has(p.slug)) diff[p.difficulty].solved++;
  });

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        <Link href="/" className="back-btn" style={{ marginLeft: 0 }}>← Back to Dashboard</Link>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '1.5rem 0 0.5rem' }}>
          📊 Your Progress
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {user ? `Signed in as ${user.email}` : 'Sign in to sync progress across devices'}
        </p>

        {/* Overall */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '2rem', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap'
        }}>
          <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
            <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg-primary)" strokeWidth="12" />
              <circle cx="60" cy="60" r="52" fill="none"
                stroke="url(#grad)" strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - pct / 100)}`}
                strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{pct}%</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>complete</span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {totalSolved} / {total} problems solved
            </div>
            {Object.entries(diff).map(([d, v]) => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span className={`difficulty-badge ${d.toLowerCase()}`} style={{ minWidth: 60, textAlign: 'center' }}>{d}</span>
                <div style={{ flex: 1, height: 6, background: 'var(--bg-primary)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    width: (v.solved / v.total * 100) + '%',
                    background: d === 'Easy' ? 'var(--easy)' : d === 'Medium' ? 'var(--medium)' : 'var(--hard)',
                    transition: 'width 1s ease'
                  }} />
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', minWidth: 50 }}>
                  {v.solved}/{v.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pattern breakdown */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>By Pattern</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {PATTERNS.map(pat => {
            const probs = PROBLEMS.filter(p => p.pattern === pat.id);
            const s = probs.filter(p => solved.has(p.slug)).length;
            const p = Math.round(s / probs.length * 100);
            return (
              <div key={pat.id} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '1.25rem',
                transition: 'border-color 0.2s'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{pat.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{pat.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s}/{probs.length} solved</div>
                  </div>
                </div>
                <div style={{ height: 6, background: 'var(--bg-primary)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    width: p + '%', background: pat.color,
                    transition: 'width 1s ease'
                  }} />
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {p}%
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
