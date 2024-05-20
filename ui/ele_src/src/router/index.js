import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/init",
    component: () => import("@/views/login/init"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "rachel",
    name: "rachel",
    meta: { title: "开始", icon: "el-icon-menu" },
    children: [
      {
        path: "rachel",
        name: "rachel_well",
        component: () => import("@/views/well"),
        meta: { title: "欢迎使用", icon: "el-icon-eleme" },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "日志监测", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/logs",
    component: Layout,
    redirect: "/logs/all",
    name: "logs",
    meta: { title: "日志", icon: "el-icon-s-help" },
    children: [
      {
        path: "all",
        name: "all",
        component: () => import("@/views/logs/index"),
        meta: { title: "所有日志", icon: "el-icon-view" },
      },
      {
        path: "web",
        name: "web",
        component: () => import("@/views/logs/index"),
        meta: { title: "WEB日志", icon: "el-icon-view" },
      },
      {
        path: "attack",
        name: "attack",
        component: () => import("@/views/logs/index"),
        meta: { title: "攻击日志", icon: "el-icon-view" },
      },
      {
        path: "flag",
        name: "flag",
        component: () => import("@/views/logs/index"),
        meta: { title: "FLAG日志", icon: "el-icon-view" },
      },
      {
        path: "flag_eye_to_eye",
        name: "flag_eye_to_eye",
        component: () => import("@/views/logs/index"),
        meta: { title: "FLAG监测", icon: "el-icon-view" },
      },
    ],
  },
  {
    path: "/safe",
    component: Layout,
    redirect: "/safe/rce",
    meta: { title: "防护", icon: "el-icon-success" },
    children: [
      {
        path: "rce",
        name: "rce",
        component: () => import("@/views/settings/index"),
        meta: { title: "RCE防护", icon: "el-icon-check" },
      },
      {
        path: "header",
        name: "header",
        component: () => import("@/views/settings/index"),
        meta: { title: "HEADER防护", icon: "el-icon-check" },
      },
      {
        path: "sql",
        name: "sql",
        component: () => import("@/views/settings/index"),
        meta: { title: "SQL注入防护", icon: "el-icon-check" },
      },
      {
        path: "upload",
        name: "upload",
        component: () => import("@/views/settings/index"),
        meta: { title: "上传检测", icon: "el-icon-check" },
      },
      {
        path: "char",
        name: "char",
        component: () => import("@/views/settings/index"),
        meta: { title: "特殊字符", icon: "el-icon-check" },
      },
      {
        path: "whitelist",
        name: "whitelist",
        component: () => import("@/views/settings/index"),
        meta: { title: "白名单", icon: "el-icon-check" },
      },

      {
        path: "blacklist",
        name: "blacklist",
        component: () => import("@/views/settings/index"),
        meta: { title: "黑名单", icon: "el-icon-check" },
      },
      {
        path: "ddos",
        name: "ddos",
        component: () => import("@/views/settings/index"),
        meta: { title: "DDOS防护", icon: "el-icon-check" },
      },
    ],
  },
  {
    path: "/settings",
    component: Layout,
    redirect: "/settings/base",
    meta: { title: "配置", icon: "el-icon-setting" },
    children: [
      {
        path: "base",
        name: "base",
        component: () => import("@/views/settings/index"),
        meta: { title: "基础配置", icon: "el-icon-check" },
      },
      {
        path: "manage",
        name: "manage",
        component: () => import("@/views/settings/index"),
        meta: { title: "管理配置", icon: "el-icon-check" },
      },
      {
        path: "log",
        name: "log",
        component: () => import("@/views/settings/index"),
        meta: { title: "日志配置", icon: "el-icon-check" },
      },
      {
        path: "flag",
        name: "set-flag",
        component: () => import("@/views/settings/index"),
        meta: { title: "FLAG检测", icon: "el-icon-check" },
      },
      {
        path: "remote",
        name: "remote",
        component: () => import("@/views/settings/index"),
        meta: { title: "远端检测", icon: "el-icon-check" },
      },
      {
        path: "other",
        name: "other",
        component: () => import("@/views/settings/index"),
        meta: { title: "其它配置", icon: "el-icon-more" },
      },
    ],
  },
  {
    path: "/notice",
    component: Layout,
    redirect: "/notice/notice_ding",
    meta: { title: "通知", icon: "el-icon-chat-dot-round" },
    children: [
      {
        path: "notice_ding",
        name: "ding_ding",
        component: () => import("@/views/settings/index"),
        meta: { title: "钉钉通知", icon: "el-icon-s-promotion" },
      },
      {
        path: "notice_api",
        name: "notice_api",
        component: () => import("@/views/settings/index"),
        meta: { title: "接口通知", icon: "el-icon-chat-line-round" },
      },
      {
        path: "notice_browser",
        name: "notice_browser",
        component: () => import("@/views/settings/index"),
        meta: { title: "浏览器通知", icon: "el-icon-chat-square" },
      },
    ],
  },
  {
    path: "/version",
    name: "version",
    redirect: "/version/upgrade",
    component: Layout,
    meta: { title: "版本", icon: "el-icon-sold-out" },
    children:[
      {
        path: "upgrade",
        name: "upgrade",
        component: () => import("@/views/settings/index"),
        meta: { title: "配置", icon: "el-icon-check" },
      },
      {
        path: "service",
        name: "service",
        component: () => import("@/views/version/service"),
        meta: { title: "服务", icon: "el-icon-check" },
      },
    ]
  },
  {
    path: "/user",
    name: "user",
    component: Layout,
    meta: { title: "帐户", icon: "el-icon-user-solid" },
    redirect: "/user/setting",
    children: [
      {
        path: "setting",
        name: "user-settings",
        component: Layout,
        component: () => import("@/views/settings/user"),
        meta: { title: "帐户修改", icon: "el-icon-edit" },
      },
      {
        path: "online",
        name: "online",
        component: () => import("@/views/users/online"),
        meta: { title: "在线帐户", icon: "el-icon-sunny" },
      },
      {
        path: "list",
        name: "list",
        component: () => import("@/views/users/list"),
        meta: { title: "帐户列表", icon: "el-icon-user" },
      },
      {
        path: "roles",
        name: "roles",
        component: () => import("@/views/roles/list"),
        meta: { title: "角色列表", icon: "el-icon-s-custom" },
      },
      {
        path: "add",
        name: "add",
        component: () => import("@/views/users/add"),
        hidden: true,
        meta: { title: "添加帐户", icon: "el-icon-user" },
      },
      {
        path: "edit",
        name: "edit",
        component: () => import("@/views/users/add"),
        hidden: true,
        meta: { title: "编辑帐户", icon: "el-icon-user" },
      },
      {
        path: "roles/add",
        name: "roles_add",
        component: () => import("@/views/roles/add"),
        hidden: true,
        meta: { title: "添加角色", icon: "el-icon-user" },
      },
      {
        path: "roles/edit",
        name: "roles_edit",
        component: () => import("@/views/roles/add"),
        hidden: true,
        meta: { title: "编辑角色", icon: "el-icon-user" },
      },
      {
        path: "api/list",
        name: "api_list",
        component: () => import("@/views/api/index"),
        meta: { title: "接口列表", icon: "el-icon-link" },
      },
    ],
  },
 
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
