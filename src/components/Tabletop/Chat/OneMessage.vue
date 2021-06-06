<template>
  <div
    class="mes row m-0 px-1"
    v-bind:class="{ 'text-end': isMe, chaet: isChet, neChet: !isChet }"
  >
    <div class="p-0 m-0 text-break boild">
      <strong>{{ authorName }}</strong>
      
    </div>
    <div class="p-0 text-break">
      {{ message.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { IMessage } from '@/components/types/types.interfaces';
import authService from '@/services/auth.service';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    message: { type: Object as PropType<IMessage>, required: true },
    index: Number,
  },
  data() {
    return {
      userId: '',
    };
  },
  async created() {
    const id = await authService.getAuthorizedUserId();
    this.userId = id == null ? '' : id;
  },
  computed: {
    isMe(): boolean {
      return this.message.author == this.userId;
    },
    authorName(): string {
      if (this.isMe) return 'я';
      return this.message.author.slice(-4);
    },
    isChet(): boolean {
      if (typeof this.index == 'undefined') return true;
      return this.index % 2 == 0;
    },
  },
});
</script>

<style lang="scss" scoped>
.mes {
  color: #ffffff;
}
.mes:hover {
  border-color: #2a4747;
  background-color: #2a4747;
  color: white;
}
.chet {
  background-color: #315453;
}
.neChet {
  background-color: #396162;
}
</style>
