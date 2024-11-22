<template>
  <div class="product-pagination">
    <table>
      <thead>
      <tr>
        <th>Nom</th>
        <th>Category</th>
        <th>Prix</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.ProductID">
        <td>{{ product.ProductName }}</td>
        <td>{{ product.Category }}</td>
        <td>{{ product.Price }}</td>
      </tr>
      </tbody>
    </table>
    <div class="pagination-controls">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script>
import { getProducts } from '@/services/api';
export default {
  data() {
    return {
      products: [],
      currentPage: 1,
      totalPages: 1,
    };
  },
  methods:{
    async fetchProducts(page = 1) {
      try {
        const { products, totalPages } = await getProducts(page, 10);
        this.products = products;
        this.totalPages = totalPages;
        this.currentPage = page;
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchProducts(this.currentPage + 1);
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.fetchProducts(this.currentPage - 1);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.pagination-controls span {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
.pagination-controls button:hover {
   background-color: #1e88e5;
   transform: scale(1.05);
 }
.pagination-controls button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #42a5f5;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.pagination-controls button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
  transform: none;
}
</style>
