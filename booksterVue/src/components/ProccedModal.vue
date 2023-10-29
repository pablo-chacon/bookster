/**
* Deletion modal pop-up component.
*/

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modalTitle: {
      type: String,
      required: true
    },
    modalMessage: {
      type: String,
      required: true
    }
  },
  methods: {
    proceed(): void {
      this.$emit('proceed')
    },
    cancel(): void {
      this.$emit('cancel')
    }
  }
})
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h3>{{ modalTitle }}</h3>
      <p>{{ modalMessage }}</p>
      <div class="modal-buttons">
        <button @click="proceed">Proceed</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  max-width: 400px;
  border-radius: 4px;
}

h2 {
  margin-top: 0;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.modal-actions button {
  margin-left: 10px;
}

.modal-cancel {
  background-color: #ccc;
}

.modal-proceed {
  background-color: #f44336;
  color: #fff;
}
</style>
