import Cookies from 'js-cookie'

const cart = () => import('views/MB/pages/cart/Cart')
const category = () => import('views/MB/pages/category/Category')
const home = () => import('views/MB/pages/home/Home')
const profile = () => import('views/MB/pages/profile/Profile')
const login = () => import('views/MB/pages/login/Login')
const reg = () => import('views/MB/pages/register/Reg')
const detail = () => import('views/MB/pages/detail/GoodsDetail')

const mbRouter = [
  {
    path: '',
    redirect: 'home',
  },
  {
    path: 'home',
    component: home,
    beforeEnter: (to, from, next) => {
      document.title = '首页'
      next()
    },
  },
  {
    path: 'cart',
    component: cart,
    beforeEnter(to, from, next) {
      document.title = '购物车'
      // 登录拦截
      if (Cookies.get('isLogin') === undefined) {
        next('/MB/login')
      } else {
        next()
      }
    },
  },
  {
    path: 'category',
    component: category,
    beforeEnter: (to, from, next) => {
      document.title = '分类'
      next()
    },
  },
  {
    path: 'profile',
    component: profile,
    beforeEnter: (to, from, next) => {
      document.title = '我的'
      next()
    },
  },
  {
    path: 'login',
    component: login,
    beforeEnter: (to, from, next) => {
      document.title = '登录/注册'
      next()
    },
    meta: {
      TabbarShow: false, // 不需要显示 底部导航
    },
  },
  {
    path: 'reg',
    component: reg,
    beforeEnter: (to, from, next) => {
      document.title = '登录/注册'
      next()
    },
    meta: {
      TabbarShow: false, // 不需要显示 底部导航
    },
  },
  {
    path: 'detail/:id',
    name: 'detail',
    component: detail,
    meta: {
      TabbarShow: false, // 不需要显示 底部导航
    },
  },
]

export default mbRouter
