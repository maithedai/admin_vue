import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes";
import authHelper from "@/helpers/authorize.js";
import { GETTING_STARTED_ROUTER } from "@/enums/routerEnum.js";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  hash: false,
  routes: routes,
})

// router.beforeEach((to, from, next) => {
//   // nếu đã có token
//   if(authHelper.getToken()) {
//     next();
//   }
//   // nếu chưa có token
//   else {
//     // nếu đang cố vào trang quản trị thì chuyển hướng về home
//     const gettingStarted = GETTING_STARTED_ROUTER.find(ele => ele.name == to.name);
//     if(!gettingStarted) {
//       window.location.href = "/home";
//     }
//     else {
//       next();
//     }
//   }
  
// })

export default router;