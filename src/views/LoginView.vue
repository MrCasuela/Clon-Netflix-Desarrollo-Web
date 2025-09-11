<template>
  <div class="min-h-screen bg-black flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-red-600 mb-2">🎬 CUENAB</h1>
        <p class="text-gray-400">Inicia sesión en tu cuenta</p>
      </div>

      <!-- Formulario de Login -->
      <div class="bg-gray-900 rounded-lg p-8 shadow-2xl border border-gray-800">
        <form @submit.prevent="handleLogin">
          <div class="space-y-6">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="tu@email.com"
              />
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="••••••••"
              />
            </div>

            <!-- Error Message -->
            <div v-if="error" class="p-3 bg-red-900/50 border border-red-500 rounded-md">
              <p class="text-red-200 text-sm">{{ error }}</p>
            </div>

            <!-- Success Message -->
            <div v-if="success" class="p-3 bg-green-900/50 border border-green-500 rounded-md">
              <p class="text-green-200 text-sm">{{ success }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 px-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-semibold rounded-md transition-colors duration-200"
            >
              {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
            </button>
          </div>
        </form>

        <!-- Link to Register -->
        <div class="mt-6 text-center">
          <p class="text-gray-400">
            ¿No tienes cuenta?
            <RouterLink
              :to="{ name: 'register' }"
              class="text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              Regístrate aquí
            </RouterLink>
          </p>
        </div>
      </div>

      <!-- Demo Users Info -->
      <div class="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
        <h3 class="text-sm font-semibold text-gray-300 mb-2">Para pruebas:</h3>
        <p class="text-xs text-gray-500">
          Puedes crear una cuenta nueva o usar cualquier email registrado anteriormente
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useAuth } from '../stores/useAuth'

const router = useRouter()
const auth = useAuth()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const success = ref('')

async function handleLogin() {
  if (loading.value) return

  error.value = ''
  success.value = ''
  loading.value = true

  try {
    const result = await auth.login(form.value.email, form.value.password)
    
    if (result.success) {
      success.value = result.message
      setTimeout(() => {
        router.push({ name: 'home' })
      }, 1000)
    } else {
      error.value = result.message
    }
  } catch (err) {
    error.value = 'Error inesperado. Intenta nuevamente.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>
