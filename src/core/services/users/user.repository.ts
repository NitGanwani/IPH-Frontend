import { User } from '../../../features/models/user';
import { LoginResponse } from '../../../features/types/login.response';

export class UserRepository {
  constructor(public url: string) {}

  async login(item: Partial<User>): Promise<LoginResponse> {
    const response = await fetch(this.url + 'users/login', {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error in login process');
    return response.json();
  }
}
