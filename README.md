# Web Interface — Project Management Platform  
> Front-end para la API de gestión de proyectos, fases, requerimientos y transacciones.

## Links  
- Demo: *(opcional – agregar URL si aplica)*  
- API Backend: [Repositorio de la API](https://github.com/tu-organizacion/api-projects-service)

## ¿Cómo funciona?  
Esta aplicación proporciona una interfaz gráfica construida con React + TypeScript + Vite para interactuar con la API (backend) que gestiona proyectos, fases, requerimientos, transacciones y wallets de usuarios. Los usuarios pueden crear proyectos, añadir fases, registrar requerimientos, generar transacciones y visualizar el estado.  
También permite ver y actualizar wallets, gestionar participantes y revisar el avance del proyecto de manera visual.

## ¿Cómo ejecutar?  
### Requisitos  
- Node.js (v18 o superior recomendado)  
- npm (v9 o superior recomendado)  

### Instalación y ejecución  
```bash
# Clonar el repositorio
git clone https://github.com/tu-organizacion/web-interface.git
cd web-interface

# Instalar dependencias
npm install

# Modo desarrollo (con hot-reload)
npm run dev

# Generar build para producción
npm run build

# Previsualizar build localmente
npm run preview
