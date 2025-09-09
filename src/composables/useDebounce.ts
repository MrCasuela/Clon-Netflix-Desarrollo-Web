
import { ref, watch, type Ref } from 'vue'
export function useDebounce<T>(source: Ref<T>, delay=400){
  const debounced = ref<T>(source.value) as Ref<T>
  let t:number|undefined
  watch(source, (v)=>{
    window.clearTimeout(t)
    t = window.setTimeout(()=> (debounced.value = v), delay)
  })
  return debounced
}
