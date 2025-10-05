<script setup>
import { ref, onMounted } from 'vue';

// Reactive state to hold our data and loading status
const announcements = ref([]);
const loading = ref(true);

// This function simulates fetching data from a backend API
const fetchAnnouncements = () => {
  // In a real app, this would be an `axios.get('/api/announcements')` call
  console.log('Fetching announcements...');
  setTimeout(() => {
    // Mock data from the server
    const apiResponse = [
      { id: 1, date: 'October 5, 2025', title: 'Community-Wide Cleanup Drive this Weekend', excerpt: 'Join us this coming Saturday as we work together to clean and beautify our surroundings...', image: 'announcement1-placeholder.jpg' },
      { id: 2, date: 'October 3, 2025', title: 'Free Anti-Rabies Vaccination for Pets', excerpt: 'The Barangay Health Center will be conducting a free anti-rabies vaccination drive for dogs and cats...', image: 'announcement2-placeholder.jpg' },
      { id: 3, date: 'October 1, 2025', title: 'Sangguniang Kabataan (SK) General Assembly', excerpt: 'All youth members aged 15-30 are invited to the SK General Assembly to discuss upcoming projects...', image: 'announcement3-placeholder.jpg' }
    ];

    announcements.value = apiResponse;
    loading.value = false; // We're done loading
    console.log('Data fetched!');
  }, 2000); // Simulate a 2-second network delay
};

// onMounted is a lifecycle hook that runs automatically when the component is first created.
// This is the perfect place to fetch initial data.
onMounted(() => {
  fetchAnnouncements();
});
</script>

<template>
  <section id="announcements" class="announcements-section">
    <div class="container">
      <div class="section-title">
        <h3>Latest Announcements</h3>
        <p>Stay informed about the latest news and events in our community.</p>
      </div>

      <div v-if="loading" class="loading-message">
        <p>Loading latest news...</p>
      </div>

      <div v-else class="announcements-grid">
        <article v-for="post in announcements" :key="post.id" class="announcement-post">
          <div class="post-image">
            <img :src="post.image" :alt="post.title">
          </div>
          <div class="post-content">
            <span class="post-date">{{ post.date }}</span>
            <h4 class="post-title">{{ post.title }}</h4>
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <a href="#" class="read-more">Read More &rarr;</a>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<style scoped>
    /* 'scoped' means these styles ONLY apply to this component, preventing conflicts.
    All the .announcements-section CSS from the previous prompt goes here.
  */
    .announcements-section {
      padding: 6rem 0;
    }

    .announcements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .announcement-post {
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    }

    .post-image img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .announcement-post:hover .post-image img {
      transform: scale(1.05);
    }

    .post-content {
      padding: 1.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }

    .post-date {
      font-size: 0.9rem;
      color: #888;
      margin-bottom: 0.5rem;
    }

    .post-title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .post-excerpt {
      color: #666;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .read-more {
      font-weight: 600;
      align-self: flex-start;
    }

    .loading-message {
      text-align: center;
      font-size: 1.2rem;
      color: #888;
      padding: 4rem 0;
    }
</style>
