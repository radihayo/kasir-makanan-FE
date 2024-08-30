import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import AboutView from '../views/AboutView.vue'
import MenuView from '../views/MenuView.vue'
import DashboardView from '../views/DashboardView.vue'
import ListFoodView from '../views/ListFoodView.vue'
import ListEmployeeView from '../views/ListEmployeeView.vue'
import SettingView from '../views/SettingView.vue'
import TransactionViiew from '../views/TransactionView.vue'
import OrderView from '../views/OrderView.vue'
import Error404 from '../views/Error404.vue'
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        allUser:true
      },
      component: DashboardView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        allUser:true
      },
      component: AboutView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        allUser:true
      },
      component: DashboardView
    },
    {
      path: '/menu',
      name: 'menu',
      meta: {
        onlyUser:true
      },
      component: MenuView
    },
    {
      path: '/listfood',
      name: 'listfood',
      meta: {
        onlyAdmin:true
      },
      component: ListFoodView
    },    
    {
      path: '/transaction',
      name: 'transaction',
      meta: {
        onlyAdmin:true
      },
      component: TransactionViiew
    },
    {
      path: '/listemployee',
      name: 'listemployee',
      meta:{
        onlyAdmin:true
      },
      component: ListEmployeeView
    },
    {
      path: '/setting',
      name: 'setting',
      meta: {
        onlyUser:true
      },
      component: SettingView
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      meta: {
        onlyUser:true
      },
      component: OrderView
    },
    {
      path: '/error404',
      name: 'error404',
      component: Error404
    }
  ]
})

router.beforeEach((to,from)=>{
  if((to.meta.allUser || to.meta.onlyAdmin || to.meta.onlyUser) && !Cookies.get('token') ){
    return {name:'login'};
  };

  if((to.meta.allUser == false || to.meta.onlyAdmin == false || to.meta.onlyUser == false)  && Cookies.get('token') ){
    return {name:'dashboard'};
  };

  if(to.meta.onlyAdmin && localStorage.getItem('userLoginLevel')!=='admin'){
    return {name:'error404'}
  };

  if(to.meta.onlyUser && localStorage.getItem('userLoginLevel')!=='user'){
    return {name:'error404'}
  };

});

export default router
