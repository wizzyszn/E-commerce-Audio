import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ListProduct from '@/views/ListProduct.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { hideNavbar: true }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta : {hideNavbar : true}
    },
    {
      path: '/product/:id',
      name: 'product detail',
      component: ProductDetail
    },
    {
      path: '/create',
      name: 'list product',
      component: ListProduct
    },
  ]
})

export default router
