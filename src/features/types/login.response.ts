import { User } from '../models/user';

export type LoginResponse = {
  user: User;
  token: string;
};
