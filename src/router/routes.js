// import MSite from '../pages/MSite/MSite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'

//路由组件懒加载（首屏）
//返回promise
//开始不执行，第一次请求才执行
const MSite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')


import Login from '../pages/Login/Login.vue'

import Shop from '../pages/Shop/Shop'
import Goods from '../pages/Shop/Goods/Goods'
import Ratings from '../pages/Shop/Ratings/Ratings'
import Info from '../pages/Shop/Info/Info'

import UserInfo from '../pages/Login/UserInfo/UserInfo'


export default [
  //meta是route的属性
    {
      path: '/msite',
      component: MSite,
      meta: {
        isShowFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        isShowFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        isShowFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        isShowFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/userinfo',
      component: UserInfo
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path: '/shop/goods',
          component: Goods
        },
        {
          path: '/shop/ratings',
          component: Ratings
        },
        {
          path: '/shop/info',
          component: Info
        },
        {
          path: '/shop',
          redirect:'/shop/goods',
        }
      ]
    },
    {
      path:'/',
      redirect:'/msite',
      meta: {
        isShowFooter: true
      }
    }
  ]


