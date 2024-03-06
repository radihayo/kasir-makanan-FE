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
import Error404 from '../views/Error404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
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
        allUser:true
      },
      component: MenuView
    },
    {
      path: '/listfood',
      name: 'listfood',
      meta: {
        allUser:true
      },
      component: ListFoodView
    },    
    {
      path: '/transaction',
      name: 'transaction',
      meta: {
        allUser:true
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
        allUser:true
      },
      component: SettingView
    },
    {
      path: '/error404',
      name: 'error404',
      component: Error404
    }
  ]
})

router.beforeEach((to,from)=>{
  if(to.meta.allUser && !localStorage.getItem('token') || to.meta.onlyAdmin && !localStorage.getItem('token')){
    return {name:'login'}
  }

  if(to.meta.allUser == false && localStorage.getItem('token') || to.meta.allUser == false && localStorage.getItem('token')){
    return {name:'dashboard'}
  }

  if(to.meta.onlyAdmin == false && localStorage.getItem('token')){
    return {name:'error404'}
  }
});

export default router
