import Vue from "vue";
import VueRouter from "vue-router";
import AdminLayout from "./src/Layout";

import { asyncRoutes, fixRoutes, layout } from "./src/router";

function createRouter() {
  const router = new VueRouter({
    base: layout.controlable ? layout.controlPath : undefined,
    mode: "history",
    routes: [
      {
        path: layout.controlPath,
        component: AdminLayout,
        children: asyncRoutes,
      },

      ...fixRoutes,
    ],
  });

  return router;
}

export const router = createRouter(); // 提前抛出router

class LaxApp {
  static init(el, component) {
    Vue.use(() => {
      Vue.prototype.$toggleScreen = (key) => {
        let dom = document.getElementById(key);
        if (dom.style.position == "fixed") {
          dom.style.position = "relative";
          dom.style.zIndex = 1;
        } else {
          dom.style.position = "fixed";
          dom.style.top = 0;
          dom.style.left = 0;
          dom.style.zIndex = 999;
        }
      };
    });

    Vue.use(VueRouter);

    new Vue({
      el,
      router,
      render: (h) => h(component),
    });
  }
}

export default LaxApp;
