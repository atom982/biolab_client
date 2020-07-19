import Vue from "vue";
import Router from "vue-router";
import menuModule from "vuex-store/modules/menu";
import lazyLoading from "./lazyLoading";
import { http } from "../../config/config.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    ...generateRoutesFromMenu(menuModule.state.items),
    {
      path: "*",
      redirect: { name: getDefaultRoute(menuModule.state.items).name }
    }
  ]
});

function generateRoutesFromMenu(menu = [], routes = []) {
  var login = {
    path: "/auth/login",
    component: lazyLoading("auth/login/Login"),
    meta: {
      default: false,
      title: "login",
      requiredAuth: false
    }
  };

  var dashboard = {
    path: "/dashboard",
    component: lazyLoading("dashboard/Dashboard"),
    meta: {
      default: false,
      title: "dashboard",
      requiredAuth: false
    }
  };

  var samples = {
    path: "/samples/:id",
    component: lazyLoading("02_samples/SamplesEntry"),
    props: true,
    meta: {
      title: "samples",
      requiredAuth: true
    }
  };

  var obrada = {
    path: "/obrada/rezultati/:patient/:id",
    component: lazyLoading("obrada/Obrada"),
    props: true,
    meta: {
      title: "obrada",
      requiredAuth: true
    }
  };

  var predracun = {
    path: "/obrada/predracun/:id",
    component: lazyLoading("obrada/predracun"),
    props: true,
    meta: {
      title: "predracun",
      requiredAuth: true
    }
  };

  // Kontrole

  var kontrole = {
    path: "/kontrole/obrada/rezultati",
    component: lazyLoading("kontrole/pregled/Obrada"),
    props: true,
    meta: {
      title: "obrada",
      requiredAuth: true
    }
  };

  var nalazi = {
    path: "/nalazi/pregled/:id",
    component: lazyLoading("nalazi/pregled/nalaz"),
    props: true,
    meta: {
      title: "nalaz",
      requiredAuth: true
    }
  };

  var outbox = {
    path: "/nalazi/outbox/:id",
    component: lazyLoading("nalazi/outbox/nalaz"),
    props: true,
    meta: {
      title: "outbox",
      requiredAuth: true
    }
  };

  var evaluation = {
    path: "/evaluation/:id",
    component: lazyLoading("evaluation/Charts"),
    props: true,
    meta: {
      title: "evaluation",
      requiredAuth: true
    }
  };

  var loger = {
    path: "/loger/statistika",
    component: lazyLoading("loger/pregled/pregled"),
    props: true,
    meta: {
      title: "loger",
      requiredAuth: true
    }
  };

  for (let i = 0, l = menu.length; i < l; i++) {
    let item = menu[i];
    if (item.path) {
      routes.push(item);
    }
    if (item.children) {
      generateRoutesFromMenu(item.children, routes);
    }
  }

  routes.push(login);
  routes.push(dashboard);
  routes.push(samples);
  routes.push(obrada);
  routes.push(kontrole);
  routes.push(predracun);
  routes.push(nalazi);
  routes.push(outbox);
  routes.push(evaluation);
  routes.push(loger);
  return routes;
}

function getDefaultRoute(menu = []) {
  let defaultRoute;

  menu.forEach(item => {
    if (item.meta.default) {
      defaultRoute = item;
    } else if (item.children) {
      let defaultChild = item.children.find(i => i.meta.default);
      defaultRoute = defaultChild || defaultRoute;
    }
  });

  return defaultRoute;
}

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    next();
  } else {
    if (to.path !== "/auth/login") {
      if (to.path.indexOf("acme-challenge") !== -1) {
        http.get(to.path, {}).then(res => {});
      } else {
        router.push("/auth/login");
      }
    } else {
      next();
    }
  }
});

export default router;
