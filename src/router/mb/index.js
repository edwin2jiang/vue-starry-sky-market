const cart = () => import('views/MB/cart/Cart');
const category = () => import('views/MB/category/Category');
const home = () => import('views/MB/home/Home');
const profile = () => import('views/MB/profile/Profile');

const mbRouter = [
  {
    path: '',
    redirect: 'home',
  },
  {
    path: 'home',
    component: home,
    beforeEnter: (to, from, next) => {
      document.title = '首页';
      next();
    },
  },
  {
    path: 'cart',
    component: cart,
    beforeEnter: (to, from, next) => {
      document.title = '购物车';
      next();
    },
  },
  {
    path: 'category',
    component: category,
    beforeEnter: (to, from, next) => {
      document.title = '分类';
      next();
    },
  },
  {
    path: 'profile',
    component: profile,
    beforeEnter: (to, from, next) => {
      document.title = '我的';
      next();
    },
  },
];

export default mbRouter;
