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
        <button
          class="col-form-label btn btn-outline-warning px-0"
          @click="sendMessage"
        >
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
import messageService from '@/services/message.service';

declare const io: any;

export default defineComponent({
  name: 'ChatBar',
  components: {},
  data() {
    return {
      allMessages: [] as IMessage[],
      tableId: '',
      newMessage: {} as IMessage,
      socket: {} as any,
    };
  },
  async created() {
    this.tableId = this.$route.params.idTable as string;
    await this.getAllMessages();

    console.log('Starting connection to WebSocket Server');
    this.socket = io('http://localhost:3000');
    // @ts-ignore
    this.socket.on('message', ({ data }) => {
      // console.log('answer Server');
      // console.log(data);
      this.allMessages.push(data);
    });

    // this.connection.onmessage = function(event) {
    //   console.log(event);
    // };

    // this.connection.onopen = function(event) {
    //   console.log(event);
    //   console.log('Successfully connected to the echo websocket server...');
    // };
  },
  methods: {
    async getAllMessages() {
      try {
        this.allMessages = await messageService.getMessagesOnTable(
          this.tableId,
        );
      } catch (err) {
        console.log(err);
      }
    },

    async sendMessage() {
      const idUser = await authService.getAuthorizedUserId();
      if (idUser == null) return;

      this.newMessage._id = '-1';
      this.newMessage.author = idUser;
      this.newMessage.date = new Date();
      this.newMessage.tabletop = this.tableId;

      console.log('this.newMessage');
      console.log(this.newMessage);

      this.socket.emit('message', { data: this.newMessage });
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
