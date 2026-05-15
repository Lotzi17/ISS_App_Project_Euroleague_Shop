# Euroleague Shop — Frontend

Interfața React pentru aplicația Euroleague Shop, proiect ISS.

## Tehnologii

- React 18
- React Router DOM v6
- Axios
- Context API (autentificare)
- Google Fonts: Space Grotesk, Manrope
- Material Symbols Outlined (iconițe)

## Cum rulezi

### Cerințe

- Node.js 18+ și npm instalat
- Backend-ul rulând pe `http://localhost:8080`

### Pași

```bash
# Din folderul frontend/
npm install
npm start
```

Aplicația se deschide automat la **http://localhost:3000**.

> Dacă apare o eroare CORS, verifică că backend-ul rulează pe portul 8080.

## Pagini

| Pagină             | URL                    | Descriere                                     | Auth     |
|--------------------|------------------------|-----------------------------------------------|----------|
| Login              | `/login`               | Autentificare cu username + parolă            | Nu       |
| Catalog            | `/`                    | Browsing produse, filtrare și căutare         | Nu       |
| Detalii produs     | `/product/:id`         | Pagina unui produs (adaugă în coș/favorite)   | Da       |
| Coșul meu          | `/cart`                | Produsele adăugate în coș                     | Da       |
| Favorite           | `/favorites`           | Produsele marcate ca favorite                 | Da       |
| Admin Dashboard    | `/admin`               | Gestionare produse, stocuri, import CSV       | ADMIN    |

## Structura proiectului

```
src/
├── components/
│   ├── Navbar.js          # Bara de navigație
│   └── ProductCard.js     # Card produs (catalog)
├── context/
│   └── AuthContext.js     # Autentificare globală (token, rol, userId)
├── pages/
│   ├── LoginPage.js
│   ├── CatalogPage.js
│   ├── ProductDetailPage.js
│   ├── CartPage.js
│   ├── FavoritesPage.js
│   └── AdminDashboard.js
├── services/
│   └── api.js             # Toate apelurile HTTP către backend
├── App.js                 # Routing principal
└── index.css              # Stiluri globale (dark theme)
```

## Design

Tema vizuală: **negru (#131313) + portocaliu (#FF6B00)**

- Fonturi: Space Grotesk (titluri/UI), Manrope (corp text)
- Iconițe: Material Symbols Outlined
- Efecte: `clip-path: polygon` (notch), gradient portocaliu pe butoane principale

## Conturi demo

| Username | Parolă   | Acces              |
|----------|----------|--------------------|
| admin    | admin123 | Admin Dashboard    |
| user     | user123  | Catalog, Coș, Fav  |
