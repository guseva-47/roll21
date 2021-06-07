<template>
  <div class="row m-0">
    <div class="col-xxl-3 col-xl-3 col-lg-2 col-1"></div>
    <div class="row p-3 col-xxl-6 col-xl-6 col-lg-8 col-10 wrapper-form">
      <h3 class="px-2">Параметры новой сцены</h3>
      <!-- Строка с названием сцены -->
      <div class="d-flex align-items-center p-2">
        <div class="flex">
          <label class="col-form-label">
            Название сцены
          </label>
        </div>
        <div class="flex-fill ps-2">
          <input
            class="form-control"
            placeholder="Сцена 1"
            v-model="mapParams.title"
          />
        </div>
      </div>

      <!-- Строка с размерами поля -->
      <div class="d-flex align-items-center p-2">
        <div class="flex">
          <label class="col-form-label">
            Клеток по ширине
          </label>
        </div>
        <div class="flex-fill ps-2">
          <input
            class="form-control"
            placeholder="20"
            v-model="mapParams.widthCount"
          />
        </div>
        <label class="col-1 col-form-label ps-1">шт.</label>

        <div class="flex ps-2">
          <label class="col-form-label">
            по высоте
          </label>
        </div>
        <div class="flex-fill ps-2">
          <input
            class="form-control"
            placeholder="20"
            v-model="mapParams.heightCount"
          />
        </div>
        <label class="col-1 col-form-label p-1">шт.</label>
      </div>
      <!-- Кнопка Создать -->
      <div class="p-0 d-flex justify-content-end">
        <button
          class="btn btn-outline-light px-3"
          @click="createMap(mapParams)"
        >
          Создать
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { INewMapParam } from '@/components/types/types.interfaces';

export default defineComponent({
  name: 'NewSceneForm',
  props: ['createMap'],
  data() {
    return {
      mapParams: {
        title: '',
        widthCount: 40,
        heightCount: 30,
      } as INewMapParam,
    };
  },
});
</script>

<style scoped lang="scss">
.wrapper-form {
  min-height: 100%;
  background-color: #436d6e;
  border-radius: 5px;
  margin-top: 1rem;
}
</style>
