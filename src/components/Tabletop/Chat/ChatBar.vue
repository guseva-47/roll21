<template>
  <!-- Контент Note бара -->
  <div class="row m-0">
    <!-- Список сообщений -->
    <div class="scroll-bar p-0">
      <div v-for="(mes, i) in allMessages" :key="i" :ref="`mesIndex-${i}`">
        <OneMessage :index="i" :message="mes" />
      </div>
    </div>

    <div class="flex">
      <DiceButton :formula="'d20'" :title="'d20'" :onClick="roll" />
      <DiceButton :formula="'d12'" :title="'d12'" :onClick="roll" />
      <DiceButton :formula="'d8'" :title="'d8'" :onClick="roll" />
      <DiceButton :formula="'d6'" :title="'d6'" :onClick="roll" />
      <DiceButton :formula="'d4'" :title="'d4'" :onClick="roll" />
    </div>
    <!-- Поле вводда нового сообщения -->
    <div class="footer2 p-0">
      <div class="d-flex align-items-center p-0">
        <div class="flex-fill">
          <input
            @keyup.enter="sendMessage"
            class="form-control"
            v-bind:class="{ 'is-invalid': !isNormalLength }"
            placeholder=""
            v-model="newMessage.text"
          />
        </div>
        <div class="flex">
          <button
            class="col-form-label btn btn-outline-warning px-0"
            @click="sendMessage"
          >
            <i class="bi bi-arrow-return-left"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IMessage } from '@/components/types/types.interfaces';
import { defineComponent } from 'vue';
import authService from '@/services/auth.service';
import messageService from '@/services/message.service';
import DiceButton from './DiceButton.vue';
import OneMessage from './OneMessage.vue';

declare const io: any;

export default defineComponent({
  name: 'ChatBar',
  components: { DiceButton, OneMessage },
  data() {
    return {
      allMessages: [] as IMessage[],
      tableId: '',
      newMessage: {
        _id: '',
        text: '',
        author: '',
        date: new Date(),
      } as IMessage,
      socket: {} as any,
      maxMessageLegth: 400,
    };
  },
  async created() {
    this.tableId = this.$route.params.idTable as string;
    await this.getAllMessages();

    console.log('Starting connection to WebSocket Server');
    this.socket = io('http://localhost:3000');

    this.socket.on('message', ({ data }: any) => {
      // console.log('answer Server');
      // console.log(data);
      this.allMessages.push(data);
    });

    this.socket.on('roll', ({ data }: any) => {
      // console.log('answer Server');
      // console.log(data);
      this.allMessages.push(data);
    });
  },
  updated() {
    this.scrollToElement();
  },
  computed: {
    isNormalLength(): boolean {
      return this.newMessage.text.length < this.maxMessageLegth;
    },
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
      if (!this.isNormalLength)
        this.newMessage.text = this.newMessage.text.slice(
          0,
          this.maxMessageLegth,
        );

      if (this.isFormula(this.newMessage.text)) {
        this.emitFormula(this.newMessage);
      } else {
        this.emitMessage(this.newMessage, idUser);
      }

      this.newMessage.text = '';
    },

    isFormula(messageText: string) {
      return messageText.slice(0, 5) == '/roll' ? true : false;
    },

    emitFormula(mes: IMessage) {
      mes.text = mes.text.slice(6);
      console.log('formula message ', mes);
      this.socket.emit('roll', { data: mes });
    },

    emitMessage(mes: IMessage, idUser: string) {
      mes._id = '-1';
      mes.author = idUser;
      mes.date = new Date();
      mes.tabletop = this.tableId;

      console.log('this.newMessage');
      console.log(mes);

      this.socket.emit('message', { data: mes });
    },

    async roll(formula: string) {
      const idUser = await authService.getAuthorizedUserId();
      if (idUser == null) return;

      const message: IMessage = {
        _id: '-1',
        text: '/roll ' + formula,
        author: idUser,
        tabletop: this.tableId,
        date: new Date(),
      };

      this.emitFormula(message);
    },

    scrollToElement() {
      const el = this.$refs[`mesIndex-${this.allMessages.length - 1}`];
      console.log('el', el);
      if (el) {
        // @ts-ignore
        el.scrollIntoView();
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.scroll-bar {
  overflow: auto;
  height: 80%;
  height: 60vh;
}
</style>
