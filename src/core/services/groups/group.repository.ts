import { Group } from '../../../features/models/group';

export class GroupRepository {
  constructor(public url: string) {
    this.url += 'groups';
  }

  async getAll(): Promise<Group[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
    const answer = await response.json();
    return answer;
  }
}
