# Euroleague Shop — Backend

Spring Boot REST API pentru aplicația Euroleague Shop, proiect ISS.

## Tehnologii

- Java 17
- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA / Hibernate
- H2 Database (fișier persistent)
- OpenCSV (import CSV)
- Lombok

## Cum rulezi în IntelliJ

1. Deschide folderul `backend/euroleague-shop` în IntelliJ IDEA.
2. Asigură-te că SDK-ul proiectului este **Java 17** (Temurin sau Corretto):
   - `File → Project Structure → Project → SDK`
3. Lasă Maven să descarce dependențele (se face automat la prima deschidere).
4. Rulează clasa principală: `EuroleagueShopApplication.java` (`Run → Run 'EuroleagueShopApplication'`).
5. Serverul pornește pe **http://localhost:8080**.

> La prima pornire, baza de date este creată automat și se populează cu 2 utilizatori și 8 produse demo.

## Baza de date

- **Tip**: H2 file-based (persistent între reporniri)
- **Fișier**: `./euroleaguedb.mv.db` (creat în directorul de lucru al proiectului)
- **H2 Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:file:./euroleaguedb`
  - User: `sa` / Password: *(gol)*

## Conturi demo

| Username | Parolă    | Rol   |
|----------|-----------|-------|
| admin    | admin123  | ADMIN |
| user     | user123   | USER  |

## Endpoint-uri REST

### Autentificare

| Metodă | URL                  | Descriere         | Auth |
|--------|----------------------|-------------------|------|
| POST   | `/api/auth/login`    | Login, returnează JWT | Nu |

### Produse

| Metodă | URL                              | Descriere                        | Auth  |
|--------|----------------------------------|----------------------------------|-------|
| GET    | `/api/products`                  | Listă produse (filtre opționale) | Nu    |
| GET    | `/api/products/{id}`             | Detalii produs                   | Nu    |
| GET    | `/api/products/filters`          | Categorii și echipe disponibile  | Nu    |

Query params pentru `/api/products`: `search`, `category`, `team`, `maxPrice`, `inStock`

### Coș (necesită JWT)

| Metodă | URL                  | Descriere               |
|--------|----------------------|-------------------------|
| GET    | `/api/cart`          | Conținut coș            |
| POST   | `/api/cart/add`      | Adaugă produs în coș    |
| DELETE | `/api/cart/{id}`     | Elimină item din coș    |
| DELETE | `/api/cart/clear`    | Golește coșul           |

### Favorite (necesită JWT)

| Metodă | URL                              | Descriere                        |
|--------|----------------------------------|----------------------------------|
| GET    | `/api/favorites`                 | Lista produselor favorite        |
| POST   | `/api/favorites/toggle/{id}`     | Adaugă / elimină din favorite    |
| GET    | `/api/favorites/check/{id}`      | Verifică dacă e favorit          |

### Admin (necesită JWT + rol ADMIN)

| Metodă | URL                                    | Descriere               |
|--------|----------------------------------------|-------------------------|
| POST   | `/api/admin/products`                  | Adaugă produs           |
| PUT    | `/api/admin/products/{id}`             | Editează produs         |
| PUT    | `/api/admin/products/{id}/stock`       | Actualizează stoc       |
| DELETE | `/api/admin/products/{id}`             | Șterge produs           |
| POST   | `/api/admin/import`                    | Import produse CSV      |

## Format CSV pentru import

```
name,description,price,stock,category,team,imageUrl
Real Madrid Jersey,Tricou oficial,...,89.99,50,Jerseys,Real Madrid,https://...
```

## Structura proiectului

```
src/main/java/com/euroleague/shop/
├── config/          # Security, JWT, CORS
├── controller/      # REST Controllers
├── dto/             # Request/Response DTOs
├── entity/          # JPA Entities
├── repository/      # Spring Data Repositories
└── service/         # Business Logic
```
