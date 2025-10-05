<script setup>
import { ref, watchEffect } from 'vue';

// This component receives the resident object to be edited as a "prop".
const props = defineProps({
  show: Boolean,
  resident: Object
});

const emit = defineEmits(['close', 'update']);

// A local, editable copy of the resident's data.
const editableResident = ref(null);

// watchEffect runs whenever a prop changes. This keeps the form in sync.
watchEffect(() => {
  // We create a copy so we don't accidentally change the original data before saving.
  editableResident.value = { ...props.resident };
});

const handleSubmit = () => {
  emit('update', editableResident.value);
  emit('close');
};
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <h3>Edit Resident Record</h3>
      <form v-if="editableResident" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="editableResident.name" required>
        </div>
        <div class="form-group">
          <label for="birthdate">Birthdate</label>
          <input type="date" id="birthdate" v-model="editableResident.birthdate" required>
        </div>
        <div class="form-group">
          <label for="purok">Zone</label>
          <input type="text" id="purok" v-model="editableResident.purok" required>
        </div>
        <div class="form-group">
          <label for="address">Specific Address</label>
          <input type="text" id="address" v-model="editableResident.address">
        </div>
        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
  /* These styles can be the same as the AddResidentModal for consistency */
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
