<template>
  <div class="min-h-screen bg-black flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-red-600 mb-2">🎬 CUENAB</h1>
        <p class="text-gray-400">Crea tu cuenta</p>
      </div>

      <!-- Formulario de Registro -->
      <div class="bg-gray-900 rounded-lg p-8 shadow-2xl border border-gray-800">
        <form @submit.prevent="handleRegister">
          <div class="space-y-6">
            <!-- Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                Nombre completo
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Tu nombre completo"
              />
            </div>

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
                minlength="6"
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="Confirma tu contraseña"
              />
            </div>

            <!-- Terms -->
            <div class="flex items-start">
              <input
                id="terms"
                v-model="form.acceptTerms"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 text-red-600 bg-gray-800 border-gray-600 rounded focus:ring-red-500"
              />
              <label for="terms" class="ml-2 text-sm text-gray-400">
                Acepto los términos y condiciones de CUENAB
              </label>
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
              {{ loading ? 'Creando cuenta...' : 'Crear Cuenta' }}
            </button>
          </div>
        </form>

        <!-- Link to Login -->
        <div class="mt-6 text-center">
          <p class="text-gray-400">
            ¿Ya tienes cuenta?
            <RouterLink
              :to="{ name: 'login' }"
              class="text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              Inicia sesión
            </RouterLink>
          </p>
        </div>
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
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const loading = ref(false)
const error = ref('')
const success = ref('')

async function handleRegister() {
  if (loading.value) return

  error.value = ''
  success.value = ''

  // Validaciones del cliente
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  if (!form.value.acceptTerms) {
    error.value = 'Debes aceptar los términos y condiciones'
    return
  }

  loading.value = true

  try {
    const result = await auth.register(
      form.value.email, 
      form.value.password, 
      form.value.name
    )
    
    if (result.success) {
      success.value = result.message
      setTimeout(() => {
        router.push({ name: 'home' })
      }, 1500)
    } else {
      error.value = result.message
    }
  } catch (err) {
    error.value = 'Error inesperado. Intenta nuevamente.'
    console.error('Register error:', err)
  } finally {
    loading.value = false
  }
}
</script>
