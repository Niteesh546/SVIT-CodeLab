'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase, signOut } from '@/lib/supabase';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleAuth(e) {
    e.preventDefault();
    setLoading(true); setError('');
    let result;
    if (authMode === 'signin') {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
    }
    if (result.error) setError(result.error.message);
    else setShowAuthModal(false);
    setLoading(false);
  }

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="navbar-brand">
          <div className="logo-icon">S</div>
          SVIT CodeLab
        </Link>
        <div className="navbar-links">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Dashboard</Link>
          <Link href="/progress" className={pathname === '/progress' ? 'active' : ''}>Progress</Link>
          {user ? (
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:'0.85rem', color:'var(--text-muted)' }}>
                {user.email?.split('@')[0]}
              </span>
              <button
                onClick={() => signOut()}
                style={{
                  padding:'6px 14px', borderRadius:'var(--radius-sm)',
                  background:'var(--bg-card)', border:'1px solid var(--border)',
                  color:'var(--text-secondary)', fontSize:'0.85rem', cursor:'pointer'
                }}
              >Sign Out</button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              style={{
                padding:'8px 18px', borderRadius:'var(--radius-sm)',
                background:'var(--accent-teal)', border:'none',
                color:'white', fontSize:'0.85rem', fontWeight:600, cursor:'pointer'
              }}
            >Sign In</button>
          )}
        </div>
      </nav>

      {showAuthModal && (
        <div style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.7)',
          zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(4px)'
        }} onClick={e => { if(e.target===e.currentTarget) setShowAuthModal(false); }}>
          <div style={{
            background:'var(--bg-card)', border:'1px solid var(--border)',
            borderRadius:'var(--radius-lg)', padding:'2rem', width:360,
            boxShadow:'var(--shadow-lg)'
          }}>
            <h2 style={{ marginBottom:'0.5rem', fontSize:'1.3rem', fontWeight:800 }}>
              {authMode === 'signin' ? 'Welcome back' : 'Create account'}
            </h2>
            <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', marginBottom:'1.5rem' }}>
              {authMode === 'signin' ? 'Sign in to track your progress' : 'Join SVIT CodeLab — it\'s free'}
            </p>
            <form onSubmit={handleAuth} style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {authMode === 'signup' && (
                <input
                  value={name} onChange={e => setName(e.target.value)}
                  placeholder="Full Name" required
                  style={inputStyle}
                />
              )}
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Email" required style={inputStyle}
              />
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Password" required style={inputStyle}
              />
              {error && <p style={{ color:'var(--hard)', fontSize:'0.82rem' }}>{error}</p>}
              <button type="submit" disabled={loading} style={{
                padding:'10px', borderRadius:'var(--radius-sm)',
                background:'var(--accent-teal)', border:'none',
                color:'white', fontWeight:600, fontSize:'0.95rem', cursor:'pointer',
                opacity: loading ? 0.7 : 1
              }}>
                {loading ? 'Loading…' : authMode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            </form>
            <p style={{ textAlign:'center', marginTop:'1rem', fontSize:'0.85rem', color:'var(--text-muted)' }}>
              {authMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                style={{ background:'none', border:'none', color:'var(--accent-teal)', cursor:'pointer', fontWeight:600 }}
              >
                {authMode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

const inputStyle = {
  padding:'10px 14px', borderRadius:'var(--radius-sm)',
  background:'var(--bg-input)', border:'1px solid var(--border)',
  color:'var(--text-primary)', fontSize:'0.9rem', outline:'none',
  fontFamily:'var(--font-sans)',
};
