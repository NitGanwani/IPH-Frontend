import { Terminal } from '../../../features/models/terminal';

export class TerminalRepository {
  constructor(public url: string, public token: string) {
    this.url += 'terminals';
  }

  async getAll(): Promise<Terminal[]> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }
    const answer = await response.json();
    return answer;
  }

  async create(newTerminal: FormData): Promise<Terminal> {
    const groupId = newTerminal.get('group');

    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify({
        ...Object.fromEntries(newTerminal),
        group: groupId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async update(id: Terminal['id'], item: FormData): Promise<Terminal> {
    const response = await fetch(this.url + id, {
      method: 'PATCH',
      body: item,
      headers: { Authorization: 'Bearer ' + this.token },
    });
    const updatedFilm = await response.json();

    return updatedFilm as Terminal;
  }
}
