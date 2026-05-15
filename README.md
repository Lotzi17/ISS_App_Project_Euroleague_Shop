# Euroleague Shop

Proiect ISS 2025-2026 — Aplicație web de tip shop pentru echipamente oficiale EuroLeague Basketball.

**Student:** Alex Laslo  
**Tema:** MiniShop — Catalog digital de produse cu coș și filtrare  
**Stack:** Java Spring Boot (backend) + React (frontend)

---

## Descriere

Euroleague Shop este o aplicație web cu arhitectură stratificată (presentation → business logic → data access) care permite utilizatorilor să răsfoiască, caute și achiziționeze echipamente oficiale EuroLeague Basketball. Administratorii pot gestiona produsele, stocurile și pot importa produse în bulk via CSV.

## Funcționalități (10 Use Cases)

| # | Funcționalitate | Actor | Iterație |
|---|-----------------|-------|----------|
| UC1 | Login / Autentificare | User / Admin | 1 |
| UC2 | Vizualizare produse (catalog) | User | 1 |
| UC3 | Căutare produse | User | 2 |
| UC4 | Filtrare produse (categorie, echipă, preț) | User | 2 |
| UC5 | Vizualizare detalii produs | User | 1 |
| UC6 | Gestionare favorite | User | 3 |
| UC7 | Adăugare produs în coș | User | 2 |
| UC8 | Adăugare produs nou (admin) | Admin | 1 |
| UC9 | Actualizare stoc (admin) | Admin | 2 |
| UC10 | Import produse din CSV (admin) | Admin | 3 |

## Arhitectură

```
┌─────────────────────────────────────┐
│         React Frontend (3000)       │  Presentation Layer
├─────────────────────────────────────┤
│      Spring Boot REST API (8080)    │  Business Logic Layer
├─────────────────────────────────────┤
│   Spring Data JPA / Hibernate       │  Data Access Layer
├─────────────────────────────────────┤
│         H2 Database (file)          │  Persistence
└─────────────────────────────────────┘
```

## Structura proiectului

```
ISS_App_Project_Euroleague_Shop/
├── backend/
│   └── euroleague-shop/         # Spring Boot 3.2, Java 17
│       ├── src/main/java/...
│       ├── src/main/resources/
│       └── pom.xml
├── frontend/                    # React 18
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
├── diagrams/
│   ├── plantuml/
│   │   ├── sequence/            # UC1-UC10 diagrame secvență (.puml)
│   │   └── communication/       # UC1-UC10 diagrame comunicare (.puml)
│   ├── sequence/                # UC1-UC10 diagrame secvență (.svg)
│   ├── communication/           # UC1-UC10 diagrame comunicare (.svg)
│   └── ClassDiagram_Refined.svg
├── stitch/                      # UI prototypes (Google Stitch)
└── Use_Case_Template.md
```

## Tehnologii

**Backend**
- Java 17, Spring Boot 3.2.0
- Spring Security + JWT (jjwt 0.11.5)
- Spring Data JPA + Hibernate (ORM)
- H2 Database (file-based, persistent)
- OpenCSV (import CSV)
- Lombok, Bean Validation

**Frontend**
- React 18, React Router DOM v6
- Axios (HTTP client)
- Context API (auth state)
- Google Fonts: Space Grotesk, Manrope
- Material Symbols Outlined

## Cum rulezi

### Backend

```bash
# Deschide backend/euroleague-shop în IntelliJ IDEA
# SDK: Java 17 (Temurin/Corretto)
# Run: EuroleagueShopApplication.java
# Server pornește pe http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm start
# Aplicația se deschide pe http://localhost:3000
```

### Conturi demo

| Username | Parolă   | Rol   |
|----------|----------|-------|
| admin    | admin123 | ADMIN |
| user     | user123  | USER  |

## Diagrame UML

Toate diagramele sunt disponibile în folderul `diagrams/` în format `.puml` (PlantUML) și `.svg`:

- **Diagrama cazurilor de utilizare** — `ISS_UseCase.svg`
- **Diagrama de clase (conceptual)** — `ISS_Diagram.svg`
- **Diagrama de clase rafinată** — `diagrams/ClassDiagram_Refined.svg`
- **Diagrame de secvență** — `diagrams/plantuml/sequence/UC1–UC10`
- **Diagrame de comunicare** — `diagrams/plantuml/communication/UC1–UC10`

## Design

Tema vizuală inspirată din [Stitch (Google)](https://stitch.withgoogle.com/projects/12864414349949638576):
- Background: `#131313`
- Accent: `#FF6B00` (portocaliu)
- Fonturi: Space Grotesk + Manrope
- Efecte: clip-path notch, gradiente, Material Icons
