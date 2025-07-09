import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Recursos de traducción
const resources = {
  es: {
    translation: {
      // Header
      header: {
        topBanner: "Controla el mundo con un solo gesto",
        ctaBanner: "Dale un vistazo a nuestra aplicación",
        nav: {
          home: "Inicio",
          demo: "Prueba",
          information: "Información",
          whatIs: "¿Qué es?",
          testimonials: "Testimonios"
        },
        startTrial: "Comienza tu prueba"
      },
      // Hero Section
      hero: {
        tag: "Versión Beta disponible",
        textVariations: [
          {
            title: "Interacción natural. Tecnología real.",
            subtitle: "Reconocimiento de gestos en tiempo real para experiencias más humanas entre tú y la máquina."
          },
          {
            title: "El futuro de la interacción es sin contacto.",
            subtitle: "GestOS transforma tus movimientos en comandos precisos."
          },
          {
            title: "Controla tu mundo con un gesto.",
            subtitle: "Desde el movimiento de tu mano hasta la acción en pantalla, todo en tiempo real."
          }
        ],
        scrollIndicator: "Scroll para explorar",
        buttons: {
          getAccess: "Obtener acceso gratuito",
          learnMore: "Saber más",
          survey: "Participar en la encuesta"
        }
      },
      // LogoTicker
      logoTicker: {
        title: "Potenciado por las mejores tecnologías"
      },
      // ProductShowcase
      productShowcase: {
        badge: "Experimenta la Innovación",
        title: "Interacción natural con tecnología avanzada",
        description: "Descubre cómo GestOS revoluciona la forma en que interactuamos con la tecnología, ofreciendo control intuitivo a través de gestos naturales.",
        // Demo panel
        demoPanel: {
          title: "Experimenta Nuestras Demostraciones Interactivas",
          subtitle: "Elige una opción para probar diferentes formas de interactuar con la tecnología mediante gestos",
          performanceWarning: {
            title: "Aviso de Rendimiento",
            description: "Al activar el reconocimiento de gestos, la página puede experimentar una ligera disminución en el rendimiento debido al procesamiento de video en tiempo real. Esto es normal y temporal."
          }
        },
        // Demos
        demos: {
          gesture: {
            title: "Reconocimiento de Gestos",
            description: "Detecta y reconoce 8 gestos diferentes en tiempo real",
            loading: "Inicializando...",
            activeStatus: "Reconocimiento de Gestos Activo",
            availableGestures: "Gestos Disponibles:",
            gestureList: [
              "✋ Palma Abierta",
              "✊ Puño Cerrado", 
              "👍 Pulgar Arriba",
              "👎 Pulgar Abajo",
              "☝️ Señalando",
              "✌️ Victoria",
              "🤟 Te Amo",
              "🫳 Ninguno"
            ],
            instructions: "Muestra cualquiera de estos gestos frente a la cámara y verás el reconocimiento en tiempo real."
          },
          video: {
            title: "Control de Video",
            description: "Controla videos de YouTube con gestos de manos",
            loading: "Inicializando...",
            activeStatus: "Control de Video Activo",
            instructions: "Controla el video de YouTube usando los gestos indicados. La cámara detectará tus movimientos automáticamente.",
            controls: [
              { gesture: "👍", action: "Adelantar 10s" },
              { gesture: "👎", action: "Retroceder 10s" },
              { gesture: "🤟", action: "Reproducir/Pausar" }
            ]
          },
          simon: {
            title: "Simon Says",
            description: "Juego de memoria con gestos",
            loading: "Inicializando...",
            activeStatus: "Simon Says Activo",
            instructions: "Memoriza y repite las secuencias de gestos para entrenar tu memoria",
            gameStates: {
              waiting: "¿Listo para entrenar tu memoria?",
              showing: "Memoriza la secuencia:",
              playing: "¡Tu turno!",
              success: "¡Perfecto!",
              failure: "¡Ups!"
            },
            gestures: [
              { emoji: "✊", name: "Puño" },
              { emoji: "🤟", name: "Te Amo" },
              { emoji: "✌️", name: "Victoria" },
              { emoji: "👍", name: "Arriba" },
              { emoji: "👎", name: "Abajo" }
            ],
            ui: {
              level: "Nivel",
              best: "Mejor",
              streak: "Racha",
              record: "Record",
              startLevel: "Iniciar Nivel",
              yourTurn: "¡Tu turno!",
              repeatSequence: "Repite la secuencia",
              advancing: "Avanzando al nivel",
              incorrectSequence: "Secuencia incorrecta. ¡Inténtalo de nuevo!",
              correctSequence: "Secuencia correcta era:",
              newGame: "Nuevo Juego",
              resetStats: "Reset Stats",
              preparing: "Preparando...",
              gesturesAvailable: "Gestos Disponibles:",
              initializing: "Iniciando Simon Says...",
              loadingRecognition: "Cargando reconocimiento de gestos para el juego de memoria",
              retry: "Reintentar",
              closeGame: "Cerrar juego",
              memoryIndicator: "MEMORIA",
              activateGame: "Activar Juego",
              waiting: "¿Listo para entrenar tu memoria?",
              remember: "Memoriza la secuencia:",
              perfect: "¡Perfecto!",
              wrong: "¡Ups!",
              tryAgain: "Secuencia incorrecta. ¡Inténtalo de nuevo!",
              levelText: "Nivel {{level}} • {{nextLevel}} gestos",
              levelUp: "Avanzando al nivel {{level}}...",
              streakText: "Racha: {{streak}}",
              repeatText: "Repite la secuencia ({{length}}/{{total}})",
              memory: "MEMORIA",
              getReady: "¡Prepárate!",
              start: "¡Empezar!",
              holdGesture: "Mantén tu gesto estable para que sea reconocido",
              processing: "Procesando gesto...",
              gestureConfirmed: "¡Gesto confirmado!",
              detectingGesture: "Detectando gesto..."
            }
          }
        },
        // Estados y mensajes
        states: {
          inactive: "Selecciona una Demostración",
          inactiveSubtitle: "Elige una opción del panel inferior para comenzar",
          active: "Activo • Clic para desactivar",
          clickToActivate: "Clic para activar",
          recognizing: "RECONOCIENDO",
          controllingVideo: "CONTROLANDO VIDEO",
          cooldown: "Esperando... (2s)"
        },
        // Recomendación para dispositivos móviles
        mobileRecommendation: {
          title: "💻 Mejor Experiencia en Computadora",
          subtitle: "Para una experiencia óptima probando nuestras demostraciones interactivas",
          description: "Las demostraciones de reconocimiento de gestos funcionan mejor en:",
          requirements: [
            "💻 Computadora de escritorio o laptop",
            "📹 Cámara web integrada o externa",
            "🖥️ Pantalla más grande para mejor visualización",
            "⚡ Mayor poder de procesamiento para IA en tiempo real"
          ],
          recommendation: "Te recomendamos visitar esta página desde una computadora con cámara para vivir la experiencia completa de control por gestos.",
          cta: "Abrir en computadora para probar las demos"
        },
        // Componentes específicos
        gestureRecognition: {
          title: "Reconocimiento de Gestos Desactivado",
          subtitle: "Activa el reconocimiento para encender la cámara",
          description: "La cámara se activará automáticamente al hacer clic en 'Activar'",
          gesturesAvailable: "✋ Gestos disponibles: 8",
          confidence: "Confianza",
          hand: "Mano",
          showGesture: "Muestra un gesto con tu mano...",
          loading: "Iniciando reconocimiento...",
          loadingDetails: "Cargando optimizaciones de TensorFlow para CPU",
          errorTitle: "Error",
          retryButton: "Reintentar",
          cameraError: "No se pudo acceder a la cámara. Verifica los permisos.",
          // Easter egg
          easterEgg: {
            title: "¡Oye, no seas irrespetuoso!",
            subtitle: "Ese gesto no es apropiado 🤭",
            message: "Mejor usa los otros gestos disponibles 😊"
          },
          // Debug
          debug: {
            title: "Información de Debug",
            fingerStates: "Estados de Dedos",
            fingerNames: ["Pulgar", "Índice", "Medio", "Anular", "Meñique"],
            debugMessage: "Debug de detección de dedos",
            noFingers: "No se detectaron dedos...",
            normalMessages: "Mensajes Normales",
            optimizationActive: '"TensorFlow Lite XNNPACK" = ✅ Optimización activa',
            extensionWarning: '"message channel closed" = ⚠️ Extensión del navegador',
            normalOperation: '"Created delegate for CPU" = ✅ Operación normal'
          }
        },
        videoControl: {
          title: "🎬 Video Controlable por Gestos",
          instructions: "📋 Instrucciones:",
          instructionText: "¡Reproduce el video y usa tus gestos para controlarlo en tiempo real!",
          loading: "Cargando reproductor de YouTube...",
          gestureControl: "Control por Gestos",
          actions: {
            forward: "Video adelantado 10 segundos",
            backward: "Video retrocedido 10 segundos", 
            playPause: "Video pausado/reproducido"
          },
          lastAction: "Última acción",
          useGestures: "Usa: 👍 👎 🤟 para controlar el video",
          controlTitle: "Control de Video con Gestos",
          controlSubtitle: "Activa para controlar el video con tus manos",
          gestureControls: "👍 👎 🤟 Gestos de control"
        }
      },
      // Information
      information: {
        badge: "Características principales",
        title: "Todo lo que necesitas para controlar tu mundo digital",
        subtitle: "Disfruta de funciones personalizables, respuesta en tiempo real y una experiencia de usuario intuitiva que se adapta perfectamente a tu flujo de trabajo.",
        sectionBadge: "Tecnología Avanzada",
        sectionTitle: "Las capacidades principales de GestOS",
        sectionSubtitle: "Descubre las tecnologías que hacen posible una interacción natural e intuitiva.",
        cards: [
          {
            title: "Reconocimiento Inteligente",
            subtitle: "IA Avanzada",
            description: "Algoritmos de machine learning que se adaptan a gestos únicos para una experiencia personalizada.",
            badge: "IA"
          },
          {
            title: "Respuesta Rápida",
            subtitle: "Eficiente",
            description: "Detección de gestos en tiempo real para una interacción fluida y natural.",
            badge: "Velocidad"
          },
          {
            title: "Visión Computacional",
            subtitle: "Precisión",
            description: "Tecnología de visión computacional que detecta gestos con precisión del 80% en condiciones normales.",
            badge: "Precisión"
          },
          {
            title: "Control Natural",
            subtitle: "Gestos Intuitivos",
            description: "Interfaz que responde a movimientos naturales de la mano, haciendo la tecnología más humana y accesible.",
            badge: "Natural"
          }
        ],
        features: {
          realTime: {
            title: "Reconocimiento en tiempo real",
            description: "Procesa y responde a tus gestos instantáneamente, sin retrasos perceptibles."
          },
          customizable: {
            title: "Gestos personalizables",
            description: "Define y personaliza tus propios gestos para diferentes acciones y aplicaciones."
          },
          multiPlatform: {
            title: "Multiplataforma",
            description: "Funciona en Windows, macOS y Linux sin instalaciones adicionales."
          },
          noHardware: {
            title: "Sin hardware adicional",
            description: "Solo necesitas una cámara web estándar para comenzar a usar la tecnología."
          },
          intuitive: {
            title: "Interfaz intuitiva",
            description: "Diseño limpio y fácil de usar que se adapta a usuarios de todos los niveles."
          },
          secure: {
            title: "Privacidad garantizada",
            description: "Todo el procesamiento se realiza localmente, tus datos nunca salen de tu dispositivo."
          }
        }
      },
      // WhatIs
      whatIs: {
        badge: "Innovación tecnológica",
        title: "¿Qué es GestOS?",
        subtitle: "La próxima evolución en interfaces de usuario",
        description: "GestOS es una revolucionaria plataforma de reconocimiento de gestos que transforma la forma en que interactúas con la tecnología. Utilizando inteligencia artificial avanzada y visión por computadora, convierte tus movimientos naturales en comandos precisos.",
        // Header principal
        mainBadge: "¿Qué es GestOS?",
        mainTitle: "Una barra lateral revolucionaria para controlar tu computadora",
        mainDescription: "Es una innovadora aplicación que abre una barra lateral en tu escritorio para controlar tu computadora usando únicamente gestos de manos.",
        // Descripción principal
        mainContent: {
          title: "El futuro de la interacción humano-computadora",
          description1: "GestOS es una aplicación que coloca una barra lateral inteligente en tu escritorio, permitiéndote controlar tu computadora usando solo gestos naturales de las manos.",
          description2: "Cada gesto que realizas es detectado por la cámara de tu dispositivo y procesado en tiempo real por algoritmos de visión por computadora e inteligencia artificial.",
          noHardwareTitle: "Sin hardware adicional",
          noHardwareDesc: "Solo necesitas la cámara web de tu computadora. GestOS funciona con cualquier cámara estándar."
        },
        // Demo
        demo: {
          showButton: "Ver Demo de la Barra",
          demoIndicator: "👆 Demo interactiva",
          demoBanner: "🎮 Demo - No funcional"
        },
        // Cómo funciona
        howWorks: {
          title: "¿Cómo funciona?",
          subtitle: "Un proceso simple pero tecnológicamente avanzado que hace posible el control por gestos",
          features: [
            {
              title: "Visión por Computadora",
              description: "Detecta y analiza gestos de manos en tiempo real usando algoritmos avanzados de visión por computadora"
            },
            {
              title: "Inteligencia Artificial",
              description: "Librerías de machine learning adaptadas a gestos únicos para una experiencia personalizada."
            },
            {
              title: "Respuesta Eficiente",
              description: "Latencia baja para una experiencia fluida y natural."
            },
            {
              title: "Control Intuitivo",
              description: "Gestos naturales que cualquier persona puede aprender y usar sin entrenamiento previo"
            }
          ]
        },
        // Funciones de la barra lateral
        sidebarFunctions: {
          title: "Funciones de la Barra Lateral",
          subtitle: "Cada icono en la barra lateral activa un módulo específico de reconocimiento de gestos para controlar diferentes aspectos de tu computadora",
          cards: [
            {
              title: "Control de Volumen",
              description: "Ajusta el volumen del sistema con gestos naturales de la mano",
              gestures: [
                { emoji: "✋", label: "Subir" },
                { emoji: "👎", label: "Bajar" },
                { emoji: "✊", label: "Sonido" },
                { emoji: "✊", label: "Silenciar" }
              ]
            },
            {
              title: "Aplicaciones",
              description: "Abre y cierra aplicaciones con diferentes gestos",
              gestures: [
                { emoji: "👆", label: "Chrome" },
                { emoji: "✌️", label: "Notas" },
                { emoji: "🤟", label: "Calculadora" },
                { emoji: "✋", label: "Spotify" }
              ]
            },
            {
              title: "Multimedia",
              description: "Controla reproducción, pausa y avance de contenido multimedia",
              gestures: [
                { emoji: "🤟", label: "Pausar/Reproducir" },
                { emoji: "👍", label: "Adelantar" },
                { emoji: "👎", label: "Retroceder" }
              ]
            },
            {
              title: "Sistema",
              description: "Apaga, reinicia, hiberna y suspende tu computadora",
              gestures: [
                { emoji: "👍", label: "Apagar" },
                { emoji: "👎", label: "Reiniciar" },
                { emoji: "✋", label: "Suspender" },
                { emoji: "🤟", label: "Hibernar" }
              ]
            },
            {
              title: "Atajos",
              description: "Activa atajos comunes y comandos rápidos",
              gestures: [
                { emoji: "👎", label: "Cortar" },
                { emoji: "👍", label: "Copiar" },
                { emoji: "✌️", label: "Pegar" },
                { emoji: "✋", label: "Deshacer" }
              ]
            },
            {
              title: "Mouse Virtual",
              description: "Controla el cursor, clic y arrastre usando movimientos de mano",
              gestures: [
                { emoji: "👆", label: "Mover" },
                { emoji: "👆", label: "Clic Izq" },
                { emoji: "👆", label: "Clic Der" }
              ]
            },
            {
              title: "Navegación",
              description: "Cambia entre ventanas y espacios de trabajo fluidamente",
              gestures: [
                { emoji: "🤟", label: "Alt+Tab" },
                { emoji: "👆", label: "Escritorio" },
                { emoji: "✌️", label: "Vista Tarea" },
                { emoji: "✋", label: "Win+D" }
              ]
            },
            {
              title: "Inicio",
              description: "Acceso rápido al menú principal y funciones esenciales",
              gestures: [
                { emoji: "-", label: "Click" }
              ]
            }
          ],
          recognitionInfo: {
            title: "Sistema de Reconocimiento Avanzado",
            description: "GestOS utiliza un modelo de inteligencia artificial entrenado para reconocer 8 gestos principales: None, Closed_Fist, Open_Palm, Pointing_Up, Thumb_Down, Thumb_Up, Victory e ILoveYou. Cada función combina múltiples gestos para ofrecer control completo y preciso.",
            gestures: ["None", "Fist", "Palm", "Point", "Down", "Up", "Victory", "Love"]
          }
        },
        // Ventanas de la aplicación
        appWindows: {
          title: "Ventanas de la Aplicación",
          subtitle: "GestOS incluye múltiples ventanas especializadas para una experiencia completa de control gestual",
          windows: [
            {
              title: "Gesture Testing",
              subtitle: "Ventana Principal",
              description: "El centro de control donde ocurre toda la magia. Incluye reconocimiento gestual en tiempo real, juegos interactivos como Piedra, Papel o Tijeras y Simon Dice, y diferentes modos de interacción exclusivos.",
              badges: ["🎮 Juegos", "👋 Reconocimiento", "🎯 Interacciones"]
            },
            {
              title: "Info Gestures",
              subtitle: "Catálogo de Gestos",
              description: "Una guía completa e interactiva con todos los gestos disponibles. Navegación por páginas, información detallada de cada gesto, instrucciones de uso y consejos para mejor reconocimiento.",
              badges: ["📚 Catálogo", "💡 Consejos", "📖 Instrucciones"]
            },
            {
              title: "Settings",
              subtitle: "Configuración General",
              description: "Centro de personalización completo, accesibilidad (tamaño de texto, alto contraste), tamaño de ventana y guardado automático de preferencias.",
              badges: ["🌍 Idioma", "👁️ Accesibilidad", "💾 Guardado"]
            },
            {
              title: "Help & Support",
              subtitle: "Ayuda y Soporte",
              description: "Centro de ayuda completo con formulario de contacto inteligente, FAQ interactivas, enlaces a repositorios del proyecto y encuesta de usabilidad integrada.",
              badges: ["📧 Contacto", "❓ FAQ", "📋 Encuesta"]
            }
          ],
          finalNote: {
            title: "Experiencia Completa e Integrada",
            description: "Cada ventana está diseñada para complementar las demás, ofreciendo una experiencia de usuario fluida y completa. Desde el aprendizaje inicial hasta el uso avanzado, GestOS te acompaña en cada paso."
          }
        },
        benefits: {
          natural: {
            title: "Interacción Natural",
            description: "Usa gestos intuitivos que ya conoces para controlar tu dispositivo."
          },
          efficient: {
            title: "Mayor Eficiencia",
            description: "Reduce el tiempo de navegación y aumenta tu productividad."
          },
          accessible: {
            title: "Accesibilidad",
            description: "Ideal para personas con limitaciones de movilidad o dificultades con dispositivos tradicionales."
          },
          hygienic: {
            title: "Higiene",
            description: "Control sin contacto, perfecto para entornos médicos o públicos."
          }
        }
      },
      // Testimonials
      testimonials: {
        badge: "Testimonios",
        title: "Lo que dicen nuestros usuarios",
        subtitle: "Descubre cómo GestOS está transformando la experiencia de miles de usuarios en todo el mundo.",
        button: "¡Apoya nuestro proyecto! Completa nuestra encuesta",
        list: [
          {
            text: "GestOS ha revolucionado mi flujo de trabajo. Ahora puedo controlar mi computadora solo con gestos de mis manos, es increíblemente intuitivo.",
            name: "Diego Marulanda",
            username: "@diegomarulanda"
          },
          {
            text: "La precisión del reconocimiento de gestos es asombrosa. Nunca pensé que sería tan fácil navegar sin tocar el mouse.",
            name: "Nicolas Marulanda",
            username: "@nicolasmarulanda"
          },
          {
            text: "Como desarrollador, esta aplicación me ha ayudado mucho. Puedo cambiar entre aplicaciones y controlar el volumen sin interrumpir mi código.",
            name: "John Marulanda",
            username: "@johnmarulanda"
          },
          {
            text: "Me sorprendió lo rápido que aprendí a usar GestOS. Los gestos son tan naturales que se sienten como una extensión de mi propio cuerpo.",
            name: "Maria Valero",
            username: "@mariavalero"
          },
          {
            text: "Excelente para presentaciones. Puedo controlar las diapositivas y el volumen desde cualquier lugar de la sala solo con mis manos.",
            name: "Carlos Guerrero",
            username: "@carlosguerrero"
          },
          {
            text: "La tecnología de visión por computadora es impresionante. Funciona perfectamente incluso en condiciones de poca luz.",
            name: "Daniel Casallas",
            username: "@danielcasallas"
          },
          {
            text: "Como diseñador, valoro mucho poder controlar mi espacio de trabajo de forma más fluida. GestOS me da esa libertad creativa.",
            name: "Juan Ruiz",
            username: "@juanruiz"
          },
          {
            text: "Perfecto para cuando tengo las manos ocupadas cocinando. Puedo cambiar la música o el volumen sin tocar nada.",
            name: "Pepito Perez",
            username: "@pepitoperez"
          },
          {
            text: "La interfaz es muy intuitiva y los gestos son fáciles de recordar. Mis nietos también lo usan sin problemas.",
            name: "Pepa Pig",
            username: "@pepapig"
          }
        ]
      },
      // CallToAction
      callToAction: {
        title: "Únete a la revolución de los gestos",
        subtitle: "Sé parte de la próxima generación de interfaces de usuario.",
        description: "Descarga GestOS hoy y experimenta una nueva forma de interactuar con la tecnología. Simple, intuitivo y completamente revolucionario.",
        primaryButton: "Descargar ahora",
        secondaryButton: "Ver demostración",
        downloadText: "Descarga para"
      },
      // Beta Modal
      betaModal: {
        title: "Aplicación de Escritorio",
        warning: {
          title: "Al ser una aplicación de escritorio, es recomendable contactar directamente con el desarrollador para obtener la versión beta.",
          security: "Esto garantiza la seguridad de tu computadora y permite realizar pruebas en un ambiente controlado y revisado."
        },
        contact: {
          instruction: "Para solicitar la versión beta, envía un correo a:",
          subject: "Solicitud de Beta",
          copyButton: "Copiar",
          copiedButton: "¡Copiado!",
          openEmailButton: "Abrir Cliente de Correo"
        },
        buttons: {
          continueViewing: "Continuar Viendo",
          close: "Cerrar"
        }
      },
      // VideoDemo
      videoDemo: {
        badge: "Demostración en vivo",
        title: "Ve GestOS en acción",
        description: "Descubre todas las capacidades de nuestro sistema de reconocimiento de gestos a través de este video demostrativo completo.",
        previewText: "Haz clic para ver la demostración completa de GestOS en acción",
        watchButton: "Ver Video de Demostración",
        stats: {
          duration: "Duración",
          features: "Funciones",
          quality: "Calidad"
        },
        gestures: {
          title: "Gestos Reconocidos",
          subtitle: "8 gestos disponibles en tiempo real",
          list: [
            { emoji: "✋", name: "Palma Abierta" },
            { emoji: "✊", name: "Puño Cerrado" },
            { emoji: "👍", name: "Pulgar Arriba" },
            { emoji: "👎", name: "Pulgar Abajo" },
            { emoji: "☝️", name: "Señalando" },
            { emoji: "✌️", name: "Victoria" },
            { emoji: "🤟", name: "Te Amo" },
            { emoji: "🫳", name: "Ninguno" }
          ]
        },
        callToAction: {
          title: "¿Listo para probarlo tú mismo?",
          description: "Después de ver el video, descarga GestOS y experimenta el control por gestos en tu propio dispositivo.",
          button: "Descargar Ahora"
        }
      },
      // Footer
      footer: {
        description: "GestOS revoluciona la interacción humano-computadora a través del reconocimiento de gestos en tiempo real.",
        nav: {
          home: "Inicio",
          demo: "Características", 
          whatIs: "¿Qué es?",
          information: "Información",
          testimonials: "Testimonios",
          download: "Descargar"
        },
        links: {
          product: "Producto",
          features: "Características",
          integrations: "Integraciones",
          updates: "Actualizaciones",
          company: "Empresa",
          about: "Acerca de",
          blog: "Blog",
          careers: "Carreras",
          support: "Soporte",
          resources: "Recursos",
          contact: "Contacto"
        },
        copyright: "© 2025 GestOS. Todos los derechos reservados."
      }
    }
  },
  en: {
    translation: {
      // Header
      header: {
        topBanner: "Control the world with a single gesture",
        ctaBanner: "Take a look at our application",
        nav: {
          home: "Home",
          demo: "Demo",
          information: "Information",
          whatIs: "What is it?",
          testimonials: "Testimonials"
        },
        startTrial: "Start your trial"
      },
      // Hero Section
      hero: {
        tag: "Beta version available",
        textVariations: [
          {
            title: "Natural interaction. Real technology.",
            subtitle: "Real-time gesture recognition for more human experiences between you and the machine."
          },
          {
            title: "The future of interaction is contactless.",
            subtitle: "GestOS transforms your movements into precise commands."
          },
          {
            title: "Control your world with a gesture.",
            subtitle: "From your hand movement to screen action, all in real time."
          }
        ],
        scrollIndicator: "Scroll to explore",
        buttons: {
          getAccess: "Get free access",
          learnMore: "Learn more",
          survey: "Participate in the survey"
        }
      },
      // LogoTicker
      logoTicker: {
        title: "Powered by the best technologies"
      },
      // ProductShowcase
      productShowcase: {
        badge: "Experience Innovation",
        title: "Natural interaction with advanced technology",
        description: "Discover how GestOS revolutionizes the way we interact with technology, offering intuitive control through natural gestures.",
        // Demo panel
        demoPanel: {
          title: "Experience Our Interactive Demonstrations",
          subtitle: "Choose an option to try different ways of interacting with technology through gestures",
          performanceWarning: {
            title: "Performance Notice",
            description: "When activating gesture recognition, the page may experience a slight decrease in performance due to real-time video processing. This is normal and temporary."
          }
        },
        // Demos
        demos: {
          gesture: {
            title: "Gesture Recognition",
            description: "Detects and recognizes 8 different gestures in real time",
            loading: "Initializing...",
            activeStatus: "Gesture Recognition Active",
            availableGestures: "Available Gestures:",
            gestureList: [
              "✋ Open Palm",
              "✊ Closed Fist", 
              "👍 Thumb Up",
              "👎 Thumb Down",
              "☝️ Pointing",
              "✌️ Victory",
              "🤟 I Love You",
              "🫳 None"
            ],
            instructions: "Show any of these gestures in front of the camera and you'll see real-time recognition."
          },
          video: {
            title: "Video Control",
            description: "Control YouTube videos with hand gestures",
            loading: "Initializing...",
            activeStatus: "Video Control Active",
            instructions: "Control the YouTube video using the indicated gestures. The camera will detect your movements automatically.",
            controls: [
              { gesture: "👍", action: "Forward 10s" },
              { gesture: "👎", action: "Backward 10s" },
              { gesture: "🤟", action: "Play/Pause" }
            ]
          },
          simon: {
            title: "Simon Says",
            description: "Memory game with gestures",
            loading: "Initializing...",
            activeStatus: "Simon Says Active",
            instructions: "Memorize and repeat gesture sequences to train your memory",
            gameStates: {
              waiting: "Ready to train your memory?",
              showing: "Memorize the sequence:",
              playing: "Your turn!",
              success: "Perfect!",
              failure: "Oops!"
            },
            gestures: [
              { emoji: "✊", name: "Fist" },
              { emoji: "🤟", name: "I Love You" },
              { emoji: "✌️", name: "Victory" },
              { emoji: "👍", name: "Up" },
              { emoji: "👎", name: "Down" }
            ],
            ui: {
              level: "Level",
              best: "Best",
              streak: "Streak",
              record: "Record",
              startLevel: "Start Level",
              yourTurn: "Your turn!",
              repeatSequence: "Repeat Sequence",
              advancing: "Advancing to level",
              incorrectSequence: "Incorrect sequence. Try again!",
              correctSequence: "Correct sequence was:",
              newGame: "New Game",
              resetStats: "Reset Stats",
              preparing: "Preparing...",
              gesturesAvailable: "Available Gestures:",
              initializing: "Starting Simon Says...",
              loadingRecognition: "Loading gesture recognition for memory game",
              retry: "Retry",
              closeGame: "Close Game",
              memoryIndicator: "MEMORY",
              activateGame: "Activate Game",
              waiting: "Ready to train your memory?",
              remember: "Memorize the sequence:",
              perfect: "Perfect!",
              wrong: "Oops!",
              tryAgain: "Incorrect sequence. Try again!",
              levelText: "Level {{level}} • {{nextLevel}} gestures",
              levelUp: "Advancing to level {{level}}...",
              streakText: "Streak: {{streak}}",
              repeatText: "Repeat sequence ({{length}}/{{total}})",
              memory: "MEMORY",
              getReady: "Get Ready!",
              start: "Start!",
              holdGesture: "Hold your gesture steady to be recognized",
              processing: "Processing gesture...",
              gestureConfirmed: "Gesture confirmed!",
              detectingGesture: "Detecting gesture..."
            }
          }
        },
        // Estados y mensajes
        states: {
          inactive: "Select a Demonstration",
          inactiveSubtitle: "Choose an option from the panel below to start",
          active: "Active • Click to deactivate",
          clickToActivate: "Click to activate",
          recognizing: "RECOGNIZING",
          controllingVideo: "CONTROLLING VIDEO",
          cooldown: "Waiting... (2s)"
        },
        // Recomendación para dispositivos móviles
        mobileRecommendation: {
          title: "💻 Better Computer Experience",
          subtitle: "For an optimal experience testing our interactive demonstrations",
          description: "Gesture recognition demonstrations work better on:",
          requirements: [
            "💻 Desktop or laptop computer",
            "📹 Integrated or external webcam",
            "🖥️ Larger screen for better visualization",
            "⚡ More processing power for real-time AI"
          ],
          recommendation: "We recommend visiting this page from a computer with a webcam to experience the complete control by gestures.",
          cta: "Open on computer to test demos"
        },
        // Componentes específicos
        gestureRecognition: {
          title: "Gesture Recognition Disabled",
          subtitle: "Activate recognition to turn on the camera",
          description: "The camera will automatically activate when clicking 'Activate'",
          gesturesAvailable: "✋ Available gestures: 8",
          confidence: "Confidence",
          hand: "Hand",
          showGesture: "Show a gesture with your hand...",
          loading: "Starting recognition...",
          loadingDetails: "Loading TensorFlow optimizations for CPU",
          errorTitle: "Error",
          retryButton: "Retry",
          cameraError: "Could not access camera. Check permissions.",
          // Easter egg
          easterEgg: {
            title: "Hey, don't be disrespectful!",
            subtitle: "That gesture is not appropriate 🤭",
            message: "Better use the other available gestures 😊"
          },
          // Debug
          debug: {
            title: "Debug Info",
            fingerStates: "Finger States",
            fingerNames: ["Thumb", "Index", "Middle", "Ring", "Pinky"],
            debugMessage: "Finger detection debug",
            noFingers: "No fingers detected...",
            normalMessages: "Normal Messages",
            optimizationActive: '"TensorFlow Lite XNNPACK" = ✅ Optimization active',
            extensionWarning: '"message channel closed" = ⚠️ Browser extension',
            normalOperation: '"Created delegate for CPU" = ✅ Normal operation'
          }
        },
        videoControl: {
          title: "🎬 Gesture-Controllable Video",
          instructions: "📋 Instructions:",
          instructionText: "Play the video and use your gestures to control it in real time!",
          loading: "Loading YouTube player...",
          gestureControl: "Gesture Control",
          actions: {
            forward: "Video forwarded 10 seconds",
            backward: "Video rewound 10 seconds", 
            playPause: "Video paused/played"
          },
          lastAction: "Last action",
          useGestures: "Use: 👍 👎 🤟 to control the video",
          controlTitle: "Video Control with Gestures",
          controlSubtitle: "Activate to control the video with your hands",
          gestureControls: "👍 👎 🤟 Control gestures"
        }
      },
      // Information
      information: {
        badge: "Key features",
        title: "Everything you need to control your digital world",
        subtitle: "Enjoy customizable features, real-time response and an intuitive user experience that perfectly adapts to your workflow.",
        sectionBadge: "Advanced Technology",
        sectionTitle: "The Main Capabilities of GestOS",
        sectionSubtitle: "Discover the technologies that make natural and intuitive interaction possible.",
        cards: [
          {
            title: "Intelligent Recognition",
            subtitle: "Advanced AI",
            description: "Machine learning algorithms that adapt to unique gestures for personalized experience.",
            badge: "AI"
          },
          {
            title: "Quick Response",
            subtitle: "Efficient",
            description: "Real-time gesture recognition for fluid and natural interaction.",
            badge: "Speed"
          },
          {
            title: "Computer Vision",
            subtitle: "Precision",
            description: "Computer vision technology that detects gestures with 80% accuracy in normal conditions.",
            badge: "Precision"
          },
          {
            title: "Natural Control",
            subtitle: "Intuitive Gestures",
            description: "Interface that responds to natural hand movements, making the technology more human and accessible.",
            badge: "Natural"
          }
        ],
        features: {
          realTime: {
            title: "Real-time recognition",
            description: "Processes and responds to your gestures instantly, with no perceptible delays."
          },
          customizable: {
            title: "Customizable gestures",
            description: "Define and customize your own gestures for different actions and applications."
          },
          multiPlatform: {
            title: "Cross-platform",
            description: "Works on Windows, macOS and Linux without additional installations."
          },
          noHardware: {
            title: "No additional hardware",
            description: "You only need a standard webcam to start using the technology."
          },
          intuitive: {
            title: "Intuitive interface",
            description: "Clean and easy-to-use design that adapts to users of all levels."
          },
          secure: {
            title: "Privacy guaranteed",
            description: "All processing is done locally, your data never leaves your device."
          }
        }
      },
      // WhatIs
      whatIs: {
        badge: "Technological innovation",
        title: "What is GestOS?",
        subtitle: "The next evolution in user interfaces",
        description: "GestOS is a revolutionary gesture recognition platform that transforms the way you interact with technology. Using advanced artificial intelligence and computer vision, it converts your natural movements into precise commands.",
        // Header principal
        mainBadge: "What is GestOS?",
        mainTitle: "A revolutionary sidebar to control your computer",
        mainDescription: "It's an innovative application that opens a sidebar on your desktop to control your computer using only hand gestures.",
        // Descripción principal
        mainContent: {
          title: "The future of human-computer interaction",
          description1: "GestOS is an application that places an intelligent sidebar on your desktop, allowing you to control your computer using only natural hand gestures.",
          description2: "Every gesture you make is detected by your device's camera and processed in real time by computer vision and artificial intelligence algorithms.",
          noHardwareTitle: "No additional hardware",
          noHardwareDesc: "You only need your computer's webcam. GestOS works with any standard camera."
        },
        // Demo
        demo: {
          showButton: "View Sidebar Demo",
          demoIndicator: "👆 Interactive demo",
          demoBanner: "🎮 Demo - Non-functional"
        },
        // Cómo funciona
        howWorks: {
          title: "How does it work?",
          subtitle: "A simple yet technologically advanced process that makes gesture control possible",
          features: [
            {
              title: "Computer Vision",
              description: "Detects and analyzes hand gestures in real time using advanced computer vision algorithms"
            },
            {
              title: "Artificial Intelligence",
              description: "Machine learning libraries adapted to unique gestures for a personalized experience."
            },
            {
              title: "Efficient Response",
              description: "Low latency for a fluid and natural experience."
            },
            {
              title: "Intuitive Control",
              description: "Natural gestures that anyone can learn and use without prior training"
            }
          ]
        },
        // Funciones de la barra lateral
        sidebarFunctions: {
          title: "Sidebar Functions",
          subtitle: "Each icon in the sidebar activates a specific gesture recognition module to control different aspects of your computer",
          cards: [
            {
              title: "Volume Control",
              description: "Adjust system volume with natural hand gestures",
              gestures: [
                { emoji: "✋", label: "Volume Up" },
                { emoji: "👎", label: "Volume Down" },
                { emoji: "✊", label: "Sound" },
                { emoji: "✊", label: "Mute" }
              ]
            },
            {
              title: "Applications",
              description: "Open and close applications with different gestures",
              gestures: [
                { emoji: "👆", label: "Chrome" },
                { emoji: "✌️", label: "Notes" },
                { emoji: "🤟", label: "Calculator" },
                { emoji: "✋", label: "Spotify" }
              ]
            },
            {
              title: "Multimedia",
              description: "Control playback, pause and advance multimedia content",
              gestures: [
                { emoji: "🤟", label: "Pause/Play" },
                { emoji: "👍", label: "Forward" },
                { emoji: "👎", label: "Backward" }
              ]
            },
            {
              title: "System",
              description: "Shutdown, restart, hibernate and suspend your computer",
              gestures: [
                { emoji: "👍", label: "Shutdown" },
                { emoji: "👎", label: "Restart" },
                { emoji: "✋", label: "Suspend" },
                { emoji: "🤟", label: "Hibernate" }
              ]
            },
            {
              title: "Shortcuts",
              description: "Activate common shortcuts and quick commands",
              gestures: [
                { emoji: "👎", label: "Cut" },
                { emoji: "👍", label: "Copy" },
                { emoji: "✌️", label: "Paste" },
                { emoji: "✋", label: "Undo" }
              ]
            },
            {
              title: "Virtual Mouse",
              description: "Control cursor, click and drag using hand movements",
              gestures: [
                { emoji: "👆", label: "Move" },
                { emoji: "👆", label: "Left Click" },
                { emoji: "👆", label: "Right Click" }
              ]
            },
            {
              title: "Navigation",
              description: "Switch between windows and workspaces fluidly",
              gestures: [
                { emoji: "🤟", label: "Alt+Tab" },
                { emoji: "👆", label: "Desktop" },
                { emoji: "✌️", label: "Task View" },
                { emoji: "✋", label: "Win+D" }
              ]
            },
            {
              title: "Home",
              description: "Quick access to main menu and essential functions",
              gestures: [
                { emoji: "-", label: "Click" }
              ]
            }
          ],
          recognitionInfo: {
            title: "Advanced Recognition System",
            description: "GestOS uses an artificial intelligence model trained to recognize 8 main gestures: None, Closed_Fist, Open_Palm, Pointing_Up, Thumb_Down, Thumb_Up, Victory and ILoveYou. Each function combines multiple gestures to offer complete and precise control.",
            gestures: ["None", "Fist", "Palm", "Point", "Down", "Up", "Victory", "Love"]
          }
        },
        // Ventanas de la aplicación
        appWindows: {
          title: "Application Windows",
          subtitle: "GestOS includes multiple specialized windows for a complete gestural control experience",
          windows: [
            {
              title: "Gesture Testing",
              subtitle: "Main Window",
              description: "The control center where all the magic happens. Includes real-time gesture recognition, interactive games like Rock, Paper, Scissors and Simon Says, and different exclusive interaction modes.",
              badges: ["🎮 Games", "👋 Recognition", "🎯 Interactions"]
            },
            {
              title: "Info Gestures",
              subtitle: "Gesture Catalog",
              description: "A complete and interactive guide with all available gestures. Page navigation, detailed information for each gesture, usage instructions and tips for better recognition.",
              badges: ["📚 Catalog", "💡 Tips", "📖 Instructions"]
            },
            {
              title: "Settings",
              subtitle: "General Configuration",
              description: "Complete customization center, accessibility (text size, high contrast), window size and automatic preference saving.",
              badges: ["🌍 Language", "👁️ Accessibility", "💾 Save"]
            },
            {
              title: "Help & Support",
              subtitle: "Help and Support",
              description: "Complete help center with intelligent contact form, interactive FAQ, project repository links and integrated usability survey.",
              badges: ["📧 Contact", "❓ FAQ", "📋 Survey"]
            }
          ],
          finalNote: {
            title: "Complete and Integrated Experience",
            description: "Each window is designed to complement the others, offering a smooth and complete user experience. From initial learning to advanced use, GestOS accompanies you every step of the way."
          }
        },
        benefits: {
          natural: {
            title: "Natural Interaction",
            description: "Use intuitive gestures you already know to control your device."
          },
          efficient: {
            title: "Greater Efficiency",
            description: "Reduce navigation time and increase your productivity."
          },
          accessible: {
            title: "Accessibility",
            description: "Ideal for people with mobility limitations or difficulties with traditional devices."
          },
          hygienic: {
            title: "Hygiene",
            description: "Contactless control, perfect for medical or public environments."
          }
        }
      },
      // Testimonials
      testimonials: {
        badge: "Testimonials",
        title: "What our users say",
        subtitle: "Discover how GestOS is transforming the experience of thousands of users worldwide.",
        button: "Support our project! Complete our survey",
        list: [
          {
            text: "GestOS has revolutionized my workflow. Now I can control my computer just with hand gestures, it's incredibly intuitive.",
            name: "Diego Marulanda",
            username: "@diegomarulanda"
          },
          {
            text: "The precision of gesture recognition is amazing. I never thought it would be so easy to navigate without touching the mouse.",
            name: "Nicolas Marulanda",
            username: "@nicolasmarulanda"
          },
          {
            text: "As a developer, this application has helped me a lot. I can switch between apps and control volume without interrupting my coding.",
            name: "John Marulanda",
            username: "@johnmarulanda"
          },
          {
            text: "I was surprised how quickly I learned to use GestOS. The gestures are so natural they feel like an extension of my own body.",
            name: "Maria Valero",
            username: "@mariavalero"
          },
          {
            text: "Excellent for presentations. I can control slides and volume from anywhere in the room just with my hands.",
            name: "Carlos Guerrero",
            username: "@carlosguerrero"
          },
          {
            text: "The computer vision technology is impressive. It works perfectly even in low light conditions.",
            name: "Daniel Casallas",
            username: "@danielcasallas"
          },
          {
            text: "As a designer, I really value being able to control my workspace more fluidly. GestOS gives me that creative freedom.",
            name: "Juan Ruiz",
            username: "@juanruiz"
          },
          {
            text: "Perfect for when I have my hands busy cooking. I can change the music or volume without touching anything.",
            name: "Pepito Perez",
            username: "@pepitoperez"
          },
          {
            text: "The interface is very intuitive and the gestures are easy to remember. My grandchildren also use it without problems.",
            name: "Pepa Pig",
            username: "@pepapig"
          }
        ]
      },
      // CallToAction
      callToAction: {
        title: "Join the gesture revolution",
        subtitle: "Be part of the next generation of user interfaces.",
        description: "Download GestOS today and experience a new way to interact with technology. Simple, intuitive and completely revolutionary.",
        primaryButton: "Download now",
        secondaryButton: "Watch demo",
        downloadText: "Download for"
      },
      // Beta Modal
      betaModal: {
        title: "Desktop Application",
        warning: {
          title: "As a desktop application, it is recommended to contact the developer directly to obtain the beta version.",
          security: "This ensures the security of your computer and allows testing in a controlled and reviewed environment."
        },
        contact: {
          instruction: "To request the beta version, send an email to:",
          subject: "Beta Request",
          copyButton: "Copy",
          copiedButton: "Copied!",
          openEmailButton: "Open Email Client"
        },
        buttons: {
          continueViewing: "Continue Viewing",
          close: "Close"
        }
      },
      // VideoDemo
      videoDemo: {
        badge: "Live demonstration",
        title: "See GestOS in action",
        description: "Discover all the capabilities of our gesture recognition system through this comprehensive demo video.",
        previewText: "Click to watch the complete demonstration of GestOS in action",
        watchButton: "Watch Demo Video",
        stats: {
          duration: "Duration",
          features: "Features",
          quality: "Quality"
        },
        gestures: {
          title: "Recognized Gestures",
          subtitle: "8 gestures available in real time",
          list: [
            { emoji: "✋", name: "Open Palm" },
            { emoji: "✊", name: "Closed Fist" },
            { emoji: "👍", name: "Thumb Up" },
            { emoji: "👎", name: "Thumb Down" },
            { emoji: "☝️", name: "Pointing" },
            { emoji: "✌️", name: "Victory" },
            { emoji: "🤟", name: "I Love You" },
            { emoji: "🫳", name: "None" }
          ]
        },
        callToAction: {
          title: "Ready to try it yourself?",
          description: "After watching the video, download GestOS and experience gesture control on your own device.",
          button: "Download Now"
        }
      },
      // Footer
      footer: {
        description: "GestOS revolutionizes human-computer interaction through real-time gesture recognition.",
        nav: {
          home: "Home",
          demo: "Features", 
          whatIs: "What is it?",
          information: "Information",
          testimonials: "Testimonials",
          download: "Download"
        },
        links: {
          product: "Product",
          features: "Features",
          integrations: "Integrations",
          updates: "Updates",
          company: "Company",
          about: "About",
          blog: "Blog",
          careers: "Careers",
          support: "Support",
          resources: "Resources",
          contact: "Contact"
        },
        copyright: "© 2025 GestOS, Inc. All rights reserved."
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es', // idioma por defecto
    fallbackLng: 'es',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },

    react: {
      useSuspense: false
    }
  });

// Forzar idioma español si no hay idioma guardado
if (typeof window !== 'undefined') {
  const savedLanguage = localStorage.getItem('i18nextLng');
  if (!savedLanguage || savedLanguage === 'undefined') {
    localStorage.setItem('i18nextLng', 'es');
    i18n.changeLanguage('es');
  }
}

export default i18n; 