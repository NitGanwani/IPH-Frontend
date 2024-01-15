import { Group } from './group';

export type Terminal = {
  id: string;
  name: string;
  battery: number;
  wifi: 'low' | 'medium' | 'high';
  isConnected: 'yes' | 'no';
  group: Group;
};
