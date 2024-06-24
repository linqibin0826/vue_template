import { RouteRecordRaw } from 'vue-router';

export interface UserState {
  token: string;
  menuRoutes: RouteRecordRaw[];
  userInfo: {
    username: string;
    avatar: string;
  }
}
