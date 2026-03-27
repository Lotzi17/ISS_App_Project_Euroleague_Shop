## UC1 – Login
**Actor principal:** User / Admin  
**Descriere:** Actorul se autentifică în aplicație.  

**Precondiții:**
- cont existent în sistem  

**Postcondiții:**
- utilizatorul este logat  
- se deschide interfața corespunzătoare rolului  

**Flux normal:**
1. Sistemul afișează formularul de login.  
2. Actorul introduce username și parolă.  
3. Sistemul validează datele.  
4. Sistemul autentifică actorul.  
5. Sistemul afișează pagina corespunzătoare rolului.  

**Excepții:**
- username sau parolă greșită  
- cont inexistent  


## UC2 – View Products
**Actor principal:** User  
**Descriere:** Utilizatorul vizualizează produsele disponibile în shop.  

**Precondiții:**
- utilizatorul este autentificat  

**Postcondiții:**
- lista de produse este afișată  

**Flux normal:**
1. Utilizatorul accesează pagina principală.  
2. Sistemul preia produsele din baza de date.  
3. Sistemul afișează produsele.  

**Excepții:**
- nu există produse în baza de date  
- eroare la încărcarea produselor  


## UC3 – Search Products
**Actor principal:** User  
**Descriere:** Utilizatorul caută un produs după nume sau cuvânt-cheie.  

**Precondiții:**
- utilizatorul este autentificat  
- lista de produse este disponibilă  

**Postcondiții:**
- sunt afișate rezultatele căutării  

**Flux normal:**
1. Utilizatorul introduce textul de căutare.  
2. Sistemul caută produsele corespunzătoare.  
3. Sistemul afișează rezultatele.  

**Excepții:**
- nu există rezultate pentru textul introdus  
- câmpul de căutare este gol  


## UC4 – Filter Products
**Actor principal:** User  
**Descriere:** Utilizatorul filtrează produsele după categorie, preț, echipă sau disponibilitate.  

**Precondiții:**
- utilizatorul este autentificat  
- produsele sunt încărcate  

**Postcondiții:**
- este afișată lista filtrată  

**Flux normal:**
1. Utilizatorul selectează unul sau mai multe filtre.  
2. Sistemul aplică filtrele.  
3. Sistemul afișează produsele care corespund.  

**Excepții:**
- nu există produse care respectă filtrele  
- filtre invalide sau resetate  


## UC5 – View Product Details
**Actor principal:** User  
**Descriere:** Utilizatorul vizualizează detaliile unui produs.  

**Precondiții:**
- utilizatorul este autentificat  
- produsul există  

**Postcondiții:**
- sunt afișate detaliile produsului  

**Flux normal:**
1. Utilizatorul selectează un produs.  
2. Sistemul preia detaliile produsului.  
3. Sistemul afișează nume, preț, descriere, categorie, stoc.  

**Excepții:**
- produsul nu mai există  
- eroare la încărcarea detaliilor  


## UC6 – Manage Favorites
**Actor principal:** User  
**Descriere:** Utilizatorul adaugă sau elimină produse din favorite.  

**Precondiții:**
- utilizatorul este autentificat  
- produsul există  

**Postcondiții:**
- lista de favorite este actualizată și salvată  

**Flux normal:**
1. Utilizatorul selectează un produs.  
2. Utilizatorul apasă pe butonul de favorite.  
3. Sistemul adaugă sau elimină produsul din lista de favorite.  
4. Sistemul salvează modificarea.  

**Excepții:**
- produsul nu mai există  
- eroare la salvarea favoritelor  


## UC7 – Add Product to Cart
**Actor principal:** User  
**Descriere:** Utilizatorul adaugă un produs în coș dacă acesta este în stoc.  

**Precondiții:**
- utilizatorul este autentificat  
- produsul există  
- produsul este în stoc  

**Postcondiții:**
- produsul este adăugat în coș  

**Flux normal:**
1. Utilizatorul selectează produsul.  
2. Sistemul verifică stocul.  
3. Utilizatorul apasă „Add to cart”.  
4. Sistemul adaugă produsul în coș.  
5. Sistemul confirmă operația.  

**Excepții:**
- produsul nu este în stoc  
- produsul nu mai există  
- eroare la actualizarea coșului  


## UC8 – Add Product
**Actor principal:** Admin  
**Descriere:** Administratorul adaugă un produs nou în sistem.  

**Precondiții:**
- administratorul este autentificat  

**Postcondiții:**
- produsul este salvat în baza de date  

**Flux normal:**
1. Administratorul deschide formularul de adăugare produs.  
2. Introduce datele produsului.  
3. Confirmă adăugarea.  
4. Sistemul validează datele.  
5. Sistemul salvează produsul.  

**Excepții:**
- date incomplete sau invalide  
- produs duplicat  
- eroare la salvare  


## UC9 – Update Stock
**Actor principal:** Admin  
**Descriere:** Administratorul modifică stocul unui produs existent.  

**Precondiții:**
- administratorul este autentificat  
- produsul există  

**Postcondiții:**
- stocul produsului este actualizat  

**Flux normal:**
1. Administratorul selectează produsul.  
2. Introduce noua valoare a stocului.  
3. Confirmă modificarea.  
4. Sistemul actualizează stocul.  

**Excepții:**
- produs inexistent  
- valoare de stoc invalidă  
- eroare la salvare  


## UC10 – Import Products from CSV
**Actor principal:** Admin  
**Descriere:** Administratorul importă produse dintr-un fișier CSV pentru popularea bazei de date.  

**Precondiții:**
- administratorul este autentificat  
- fișierul CSV există  

**Postcondiții:**
- produsele sunt importate în baza de date  

**Flux normal:**
1. Administratorul selectează fișierul CSV.  
2. Sistemul citește fișierul.  
3. Sistemul validează datele.  
4. Sistemul importă produsele.  
5. Sistemul afișează confirmarea.  

**Excepții:**
- fișier lipsă  
- format CSV invalid  
- date invalide în fișier  
- eroare la import  
