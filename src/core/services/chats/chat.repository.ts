import { Chat } from '../../../features/models/chat';

export class ChatRepository {
  constructor(public url: string) {
    this.url += 'chats';
  }

  async getAll(): Promise<Chat[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
    const answer = await response.json();
    return answer;
  }
}
