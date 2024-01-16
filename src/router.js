import { createRouter, createWebHistory } from 'vue-router';
import SignIn from './components/SignIn.vue';
import UserManagement from './components/UserManagement.vue';

const routes = [
  { path: '/signin', component: SignIn },
  { path: '/users', component: UserManagement },
  { path: '/', redirect: '/signin' }, // Redirect to /signin by default
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
