import React, { useState, useEffect } from 'react';
import { getFavorites } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    getFavorites()
      .then(r => setFavorites(r.data))
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: 80 }}><div className="spinner" /></div>;

  return (
    <div className="page">
      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 48, fontWeight: 900, textTransform: 'uppercase',
        letterSpacing: '-0.02em', color: '#e2e2e2', marginBottom: 32,
      }}>
        FAVORITE <span style={{ color: '#FF6B00' }}>MEU</span>
      </h1>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 64, color: '#353535', display: 'block', marginBottom: 16 }}>favorite</span>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.15em', textTransform: 'uppercase', color: '#e2bfb0', marginBottom: 24 }}>
            Niciun produs salvat
          </p>
          <Link to="/"><button className="btn-orange">Explorează Catalogul</button></Link>
        </div>
      ) : (
        <div className="grid-3">
          {favorites.map(p => <ProductCard key={p.id} product={p} isFav={true} />)}
        </div>
      )}
    </div>
  );
}
