import page from "@/page.json";
import EmptyLayout from "./Empty";

const files = require.context("@/pages", true, /.vue$/);
let modules = {};
files.keys().forEach((key) => {
  modules[key.replace(/\.\//g, "/").replace(".vue", "")] = files(key).default;
});

function initMenus(menus, path) {
  let base = path ? "" : "/";
  menus = menus || page.menus;
  path = path || "";

  return menus.map((item) => {
    let route = {
      path: base + item.path,
      meta: {
        title: item.title,
        icon: item.icon,
      },
    };

    let url = path + "/" + item.path;
    route.name = transferName(url);
    if (item.children && item.children.length) {
      route.component = EmptyLayout;
      route.children = initMenus(item.children, url);
    } else {
      let component = modules[url] || modules[url + "/index"];
      route.component = component;
    }

    return route;
  });
}

function createFixRoutes() {
  const fixRoutes = page.pages.map((item) => {
    let path = "/" + item.path;

    let route = {
      path,
      name: item.path
        ? item.path.charAt(0).toUpperCase() + item.path.slice(1)
        : undefined,
      component: item.path
        ? modules[path]
          ? modules[path]
          : modules[path + "/index"]
        : undefined,
    };

    if (item.redirect) route.redirect = "/" + item.redirect;
    return route;
  });

  return fixRoutes;
}

function transferName(path) {
  const pathArr = path.split("/").filter((item) => !!item);

  let name = "";
  pathArr.forEach((item) => {
    name += item.charAt(0).toUpperCase() + item.slice(1);
  });

  return name;
}

export const asyncRoutes = initMenus();
export const fixRoutes = createFixRoutes();
export const layout = page.layout;
