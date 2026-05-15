import React, { useState, useEffect } from 'react';
import { getProducts, getFilterOptions, getFavorites } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function CatalogPage() {
  const [products, setProducts]   = useState([]);
  const [favIds, setFavIds]       = useState(new Set());
  const [filterOpts, setFilterOpts] = useState({ categories: [], teams: [] });
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [category, setCategory]   = useState('');
  const [team, setTeam]           = useState('');
  const [maxPrice, setMaxPrice]   = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    Promise.all([getFilterOptions(), getFavorites()])
      .then(([f, fav]) => {
        setFilterOpts(f.data);
        setFavIds(new Set(fav.data.map(p => p.id)));
      }).catch(() => {});
    fetchProducts();
  }, []);

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try { setProducts((await getProducts(params)).data); }
    catch { setProducts([]); }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) fetchProducts({ search: search.trim() });
    else applyFilters();
  };

  const applyFilters = () => {
    const p = {};
    if (category) p.category = category;
    if (team) p.team = team;
    if (maxPrice) p.maxPrice = maxPrice;
    fetchProducts(p);
  };

  const handleCategoryPill = (cat) => {
    setActiveFilter(cat);
    if (cat === 'All') fetchProducts();
    else fetchProducts({ category: cat });
  };

  const handleReset = () => {
    setSearch(''); setCategory(''); setTeam(''); setMaxPrice('');
    setActiveFilter('All'); fetchProducts();
  };

  const pills = ['All', ...filterOpts.categories];

  return (
    <div className="page">
      {/* Editorial header */}
      <section style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 32 }}>
          <div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(48px, 8vw, 80px)',
              fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.03em', lineHeight: 0.9,
              color: '#e2e2e2',
            }}>
              PRO <span style={{ color: '#FF6B00' }}>EQUIPMENT</span>
            </h2>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13, letterSpacing: '0.25em',
              color: '#e2bfb0', textTransform: 'uppercase', marginTop: 12,
            }}>Authentic EuroLeague Performance Gear</p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 0, width: '100%', maxWidth: 360 }}>
            <div className="underline-focus" style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                placeholder="SEARCH CATALOG..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, letterSpacing: '0.1em',
                  paddingRight: 48,
                }}
              />
              <span className="material-symbols-outlined" style={{
                position: 'absolute', right: 14, top: '50%',
                transform: 'translateY(-50%)', color: '#FF6B00', fontSize: 22,
              }}>search</span>
            </div>
            <button type="submit" className="btn-orange" style={{ padding: '0 18px', whiteSpace: 'nowrap' }}>Go</button>
          </form>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
          {pills.map(p => (
            <button key={p} onClick={() => handleCategoryPill(p)} style={{
              background: activeFilter === p ? '#FF6B00' : '#2a2a2a',
              color: activeFilter === p ? '#561f00' : '#e2e2e2',
              padding: '10px 20px', fontSize: 12, letterSpacing: '0.15em',
            }}>{p}</button>
          ))}
          <div style={{ height: 32, width: 1, background: 'rgba(90,65,54,0.3)', margin: '0 4px' }} />
          {/* Team filter */}
          <select
            value={team}
            onChange={e => { setTeam(e.target.value); fetchProducts(e.target.value ? { team: e.target.value } : {}); }}
            style={{ width: 'auto', padding: '10px 16px', background: '#2a2a2a', fontSize: 12, letterSpacing: '0.1em', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <option value="">Toate echipele</option>
            {filterOpts.teams.map(t => <option key={t}>{t}</option>)}
          </select>
          {/* Max price */}
          <input
            type="number" placeholder="Max €" value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            style={{ width: 90, padding: '10px 12px', fontSize: 12, fontFamily: "'Space Grotesk', sans-serif" }}
          />
          <button onClick={applyFilters} className="btn-dark" style={{ padding: '10px 16px', fontSize: 11 }}>Aplică</button>
          <button onClick={handleReset} style={{
            background: 'transparent', color: '#e2bfb0', border: '1px solid rgba(90,65,54,0.4)',
            padding: '10px 16px', fontSize: 11,
          }}>Reset</button>
        </div>
      </section>

      {/* Results */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 80 }}><div className="spinner" /></div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 80, color: '#e2bfb0' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 56, color: '#353535', display: 'block', marginBottom: 12 }}>inventory_2</span>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Nu există produse pentru selecția curentă
          </p>
        </div>
      ) : (
        <>
          <p style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 11,
            color: '#e2bfb0', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 20,
          }}>{products.length} PRODUSE GĂSITE</p>
          <div className="grid-3">
            {products.map(p => (
              <ProductCard key={p.id} product={p} isFav={favIds.has(p.id)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
