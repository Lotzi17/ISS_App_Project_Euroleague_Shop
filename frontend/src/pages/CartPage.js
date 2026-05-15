import React, { useState, useEffect } from 'react';
import { getCart, removeFromCart, clearCart } from '../services/api';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = async () => {
    setLoading(true);
    try { setItems((await getCart()).data); } catch { setItems([]); }
    setLoading(false);
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    setItems(items.filter(i => i.id !== id));
  };

  const handleClear = async () => { await clearCart(); setItems([]); };

  const total = items.reduce((s, i) => s + (i.total || 0), 0);

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}><div className="spinner" /></div>;

  return (
    <div className="page">
      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 48, fontWeight: 900, textTransform: 'uppercase',
        letterSpacing: '-0.02em', color: '#e2e2e2', marginBottom: 32,
      }}>
        COȘUL <span style={{ color: '#FF6B00' }}>MEU</span>
      </h1>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 64, color: '#353535', display: 'block', marginBottom: 16 }}>shopping_cart</span>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.15em', textTransform: 'uppercase', color: '#e2bfb0', marginBottom: 24 }}>Coșul este gol</p>
          <Link to="/"><button className="btn-orange">Explorează Catalogul</button></Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items.map(item => (
              <div key={item.id} style={{
                display: 'flex', gap: 20, alignItems: 'center',
                background: '#1f1f1f', padding: '16px 20px',
                borderLeft: '3px solid transparent',
                transition: 'border-color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#FF6B00'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  style={{ width: 80, height: 80, objectFit: 'cover', background: '#2a2a2a', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, textTransform: 'uppercase', color: '#e2e2e2' }}>
                    {item.product.name}
                  </div>
                  <div style={{ color: '#e2bfb0', fontSize: 12, marginTop: 4 }}>
                    €{item.product.price?.toFixed(2)} × {item.quantity}
                  </div>
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 20, color: '#FF6B00', minWidth: 70, textAlign: 'right' }}>
                  €{item.total?.toFixed(2)}
                </div>
                <button onClick={() => handleRemove(item.id)} style={{
                  background: 'rgba(147,0,10,0.15)', color: '#e57373',
                  padding: '6px 12px', fontSize: 11, letterSpacing: '0.1em',
                }}>ELIMINĂ</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{
            background: '#1b1b1b',
            clipPath: 'polygon(0 0, 90% 0, 100% 8%, 100% 100%, 0 100%)',
            padding: '28px 24px',
            position: 'sticky', top: 84,
          }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#e2bfb0', marginBottom: 20 }}>SUMAR COMANDĂ</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#e2bfb0', fontSize: 13 }}>
              <span>Produse ({items.length})</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#e2bfb0', fontSize: 13 }}>
              <span>Livrare</span>
              <span style={{ color: '#81c784' }}>Gratuit</span>
            </div>
            <div style={{ height: 1, background: 'rgba(90,65,54,0.3)', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13, textTransform: 'uppercase', color: '#e2bfb0' }}>Total</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 28, color: '#FF6B00' }}>€{total.toFixed(2)}</span>
            </div>
            <button style={{
              width: '100%', background: 'linear-gradient(135deg, #ff6b00, #ffb693)',
              color: '#561f00', fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 900, fontSize: 13, letterSpacing: '0.15em', padding: '16px 0',
            }}>FINALIZEAZĂ COMANDA</button>
            <button onClick={handleClear} style={{
              width: '100%', marginTop: 8, background: 'transparent',
              color: '#e2bfb0', border: '1px solid rgba(90,65,54,0.4)',
              fontSize: 11, letterSpacing: '0.1em', padding: '10px 0',
            }}>GOLEȘTE COȘUL</button>
          </div>
        </div>
      )}
    </div>
  );
}
