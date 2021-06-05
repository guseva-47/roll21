import api from '@/backend-api';
import { IMessage } from '@/components/types/types.interfaces';
import authService from './auth.service';

class MessageService {
  async getMessagesOnTable(tableId: string): Promise<IMessage[]> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let messages: IMessage[] = [];
    await api
      .get('message/tabletop/' + tableId, {
        headers: authHeader,
      })
      .then(res => {
        messages = res.data;
      })
      .catch(err => {
        console.log(err);
        throw new Error("Can't get all messages from table.");
      });

    return messages;
  }

  async deleteMessage(idMessage: string): Promise<IMessage> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let message = {} as IMessage;
    await api
      .delete('message/' + idMessage, {
        headers: authHeader,
      })
      .then(res => {
        message = res.data;
      })
      .catch(err => {
        console.log(err);
        throw new Error("Can't delete note.");
      });

    return message;
  }
}

export default new MessageService();
