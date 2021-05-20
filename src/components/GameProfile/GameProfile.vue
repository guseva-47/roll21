<template>
  <div>
    <!-- TODO по клику на текст, текст преврщается из обычного блока в текст эреа.
      должны появляться кнопка отмены и сохранения.
      после потери фокусировки
    -->
    <div class="">
      <img
        class="img-fluid rounded mx-auto d-block"
        src="http://placehold.it/1400x300"
        alt="Иллюстрация"
        style="max-height: 250px;"
      />
    </div>
    <div class="">
      <h2>
        <textarea
          class="text-center h2 w-100 form-control-plaintext"
          id="gameName"
          v-bind:rows="1"
        >
          Зимняя роскошь
        </textarea>
      </h2>
      <div class="" id="gameDescription">
        <p>
          В этом году Праздник Макушки зимы проходит в прекрасном Морском районе
          Глубоководья. Там проходит шумная ярмарка и специальный при­ём на
          ВИЛЛЕ КАССАЛАНТЕРОВ, которую семьяКассалантеров любезно открыла для
          публики навремя праздников.
        </p>
        <p>
          Приятная атмосфера была испорчена, когда на оперную певицу­аасимара
          АРИЮ КАВАТИНУ на­ пал маленький изверг, который, похоже, появился из
          ниоткуда. Городская стража закрывает меропри­ятие, удерживая гостей на
          вилле для допроса, пока виновный не будет установлен.
        </p>
      </div>
      <!-- TODO количество строк -->
      <!-- <textarea class="w-100 form-control-plaintext" 
                id="gameDescription" 
                rows="7"
      >
        Суп солянка классическая отлично пойдет на второй-третий день праздника — когда народ  захочет чего-либо горяченького вместо поднадоевших салатов. Чувствуете в себе силы выполнить это пожелание? Тогда вперед! Кстати, приготовление солянки поможет вам реализовать остатки мясной нарезки, которая выглядит не лучшим образом и вряд ли будет съедена в чистом виде.
      </textarea> -->
    </div>
    <h3 class="h3 row accordion-btn">
      <div
        class="btn btn-outline-secondary d-flex justify-content-between"
        v-bind:class="{ 'btn-secondary': f }"
        @click="f = !f"
      >
        Настройки
        <i v-if="!f" class="bi bi-chevron-down"></i>
        <i v-else class="bi bi-chevron-up"></i>
      </div>
    </h3>
    <div class="accordion-body" v-if="f">
      <div class="row mb-3 pad">
        <label for="system" class="col-auto col-form-label">
          Игровая система:
        </label>
        <div class="col-auto">
          <select
            id="system"
            class="form-select btn-secondary ff"
            v-model="system"
          >
            <option
              v-for="item in ['1', '2']"
              :key="item"
              class="btn-secondary"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RightBar",
  data() {
    return {
      f: true,
      system: "" as string,
    };
  },
});
</script>

<style lang="scss" scoped>
#gameName,
#gameDescription {
  color: white;
}
.btn-secondary {
  color: white;
}
.accordion-btn {
  margin: 0;
}
.ff {
  background-color: rgba(0, 0, 0, 0);
  color: white;
}

.accordion-body {
  background-color: #46464657;
  margin: 0;
}
</style>
