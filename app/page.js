'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { PATTERNS, PROBLEMS, getProblemsByPattern } from '@/lib/problems';
import { supabase, getSolvedProblems, markProblemSolved, unmarkProblemSolved } from '@/lib/supabase';

export default function Home() {
  const [openPatterns, setOpenPatterns] = useState({ arrays: true });
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
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  function togglePattern(id) {
    setOpenPatterns(prev => ({ ...prev, [id]: !prev[id] }));
  }

  async function toggleSolved(problem, e) {
    e.preventDefault(); e.stopPropagation();
    const isNowSolved = !solved.has(problem.slug);
    setSolved(prev => {
      const next = new Set(prev);
      isNowSolved ? next.add(problem.slug) : next.delete(problem.slug);
      if (!user) localStorage.setItem('svit_solved', JSON.stringify([...next]));
      return next;
    });
    if (user) {
      isNowSolved
        ? await markProblemSolved(user.id, problem.slug)
        : await unmarkProblemSolved(user.id, problem.slug);
    }
  }

  const totalSolved = solved.size;
  const progressPct = Math.round((totalSolved / PROBLEMS.length) * 100);

  const diffCounts = { Easy: 0, Medium: 0, Hard: 0 };
  const diffSolved = { Easy: 0, Medium: 0, Hard: 0 };
  PROBLEMS.forEach(p => {
    diffCounts[p.difficulty]++;
    if (solved.has(p.slug)) diffSolved[p.difficulty]++;
  });

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-badge">🎓 Sai Vidya Institute of Technology</div>
          <h1>
            Master <span className="gradient-text">100 DSA Problems</span><br />
            Crack Your Dream Company
          </h1>
          <p>Curated Blind 75 + essential problems organized by patterns.
            Watch animated solutions, code in-browser, and track your progress.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="#patterns" style={{
              padding:'10px 24px', borderRadius:'var(--radius)',
              background:'var(--accent-teal)', color:'white',
              fontWeight:600, fontSize:'0.95rem', transition:'all 0.2s',
              display:'inline-flex', alignItems:'center', gap:8
            }}>🚀 Start Practicing</a>
            <a href="https://leetcode.com" target="_blank" rel="noopener" style={{
              padding:'10px 24px', borderRadius:'var(--radius)',
              background:'var(--bg-card)', color:'var(--text-primary)',
              border:'1px solid var(--border)', fontWeight:600, fontSize:'0.95rem',
              transition:'all 0.2s', display:'inline-flex', alignItems:'center', gap:8
            }}>⚡ Open LeetCode</a>
          </div>
        </section>

        {/* STATS */}
        <div className="stats-bar" style={{ maxWidth:900, margin:'0 auto 1.5rem' }}>
          {[
            { label:'Total Problems', value:'100' },
            { label:'Easy', value:diffSolved.Easy + '/' + diffCounts.Easy, color:'var(--easy)' },
            { label:'Medium', value:diffSolved.Medium + '/' + diffCounts.Medium, color:'var(--medium)' },
            { label:'Hard', value:diffSolved.Hard + '/' + diffCounts.Hard, color:'var(--hard)' },
            { label:'Patterns', value:'12' },
          ].map(s => (
            <div className="stat-item" key={s.label}>
              <div className="stat-value" style={s.color ? { color: s.color, WebkitTextFillColor: s.color } : {}}>
                {s.value}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* PROGRESS */}
        <div className="progress-section" style={{ maxWidth:900, margin:'0 auto 2rem' }}>
          <span className="progress-label">🎯 Your Progress</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: progressPct + '%' }} />
          </div>
          <span className="progress-count">{totalSolved} / {PROBLEMS.length} solved ({progressPct}%)</span>
        </div>

        {/* PATTERNS */}
        <div className="patterns-container" id="patterns" style={{ maxWidth:900, margin:'0 auto' }}>
          {PATTERNS.map((pattern, pi) => {
            const problems = getProblemsByPattern(pattern.id);
            const patSolved = problems.filter(p => solved.has(p.slug)).length;
            const isOpen = !!openPatterns[pattern.id];
            return (
              <div className="pattern-section animate-fade-in-up" key={pattern.id}
                style={{ animationDelay: pi * 0.05 + 's' }}>
                <div className="pattern-header" onClick={() => togglePattern(pattern.id)}>
                  <div className="pattern-header-left">
                    <div className="pattern-icon"
                      style={{ background: pattern.color + '20', color: pattern.color }}>
                      {pattern.icon}
                    </div>
                    <div>
                      <span className="pattern-title">{pattern.label}</span>
                      <span className="pattern-count">· {problems.length} problems</span>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                    <div className="pattern-progress-mini">
                      <span style={{ fontSize:'0.8rem', color:'var(--text-muted)' }}>
                        {patSolved}/{problems.length}
                      </span>
                      <div className="mini-track">
                        <div className="mini-fill"
                          style={{ width: (patSolved/problems.length*100) + '%', background: pattern.color }} />
                      </div>
                    </div>
                    <span className={`pattern-chevron ${isOpen ? 'open' : ''}`}>▾</span>
                  </div>
                </div>

                {isOpen && (
                  <div className="problem-list animate-fade-in">
                    {/* Table Header */}
                    <div style={{
                      display:'flex', padding:'6px 1rem', marginBottom:4,
                      borderBottom:'1px solid var(--border)',
                      fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600,
                      textTransform:'uppercase', letterSpacing:'0.5px'
                    }}>
                      <span style={{ width:32 }}>#</span>
                      <span style={{ width:32 }}></span>
                      <span style={{ flex:1 }}>Problem</span>
                      <span style={{ width:80, textAlign:'center' }}>Difficulty</span>
                      <span style={{ width:90, textAlign:'center' }}>LeetCode</span>
                    </div>
                    {problems.map((problem, idx) => (
                      <div className="problem-row" key={problem.id}>
                        <span className="problem-number">{idx + 1}</span>
                        <div
                          className={`problem-checkbox ${solved.has(problem.slug) ? 'checked' : ''}`}
                          onClick={e => toggleSolved(problem, e)}
                          title={solved.has(problem.slug) ? 'Mark unsolved' : 'Mark solved'}
                        />
                        <Link href={`/problems/${problem.slug}`} className="problem-title-link">
                          {problem.title}
                        </Link>
                        <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                          {problem.difficulty}
                        </span>
                        <a
                          href={problem.leetcode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="leetcode-link"
                          onClick={e => e.stopPropagation()}
                        >
                          LC ↗
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-brand">SVIT CodeLab</div>
        <div className="footer-college">🎓 Sai Vidya Institute of Technology</div>
        <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', marginBottom:'0.25rem' }}>
          Empowering SVIT students to crack top tech interviews
        </p>
        <div className="footer-copy">© {new Date().getFullYear()} SVIT CodeLab. Built with ❤️ for SVIT students.</div>
      </footer>
    </>
  );
}
