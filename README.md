
# **Analyse des Paniers d'Achat**

## **Description**
Cette application permet de gérer et d'analyser les données de vente d'un site e-commerce à travers un tableau de bord interactif.une gestion des produits avec pagination.

---

## **Prérequis**
- **Node.js** (v16 ou supérieur)
- **npm** ou **yarn**
- **MongoDB** (local ou distant)

---

## **Installation**

1. **Clonez le projet :**
   ```bash
   git clone https://github.com/omar-chanane/shopping-cart-analysis.git
   cd shopping-cart-analysis
   cd ecommerce-backend
   ```

2. **Installez les dépendances :**
   ```bash
   npm install
   ```

3. **Configurez les variables d’environnement :**
   Créez un fichier `.env` à la racine avec les clés suivantes :
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   ```

4. **Initialisez la base de données :**
   Remplissez les collections `products` et `sales` en exécutant le script de seed :
   ```bash
   npm run seed
   ```

5. **Démarrez l’application :**
   - **Backend :**
     ```bash
     npm run dev
     ou
     nodemon src/index.ts
     ```
   - **Frontend :**
     Lancez le serveur de développement Vue.js dans un terminal séparé :
     ```bash
     cd ecommerce-frontend
     npm install
     npm run serve
     ```

6. **Accédez à l’application :**
   - Backend : `http://localhost:5000`
   - Frontend : `http://localhost:5173`

---

## **Fonctionnalités**

### **Frontend**
1. **Tableau de Bord :**
   - Affiche le total des ventes, les produits les plus vendus.
2. **Gestion des Produits :**
   - Liste des produits avec pagination.
3. **Filtres :**
   - Filtrage par période pour les statistiques.

### **Backend**
1. **Endpoints RESTful API :**
   - Gestion des produits et des statistiques.
2. **Base de Données :**
   - MongoDB pour stocker les données des produits et des ventes.

---

## **Endpoints API**

### **1. Obtenir le Total des Ventes**
**Endpoint :**
```
GET /analytics/total_sales
```

**Paramètres :**
- `startDate` (query) : Date de début (format `YYYY-MM-DD`).
- `endDate` (query) : Date de fin (format `YYYY-MM-DD`).

**Exemple :**
```bash
curl -X GET "http://localhost:5000/api/analytics/total_sales?startDate=2024-01-01&endDate=2024-01-31"
```

**Réponse :**
```json
{
  "totalSales": 12000.50
}
```

---

### **2. Obtenir les Produits les Plus Vendus**
**Endpoint :**
```
GET /analytics/trending_products
```

**Exemple :**
```bash
curl -X GET "http://localhost:5000/api/analytics/trending_products"
```

**Réponse :**
```json
[
  {
    "productName": "Produit A",
    "totalQuantity": 120,
    "totalAmount": 6000
  },
  {
    "productName": "Produit B",
    "totalQuantity": 80,
    "totalAmount": 4000
  }
]
```

---

### **3. Répartition des Ventes par Catégorie**
**Endpoint :**
```
GET /analytics/category_sales
```

**Exemple :**
```bash
curl -X GET "http://localhost:5000/api/analytics/category_sales"
```

**Réponse :**
```json
[
  {
    "category": "Électronique",
    "totalSales": 8000,
    "totalQuantity": 120,
    "percentage": 66.67
  },
  {
    "category": "Maison",
    "totalSales": 4000,
    "totalQuantity": 50,
    "percentage": 33.33
  }
]
```

---

### **4. Liste des Produits**
**Endpoint :**
```
GET /products
```

**Paramètres :**
- `page` (query) : Numéro de la page.
- `limit` (query) : Nombre d’éléments par page.

**Exemple :**
```bash
curl -X GET "http://localhost:5000/api/products?page=1&limit=10"
```

**Réponse :**
```json
{
  "products": [
    {
      "ProductName": "Produit A",
      "Category": "Électronique",
      "Price": 200,
    },
    {
      "ProductName": "Produit B",
      "Category": "Électronique",
      "Price": 300,
    }
  ],
  "totalProducts": 50,
  "totalPages": 5,
  "currentPage": 1
}
```

---

## **Scripts Disponibles**
- **`npm run dev`** : Démarrer le backend en mode développement.
- **`npm run seed`** : Remplir la base de données avec des données de test.
- **`npm run build`** : Compiler le frontend pour la production.

---

## **Structure du Projet**

```
.
├── ecommerce-backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── ecommerce-frontend/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── App.vue
│   └── main.js
└── README.md
```

---
