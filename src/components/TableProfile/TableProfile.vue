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
      <!-- Table.Title -->
      <div>
        <textarea
          v-if="isEditMode || isCreateMode"
          class="text-center h2 w-100 form-control-plaintext"
          id="tableName"
          v-bind:rows="1"
          v-model="editedTable.name"
          ref="tableTitle"
        />
        <h2
          v-else
          class="text-center h2 w-100 form-control-plaintext"
          id="tableName"
          @click="editModOn"
        >
          {{ table.name }}
        </h2>
      </div>

      <!-- Table.Description -->
      <div>
        <Editor v-if="isEditMode || isCreateMode" />
        <div v-else class="" id="tableDescription" @click="editModOn">
          {{ table.aboutInfo }}
        </div>
      </div>

      <!-- Кнопки сохранения Изменений и отмены Изменений записи -->
      <div v-if="isEditMode && !isCreateMode">
        <!-- Кнопки сохранения, отмены и удаления записи -->
        <div class="d-grid gap-2 d-sm-flex justify-content-end my-2">
          <button class="btn btn-outline-secondary" @click="cancelEdit">
            Отменить изменения
          </button>
          <button
            class="btn btn-outline-success"
            type="submit"
            value="Submit"
            :disabled="isEmptyName"
            @click="saveEdit"
          >
            Сохранить
          </button>
        </div>
      </div>
      <!-- Кнопки сохранения, отмены Создания записи -->
      <div v-if="!isEditMode && isCreateMode">
        <!-- Кнопки сохранения, отмены и удаления записи -->
        <div class="d-grid gap-2 d-sm-flex justify-content-end my-2">
          <button class="btn btn-outline-secondary" @click="cancelCreate">
            Отменить
          </button>
          <button
            class="btn btn-outline-success"
            type="submit"
            value="Submit"
            :disabled="isEmptyName"
            @click="saveNew"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
    <h3 class="h3 row accordion-btn">
      <div
        class="btn btn-outline-secondary d-flex justify-content-between"
        v-bind:class="{ 'btn-secondary': isOpenAccordion }"
        @click="isOpenAccordion = !isOpenAccordion"
      >
        Настройки
        <i v-if="!isOpenAccordion" class="bi bi-chevron-down"></i>
        <i v-else class="bi bi-chevron-up"></i>
      </div>
    </h3>
    <div class="accordion-body" v-if="isOpenAccordion">
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
import rfdc from "rfdc";

import Editor from "../Tabletop/Editor/Editor.vue";
import { ITableData } from "../types/types.interfaces";
import TabletopService from "../../services/tabletop.service";
import tabletopService from "../../services/tabletop.service";
import authService from "@/services/auth.service";

const clone = rfdc();

export default defineComponent({
  name: "TableProfile",
  components: { Editor },
  data() {
    return {
      isOpenAccordion: false,
      isCreateMode: false,
      isEditMode: false,
      system: "" as string,
      table: { name: "name", aboutInfo: "aboutInfo" } as ITableData,
      editedTable: {} as ITableData,
    };
  },
  async created() {
    const tableId = this.$route.params.idTable;
    this.isCreateMode = tableId == "-1";
    if (this.isCreateMode)
      this.table = { name: "NEW", aboutInfo: "NEW ab ou tI nfo" };
    else {
      console.log('tableId = ', tableId)
      // получить от сервера
      // @ts-ignore
      this.table = await tabletopService.getTabletop(tableId);
      console.log('this.table = ', this.table)
      this.table.id = this.table._id;
    }

    this.editedTable = clone(this.table);
  },
  computed: {
    isEmptyName(): boolean {
      return this.editedTable.name.length <= 0;
    },
  },
  methods: {
    editModOn() {
      this.isEditMode = true;
      // console.log(this.$refs.tableTitle)
      // this.$refs.tableTitle.focus(); todo
    },
    editModOff() {
      this.isEditMode = false;
    },
    cancelEdit() {
      this.editModOff();
      this.editedTable = clone(this.table);
    },

    async saveEdit() {
      try {
        await TabletopService.putTabletop(this.editedTable);
        this.table = clone(this.editedTable);
        this.editModOff();
      } catch (err) {
        console.log("Error save table:", err);
        this.$router.push({ name: "Login" });
      }
    },

    async deleteTable() {
      try {
        if (typeof this.table.id == "undefined")
          if (typeof this.table._id == "undefined") throw new Error("Tabletop id is undefined");
          else this.table.id = this.table._id

        await TabletopService.deleteTabletop(this.table.id);
      } catch (err) {
        console.log("Error delete table:", err);
        this.$router.push({ name: "Login" });
      }

      const id = await authService.getAuthorizedUserId();
      if (id == null) this.$router.push({ name: "Login" });
      // @ts-ignore
      this.$router.push({ name: "ProfId", params: { id: id } });
    },

    async saveNew() {
      try {
        this.table = await TabletopService.postTabletop(this.editedTable);
        console.log(this.table);
        if (typeof this.table.id == 'undefined') throw new Error('Id of new table == undefined')
        this.editedTable = clone(this.table);

        this.editModOff();

        this.$router.push({
          name: "TableProfId",
          // @ts-ignore
          params: { idTable: this.table.id },
        });
      } catch (err) {
        console.log("Error create table:", err);
        this.$router.push({ name: "Login" });
      }
    },

    async cancelCreate() {
      this.$router.go(-1);
    },
  },
});
</script>

<style lang="scss" scoped>
#tableName,
#tableDescription {
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
