import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from './DashboardView.vue';
import OfficialsView from './OfficialsView.vue';
import ResidentsView from './ResidentsView.vue';
// Import other views here...

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/officials',
    name: 'Officials',
    component: OfficialsView
  },
  {
    path: '/residents',
    name: 'Residents',
    component: ResidentsView
  },
  // Define other routes here for Blotter, Certificates, etc.
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
