// React의 BrowserRouter와 유사한 역할을 합니다.
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

// 1. 라우트(경로)들을 정의합니다.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

// 2. 라우터 인스턴스를 생성합니다.
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Vue 앱에 라우터를 설치하려면, 실제 앱의 엔트리 파일에서 app.use(router)를 호출해야 합니다.
export default router;