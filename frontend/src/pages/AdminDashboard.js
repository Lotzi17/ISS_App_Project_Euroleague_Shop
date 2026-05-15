import React, { useState, useEffect, useRef } from 'react';
import { getProducts, addProduct, updateProduct, updateStock, deleteProduct, importProductsCsv } from '../services/api';

const empty = { name:'', description:'', price:'', stock:'', category:'', team:'', imageUrl:'' };

const th = { background:'#FF6B00', color:'#561f00', padding:'12px 16px', textAlign:'left', fontSize:11, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:'0.15em', textTransform:'uppercase', fontWeight:900 };
const td = { padding:'12px 16px', borderBottom:'1px solid #1f1f1f', fontSize:13, color:'#e2e2e2' };

export default function AdminDashboard() {
  const [tab, setTab]             = useState('products');
  const [products, setProducts]   = useState([]);
  const [form, setForm]           = useState(empty);
  const [editId, setEditId]       = useState(null);
  const [stockMap, setStockMap]   = useState({});
  const [msg, setMsg]             = useState(null);
  const [importResult, setImportResult] = useState(null);
  const fileRef = useRef();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const r = await getProducts();
      setProducts(r.data);
      const sm = {}; r.data.forEach(p => { sm[p.id] = p.stock; }); setStockMap(sm);
    } catch {}
  };

  const flash = (text, ok = true) => { setMsg({ text, ok }); setTimeout(() => setMsg(null), 3500); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dto = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    try {
      if (editId) { await updateProduct(editId, dto); flash('✓ Produs actualizat!'); }
      else        { await addProduct(dto);              flash('✓ Produs adăugat!'); }
      setForm(empty); setEditId(null); setTab('products'); fetchProducts();
    } catch (e) { flash('✗ ' + (e.response?.data?.message || 'Eroare'), false); }
  };

  const handleEdit = (p) => {
    setForm({ name:p.name, description:p.description||'', price:p.price, stock:p.stock, category:p.category||'', team:p.team||'', imageUrl:p.imageUrl||'' });
    setEditId(p.id); setTab('add'); window.scrollTo(0,0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ștergi produsul?')) return;
    try { await deleteProduct(id); flash('✓ Produs șters.'); fetchProducts(); }
    catch { flash('✗ Eroare la ștergere.', false); }
  };

  const handleStockUpdate = async (id) => {
    try { await updateStock(id, Number(stockMap[id])); flash(`✓ Stoc actualizat #${id}`); fetchProducts(); }
    catch { flash('✗ Eroare stoc.', false); }
  };

  const handleImport = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) { flash('Selectează fișier CSV!', false); return; }
    try { const r = await importProductsCsv(file); setImportResult(r.data); fetchProducts(); }
    catch { flash('✗ Eroare import.', false); }
  };

  const tabs = [
    { id:'products', label:'Produse', icon:'inventory_2' },
    { id:'add',      label: editId ? 'Editare' : 'Adaugă', icon: editId ? 'edit' : 'add_circle' },
    { id:'stock',    label:'Stocuri', icon:'warehouse' },
    { id:'import',   label:'Import CSV', icon:'upload_file' },
  ];

  const fieldStyle = { marginBottom:16 };
  const labelStyle = { display:'block', fontFamily:"'Space Grotesk',sans-serif", fontSize:10, fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:'#e2bfb0', marginBottom:6 };

  return (
    <div className="page">
      <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:42, fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.02em', marginBottom:4 }}>
        ADMIN <span style={{ color:'#FF6B00' }}>DASHBOARD</span>
      </h1>
      <p style={{ color:'#e2bfb0', fontSize:12, letterSpacing:'0.1em', marginBottom:28 }}>EUROLEAGUE SHOP — MANAGEMENT PANEL</p>

      {msg && (
        <div style={{
          padding:'12px 18px', marginBottom:20, fontSize:13,
          background: msg.ok ? 'rgba(46,125,50,0.2)' : 'rgba(147,0,10,0.2)',
          color: msg.ok ? '#81c784' : '#e57373',
          borderLeft:`3px solid ${msg.ok ? '#81c784' : '#e57373'}`,
          fontFamily:"'Space Grotesk',sans-serif",
        }}>{msg.text}</div>
      )}

      {/* Tabs */}
      <div style={{ display:'flex', gap:2, marginBottom:28, borderBottom:'1px solid #353535' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab===t.id ? '#FF6B00' : '#2a2a2a',
            color: tab===t.id ? '#561f00' : '#e2bfb0',
            padding:'12px 20px', fontSize:11, letterSpacing:'0.15em',
            display:'flex', alignItems:'center', gap:6, borderRadius:0,
          }}>
            <span className="material-symbols-outlined" style={{ fontSize:16 }}>{t.icon}</span>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* PRODUCTS LIST */}
      {tab==='products' && (
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', background:'#1b1b1b' }}>
            <thead><tr>
              {['ID','Imagine','Produs','Preț','Stoc','Categorie','Echipă','Acțiuni'].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} style={{ transition:'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#222'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <td style={td}><span style={{ color:'#e2bfb0', fontSize:12 }}>#{p.id}</span></td>
                  <td style={td}>
                    <img src={p.imageUrl} alt={p.name} style={{ width:52, height:42, objectFit:'cover', background:'#2a2a2a' }} />
                  </td>
                  <td style={{ ...td, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700 }}>{p.name}</td>
                  <td style={{ ...td, color:'#FF6B00', fontWeight:700 }}>€{p.price?.toFixed(2)}</td>
                  <td style={td}><span style={{ color: p.inStock?'#81c784':'#e57373', fontWeight:700 }}>{p.stock}</span></td>
                  <td style={td}>{p.category}</td>
                  <td style={td}>{p.team}</td>
                  <td style={td}>
                    <button onClick={() => handleEdit(p)} style={{ background:'#2a2a2a', color:'#e2bfb0', padding:'5px 12px', fontSize:11, marginRight:6 }}>EDIT</button>
                    <button onClick={() => handleDelete(p.id)} style={{ background:'rgba(147,0,10,0.3)', color:'#e57373', padding:'5px 12px', fontSize:11 }}>DEL</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD / EDIT */}
      {tab==='add' && (
        <form onSubmit={handleSubmit} style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, background:'#1b1b1b', padding:28 }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Nume *</label>
            <input name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="ex: Real Madrid Jersey" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Preț (€) *</label>
            <input type="number" step="0.01" min="0" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Stoc *</label>
            <input type="number" min="0" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} required />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Categorie</label>
            <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="ex: Jerseys" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Echipă</label>
            <input value={form.team} onChange={e=>setForm({...form,team:e.target.value})} placeholder="ex: Real Madrid" />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>URL Imagine</label>
            <input value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})} placeholder="https://..." />
          </div>
          <div style={{ ...fieldStyle, gridColumn:'1/-1' }}>
            <label style={labelStyle}>Descriere</label>
            <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})}
              rows={3} style={{ background:'#353535', border:'none', color:'#e2e2e2', padding:'14px 16px', width:'100%', fontFamily:"'Manrope',sans-serif", resize:'vertical' }} />
          </div>
          <div style={{ gridColumn:'1/-1', display:'flex', gap:10 }}>
            <button type="submit" className="btn-orange">{editId ? '✓ SALVEAZĂ' : '+ ADAUGĂ PRODUS'}</button>
            {editId && <button type="button" className="btn-dark" onClick={() => { setForm(empty); setEditId(null); }}>ANULEAZĂ</button>}
          </div>
        </form>
      )}

      {/* STOCK */}
      {tab==='stock' && (
        <table style={{ width:'100%', borderCollapse:'collapse', background:'#1b1b1b' }}>
          <thead><tr>
            {['#','Produs','Stoc curent','Stoc nou',''].map(h => <th key={h} style={th}>{h}</th>)}
          </tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={td}><span style={{ color:'#e2bfb0', fontSize:12 }}>#{p.id}</span></td>
                <td style={{ ...td, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700 }}>{p.name}</td>
                <td style={td}><span style={{ color:p.inStock?'#81c784':'#e57373', fontWeight:700 }}>{p.stock}</span></td>
                <td style={td}>
                  <input type="number" min="0" value={stockMap[p.id]??p.stock}
                    onChange={e=>setStockMap({...stockMap,[p.id]:e.target.value})}
                    style={{ width:80, padding:'6px 10px', background:'#353535', border:'none', color:'#e2e2e2', fontFamily:"'Space Grotesk',sans-serif" }}
                  />
                </td>
                <td style={td}>
                  <button onClick={() => handleStockUpdate(p.id)} style={{ background:'rgba(255,107,0,0.15)', color:'#FF6B00', border:'1px solid rgba(255,107,0,0.3)', padding:'5px 14px', fontSize:11 }}>
                    UPDATE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* IMPORT */}
      {tab==='import' && (
        <div style={{ background:'#1b1b1b', padding:28, maxWidth:600 }}>
          <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:18, textTransform:'uppercase', letterSpacing:'-0.01em', marginBottom:12 }}>
            Import <span style={{ color:'#FF6B00' }}>CSV</span>
          </h3>
          <p style={{ color:'#e2bfb0', fontSize:12, marginBottom:20, lineHeight:1.8 }}>
            Format așteptat: <code style={{ color:'#ffb693', background:'#2a2a2a', padding:'2px 6px' }}>name, description, price, stock, category, team, imageUrl</code>
          </p>
          <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:24 }}>
            <input type="file" accept=".csv" ref={fileRef} style={{ background:'#2a2a2a', flex:1 }} />
            <button className="btn-orange" onClick={handleImport} style={{ whiteSpace:'nowrap' }}>
              <span style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span className="material-symbols-outlined" style={{ fontSize:18 }}>upload_file</span>
                IMPORTĂ
              </span>
            </button>
          </div>
          {importResult && (
            <div style={{ background:'#2a2a2a', padding:16, borderLeft:'3px solid #FF6B00' }}>
              <p style={{ color:'#81c784', fontFamily:"'Space Grotesk',sans-serif", fontWeight:700 }}>✓ Importate: {importResult.importedCount} produse</p>
              {importResult.errorCount > 0 && (
                <>
                  <p style={{ color:'#e57373', fontFamily:"'Space Grotesk',sans-serif", marginTop:8 }}>✗ Erori: {importResult.errorCount}</p>
                  <ul style={{ paddingLeft:20, marginTop:8 }}>
                    {importResult.errors.map((e,i) => <li key={i} style={{ color:'#e57373', fontSize:12 }}>{e}</li>)}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
