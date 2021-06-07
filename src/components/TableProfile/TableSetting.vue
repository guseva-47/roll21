<template>
  <div class="row mb-3 pad">
    <!-- <label for="system" class="col-auto col-form-label">
      Игровая система:
    </label>
    <div class="col-auto">
      <select id="system" class="form-select btn-secondary ff" v-model="system">
        <option v-for="item in ['1', '2']" :key="item" class="btn-secondary">
          {{ item }}
        </option>
      </select>
    </div> -->
    <button class="btn btn-outline-darksalmon col-auto me-2" @click="$emit('editModOn')">
      Изменить описание
    </button>
    <button class="btn btn-outline-danger col-auto" @click="$emit('deleteTable')">
      Удалить игру
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ITableData } from '../types/types.interfaces';

export default defineComponent({
  name: 'TableSetting',
  props: { table: { type: Object as PropType<ITableData>, required: true } },
  emits: {
    deleteTable: null,
    editModOn: null
  },
  data() {
    return {};
  },
  async created() {
  },
  methods: {
  },
});
</script>

<style lang="scss" scoped>

.btn-outline-darksalmon {
  color: #bf8685;
  border-color: #bf8685;
}
.btn-outline-darksalmon:hover {
  border-color: #bf8685;
  background-color: #bf8685;
  color: white;
}
</style>