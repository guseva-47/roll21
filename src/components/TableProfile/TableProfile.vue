<template>
  <div class="py-2">
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

      <!-- Table.AboutInfo -->
      <div>
        <!-- Table.AboutInfo в случае если запись создается. 
          Отличается тем, что нет возможности выйти из режима редактирования
        -->
        <editable-view
          v-if="isCreateMode"
          v-model:htmlContent="editedTable.aboutInfo"
          :readonly="false"
          @onEdit="readonly = false"
        />
        <!-- Table.AboutInfo в случае если запись просматривается или редактируется. 
          Текст может переходить в режим редактирования, если кликнуть по тексту
        -->
        <editable-view
          v-else
          v-model:htmlContent="editedTable.aboutInfo"
          :readonly="!isEditMode"
          @onEdit="isEditMode = true"
        />
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
    <div v-if="isOwner">
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
        <TableSetting :table="table" @deleteTable="deleteTable" @editModOn="editModOn" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import rfdc from 'rfdc';

import { ITableData } from '../types/types.interfaces';
import TabletopService from '../../services/tabletop.service';
import tabletopService from '../../services/tabletop.service';
import authService from '@/services/auth.service';
import EditableView from '../utils/EditableView.vue';
import TableSetting from './TableSetting.vue';

const clone = rfdc();

export default defineComponent({
  name: 'TableProfile',
  components: { EditableView, TableSetting },
  data() {
    return {
      isOpenAccordion: true,
      isCreateMode: false,
      isEditMode: false,

      table: { name: 'name', aboutInfo: 'aboutInfo' } as ITableData,
      editedTable: {} as ITableData,
      userId: '',
    };
  },
  async created() {
    const tableId = this.$route.params.idTable;
    this.isCreateMode = tableId == '-1';
    if (this.isCreateMode)
      this.table = { name: 'NEW', aboutInfo: 'NEW ab ou tI nfo' };
    else {
      console.log('tableId = ', tableId);
      // получить от сервера
      try {
        this.table = await tabletopService.getTabletop(tableId as string);
      } catch (err) {
        console.log('Error get table:', err);
        this.$router.push({ name: 'Login' });
      }
    }

    this.editedTable = clone(this.table);

    const id = await authService.getAuthorizedUserId();
    this.userId = id == null ? '' : id;
  },
  computed: {
    isEmptyName(): boolean {
      return this.editedTable.name.length <= 0;
    },
    isOwner(): boolean {
      if (typeof this.table.owner == 'undefined') return false;
      return this.userId == this.table.owner;
    },
    isOnlyGamer(): boolean {
      const players = this.table.players ?? [];
      const user = players.find(item => item.user == this.userId);
      return typeof user !== 'undefined';
    },
  },
  methods: {
    async editModOn() {
      const userId = await authService.getAuthorizedUserId();
      if (userId == null) return;
      if (userId != this.table.owner) return;
      this.isEditMode = true;
    },
    editModOff() {
      this.isEditMode = false;
      this.isCreateMode = false;
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
        console.log('Error save table:', err);
        this.$router.push({ name: 'Login' });
      }
    },

    async deleteTable() {
      try {
        if (typeof this.table._id == 'undefined')
          throw new Error('Tabletop id is undefined');

        await TabletopService.deleteTabletop(this.table._id);
      } catch (err) {
        console.log('Error delete table:', err);
        this.$router.push({ name: 'Login' });
      }

      const id = await authService.getAuthorizedUserId();
      if (id == null) this.$router.push({ name: 'Login' });
      // @ts-ignore
      this.$router.push({ name: 'ProfId', params: { id: id } });
    },

    async saveNew() {
      try {
        this.table = await TabletopService.postTabletop(this.editedTable);
        console.log(this.table);
        if (typeof this.table._id == 'undefined')
          throw new Error('Id of new table == undefined');
        this.editedTable = clone(this.table);

        this.editModOff();

        this.$router.push({
          name: 'TableProfId',
          params: { idTable: this.table._id },
        });
      } catch (err) {
        console.log('Error create table:', err);
        this.$router.push({ name: 'Login' });
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
