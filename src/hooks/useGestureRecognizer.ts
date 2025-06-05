import { useCallback, useEffect, useRef, useState } from 'react'
import { GestureRecognizer, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision'

export interface GestureResult {
  gesture: string
  confidence: number
  handedness: string
}

export interface FingerState {
  thumb: number      // 0 = cerrado, 1 = extendido
  index: number      // 0 = cerrado, 1 = extendido
  middle: number     // 0 = cerrado, 1 = extendido
  ring: number       // 0 = cerrado, 1 = extendido
  pinky: number      // 0 = cerrado, 1 = extendido
}

export const useGestureRecognizer = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [currentGesture, setCurrentGesture] = useState<GestureResult | null>(null)
  const [currentFingers, setCurrentFingers] = useState<FingerState | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const gestureRecognizerRef = useRef<GestureRecognizer | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const lastVideoTimeRef = useRef(-1)
  const isInitializingRef = useRef(false)

  // Gestos disponibles
  const availableGestures = [
    "None", 
    "Closed_Fist", 
    "Open_Palm", 
    "Pointing_Up", 
    "Thumb_Down", 
    "Thumb_Up", 
    "Victory", 
    "ILoveYou"
  ]

  // Traducciones de los gestos
  const gestureTranslations: Record<string, string> = {
    "None": "Ninguno",
    "Closed_Fist": "Puño Cerrado",
    "Open_Palm": "Palma Abierta", 
    "Pointing_Up": "Apuntando Arriba",
    "Thumb_Down": "Pulgar Abajo",
    "Thumb_Up": "Pulgar Arriba", 
    "Victory": "Victoria",
    "ILoveYou": "Te Amo"
  }

  // Función para detectar dedos extendidos usando landmarks
  const detectFingerStates = useCallback((landmarks: any[]) => {
    if (!landmarks || landmarks.length === 0) return null

    const handLandmarks = landmarks[0] // Usar la primera mano detectada
    
    // Índices de landmarks según MediaPipe Hand Landmarker
    // Referencia: https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker
    const fingerTips = [4, 8, 12, 16, 20]     // Puntas de los dedos
    const fingerPips = [3, 6, 10, 14, 18]     // Articulaciones medias
    
    const fingers: FingerState = {
      thumb: 0,
      index: 0,
      middle: 0,
      ring: 0,
      pinky: 0
    }

    // Detectar pulgar (comparación horizontal - eje X)
    if (handLandmarks[4].x > handLandmarks[3].x) {
      fingers.thumb = 1
    }

    // Detectar otros dedos (comparación vertical - eje Y)
    // Si la punta está más arriba que la articulación media, el dedo está extendido
    const fingerNames: (keyof FingerState)[] = ['index', 'middle', 'ring', 'pinky']
    
    for (let i = 1; i < 5; i++) {
      if (handLandmarks[fingerTips[i]].y < handLandmarks[fingerPips[i]].y) {
        fingers[fingerNames[i - 1]] = 1
      }
    }

    return fingers
  }, [])

  // Función para verificar el easter egg [0,0,1,0,0]
  const checkEasterEgg = useCallback((fingers: FingerState) => {
    return (
      fingers.thumb === 0 &&
      fingers.index === 0 &&
      fingers.middle === 1 &&
      fingers.ring === 0 &&
      fingers.pinky === 0
    )
  }, [])

  // Función para manejar errores de extensiones del navegador
  const suppressBrowserExtensionErrors = () => {
    const originalConsoleError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      if (
        message.includes('message channel closed') ||
        message.includes('Extension context invalidated') ||
        message.includes('A listener indicated an asynchronous response')
      ) {
        // Suprimir estos errores de extensiones
        return
      }
      originalConsoleError.apply(console, args)
    }
  }

  // Inicializar MediaPipe con mejor manejo de errores
  const initializeGestureRecognizer = useCallback(async () => {
    if (isInitializingRef.current || isInitialized) {
      return
    }

    isInitializingRef.current = true
    
    try {
      setError(null)
      suppressBrowserExtensionErrors()
      console.log('Inicializando reconocedor de gestos...')
      
      // Timeout para evitar que la inicialización se cuelgue
      const initPromise = new Promise<GestureRecognizer>(async (resolve, reject) => {
        try {
          // Resolver el conjunto de archivos de visión
          const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
          )

          let gestureRecognizer = null
          
          // Intentar primero con el modelo de Google (más confiable)
          try {
            console.log('Cargando modelo de Google...')
            gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
              baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
                delegate: "CPU" // Usar CPU por defecto para mayor compatibilidad
              },
              runningMode: "VIDEO",
              numHands: 1 // Reducir a 1 mano para mejor rendimiento
            })
            console.log('Modelo de Google cargado exitosamente')
          } catch (remoteError) {
            console.warn('Error cargando modelo remoto, intentando con modelo local:', remoteError)
            
            // Fallback al modelo local
            gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
              baseOptions: {
                modelAssetPath: "/models/gesture_recognizer.task",
                delegate: "CPU"
              },
              runningMode: "VIDEO",
              numHands: 1
            })
            console.log('Modelo local cargado exitosamente')
          }

          resolve(gestureRecognizer)
        } catch (err) {
          reject(err)
        }
      })

      // Timeout de 30 segundos
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Timeout al inicializar MediaPipe')), 30000)
      })

      const gestureRecognizer = await Promise.race([initPromise, timeoutPromise])

      gestureRecognizerRef.current = gestureRecognizer
      setIsInitialized(true)
      console.log('Reconocedor de gestos inicializado correctamente')
      
    } catch (err) {
      console.error('Error inicializando el reconocedor de gestos:', err)
      setError('Error al cargar el reconocedor de gestos. Intenta recargar la página.')
    } finally {
      isInitializingRef.current = false
    }
  }, [isInitialized])

  // Procesar frame de video con mejor manejo de errores
  const processVideoFrame = useCallback((video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    if (!gestureRecognizerRef.current || !isRecognizing) return

    const canvasCtx = canvas.getContext('2d')
    if (!canvasCtx) return

    // Validar que el video tenga dimensiones válidas
    if (!video.videoWidth || !video.videoHeight || video.videoWidth === 0 || video.videoHeight === 0) {
      // Si el video no está listo, reintentar en el próximo frame
      if (isRecognizing) {
        animationIdRef.current = requestAnimationFrame(() => 
          processVideoFrame(video, canvas)
        )
      }
      return
    }

    const nowInMs = Date.now()
    
    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime
      
      try {
        // Configurar canvas ANTES de usar MediaPipe
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
        }

        const results = gestureRecognizerRef.current.recognizeForVideo(video, nowInMs)
        
        // Limpiar canvas
        canvasCtx.save()
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
        
        const drawingUtils = new DrawingUtils(canvasCtx)

        // Dibujar landmarks de las manos solo si hay resultados
        if (results.landmarks && results.landmarks.length > 0) {
          for (const landmarks of results.landmarks) {
            drawingUtils.drawConnectors(
              landmarks,
              GestureRecognizer.HAND_CONNECTIONS,
              {
                color: "#00FF00",
                lineWidth: 3
              }
            )
            drawingUtils.drawLandmarks(landmarks, {
              color: "#FF0000",
              lineWidth: 2
            })
          }

          // Detectar estados de dedos para easter egg
          const fingerStates = detectFingerStates(results.landmarks)
          if (fingerStates) {
            setCurrentFingers(fingerStates)
            
            // Verificar easter egg
            if (checkEasterEgg(fingerStates)) {
              console.log('🎉 Easter egg detectado! [0,0,1,0,0]')
              // Emitir evento personalizado para el easter egg
              window.dispatchEvent(new CustomEvent('gestureEasterEgg', { 
                detail: { fingerStates } 
              }))
            }
          }
        } else {
          setCurrentFingers(null)
        }
        
        canvasCtx.restore()

        // Procesar gestos detectados
        if (results.gestures && results.gestures.length > 0 && results.handednesses && results.handednesses.length > 0) {
          const gesture = results.gestures[0][0]
          const handedness = results.handednesses[0][0]
          
          setCurrentGesture({
            gesture: gestureTranslations[gesture.categoryName] || gesture.categoryName,
            confidence: Math.round(gesture.score * 100),
            handedness: handedness.displayName === 'Left' ? 'Izquierda' : 'Derecha'
          })
        } else {
          setCurrentGesture(null)
        }
        
      } catch (err) {
        // Solo mostrar errores que no sean de extensiones
        const errorMessage = String(err)
        if (!errorMessage.includes('message channel') && !errorMessage.includes('Extension context')) {
          console.error('Error procesando frame:', err)
        }
        // No parar el reconocimiento por un error de frame, continuar con el siguiente
      }
    }

    if (isRecognizing) {
      animationIdRef.current = requestAnimationFrame(() => 
        processVideoFrame(video, canvas)
      )
    }
  }, [isRecognizing, gestureTranslations, detectFingerStates, checkEasterEgg])

  // Iniciar reconocimiento
  const startRecognition = useCallback((video: HTMLVideoElement, canvas: HTMLCanvasElement) => {
    if (!gestureRecognizerRef.current) {
      setError('El reconocedor no está inicializado')
      return
    }

    setIsRecognizing(true)
    setError(null)
    processVideoFrame(video, canvas)
  }, [processVideoFrame])

  // Detener reconocimiento
  const stopRecognition = useCallback(() => {
    setIsRecognizing(false)
    setCurrentGesture(null)
    setCurrentFingers(null)
    
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      animationIdRef.current = null
    }
  }, [])

  // Limpiar recursos
  useEffect(() => {
    return () => {
      stopRecognition()
      if (gestureRecognizerRef.current) {
        try {
          gestureRecognizerRef.current.close?.()
        } catch (err) {
          // Ignorar errores de limpieza
        }
      }
    }
  }, [stopRecognition])

  return {
    isInitialized,
    isRecognizing,
    currentGesture,
    currentFingers,
    error,
    availableGestures,
    gestureTranslations,
    initializeGestureRecognizer,
    startRecognition,
    stopRecognition
  }
} 