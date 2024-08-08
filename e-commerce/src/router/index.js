import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ListProduct from '@/views/ListProduct.vue'
import store from '@/store' // Import the store directly
import Cart from '@/views/Cart.vue'
import Profile from '@/views/Profile.vue'
import Error from '@/views/Error.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true } // Protected route
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
      component: ProductDetail,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/create',
      name: 'list product',
      component: ListProduct,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true } // Protected route
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'NotFound ',
      component: Error,
    },
  ]
})
//navigation guard
router.beforeEach((to,from,next) =>{
  console.log("to records:",to.matched);
  console.log("from records:",from.matched);
//check if next route (to) requires authorization
if(to.matched.some(record => record.meta.requiresAuth)){
  //check if current user is authenticated
  if(!store.getters.isAuthenticated){
    next({name : 'login'})
  }else{
    next()
  }
}else{
  next()
}
})
export default router
