<template>
  <div class="dashboard">
    <h1>Tableau de Bord</h1>
    <div class="date-filters">
      <label for="startDate">Date de début :</label>
      <input id="startDate" type="date" v-model="startDate" @change="fetchTotalSales" />
      <label for="endDate">Date de fin :</label>
      <input id="endDate" type="date" v-model="endDate" @change="fetchTotalSales" />
    </div>
    <div class="stats">
      <StatCard title="Ventes Totales" :value="totalSales" />
    </div>
    <div class="table">
      <h2>Liste des Produits</h2>
      <ProductTable/>
    </div>
  </div>
</template>

<script>
import { getTotalSales } from '@/services/api';
import StatCard from '@/components/StatCard.vue';
import ProductTable from '@/components/ProductTable.vue';

export default {
  name: 'Dashboard',
  components: {
    StatCard,
    ProductTable,
  },
  data() {
    return {
      totalSales: 0,
      pieChartData: null,
      startDate: '',
      endDate: '',
      currentPage: 1,
      totalPages: 1,

    };
  },
  methods: {
    async fetchTotalSales() {
      if (!this.startDate || !this.endDate) {
        return;
      }
      try {
        const result = await getTotalSales(this.startDate, this.endDate);
        this.totalSales = result.totalSales;
      } catch (error) {
        console.error('Erreur lors de la récupération des ventes totales :', error);
      }
    },

  },
  mounted() {
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0];
    this.startDate = new Date(today.setDate(today.getDate() - 30))
      .toISOString()
      .split('T')[0];
    this.fetchTotalSales();
  },
};
</script>
<style scoped>
.dashboard {
  padding: 20px;
}
.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}
.charts {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}
.table {
  margin-top: 20px;
}
.date-filters {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date-filters label {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.date-filters input[type='date'] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.date-filters input[type='date']:focus {
  outline: none;
  border-color: #42a5f5;
  box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
}

.date-filters input[type='date']::-webkit-calendar-picker-indicator {
  color: #42a5f5;
  cursor: pointer;
}
</style>
