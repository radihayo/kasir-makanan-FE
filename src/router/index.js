import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import MenuView from '../views/MenuView.vue'
import DashboardView from '../views/DashboardView.vue'
import ListFoodView from '../views/ListFoodView.vue'
import ListEmployeeView from '../views/ListEmployeeView.vue'
import SettingView from '../views/SettingView.vue'
import TransactionViiew from '../views/TransactionView.vue'
import DetailEmployeeContent from '../components/employee/DetailEmployeeContent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/listfood',
      name: 'listfood',
      component: ListFoodView
    },    
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionViiew
    },
    {
      path: '/listemployee',
      name: 'listemployee',
      component: ListEmployeeView
    },
    {
      path: '/listemployee/:id',
      name: 'listemployeedetail',
      component: DetailEmployeeContent
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView
    }
  ]
})

export default router
