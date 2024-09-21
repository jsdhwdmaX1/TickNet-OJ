import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/plugins/axios";
import "bytemd/dist/index.css";

// 权限管理
// import "@/access";

// 全局引入element-plus组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 注册全局组件：按钮
import MyButton from "./components/MyButton.vue";

// 引入scss的基本样式
import "@/assets/common.scss"

const app = createApp(App);
app.component('MyButton', MyButton);
app.use(ArcoVue).use(store).use(router).use(ElementPlus);
app.mount("#app");
