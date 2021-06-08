import api from '@/backend-api';
import { IUser } from '@/components/types/types.interfaces';
import authService from './auth.service';

class UserService {
  async getProfile(userId: string): Promise<IUser> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let profile = {} as IUser;
    await api
      .get('/' + userId, { headers: authHeader })
      .then(res => {
        profile = res.data;
      })
      .catch(_ => {
        throw new Error('The table info update failed.');
      });
    return profile;
  }

  async follow(userId: string) {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    await api.post('/sub', {id: userId}, { headers: authHeader }).then(res => {
        console.log('Follow request', res.status)
      })
      .catch(_ => {
        throw new Error('Follow req failed.');
      });

  }

  async unfollow(userId: string) {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    await api.post('/unsub', {id: userId}, { headers: authHeader }).then(res => {
        console.log('Unfollow request', res.status)
      })
      .catch(_ => {
        throw new Error('Unfollow req failed.');
      });

  }
}

export default new UserService();
