<script setup>
  import { ref, computed } from 'vue';
  import AddOfficialModal from './AddOfficialModal.vue';

  // --- STATE MANAGEMENT ---
  // This holds the master list of officials. Starts with some mock data.
  const officials = ref([
    { id: 1, name: 'Juan Dela Cruz', position: 'Punong Barangay', termStart: '2023-10-30' },
    { id: 2, name: 'Maria Santos', position: 'Kagawad', termStart: '2023-10-30' },
    { id: 3, name: 'Jose Rizal', position: 'Kagawad', termStart: '2023-10-30' },
    { id: 4, name: 'Ana Gomez', position: 'SK Chairperson', termStart: '2023-10-30' },
    { id: 5, name: 'Pedro Penduko', position: 'Barangay Secretary', termStart: '2023-11-15' },
  ]);

  // This holds the text from the search input.
  const searchTerm = ref('');
  // This controls whether the "Add Official" modal is visible.
  const showAddModal = ref(false);

  // --- COMPUTED PROPERTY FOR SEARCH ---
  // This automatically filters the list whenever the searchTerm changes.
  const filteredOfficials = computed(() => {
    if (!searchTerm.value) {
      return officials.value;
    }
    const lowerCaseSearch = searchTerm.value.toLowerCase();
    return officials.value.filter(official =>
      official.name.toLowerCase().includes(lowerCaseSearch) ||
      official.position.toLowerCase().includes(lowerCaseSearch)
    );
  });

  // --- METHODS ---
  // This function receives the data from the modal and adds it to our list.
  const handleAddOfficial = (newOfficialData) => {
    const newId = officials.value.length > 0 ? Math.max(...officials.value.map(o => o.id)) + 1 : 1;
    officials.value.push({ id: newId, ...newOfficialData });
  };
</script>

<template>
  <div class="view-container">
    <div class="view-header">
      <h1>Officials Directory</h1>
      <div class="header-actions">
        <input type="text" v-model="searchTerm" placeholder="Search by name or position..." class="search-input">
        <button @click="showAddModal = true" class="btn-add">
          <i class="fas fa-plus"></i> Add Official
        </button>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Term Start Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="official in filteredOfficials" :key="official.id">
            <td>{{ official.name }}</td>
            <td>{{ official.position }}</td>
            <td>{{ official.termStart }}</td>
            <td class="actions">
              <button class="btn-icon" aria-label="Edit"><i class="fas fa-pencil-alt"></i></button>
              <button class="btn-icon btn-danger" aria-label="Delete"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
          <tr v-if="filteredOfficials.length === 0">
            <td colspan="4">No officials found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <AddOfficialModal :show="showAddModal"
                    @close="showAddModal = false"
                    @add="handleAddOfficial" />
</template>

<style scoped>
  .view-container {
    padding: 2rem;
  }

  .view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .header-actions {
    display: flex;
    gap: 1rem;
  }

  .search-input {
    padding: 0.8rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    width: 250px;
  }

  .btn-add {
    background-color: var(--primary-accent);
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .table-container {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  thead {
    background-color: #f7fafc;
  }

  th {
    font-weight: 600;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: #f7fafc;
  }

  td.actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-icon {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 1rem;
  }

    .btn-icon:hover {
      color: var(--primary-accent);
    }

    .btn-icon.btn-danger:hover {
      color: #e53e3e;
    }
</style>
