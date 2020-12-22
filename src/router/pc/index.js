import Cookies from 'js-cookie';

const detail = () => import('PC/Pages/Detail');
const index = () => import('PC/Pages/Index');
const Login = () => import('PC/Pages/Login');
const cart = () => import('PC/Pages/Cart');
const pay = () => import('PC/Pages/Pay');
const SearchResult = () => import('PC/Pages/SearchResult');

const pcRouter = [
  {
    path: '',
    redirect: 'index',
  },
  {
    path: 'index',
    component: index,
  },
  {
    path: 'detail/:id',
    component: detail,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    name: 'pcSearch',
    path: 'search',
    component: SearchResult,
  },
  {
    path: 'cart',
    component: cart,
    beforeEnter(to, from, next) {
      // console.log(Cookies.get('isLogin'));
      if (Cookies.get('isLogin') === undefined) {
        next('/PC/login?isLogin=true');
      } else {
        next();
      }
    },
  },
  {
    name: 'pay',
    path: 'pay',
    component: pay,
    beforeEnter(to, from, next) {
      // console.log(Cookies.get('isLogin'));
      if (Cookies.get('isLogin') === undefined) {
        next('/PC/login?isLogin=true');
      } else {
        next();
      }
    },
  },
];

export default pcRouter;
