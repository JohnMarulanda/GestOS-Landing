# GestOS Landing Page

## 🎯 Descripción
Landing page moderna y dinámica para GestOS, una aplicación de control gestual del sistema operativo. Desarrollada con Next.js, React y TypeScript, ofrece una experiencia interactiva y atractiva para presentar las capacidades del sistema.

## ✨ Características Principales

- **Diseño Responsivo**: Adaptación perfecta a cualquier dispositivo
- **Animaciones Fluidas**: Implementadas con GSAP y Framer Motion
- **Internacionalización**: Soporte multilenguaje
- **Demos Interactivos**: 
  - Control gestual en tiempo real
  - Control de video mediante gestos
  - Juego Simon Says con gestos
- **Optimización de Rendimiento**: Lazy loading y optimización de imágenes
- **Accesibilidad**: Diseño inclusivo y soporte para lectores de pantalla

## 🛠️ Tecnologías Utilizadas

### Core Framework
- Next.js
- React
- TypeScript
- TailwindCSS

### Animaciones y UI
- GSAP
- Framer Motion
- Lucide Icons

### Multimedia y Gestos
- MediaPipe
- OpenCV
- WebRTC

### Internacionalización
- i18next
- React-i18next

## 📦 Estructura del Proyecto

```
Landing/
├── src/
│   ├── assets/         # Imágenes y recursos estáticos
│   ├── components/     # Componentes reutilizables
│   ├── hooks/         # Custom hooks
│   ├── i18n/          # Configuración de internacionalización
│   └── sections/      # Secciones principales de la landing
```

### Secciones Principales

1. **Hero**: Presentación principal con animaciones dinámicas
2. **Information**: Características y beneficios del sistema
3. **WhatIs**: Explicación detallada del producto
4. **ProductShowcase**: Demostración interactiva
5. **Testimonials**: Opiniones de usuarios
6. **CallToAction**: Sección de descarga y registro

## 🎮 Componentes Interactivos

### Demos en Vivo
- **GestureRecognition**: Reconocimiento de gestos en tiempo real
- **VideoGestureControl**: Control de video mediante gestos
- **SimonSaysGame**: Juego interactivo con gestos

### Elementos UI
- **InteractiveCard**: Tarjetas con efectos 3D y hover
- **BetaModal**: Modal para registro en beta
- **LanguageSelector**: Selector de idioma con banderas

## 🚀 Instalación y Uso

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/gestos-landing.git
cd gestos-landing
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🔧 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia el servidor de producción
- `npm run lint`: Ejecuta el linter
- `npm run test`: Ejecuta los tests

## 🌐 Internacionalización

El proyecto soporta múltiples idiomas mediante i18next. Para agregar un nuevo idioma:

1. Crea un nuevo archivo en `src/i18n/locales/`
2. Agrega las traducciones siguiendo el formato existente
3. Registra el nuevo idioma en `src/i18n/config.ts`

## 🎨 Personalización

### Temas y Estilos
- Modifica `tailwind.config.js` para ajustar el tema
- Personaliza los estilos en `src/styles/`
- Ajusta las animaciones en los componentes individuales

### Contenido
- Actualiza los textos en los archivos de traducción
- Modifica las imágenes en `src/assets/`
- Ajusta los componentes en `src/components/`

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

[MIT](https://choosealicense.com/licenses/mit/)

## 👥 Autores

- **John Marulanda** - [LinkedIn](https://www.linkedin.com/in/john-marulanda/) - [GitHub](https://github.com/JohnMarulanda)

## 🙏 Agradecimientos

- MediaPipe por el framework de reconocimiento de gestos
- TailwindCSS por el framework de estilos
- GSAP por las animaciones
- La comunidad de React y Next.js
