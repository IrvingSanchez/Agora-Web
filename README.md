# 🏗️ Web Interface — Project Management Platform

Este proyecto es la **interfaz web** del ecosistema de control de proyectos, fases y requerimientos, conectada directamente con la API desarrollada en Node.js y Firestore.  
Permite la gestión visual de proyectos, fases, requerimientos y transacciones asociadas.

---

## 🚀 Características principales

- Panel de control interactivo para proyectos, fases y requerimientos.  
- Integración en tiempo real con Firestore y la API REST del backend.  
- Manejo de autenticación y wallets de usuarios.  
- Visualización de presupuestos, transacciones y avances por fase.  
- Desarrollado con **React + TypeScript + Vite** para rendimiento óptimo.

---

## 🧩 Tecnologías utilizadas

- ⚛️ **React 18**  
- 🧠 **TypeScript**  
- ⚡ **Vite** (entorno de desarrollo ultrarrápido)  
- 🎨 **TailwindCSS / ShadCN UI** (según configuración del proyecto)  
- 🔐 **Firebase / Firestore** (para autenticación y persistencia)  
- 🧰 **ESLint + Prettier** (para linting y formateo de código)

---

## 📦 Instalación

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** v18 o superior  
- **npm** v9 o superior (o **pnpm / yarn**, si prefieres)

Luego clona el repositorio y ejecuta:

```bash
# Clonar el repositorio
git clone https://github.com/IrvingSanchez/Agora-Web.git

# Entrar al directorio del proyecto
cd web-interface

# Instalar dependencias
npm install

# Desplegar el proyecto para desarrollo:
npm run dev

# Para desplegar el proyecto productivo
npm run build