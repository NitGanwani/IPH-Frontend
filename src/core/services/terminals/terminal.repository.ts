import { Terminal } from '../../../features/models/terminal';

export type ApiResponse = {
  items: Terminal[];
};

export class TerminalRepository {
  constructor(public url: string) {
    this.url += '/terminals';
  }

  async getAll(): Promise<ApiResponse> {
    const response = await fetch(this.url);
    if (!response.ok) {
      const message = `Error: ${response.status}. ${response.statusText}`;
      throw new Error(message);
    }

    const answer = (await response.json()) as ApiResponse;
    return answer;
  }
}
