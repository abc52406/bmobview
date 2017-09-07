import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';
import store from './store'
import Menus from './pages/menus'
import App from './pages/App.html'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './dll/dll.js'
import './dll/bmob-min.js'
import './dll/dll.css'
Vue.use(VueRouter)
Vue.use(VueResource);
Vue.use(MintUI);
 
const router = new VueRouter({
    routes: Menus.paths
})
const app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.nextTick(function () {
})
