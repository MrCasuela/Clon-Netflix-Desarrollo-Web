
import { defineStore } from 'pinia'
export interface WLItem { id:number; title:string; poster_path:string|null }
const KEY = 'vueflix_watchlist'

function load(): WLItem[] {
  try { return JSON.parse(localStorage.getItem(KEY)||'[]') } catch { return [] }
}

export const useUser = defineStore('user',{
  state:()=>({ watchlist: load() as WLItem[] }),
  actions:{
    toggle(movie: WLItem){
      const exists = this.watchlist.find(m=>m.id===movie.id)
      this.watchlist = exists ? this.watchlist.filter(m=>m.id!==movie.id) : [...this.watchlist, movie]
      localStorage.setItem(KEY, JSON.stringify(this.watchlist))
    }
  }
})
