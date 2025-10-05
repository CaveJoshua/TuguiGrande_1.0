<script setup>
  import { ref, computed } from 'vue';
  import AddResidentModal from './AddResidentModal.vue';
  import EditResidentModal from './EditResidentModal.vue';

  const residents = ref([
    { id: 1, name: 'Lito Aguilar', birthdate: '1988-05-15', purok: 'Zone 3', address: '456 Bonifacio St.', registrationDate: '2022-01-20' },
    { id: 2, name: 'Elena Reyes', birthdate: '1992-09-22', purok: 'Zone 1', address: '789 Mabini St.', registrationDate: '2022-02-11' },
    { id: 3, name: 'Ricardo Santos', birthdate: '1975-12-01', purok: 'Zone 5', address: '101 Session Rd.', registrationDate: '2022-03-05' },
    { id: 4, name: 'Sofia Garcia', birthdate: '2001-07-30', purok: 'Zone 3', address: '212 Naguilian Rd.', registrationDate: '2022-04-18' },
  ]);

  const searchTerm = ref('');
  const selectedPurok = ref('All');
  const showAddModal = ref(false);
  const showEditModal = ref(false);
  const editingResident = ref(null);

  const purokList = computed(() => {
    const puroks = new Set(residents.value.map(r => r.purok));
    return ['All', ...Array.from(puroks).sort()];
  });
  const filteredResidents = computed(() => {
    return residents.value.filter(resident => {
      const matchesPurok = selectedPurok.value === 'All' || resident.purok === selectedPurok.value;
      const matchesSearch = resident.name.toLowerCase().includes(searchTerm.value.toLowerCase());
      return matchesPurok && matchesSearch;
    });
  });

  const calculateAge = (birthdate) => {
    if (!birthdate) return 'N/A';
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddResident = (newResidentData) => {
    const newId = residents.value.length > 0 ? Math.max(...residents.value.map(r => r.id)) + 1 : 1;
    residents.value.push({
      id: newId, ...newResidentData, registrationDate: new Date().toISOString().split('T')[0]
    });
  };

  const openEditModal = (resident) => {
    editingResident.value = resident;
    showEditModal.value = true;
  };

  const handleUpdateResident = (updatedResident) => {
    const index = residents.value.findIndex(r => r.id === updatedResident.id);
    if (index !== -1) {
      residents.value[index] = updatedResident;
    }
    showEditModal.value = false;
  };

  const deleteResident = (residentId) => {
    if (confirm('Are you sure you want to delete this record? This action cannot be undone.')) {
      residents.value = residents.value.filter(r => r.id !== residentId);
    }
  };
</script>

<template>
  <div class="view-container">
    <div class="view-header">
      <h1>Resident Records</h1>
      <div class="header-actions">
        <input type="text" v-model="searchTerm" placeholder="Search by name..." class="search-input">
        <select v-model="selectedPurok" class="filter-select">
          <option v-for="purok in purokList" :key="purok" :value="purok">{{ purok }}</option>
        </select>
        <button @click="showAddModal = true" class="btn-add">
          <i class="fas fa-plus"></i> Add Resident
        </button>
      </div>
    </div>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Zone</th>
            <th>Address</th>
            <th>Registration Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resident in filteredResidents" :key="resident.id">
            <td>{{ resident.name }}</td>
            <td>{{ calculateAge(resident.birthdate) }}</td>
            <td>{{ resident.purok }}</td>
            <td>{{ resident.address }}</td>
            <td>{{ resident.registrationDate }}</td>
            <td class="actions">
              <button @click="openEditModal(resident)" class="btn-icon" aria-label="Edit"><i class="fas fa-pencil-alt"></i></button>
              <button @click="deleteResident(resident.id)" class="btn-icon btn-danger" aria-label="Delete"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
          <tr v-if="filteredResidents.length === 0">
            <td colspan="6">No residents found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <AddResidentModal :show="showAddModal"
                    @close="showAddModal = false"
                    @add="handleAddResident" />

  <EditResidentModal :show="showEditModal"
                     :resident="editingResident"
                     @close="showEditModal = false"
                     @update="handleUpdateResident" />
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

  .search-input, .filter-select {
    padding: 0.8rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-family: 'Poppins',sans-serif;
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
