<script setup>
  import { ref } from 'vue';

  defineProps({
    show: Boolean
  });

  const emit = defineEmits(['close', 'add']);

  const newResident = ref({
    name: '',
    birthdate: '',
    purok: '', // The key remains 'purok' but will hold "Zone" data
    address: ''
  });

  const handleSubmit = () => {
    // Logic remains the same
    if (newResident.value.name && newResident.value.birthdate && newResident.value.purok) {
      emit('add', { ...newResident.value });
      newResident.value = { name: '', birthdate: '', purok: '', address: '' };
      emit('close');
    } else {
      alert('Please fill out Name, Birthdate, and Zone.');
    }
  };
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <h3>Add New Resident Record</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="newResident.name" required>
        </div>
        <div class="form-group">
          <label for="birthdate">Birthdate</label>
          <input type="date" id="birthdate" v-model="newResident.birthdate" required>
        </div>
        <div class="form-group">
          <label for="purok">Zone</label>
          <input type="text" id="purok" v-model="newResident.purok" placeholder="e.g., Zone 1" required>
        </div>
        <div class="form-group">
          <label for="address">Specific Address</label>
          <input type="text" id="address" v-model="newResident.address" placeholder="e.g., 123 Rizal St.">
        </div>
        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">Add Resident</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 100%;
    max-width: 500px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-group input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: 6px;
      font-family: 'Poppins',sans-serif;
      font-size: 1rem;
    }

  .form-actions {
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  button {
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    border: none;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-primary {
    background-color: var(--primary-accent);
    color: white;
  }

  .btn-secondary {
    background-color: #e2e8f0;
    color: var(--text-dark);
  }
</style>
