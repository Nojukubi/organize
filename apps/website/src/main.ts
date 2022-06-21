import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

const app = createApp(App);

app.use(
  createRouter({
    history: createWebHistory(),
    routes: [
      { name: 'home', path: '/', component: import('./views/HomeView.vue') },
      { name: 'goal', path: '/goal', component: import('./views/GoalView.vue') }
    ]
  })
);

app.mount('#app');
