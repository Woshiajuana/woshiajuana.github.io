import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import ReturnTop from './assets/lib/ReturnTop';
import './assets/lib/flexible.js'
/**使用vux的插件提示功能*/
import  { ToastPlugin } from 'vux'
import  { LoadingPlugin } from 'vux'
import PopupNews from './assets/lib/PopupNews';
Vue.use(PopupNews);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(ReturnTop);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
