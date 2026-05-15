import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  if (!isAuthenticated()) return null;

  const active = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: active(path) ? '#FF6B00' : 'rgba(226,226,226,0.6)',
    transition: 'color 0.2s',
    borderBottom: active(path) ? '2px solid #FF6B00' : '2px solid transparent',
    paddingBottom: 2,
  });

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(19,19,19,0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(90,65,54,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', height: 64,
    }}>
      {/* Logo */}
      <Link to="/" style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 22, fontWeight: 900, fontStyle: 'italic',
        color: '#FF6B00', letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>HARDCOURT</Link>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link to="/" style={linkStyle('/')}>Shop</Link>
        <Link to="/favorites" style={linkStyle('/favorites')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>favorite</span>
            Favorite
          </span>
        </Link>
        <Link to="/cart" style={linkStyle('/cart')}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>shopping_cart</span>
            Coș
          </span>
        </Link>
        {isAdmin() && (
          <Link to="/admin" style={{
            ...linkStyle('/admin'),
            color: active('/admin') ? '#FF6B00' : '#ffb693',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>settings</span>
              Admin
            </span>
          </Link>
        )}
      </nav>

      {/* User + logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 12, color: '#e2bfb0', letterSpacing: '0.05em',
        }}>
          {user?.username}
          <span style={{
            marginLeft: 6, background: '#FF6B00', color: '#561f00',
            borderRadius: 2, padding: '1px 6px', fontSize: 10, fontWeight: 900,
          }}>{user?.role}</span>
        </span>
        <button
          onClick={() => { logout(); navigate('/login'); }}
          style={{
            background: 'rgba(255,107,0,0.1)', color: '#FF6B00',
            border: '1px solid rgba(255,107,0,0.3)',
            padding: '6px 14px', fontSize: 11, letterSpacing: '0.1em',
          }}
        >Logout</button>
      </div>
    </header>
  );
}
