import detail from 'PC/Pages/Detail'
import index from 'PC/Pages/Index'
import Login from 'PC/Pages/Login'
import cart from 'PC/Pages/Cart'
import pay from 'PC/Pages/Pay'
import Cookies from 'js-cookie'

const pcRouter = [{
  path: '',
  redirect: 'index'
}, {
  path: 'index',
  component: index
}, {
  path: 'detail/:id',
  component: detail
}, {
  path: 'login',
  component: Login
}, {
  path: 'cart',
  component: cart,
  beforeEnter(to, from, next) {
    // console.log(Cookies.get('isLogin'));
    if (Cookies.get('isLogin') === undefined) {
      next('/PC/login?isLogin=true');
    } else {
      next();
    }
  }
}, {
  name:'pay',
  path: 'pay',
  component: pay,
  beforeEnter(to, from, next) {
    // console.log(Cookies.get('isLogin'));
    if (Cookies.get('isLogin') === undefined) {
      next('/PC/login?isLogin=true');
    } else {
      next();
    }
  }
}];

export default pcRouter;
