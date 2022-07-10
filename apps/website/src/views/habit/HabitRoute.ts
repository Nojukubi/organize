import type { Component } from 'vue';
import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router';

// Routes are definitions (objects) comprised from at least
// a path and a component. The path refers to the part of the
// URL that determines a unique view that should be displayed,
// and component refers to the Vue component that needs to be
// associated with a path.
// https://router.vuejs.org/api/#routerecordraw
const habitRoute: RouteRecordRaw = {
  name: 'habit',
  path: '/habit',
  alias: ['/'],
  components: {
    default: (): Promise<Component> => import('./HabitView.vue'),
    helper: (): Promise<Component> => import('./HabitDrawer.vue')
  }
};

// Create the user-level route location that can be passed to
// router.push(), redirect, and returned in Navigation Guards.
// https://router.vuejs.org/api/#routelocationraw
function habitLocation(): RouteLocationRaw {
  return { name: habitRoute.name as string };
}

// Exports the raw route and location to the habit view.
export { habitRoute, habitLocation };
