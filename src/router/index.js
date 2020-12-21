import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/components/404';
Vue.use(Router);

// 手机端
const MB = () => import('@/views/MB/mb');
import mbRouter from './mb/index';

// 电脑端
const PC = () => import('@/views/PC/pc');
import pcRouter from './pc/index';

const routes = [
  {
    path: '/',
    beforeEnter(to, from, next) {
      let path;
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        console.log('-----这里是移动端-----');
        path = '/MB';
      } else {
        console.log('-----这里是电脑端-----');
        path = '/PC';
      }
      next(path);
    },
  },
  {
    path: '/MB',
    component: MB,
    children: mbRouter,
  },
  {
    path: '/PC',
    component: PC,
    children: pcRouter,
  },
  {
    path: '/404',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
];

// 消除跳转同一个页面报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new Router({
  routes,
});

//路由跳转后，页面回到顶部
router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

export default router;
