import type { Component } from 'vue';
import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router';

// Routes are definitions (objects) comprised from at least
// a path and a component. The path refers to the part of the
// URL that determines a unique view that should be displayed,
// and component refers to the Vue component that needs to be
// associated with a path.
// https://router.vuejs.org/api/#routerecordraw
const goalRoute: RouteRecordRaw = {
  name: 'goal',
  path: '/goal',
  component: (): Promise<Component> => import('./GoalView.vue')
};

// Create the user-level route location that can be passed to
// router.push(), redirect, and returned in Navigation Guards.
// https://router.vuejs.org/api/#routelocationraw
function goalLocation(): RouteLocationRaw {
  return { name: goalRoute.name as string };
}

// Exports the raw route and location to the goal view.
export { goalRoute, goalLocation };
