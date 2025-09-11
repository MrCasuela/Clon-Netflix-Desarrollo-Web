
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuth } from '../stores/useAuth'

const Home = () => import('../views/HomeView.vue')
const Search = () => import('../views/SearchView.vue')
const Detail = () => import('../views/DetailView.vue')
const Watchlist = () => import('../views/WatchlistView.vue')
const Login = () => import('../views/LoginView.vue')
const Register = () => import('../views/RegisterView.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes: RouteRecordRaw[] = [
  // Rutas públicas
  { 
    path: '/login', 
    name: 'login', 
    component: Login,
    meta: { requiresGuest: true }
  },
  { 
    path: '/register', 
    name: 'register', 
    component: Register,
    meta: { requiresGuest: true }
  },
  
  // Rutas protegidas
  { 
    path: '/', 
    name: 'home', 
    component: Home,
    meta: { requiresAuth: true }
  },
  { 
    path: '/search', 
    name: 'search', 
    component: Search,
    meta: { requiresAuth: true }
  },
  { 
    path: '/movie/:id', 
    name: 'detail', 
    component: Detail, 
    props: true,
    meta: { requiresAuth: true }
  },
  { 
    path: '/watchlist', 
    name: 'watchlist', 
    component: Watchlist,
    meta: { requiresAuth: true }
  },
  
  // 404
  { 
    path: '/:pathMatch(.*)*', 
    name: '404', 
    component: NotFound 
  }
]

const router = createRouter({ 
  history: createWebHistory(), 
  routes, 
  scrollBehavior() { return { top: 0 } } 
})

// Middleware de autenticación
router.beforeEach((to, from, next) => {
  const auth = useAuth()
  
  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'login' })
    return
  }
  
  // Si la ruta es solo para invitados (login/register) pero el usuario ya está autenticado
  if (to.meta.requiresGuest && auth.isAuthenticated) {
    next({ name: 'home' })
    return
  }
  
  next()
})

export default router
