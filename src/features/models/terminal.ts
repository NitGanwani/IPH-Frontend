export type Terminal = {
  id: string;
  name: string;
  battery: number;
  wifi: 'low' | 'medium' | 'high';
  isConnected: boolean;
  group: string;
};
