<template>
  <div class="row m-0">
    <div class="person-block row">
      <div class="col-auto">
        <img
          class="img-fluid rounded mb-3 mb-md-0 avatar"
          src="http://placehold.it/60x60"
          alt=""
        />
      </div>
      <div class="col">
        <p>{{userName}}</p>
      </div>
      <button
        v-if="!isMyProfie && !isSubscriber"
        @click="follow"
        class="btn btn-outline-success btn-lg p-1 my-2"
      >
        Подписаться
      </button>
      <button
        v-if="!isMyProfie && isSubscriber"
        @click="unfollow"
        class="btn btn-outline-secondary btn-lg p-1 my-2"
      >
        Отписаться
      </button>
    </div>

    <!-- Подписчики -->
    <div class="person-block row g-0">
      <p class="p-1 m-0">Подписчики ({{ subscribers.length }})</p>
      <div
        v-for="(user, i) in subscribers"
        :key="i"
        class="col-lg-12 col-md-4 col-6"
      >
        <FrendRowBar :user="user" />
      </div>
      <p v-if="subscribers.length < 1" class="p-1 m-0">Подписчиков пока нет</p>
    </div>

    <!-- Подписки -->
    <div class="person-block row g-0">
      <p class="p-1 m-0">Подписки ({{ subscriptions.length }})</p>
      <div
        v-for="(user, i) in subscriptions"
        :key="i"
        class="col-lg-12 col-md-4 col-6"
      >
        <FrendRowBar :user="user" />
      </div>
      <p v-if="subscriptions.length < 1" class="p-1 m-0">Подписок пока нет</p>
    </div>

    <!-- Зявки -->
    <div v-if="applicationCount > 0" class="person-block row g-0">
      <p class="p-1 m-0">Запросы ({{ applicationCount }})</p>
      <div v-if="applicationsToMe.length > 0">
        <p class="p-1 m-0">Ко мне ({{ applicationsToMe.length }})</p>
        <div
          v-for="(user, i) in subscriptions"
          :key="i"
          class="col-lg-12 col-md-4 col-6"
        >
          <FrendRowBar :user="user" />
        </div>
      </div>
      <div v-if="applicationsFromMe.length > 0">
        <p class="p-1 m-0">От меня ({{ applicationsFromMe.length }})</p>
        <div
          v-for="(user, i) in subscriptions"
          :key="i"
          class="col-lg-12 col-md-4 col-6"
        >
          <FrendRowBar :user="user" />
        </div>
      </div>
    </div>

    <!-- Выйти -->
    <button
        v-if="isMyProfie"
        @click="logout"
        class="btn btn-outline-secondary btn-lg p-1 my-2"
      >
        Выйти
      </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IUser } from '../types/types.interfaces';
import UserService from '../../services/user.service';
import FrendRowBar from './FrendRowBar.vue';
import authService from '@/services/auth.service';

export default defineComponent({
  name: 'RightBar',
  components: {
    FrendRowBar,
  },
  data() {
    return {
      profile: {} as IUser,
      userIdPage: '' as string | null,
      authUserId: '' as string | null,
    };
  },
  computed: {
    isMyProfie(): boolean {
      return this.userIdPage == this.authUserId;
    },
    subscribers(): string[] {
      return this.profile.subscribers ?? [];
    },
    subscriptions(): string[] {
      return this.profile.subscriptions ?? [];
    },
    applicationsFromMe(): string[] {
      return this.profile.subscrReqsFromMe ?? [];
    },
    applicationsToMe(): string[] {
      return this.profile.subscrReqsToMe ?? [];
    },
    applicationCount(): number {
      return this.applicationsFromMe.length + this.applicationsToMe.length;
    },
    isSubscriber(): boolean {
      console.log('this.subscribers', this.subscribers)
      return this.subscribers.includes(this.authUserId as string)
    },
    userName(): string {
      return this.userIdPage?.slice(-4) ?? ''
    }
  },
  async created() {
    try {
      this.authUserId = await authService.getAuthorizedUserId();
      if (this.authUserId == null) throw new Error('User id undefined');

      this.userIdPage = this.$route.params.id as string;

      this.profile = await this.getProfile(this.userIdPage);
      console.log('this.profile');
      console.log(this.profile);
    } catch (err) {
      console.log('Error ', err);
    }
  },
  methods: {
    async getProfile(userIdPage: string) {
      return UserService.getProfile(userIdPage);
    },
    async follow() {
      this.userIdPage = this.$route.params.id as string;
      await UserService.follow(this.userIdPage);
      this.profile = await this.getProfile(this.userIdPage);
    },
    async unfollow() {
      this.userIdPage = this.$route.params.id as string;
      await UserService.unfollow(this.userIdPage);
      this.profile = await this.getProfile(this.userIdPage);
    },
    async logout() {
      authService.logout();
      window.location.reload();
      this.$router.push({ name: 'Main' });
    },
  },
});
</script>

<style lang="scss" scoped>
.person-block {
  margin-top: 10px;
  padding: 5px;
  margin-left: 0;
  margin-right: 0;
  border-radius: 5px;
  background-color: #464646;
}
.icon {
  width: 60px;
  height: 60px;
  background: #cccccc;
  border-radius: 50%;
  margin: 5px;
}

.avatar {
  max-height: 40px;
}
</style>
