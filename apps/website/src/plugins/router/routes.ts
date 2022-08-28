import { goalLocation, goalRoute } from '#/views/goal/GoalRoute';
import { habitLocation, habitRoute } from '#/views/habit/HabitRoute';
import type { RouteRecordRaw } from 'vue-router';

const homeRoute: RouteRecordRaw = {
  name: 'home',
  path: '/',
  redirect: {
    name: habitRoute.name
  }
};

export const routes: RouteRecordRaw[] = [homeRoute, habitRoute, goalRoute];
export const locations = { habitLocation, goalLocation };
