<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// This is a required step to register the components Chart.js needs.
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// This component accepts the chart data and options as "props" from its parent.
const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  chartOptions: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    })
  }
});
</script>

<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>
