import { RouteRecordRaw } from 'vue-router';

export interface UserState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  userInfo: {
    username: string;
    avatar: string;
  }
}
