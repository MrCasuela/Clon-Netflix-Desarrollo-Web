
<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Navegación principal (solo si está autenticado) -->
    <nav v-if="auth.isAuthenticated" class="bg-black border-b border-red-600 shadow-lg">
      <div class="container flex items-center justify-between py-4">
        <RouterLink :to="{name:'home'}" class="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors">
          🎬 CUENAB
        </RouterLink>
        <div class="flex items-center gap-6">
          <div class="flex gap-6">
            <RouterLink 
              :to="{name:'home'}" 
              class="text-white hover:text-red-500 transition-colors font-medium"
              active-class="text-red-500"
            >
              Inicio
            </RouterLink>
            <RouterLink 
              :to="{name:'search'}" 
              class="text-white hover:text-red-500 transition-colors font-medium"
              active-class="text-red-500"
            >
              Buscar
            </RouterLink>
            <RouterLink 
              :to="{name:'watchlist'}" 
              class="text-white hover:text-red-500 transition-colors font-medium"
              active-class="text-red-500"
            >
              Mi Lista
            </RouterLink>
          </div>
          
          <!-- Menú de usuario -->
          <div class="relative">
            <button 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
            >
              <div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                {{ auth.user?.name.charAt(0).toUpperCase() }}
              </div>
              <span class="font-medium">{{ auth.user?.name }}</span>
            </button>
            
            <!-- Dropdown del usuario -->
            <div 
              v-if="showUserMenu" 
              class="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg border border-gray-800 z-50"
            >
              <div class="py-2">
                <div class="px-4 py-2 text-sm text-gray-400 border-b border-gray-800">
                  {{ auth.user?.email }}
                </div>
                <button 
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Contenido principal -->
    <router-view />
    
    <!-- Overlay para cerrar dropdown -->
    <div 
      v-if="showUserMenu" 
      @click="showUserMenu = false"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from './stores/useAuth'

const router = useRouter()
const auth = useAuth()
const showUserMenu = ref(false)

function handleLogout() {
  auth.logout()
  showUserMenu.value = false
  router.push({ name: 'login' })
}

// Cerrar dropdown al hacer click fuera
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
