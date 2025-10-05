<script setup>
import { ref } from 'vue';

// This component accepts a `show` prop to control its visibility.
defineProps({
  show: Boolean
});

// It emits events to the parent component to close itself or to add data.
const emit = defineEmits(['close', 'add']);

// Reactive state for the form inputs.
const newOfficial = ref({
  name: '',
  position: '',
  termStart: new Date().toISOString().split('T')[0] // Defaults to today
});

const handleSubmit = () => {
  // Basic validation
  if (newOfficial.value.name && newOfficial.value.position) {
    emit('add', { ...newOfficial.value });
    // Reset form for next time
    newOfficial.value = { name: '', position: '', termStart: new Date().toISOString().split('T')[0] };
    emit('close');
  } else {
    alert('Please fill out all fields.');
  }
};
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <h3>Add New Official</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" v-model="newOfficial.name" placeholder="e.g., Juan Dela Cruz" required>
        </div>
        <div class="form-group">
          <label for="position">Position</label>
          <input type="text" id="position" v-model="newOfficial.position" placeholder="e.g., Punong Barangay" required>
        </div>
        <div class="form-group">
          <label for="termStart">Term Start Date</label>
          <input type="date" id="termStart" v-model="newOfficial.termStart" required>
        </div>
        <div class="form-actions">
          <button type="button" class="btn-secondary" @click="emit('close')">Cancel</button>
          <button type="submit" class="btn-primary">Add Official</button>
        </div>
      </form>
    </div >
  </div >
</template >

 <style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
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
  font-family: 'Poppins', sans-serif;
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
