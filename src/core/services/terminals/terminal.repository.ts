import { Terminal } from '../../../features/models/terminal';

export class TerminalRepository {
  constructor(public url: string) {
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
}
