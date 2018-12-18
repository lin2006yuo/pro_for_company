import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/stylus/reset.stylus";
// elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/stylus/elementUI.styl";

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
