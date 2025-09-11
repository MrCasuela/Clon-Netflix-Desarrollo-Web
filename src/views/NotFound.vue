<template>
  <div class='container py-20 text-center'>
    <div class="text-8xl mb-6">🎬</div>
    <h1 class="text-4xl font-bold text-white mb-4">404</h1>
    <p class="text-xl text-gray-400 mb-8">Página no encontrada</p>
    <RouterLink 
      :to="{name:'home'}" 
      class="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
    >
      Volver al inicio
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>