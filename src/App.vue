<script setup>
  // No need to import Dashboard here anymore, the router handles it.
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="/logo-placeholder.png" alt="Logo" class="sidebar-logo">
        <span>Barangay Tugui</span>
      </div>
      <ul>
        <li><router-link to="/"><i class="fas fa-tachometer-alt"></i> Dashboard</router-link></li>
        <li><router-link to="/officials"><i class="fas fa-users"></i> Officials Directory</router-link></li>
        <li><router-link to="/residents"><i class="fas fa-id-card"></i> Resident Records</router-link></li>
        <li><router-link to="/blotter"><i class="fas fa-balance-scale"></i> Blotter Records</router-link></li>
        <li><router-link to="/certificates"><i class="fas fa-file-alt"></i> Certificates & Permits</router-link></li>
        <li><router-link to="/announcements"><i class="fas fa-bullhorn"></i> Announcements</router-link></li>
      </ul>
    </aside>

    <div class="main-view">
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style>
  /* Most of your styles remain the same, but we update how the active link is styled */
  :root {
    --sidebar-bg: #2d3748;
    --main-bg: #f7fafc;
    --card-bg: #ffffff;
    --text-light: #e2e8f0;
    --text-dark: #2d3748;
    --text-muted: #718096;
    --primary-accent: #3182ce;
    --border-color: #e2e8f0;
  }

  body {
    margin: 0;
    font-family: 'Poppins', sans-serif; /* ...etc */
  }

  .admin-layout {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    width: 260px; /* ...etc */
  }

  .sidebar-header { /* ...etc */
  }

  .sidebar ul {
    list-style: none;
    padding: 0;
  }

    /* UPDATED: We now style the <router-link> tag inside the <li> */
    .sidebar ul li a {
      display: flex;
      align-items: center;
      padding: 1rem;
      color: var(--text-light);
      text-decoration: none;
      font-weight: 500;
      border-radius: 8px;
      transition: background-color 0.2s ease;
    }

      .sidebar ul li a:hover {
        background-color: #4a5568;
      }

      /* NEW: Vue Router's special class for the active link */
      .sidebar ul li a.router-link-exact-active {
        background-color: var(--primary-accent);
        color: #ffffff;
      }

    .sidebar ul li i {
      margin-right: 1rem;
      width: 20px;
      text-align: center;
      font-size: 1.1rem;
    }

  .main-view {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .main-content {
    flex-grow: 1;
    overflow-y: auto;
  }
</style>
