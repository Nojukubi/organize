import { createRouter, createWebHistory } from 'vue-router';
import { routes, locations } from './Routes';

export const router = createRouter({
  history: createWebHistory(),
  routes
});

export function useLocations() {
  return { locations };
}
