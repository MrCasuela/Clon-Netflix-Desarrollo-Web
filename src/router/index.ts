
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const Home = () => import('../views/HomeView.vue')
const Search = () => import('../views/SearchView.vue')
const Detail = () => import('../views/DetailView.vue')
const Watchlist = () => import('../views/WatchlistView.vue')
const NotFound = () => import('../views/NotFound.vue')

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/search', name: 'search', component: Search },
  { path: '/movie/:id', name: 'detail', component: Detail, props: true },
  { path: '/watchlist', name: 'watchlist', component: Watchlist },
  { path: '/:pathMatch(.*)*', name: '404', component: NotFound }
]

export default createRouter({ history: createWebHistory(), routes, scrollBehavior(){return {top:0}} })
