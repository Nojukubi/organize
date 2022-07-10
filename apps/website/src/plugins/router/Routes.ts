import { goalLocation, goalRoute } from '../../views/goal/GoalRoute';
import { habitLocation, habitRoute } from '../../views/habit/HabitRoute';
import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [habitRoute, goalRoute];
export const locations = { habitLocation, goalLocation };
