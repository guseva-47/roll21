<template>
  <div class="modal col-6" tabindex="0" ref="frame">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="text-truncate">{{ title }}</h2>
        <!-- Кнопки сохранения, отмены и удаления записи -->
        <div class="d-grid gap-2 d-sm-flex justify-content-end my-2">
          <slot name="header-buttons"></slot>
          <button class="btn btn-outline-light" @click="onClose()">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  props: { title: String },
  emits: { close: null },
  setup(props, { emit }) {
    const onClose = () => emit('close');
    const frame = ref<HTMLElement>();

    // поставить фокус на модальное окно,
    // только если фокус не стоит на дочернем желементе
    onMounted(() => {
      if (frame.value && !frame.value.contains(document.activeElement)) {
        frame.value.focus();
      }
    });

    return { onClose, frame };
  },
});
</script>

<style scoped lang="scss">
/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: 15% auto;
  padding: 0;
  border: 1px solid #888;
  width: 60%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
}

.modal-header {
  padding: 2px 16px;
  background-color: #436d6e;
  color: white;
}

/* Modal Body */
.modal-body {
  padding: 2px 16px;
  color: black;
}

/* Modal Footer */
.modal-footer {
  padding: 2px 16px;
  background-color: #436d6e;
  color: white;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Add Animation */
@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
</style>
