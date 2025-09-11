import { defineStore } from 'pinia'

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  users: User[] // Simular base de datos local
}

const USERS_KEY = 'cuenab_users'
const CURRENT_USER_KEY = 'cuenab_current_user'

function loadUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadCurrentUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null')
  } catch {
    return null
  }
}

function saveCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    user: loadCurrentUser(),
    isAuthenticated: !!loadCurrentUser(),
    users: loadUsers()
  }),

  actions: {
    async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
      const user = this.users.find(u => u.email === email)
      
      if (!user) {
        return { success: false, message: 'Usuario no encontrado' }
      }
      
      // En una app real, aquí verificarías el password hasheado
      // Por simplicidad, usamos email como validación
      this.user = user
      this.isAuthenticated = true
      saveCurrentUser(user)
      
      return { success: true, message: 'Sesión iniciada correctamente' }
    },

    async register(email: string, password: string, name: string): Promise<{ success: boolean; message: string }> {
      // Verificar si el email ya existe
      if (this.users.find(u => u.email === email)) {
        return { success: false, message: 'El email ya está registrado' }
      }

      // Validaciones básicas
      if (!email.includes('@')) {
        return { success: false, message: 'Email inválido' }
      }

      if (password.length < 6) {
        return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' }
      }

      if (name.trim().length < 2) {
        return { success: false, message: 'El nombre debe tener al menos 2 caracteres' }
      }

      // Crear nuevo usuario
      const newUser: User = {
        id: Date.now().toString(),
        email: email.toLowerCase().trim(),
        name: name.trim(),
        createdAt: new Date().toISOString()
      }

      this.users.push(newUser)
      saveUsers(this.users)

      // Auto login después del registro
      this.user = newUser
      this.isAuthenticated = true
      saveCurrentUser(newUser)

      return { success: true, message: 'Cuenta creada exitosamente' }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      saveCurrentUser(null)
    },

    // Middleware para verificar autenticación
    requireAuth(): boolean {
      return this.isAuthenticated
    }
  }
})
