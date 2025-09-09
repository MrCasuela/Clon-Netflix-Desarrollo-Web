
<template>
  <div>
    <nav class="bg-gray-900 border-b border-gray-800">
      <div class="container flex items-center justify-between py-3">
        <RouterLink :to="{name:'home'}" class="font-semibold">🎬 VueFlix</RouterLink>
        <div class="flex gap-4">
          <RouterLink :to="{name:'home'}">Inicio</RouterLink>
          <RouterLink :to="{name:'search'}">Buscar</RouterLink>
          <RouterLink :to="{name:'watchlist'}">Watchlist</RouterLink>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
