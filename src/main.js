import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
// import store from './store'
import  store from './store/index'
import {Lazyload} from 'vant'
const app=createApp(App);
app.use(Vant);
app.use(Lazyload)
app.use(store).use(router).mount('#app')
