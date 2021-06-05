<template>
  <!-- Контент Note бара -->
  <div class="row m-0">
    <!-- Список сообщений -->
    <div v-for="(mes, i) in allMessages" :key="i" class="mes p-1 text-truncate">
      {{ mes.text }}
    </div>
    
    <!-- Строка сообщения -->
    <div class="d-flex bd-highlight align-items-center p-0">
      <div class="flex-fill bd-highlight">
        <input
          @keyup.enter="sendMessage"
          class="form-control"
          placeholder=""
          v-model="newMessage.text"
        />
      </div>
      <div class="flex bd-highlight">
        <button class="col-form-label btn btn-outline-warning px-0">
          <i class="bi bi-arrow-return-left"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// TODO bag :  когда удаляешь несколько дублированных записок из списка, появляется ошибка сервера 404
// при добавлении большого количества записей срколл не появляется
import { IMessage } from '@/components/types/types.interfaces';
import { defineComponent } from 'vue';
import authService from '@/services/auth.service';

export default defineComponent({
  name: 'ChatBar',
  components: {},
  data() {
    return {
      allMessages: [] as IMessage[],
      tableId: '',
      newMessage: {} as IMessage,
    };
  },
  async created() {
    this.tableId = this.$route.params.idTable as string;
    await this.getAllMessages();
  },
  methods: {
    async getAllMessages() {
      try {
        this.allMessages = [
          {
            text: 'hello 11111',
            authorId: '60b008da17d44b26648cc97f',
            date: new Date(2021, 6, 5, 15, 15),
          },
          {
            text: 'hello 2222',
            authorId: '60b008da17d44b26648cc97f',
            date: new Date(2021, 6, 5, 15, 20),
          },
        ];
      } catch (err) {
        console.log(err);
      }
    },

    async sendMessage() {
      const idUser = await authService.getAuthorizedUserId();
      if (idUser == null) return;

      this.newMessage.authorId = idUser;
      this.newMessage.date = new Date();

      console.log('отправка сообщения на сервер');
    },
  },
});
</script>

<style lang="scss" scoped>
.mes {
  // cursor: pointer;
  color: #ffffff;
  border-color: #2a4747;
}
.mes:hover {
  border-color: #2a4747;
  background-color: #2a4747;
  color: white;
}
</style>
