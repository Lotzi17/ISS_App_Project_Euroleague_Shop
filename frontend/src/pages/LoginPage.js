import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) { setError('Completează toate câmpurile.'); return; }
    setLoading(true); setError('');
    try {
      const role = await login(username, password);
      navigate(role === 'ADMIN' ? '/admin' : '/');
    } catch {
      setError('Username sau parolă incorectă.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#131313', position: 'relative', overflow: 'hidden',
    }}>
      {/* Atmosphere blobs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-10%',
        width: '55%', height: '55%',
        background: 'rgba(255,107,0,0.06)', borderRadius: '50%', filter: 'blur(100px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-10%',
        width: '40%', height: '40%',
        background: 'rgba(53,53,53,0.3)', borderRadius: '50%', filter: 'blur(80px)',
      }} />

      <main style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 440, padding: '0 24px' }}>

        {/* Brand header */}
        <header style={{ marginBottom: 48, textAlign: 'center' }}>
          {/* Basketball image from Stitch */}
          <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: 90, height: 90, borderRadius: '50%',
              overflow: 'hidden', border: '2px solid rgba(255,107,0,0.3)',
              position: 'relative',
            }}>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaNxVMV9SxaJ139APdfEdurLkoDBMrL6hqR7CstautDIWIOK7AEcVVnqXr7rlQY4jNDcWtIq-NuU3H-jWexrqGXIUnFlEFn7K42-QLmFPCiXD9SR41wp_XGhybW-Ph7zKhUPFPMFTGeVvHmbwMruPxVRpmEbgg89eZ5qcC2w1DHMgCmomUQ-_LoPhhX19H_Qfp9jvv0aH0X5ZHyLZM4jkv2zeQJeegzlIKW7wDRHXTclsFUDtE-xbPA-hwdHQ6rgEgadc5ZiExOtG1"
                alt="Basketball"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 42, fontWeight: 900, fontStyle: 'italic',
            color: '#FF6B00', letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>HARDCOURT</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 10 }}>
            <span style={{ height: 1, width: 32, background: 'rgba(90,65,54,0.5)' }} />
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10, fontWeight: 700, letterSpacing: '0.3em',
              color: '#e2bfb0', textTransform: 'uppercase',
            }}>Authentic Athletics</p>
            <span style={{ height: 1, width: 32, background: 'rgba(90,65,54,0.5)' }} />
          </div>
        </header>

        {/* Login card with notch */}
        <section style={{
          background: '#1b1b1b',
          padding: '40px 40px',
          clipPath: 'polygon(0 0, 92% 0, 100% 7%, 100% 100%, 0 100%)',
          borderLeft: '4px solid #FF6B00',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 28, fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '-0.02em', color: '#e2e2e2', marginBottom: 6,
            }}>Access Portal</h2>
            <p style={{ color: '#e2bfb0', fontSize: 13 }}>Enter your credentials to enter the court.</p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(147,0,10,0.3)', color: '#ffb4ab',
              padding: '10px 14px', marginBottom: 20, fontSize: 13,
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div style={{ marginBottom: 28 }} className="underline-focus">
              <label style={{
                display: 'block', fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                color: '#e2bfb0', textTransform: 'uppercase', marginBottom: 8,
              }}>Account Identifier</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="ex: user"
                autoFocus
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 36 }} className="underline-focus">
              <label style={{
                display: 'block', fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
                color: '#e2bfb0', textTransform: 'uppercase', marginBottom: 8,
              }}>Security Phrase</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #ff6b00 0%, #ffb693 100%)',
                color: '#561f00',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 900, fontSize: 14,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '18px 0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              {loading ? 'Authenticating...' : 'Authenticate'}
              {!loading && <span className="material-symbols-outlined" style={{ fontSize: 20 }}>chevron_right</span>}
            </button>
          </form>
        </section>

        {/* Hint */}
        <div style={{
          marginTop: 24, padding: '14px 16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(90,65,54,0.3)',
          fontSize: 12, color: '#e2bfb0', lineHeight: 1.8,
        }}>
        </div>
      </main>
    </div>
  );
}
