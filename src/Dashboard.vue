<script setup>
import { ref, reactive, onMounted } from 'vue';
import PopulationChart from './PopulationChart.vue'; // Import our new chart component

// Initialize all numbers to zero as requested.
const totalPopulation = ref(0);
const households = ref(0);
const activeBlotterCases = ref(0);
const permitsIssued = ref(0);
const recentAnnouncements = ref([]);
const isLoading = ref(true);

// Use a reactive object for the chart data so it can be updated easily.
const chartData = reactive({
  labels: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '60+'],
  datasets: [
    {
      label: 'Population by Age Group',
      backgroundColor: '#006400',
      data: [0, 0, 0, 0, 0, 0, 0] // Start with zero data
    }
  ]
});

// This function simulates fetching data from a server.
const fetchDashboardData = () => {
  console.log('Fetching dashboard data...');
  // Simulate a 2-second delay for a realistic loading experience.
  setTimeout(() => {
    // Update the stat cards with new data.
    totalPopulation.value = 0;
    households.value = 0;
    activeBlotterCases.value = 0;
    permitsIssued.value = 0;

    // Update the recent announcements list.
    recentAnnouncements.value = [
      { id: 1, title: 'Community Cleanup Drive', date: 'Oct 12, 2025' },
      { id: 2, title: 'Free Vaccination Program', date: 'Oct 15, 2025' },
      { id: 3, title: 'Job Fair at Town Plaza', date: 'Oct 20, 2025' }
    ];

    // Update the chart's data array with the "fetched" values.
    chartData.datasets[0].data = [1200, 1900, 2100, 1800, 1550, 1100, 600];

    isLoading.value = false; // Mark loading as complete.
    console.log('Data fetch complete!');
  }, 2000);
};

// The onMounted hook runs this function automatically when the component is first loaded.
onMounted(() => {
  fetchDashboardData();
});
</script>

<template>
  <div class="dashboard-container">
    <div class="stats-grid">
      <div class="stat-card">
        <h4>Total Population</h4>
        <p>{{ totalPopulation.toLocaleString() }}</p>
        <i class="fas fa-users"></i>
      </div>
      <div class="stat-card">
        <h4>Households</h4>
        <p>{{ households.toLocaleString() }}</p>
        <i class="fas fa-home"></i>
      </div>
      <div class="stat-card">
        <h4>Active Blotter Cases</h4>
        <p>{{ activeBlotterCases }}</p>
        <i class="fas fa-folder-open"></i>
      </div>
      <div class="stat-card">
        <h4>Permits Issued (Month)</h4>
        <p>{{ permitsIssued }}</p>
        <i class="fas fa-file-signature"></i>
      </div>
    </div>

    <div class="main-content-grid">
      <div class="chart-container card">
        <h4>Population Demographics</h4>
        <div class="chart-wrapper">
          <PopulationChart v-if="!isLoading" :chartData="chartData" />
          <div v-else class="loading-placeholder">Loading Chart Data...</div>
        </div>
      </div>
      <div class="announcements-container card">
        <h4>Recent Announcements</h4>
        <ul v-if="!isLoading">
          <li v-for="item in recentAnnouncements" :key="item.id">
            <span class="announcement-title">{{ item.title }}</span>
            <span class="announcement-date">{{ item.date }}</span>
          </li>
        </ul>
        <div v-else class="loading-placeholder">Loading Announcements...</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* --- UPDATED STYLES FOR Dashboard.vue --- */
  .dashboard-container {
    padding: 2rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

    .stat-card .icon-wrapper {
      background-color: #e2e8f0;
      color: var(--text-muted);
      height: 48px;
      width: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .stat-card .info h4 {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-bottom: 0.25rem;
      font-weight: 500;
    }

    .stat-card .info p {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-dark);
    }

  .main-content-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
  }

  .card {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

    .card h4 {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }

  .chart-wrapper {
    height: 350px;
  }

  .announcements-container ul {
    list-style: none;
    padding: 0;
  }

  .announcements-container li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--border-color);
  }

    .announcements-container li:last-child {
      border-bottom: none;
    }

  .announcement-title {
    font-weight: 500;
  }

  .announcement-date {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  .loading-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--text-muted);
  }

  @media (max-width: 992px) {
    .main-content-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
