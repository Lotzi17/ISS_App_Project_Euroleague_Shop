import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, addToCart, toggleFavorite, checkFavorite } from '../services/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [fav, setFav]         = useState(false);
  const [qty, setQty]         = useState(1);
  const [msg, setMsg]         = useState({ text: '', ok: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProductById(id), checkFavorite(id)])
      .then(([p, f]) => { setProduct(p.data); setFav(f.data.isFavorite); })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const flash = (text, ok = true) => { setMsg({ text, ok }); setTimeout(() => setMsg({ text: '', ok: true }), 2500); };

  const handleCart = async () => {
    try { await addToCart(product.id, qty); flash(`✓ ${qty}× ${product.name} adăugat în coș!`); }
    catch (e) { flash('✗ ' + (e.response?.data?.message || 'Eroare'), false); }
  };

  const handleFav = async () => {
    try { const r = await toggleFavorite(product.id); setFav(r.data.status === 'added'); }
    catch {}
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 100 }}><div className="spinner" /></div>;
  if (!product) return null;

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} style={{
        background: 'none', color: '#e2bfb0', fontSize: 12,
        letterSpacing: '0.15em', padding: 0, marginBottom: 32,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
        ÎNAPOI
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
        {/* Image */}
        <div style={{
          clipPath: 'polygon(0 0, 94% 0, 100% 6%, 100% 100%, 0 100%)',
          overflow: 'hidden', background: '#1f1f1f',
        }}>
          <img
            src={product.imageUrl || `https://via.placeholder.com/600x500/1f1f1f/FF6B00?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Info */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: '#FF6B00', color: '#561f00', fontSize: 10, fontWeight: 900, padding: '3px 10px', letterSpacing: '0.1em' }}>
              {product.category?.toUpperCase()}
            </span>
            <span style={{ background: '#2a2a2a', color: '#e2bfb0', fontSize: 10, padding: '3px 10px', letterSpacing: '0.1em' }}>
              {product.team}
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: 900, textTransform: 'uppercase',
            letterSpacing: '-0.02em', color: '#e2e2e2', marginBottom: 8,
          }}>{product.name}</h1>

          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 36, fontWeight: 900, color: '#FF6B00', marginBottom: 24,
          }}>€{product.price?.toFixed(2)}</div>

          <p style={{ color: '#e2bfb0', lineHeight: 1.8, marginBottom: 24, fontSize: 14 }}>
            {product.description || 'Produs oficial EuroLeague.'}
          </p>

          {/* Stock */}
          <div style={{ marginBottom: 24, fontSize: 13, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}>
            {product.inStock
              ? <span style={{ color: '#81c784' }}>✓ ÎN STOC — {product.stock} disponibile</span>
              : <span style={{ color: '#e57373' }}>✗ STOC EPUIZAT</span>}
          </div>

          {/* Quantity */}
          {product.inStock && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, letterSpacing: '0.15em', color: '#e2bfb0' }}>CANTITATE</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{
                  background: '#353535', color: '#e2e2e2', width: 36, height: 36,
                  fontSize: 20, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>−</button>
                <span style={{
                  background: '#2a2a2a', color: '#e2e2e2',
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16,
                  width: 48, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} style={{
                  background: '#353535', color: '#e2e2e2', width: 36, height: 36,
                  fontSize: 20, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>+</button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleCart} disabled={!product.inStock} style={{
              flex: 1,
              background: product.inStock ? 'linear-gradient(135deg, #ff6b00, #ffb693)' : '#2a2a2a',
              color: product.inStock ? '#561f00' : '#666',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900,
              fontSize: 13, letterSpacing: '0.15em', padding: '16px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>shopping_cart</span>
              ADAUGĂ ÎN COȘ
            </button>
            <button onClick={handleFav} style={{
              background: fav ? 'rgba(255,107,0,0.15)' : '#2a2a2a',
              color: fav ? '#FF6B00' : '#e2bfb0',
              border: fav ? '1px solid rgba(255,107,0,0.4)' : '1px solid #353535',
              width: 52, padding: 0, fontSize: 22,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="material-symbols-outlined" style={{
                fontVariationSettings: fav ? "'FILL' 1" : "'FILL' 0",
              }}>favorite</span>
            </button>
          </div>

          {/* Flash */}
          {msg.text && (
            <div style={{
              marginTop: 14, padding: '10px 16px', fontSize: 13,
              background: msg.ok ? 'rgba(46,125,50,0.2)' : 'rgba(147,0,10,0.2)',
              color: msg.ok ? '#81c784' : '#e57373',
              borderLeft: `3px solid ${msg.ok ? '#81c784' : '#e57373'}`,
            }}>{msg.text}</div>
          )}
        </div>
      </div>
    </div>
  );
}
