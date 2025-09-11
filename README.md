
# 🎬 CUENAB - Clon de Netflix

**Plataforma de entretenimiento desarrollada con Vue 3 + TypeScript + TMDB API**

![Vue](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)

---

## 📋 **DESCRIPCIÓN DEL PROYECTO**

CUENAB es un clon completo de Netflix desarrollado como proyecto académico. Incluye funcionalidades como navegación de películas, búsqueda, sistema de watchlist personal y vistas detalladas de contenido.

### **🎯 Características Principales:**
- ✅ **Sistema de autenticación completo (Login/Registro)**
- ✅ **Navegación de películas trending y por género**
- ✅ **Sistema de búsqueda en tiempo real con debounce**
- ✅ **Vista detallada de películas con trailers de YouTube**
- ✅ **Watchlist personal con persistencia en localStorage**
- ✅ **Diseño responsive estilo Netflix (Negro, Rojo, Blanco)**
- ✅ **Integración completa con TMDB API**
- ✅ **TypeScript para desarrollo robusto**
- ✅ **Rutas protegidas con middleware de autenticación**

---

## 🚀 **INSTALACIÓN Y CONFIGURACIÓN**

### **1. Clonar el repositorio:**
```bash
git clone https://github.com/MrCasuela/Clon-Netflix-Desarrollo-Web.git
cd Clon-Netflix-Desarrollo-Web
```

### **2. Instalar dependencias:**
```bash
npm install
```

### **3. Configurar variables de entorno:**
Crea un archivo `.env` en la raíz del proyecto con:
```env
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_TOKEN=tu_api_key_de_tmdb
VITE_TMDB_IMG=https://image.tmdb.org/t/p/w500
```

### **4. Obtener API Key de TMDB:**
1. Regístrate en [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Ve a Configuración → API
3. Solicita una API Key
4. Copia la API Key en el archivo `.env`

### **5. Ejecutar en desarrollo:**
```bash
npm run dev
```

### **6. Build para producción:**
```bash
npm run build
```

---

## 🏗️ **ARQUITECTURA DEL PROYECTO**

```
src/
├── App.vue                 # Componente principal con navegación y auth
├── main.ts                 # Punto de entrada de la aplicación
├── env.d.ts               # Tipos de variables de entorno
├── assets/
│   └── main.css           # Estilos globales y utilidades Tailwind
├── components/
│   └── MovieCard.vue      # Componente de tarjeta de película
├── composables/
│   └── useDebounce.ts     # Hook para debounce en búsquedas
├── router/
│   └── index.ts           # Configuración de Vue Router con middleware auth
├── services/
│   ├── http.ts            # Cliente HTTP con Axios
│   ├── tmdb.ts            # Servicios de TMDB API con trailers
│   ├── tmdb-fetch.ts      # Servicio alternativo con fetch
│   └── tmdb-direct.ts     # Servicio directo para debugging
├── stores/
│   ├── useAuth.ts         # Store Pinia para autenticación
│   └── useUser.ts         # Store Pinia para watchlist
└── views/
    ├── HomeView.vue       # Página principal con películas trending
    ├── SearchView.vue     # Página de búsqueda
    ├── DetailView.vue     # Vista detallada con trailer
    ├── WatchlistView.vue  # Lista personal de películas
    ├── LoginView.vue      # Página de inicio de sesión
    ├── RegisterView.vue   # Página de registro de usuarios
    └── NotFound.vue       # Página 404
```

---

## 🎨 **DISEÑO Y ESTILO**

### **Paleta de Colores Netflix:**
- **🖤 Negro:** `#000000` - Fondo principal
- **🔴 Rojo Netflix:** `#dc2626`, `#e50914` - Acentos y botones
- **⚪ Blanco:** `#ffffff` - Texto principal
- **🔘 Grises:** `#1a1a1a`, `#374151` - Elementos secundarios

### **Componentes Estilizados:**
- **Navegación:** Header fijo con hover effects rojos
- **MovieCard:** Efectos hover con overlay estilo Netflix
- **Botones:** Gradientes y transiciones suaves
- **Formularios:** Bordes rojos en focus
- **Estados:** Spinners de carga y mensajes informativos

---

## 🛠️ **STACK TECNOLÓGICO**

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Vue.js** | ^3.4.29 | Framework principal |
| **TypeScript** | ^5.4.5 | Tipado estático |
| **Vue Router** | ^4.4.5 | Navegación SPA |
| **Pinia** | ^2.1.7 | Gestión de estado |
| **Axios** | ^1.11.0 | Cliente HTTP |
| **Tailwind CSS** | ^3.4.9 | Framework CSS |
| **Vite** | ^5.3.1 | Build tool |

---

## 📱 **FUNCIONALIDADES DETALLADAS**

### **🔐 Sistema de Autenticación**
- Registro de nuevos usuarios con validaciones
- Inicio de sesión con email y contraseña
- Persistencia de sesión en localStorage
- Rutas protegidas con middleware
- Menú de usuario con avatar personalizado
- Logout desde cualquier página

### **🏠 Página Principal (HomeView)**
- Muestra películas trending de la semana
- Filtro por géneros cinematográficos
- Paginación infinita con botón "Cargar más"
- Estados de carga y error
- Grid responsive

### **🔍 Búsqueda (SearchView)**
- Búsqueda en tiempo real con debounce (500ms)
- Resultados paginados
- Estados vacíos informativos
- Historial de búsquedas

### **📄 Detalles (DetailView)**
- Información completa de la película con backdrop heroico
- **Trailer de YouTube integrado con modal**
- Géneros, calificación, duración, cast
- Información técnica (presupuesto, idioma, fecha)
- Botón para agregar/quitar de watchlist
- Diseño cinematográfico tipo Netflix

### **📚 Mi Lista (WatchlistView)**
- Lista personalizada de películas guardadas
- Persistencia en localStorage
- Estado vacío con call-to-action
- Navegación rápida a detalles

---

## 🔧 **SERVICIOS Y API**

### **TMDB API Integration:**
```typescript
// Endpoints utilizados:
- /trending/movie/week          # Películas trending
- /genre/movie/list             # Lista de géneros  
- /discover/movie               # Películas por género
- /search/movie                 # Búsqueda de películas
- /movie/{id}                   # Detalles de película
- /movie/{id}/videos            # Trailers y videos de película
```

### **Manejo de Errores:**
- Interceptores HTTP para logging
- Fallbacks para imágenes rotas
- Estados de error informativos
- Retry automático en fallos de red

### **Performance:**
- Lazy loading de componentes
- Debounce en búsquedas
- Caché de imágenes
- Paginación optimizada

---

## 🎯 **CAMBIOS REALIZADOS EN EL DESARROLLO**

### **🔄 Nuevas Funcionalidades Agregadas:**

#### **🔐 Sistema de Autenticación Completo:**
- LoginView y RegisterView con formularios estilizados
- Store de autenticación con Pinia (`useAuth.ts`)
- Middleware de router para rutas protegidas
- Menú de usuario con avatar y dropdown
- Persistencia de sesión en localStorage
- Validaciones de email, contraseña y términos

#### **🎬 Trailers Integrados:**
- Modal de trailer con reproductor YouTube embedido
- Detección automática de trailers oficiales
- Botón "Ver Trailer" en vista de detalles
- Autoplay y controles de cierre del modal
- Fallback a teasers si no hay trailer oficial

#### **🎨 Mejoras de UI/UX:**
- Backdrop heroico en vista de detalles
- Información técnica completa (cast, presupuesto, idioma)
- Grid de información organizada
- Estados de autenticación en navegación
- Transiciones suaves entre páginas

---

## 🚦 **COMANDOS DISPONIBLES**

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Producción
npm run build        # Build para producción
npm run preview      # Preview del build

# Herramientas
npm run type-check   # Verificación de tipos
npm run lint         # Linting de código
```

---

## 📊 **ESTRUCTURA DE DATOS**

### **Movie Interface:**
```typescript
interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  genre_ids: number[]
  genres?: Genre[]
}
```

### **Genre Interface:**
```typescript
interface Genre {
  id: number
  name: string
}
```

### **TMDB Response:**
```typescript
interface TMDBResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
```

---

## 🔐 **VARIABLES DE ENTORNO**

```env
# TMDB API Configuration
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_TOKEN=your_tmdb_api_key_here
VITE_TMDB_IMG=https://image.tmdb.org/t/p/w500

# Development
VITE_APP_TITLE=CUENAB
```

---

## 🎭 **ESTADOS Y CASOS DE USO**

### **Estados de Carga:**
- ⏳ **Loading:** Spinner animado
- ✅ **Success:** Contenido mostrado
- ❌ **Error:** Mensaje informativo
- 🗂️ **Empty:** Estado vacío con acción

### **Casos de Uso Cubiertos:**
1. **Usuario navega películas populares**
2. **Usuario filtra por género específico**
3. **Usuario busca película por nombre**
4. **Usuario ve detalles de película**
5. **Usuario agrega película a su lista**
6. **Usuario gestiona su watchlist personal**

---

## 🚀 **DEPLOYMENT**

### **Preparación para Producción:**
1. Ejecutar `npm run build`
2. Los archivos estáticos se generan en `dist/`
3. Configurar servidor web (Nginx, Apache, Vercel, Netlify)
4. Asegurar variables de entorno en el servidor

### **Ejemplo Nginx:**
```nginx
server {
    listen 80;
    server_name cuenab.com;
    root /var/www/cuenab/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🧪 **DEBUGGING Y DESARROLLO**

### **Logs Habilitados:**
- 🔍 Requests HTTP en consola
- 📊 Estados de componentes
- 🔄 Flujo de datos en stores
- ⚠️ Errores detallados de API

### **Herramientas de Debug:**
- Vue DevTools
- Network tab para requests
- Console logs estructurados
- Error boundaries implementados

---

## 📄 **LICENCIA**

Este proyecto fue desarrollado con fines educativos como parte del curso de Desarrollo Web y Móvil.

---

## 👥 **AUTOR**

**Desarrollado por:** MrCasuela  
**Proyecto:** Clon de Netflix - CUENAB  
**Año:** 2025  
**Stack:** Vue 3 + TypeScript + TMDB API

---

## 🙏 **AGRADECIMIENTOS**

- **The Movie Database (TMDB)** por proporcionar la API gratuita
- **Vue.js Team** por el excelente framework
- **Tailwind CSS** por el sistema de diseño
- **Netflix** por la inspiración del diseño

---

**¡Disfruta navegando películas en CUENAB! 🍿🎬**
