<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import PopulationChart from './PopulationChart.vue';

  // All the script logic remains the same.
  const totalPopulation = ref(0);
  const households = ref(0);
  const activeBlotterCases = ref(0);
  const permitsIssued = ref(0);
  const recentAnnouncements = ref([]);
  const isLoading = ref(true);

  const chartData = reactive({
    labels: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '60+'],
    datasets: [{ label: 'Population by Age Group', backgroundColor: '#28a745', data: [0, 0, 0, 0, 0, 0, 0] }]
  });

  const fetchDashboardData = () => {
    setTimeout(() => {
      totalPopulation.value = 10250;
      households.value = 2500;
      activeBlotterCases.value = 15;
      permitsIssued.value = 128;
      recentAnnouncements.value = [
        { id: 1, title: 'Community Cleanup Drive', date: 'Oct 12, 2025' },
        { id: 2, title: 'Free Vaccination Program', date: 'Oct 15, 2025' },
        { id: 3, title: 'Job Fair at Town Plaza', date: 'Oct 20, 2025' }
      ];
      chartData.datasets[0].data = [1200, 1900, 2100, 1800, 1550, 1100, 600];
      isLoading.value = false;
    }, 2000);
  };

  onMounted(() => {
    fetchDashboardData();
  });
</script>

<template>
  <div class="dashboard-container">
    <div class="stats-grid">
      <router-link to="/residents" class="stat-card-link">
        <div class="stat-card">
          <div class="icon-wrapper"><i class="fas fa-users"></i></div>
          <div class="info">
            <h4>Total Population</h4>
            <p>{{ totalPopulation.toLocaleString() }}</p>
          </div>
        </div>
      </router-link>

      <router-link to="/residents" class="stat-card-link">
        <div class="stat-card">
          <div class="icon-wrapper"><i class="fas fa-home"></i></div>
          <div class="info">
            <h4>Households</h4>
            <p>{{ households.toLocaleString() }}</p>
          </div>
        </div>
      </router-link>

      <router-link to="/blotter" class="stat-card-link">
        <div class="stat-card">
          <div class="icon-wrapper"><i class="fas fa-folder-open"></i></div>
          <div class="info">
            <h4>Active Blotter Cases</h4>
            <p>{{ activeBlotterCases }}</p>
          </div>
        </div>
      </router-link>

      <router-link to="/certificates" class="stat-card-link">
        <div class="stat-card">
          <div class="icon-wrapper"><i class="fas fa-file-signature"></i></div>
          <div class="info">
            <h4>Permits Issued (Month)</h4>
            <p>{{ permitsIssued }}</p>
          </div>
        </div>
      </router-link>
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
            <router-link to="/announcements" class="announcement-link">
              <span class="announcement-title">{{ item.title }}</span>
              <span class="announcement-date">{{ item.date }}</span>
            </router-link>
          </li>
        </ul>
        <div v-else class="loading-placeholder">Loading Announcements...</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Most styles remain the same, with a few additions at the bottom */
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
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0,0,0,0.07);
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
      flex-shrink: 0;
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
    min-height: 150px;
    color: var(--text-muted);
  }

  @media (max-width: 992px) {
    .main-content-grid {
      grid-template-columns: 1fr;
    }
  }

  /* --- NEW STYLES FOR LINKS --- */
  .stat-card-link {
    text-decoration: none;
    color: inherit;
  }

  .announcement-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 0;
    transition: background-color 0.2s ease;
    margin: 0 -1.5rem; /* Extend link to full card width */
    padding: 0.8rem 1.5rem;
  }

    .announcement-link:hover {
      background-color: #f7fafc;
    }
</style>
