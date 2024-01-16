import { User } from '../../../features/models/user';
import { LoginResponse } from '../../../features/types/login.response';

export class UserRepository {
  constructor(public url: string) {}

  async login(item: Partial<User>): Promise<LoginResponse> {
    const response = await fetch(this.url + 'users/login', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error in login process');
    return response.json();
  }

  async loginWithToken(token: string): Promise<LoginResponse> {
    const url = this.url + 'users/login';
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }

  async register(item: Partial<User>): Promise<User> {
    const response = await fetch(this.url + 'users/register', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json() as Promise<User>;
  }
}
