import { createApp } from 'vue';
import { createPinia } from 'pinia'; // 1. Pinia 생성 함수를 가져옵니다.
import PiniaApp from './PiniaApp.vue';

// 2. Pinia 인스턴스를 생성합니다.
const pinia = createPinia();
const app = createApp(PiniaApp);

// 3. Vue 앱에 Pinia를 플러그인으로 등록(설치)합니다.
// 이 과정을 통해 모든 컴포넌트에서 스토어에 접근할 수 있게 됩니다.
app.use(pinia);

// 4. 앱을 마운트합니다.
app.mount('#app');