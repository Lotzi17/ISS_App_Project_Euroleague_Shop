import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { addToCart, toggleFavorite } from '../services/api';

export default function ProductCard({ product, isFav: initFav = false }) {
  const [fav, setFav]       = useState(initFav);
  const [msg, setMsg]       = useState('');
  const [loading, setLoading] = useState(false);

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 2000); };

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    setLoading(true);
    try {
      await addToCart(product.id, 1);
      flash('✓ Adăugat în coș!');
    } catch (e) {
      flash('✗ ' + (e.response?.data?.message || 'Eroare'));
    }
    setLoading(false);
  };

  const handleToggleFav = async (e) => {
    e.preventDefault();
    try { await toggleFavorite(product.id); setFav(!fav); }
    catch {}
  };

  return (
    <div style={{
      background: '#2a2a2a',
      clipPath: 'polygon(0 0, 94% 0, 100% 6%, 100% 100%, 0 100%)',
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.2s',
      position: 'relative',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Favorite button */}
      <button
        onClick={handleToggleFav}
        style={{
          position: 'absolute', top: 12, right: 12, zIndex: 10,
          background: 'rgba(19,19,19,0.7)', borderRadius: '50%',
          width: 36, height: 36, padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: fav ? '#FF6B00' : 'rgba(226,226,226,0.4)',
        }}
      >
        <span className="material-symbols-outlined" style={{
          fontSize: 20,
          fontVariationSettings: fav ? "'FILL' 1" : "'FILL' 0",
        }}>favorite</span>
      </button>

      {/* Image */}
      <div style={{ height: 220, overflow: 'hidden', background: '#1f1f1f' }}>
        <img
          src={product.imageUrl || `https://via.placeholder.com/400x300/1f1f1f/FF6B00?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
          onMouseLeave={e => e.target.style.transform = 'scale(1)'}
        />
      </div>

      {/* Body */}
      <div style={{ padding: '16px 16px 12px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <h4 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 15, textTransform: 'uppercase',
              letterSpacing: '-0.01em', color: '#e2e2e2', marginBottom: 4,
            }}>{product.name}</h4>
            <p style={{ color: '#e2bfb0', fontSize: 12 }}>{product.team} · {product.category}</p>
          </div>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900, fontSize: 18, color: '#FF6B00', whiteSpace: 'nowrap',
          }}>€{product.price?.toFixed(0)}</span>
        </div>

        {!product.inStock && (
          <span style={{
            display: 'inline-block', marginTop: 8,
            background: 'rgba(147,0,10,0.3)', color: '#ffb4ab',
            fontSize: 11, padding: '2px 8px', letterSpacing: '0.05em',
          }}>STOC EPUIZAT</span>
        )}
      </div>

      {/* Flash message */}
      {msg && (
        <div style={{
          padding: '6px 16px', fontSize: 12, fontWeight: 600,
          background: msg.startsWith('✓') ? 'rgba(46,125,50,0.3)' : 'rgba(147,0,10,0.3)',
          color: msg.startsWith('✓') ? '#81c784' : '#ffb4ab',
        }}>{msg}</div>
      )}

      {/* Footer actions */}
      <div style={{ display: 'flex', gap: 1, marginTop: 'auto' }}>
        <Link to={`/products/${product.id}`} style={{ flex: 1 }}>
          <button style={{
            width: '100%', background: '#353535', color: '#e2bfb0',
            fontSize: 11, letterSpacing: '0.15em', padding: '12px 0',
          }}>Detalii</button>
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || loading}
          style={{
            flex: 1, fontSize: 11, letterSpacing: '0.15em', padding: '12px 0',
            background: product.inStock ? '#FF6B00' : '#353535',
            color: product.inStock ? '#561f00' : '#888',
          }}
        >
          {loading ? '...' : '+ Coș'}
        </button>
      </div>
    </div>
  );
}
