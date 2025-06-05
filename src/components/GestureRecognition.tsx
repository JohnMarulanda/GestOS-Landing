import { motion, AnimatePresence } from 'framer-motion'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback } from 'react'
import { Hand, Loader2, Eye, AlertCircle, Bug, Zap } from 'lucide-react'
import { useGestureRecognizer, GestureResult, FingerState } from '@/hooks/useGestureRecognizer'
import { GestureDebug } from './GestureDebug'
import { useTranslation } from 'react-i18next'

export interface GestureRecognitionRef {
  startCamera: () => Promise<void>
  stopCamera: () => void
  restartCamera: () => Promise<void>
}

interface GestureRecognitionProps {
  isActive: boolean
  onToggle?: (active: boolean) => void
}

// Componente para mostrar el gesto detectado
interface GestureDisplayProps {
  gesture: GestureResult | null
  isRecognizing: boolean
}

const GestureDisplay: React.FC<GestureDisplayProps> = ({ gesture, isRecognizing }) => {
  const { t } = useTranslation();
  
  return (
    <AnimatePresence>
      {isRecognizing && (
        <motion.div
          className="absolute top-4 right-4 z-10"
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 text-white min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">{t('productShowcase.states.recognizing')}</span>
            </div>
            
            {gesture ? (
              <motion.div
                key={gesture.gesture}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <div className="text-lg font-bold text-blue-300">
                  {gesture.gesture}
                </div>
                <div className="text-xs text-gray-300">
                  {t('productShowcase.gestureRecognition.confidence')}: {gesture.confidence}%
                </div>
                <div className="text-xs text-gray-400">
                  {t('productShowcase.gestureRecognition.hand')}: {gesture.handedness}
                </div>
              </motion.div>
            ) : (
              <div className="text-sm text-gray-400">
                {t('productShowcase.gestureRecognition.showGesture')}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente para mostrar el estado de los dedos (Easter Egg Debug)
interface FingerDisplayProps {
  fingers: FingerState | null
  isRecognizing: boolean
  showFingers: boolean
}

const FingerDisplay: React.FC<FingerDisplayProps> = ({ fingers, isRecognizing, showFingers }) => {
  const { t } = useTranslation();
  const fingerNames = ['👍', '☝️', '🖕', '💍', '🤙']
  const fingerLabels = t('productShowcase.gestureRecognition.debug.fingerNames', { returnObjects: true }) as string[]
  
  return (
    <AnimatePresence>
      {isRecognizing && showFingers && (
        <motion.div
          className="absolute top-4 left-4 z-10"
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-3 text-white min-w-[180px]">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-xs font-medium text-yellow-400">{t('productShowcase.gestureRecognition.debug.fingerStates')}</span>
            </div>
            
            {fingers ? (
              <div className="space-y-1">
                {Object.entries(fingers).map(([key, value], index) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1">
                      <span>{fingerNames[index]}</span>
                      <span className="text-gray-300">{fingerLabels[index]}</span>
                    </span>
                    <span className={`font-mono ${value === 1 ? 'text-green-400' : 'text-red-400'}`}>
                      {value}
                    </span>
                  </div>
                ))}
                
                <div className="mt-2 pt-2 border-t border-gray-600">
                  <div className="text-[10px] text-gray-400 text-center">
                    {t('productShowcase.gestureRecognition.debug.debugMessage')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-400">
                {t('productShowcase.gestureRecognition.debug.noFingers')}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente para notificación de Easter Egg
interface EasterEggNotificationProps {
  show: boolean
  onClose: () => void
}

const EasterEggNotification: React.FC<EasterEggNotificationProps> = ({ show, onClose }) => {
  const { t } = useTranslation();
  
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-2xl text-white text-center shadow-2xl max-w-sm mx-4"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="text-4xl mb-3">😠</div>
            <h3 className="text-xl font-bold mb-2">{t('productShowcase.gestureRecognition.easterEgg.title')}</h3>
            <p className="text-sm opacity-90 mb-3">
              {t('productShowcase.gestureRecognition.easterEgg.subtitle')}
            </p>
            <p className="text-xs opacity-75">
              {t('productShowcase.gestureRecognition.easterEgg.message')}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const GestureRecognition = forwardRef<GestureRecognitionRef, GestureRecognitionProps>(
  ({ isActive, onToggle }, ref) => {
    const { t } = useTranslation();
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isStreaming, setIsStreaming] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showDebug, setShowDebug] = useState(false)
    const [showFingers, setShowFingers] = useState(false)
    const [showEasterEgg, setShowEasterEgg] = useState(false)
    const easterEggCooldownRef = useRef(false)

    const {
      isInitialized,
      isRecognizing,
      currentGesture,
      currentFingers,
      error: gestureError,
      initializeGestureRecognizer,
      startRecognition,
      stopRecognition
    } = useGestureRecognizer()

    // Manejar Easter Egg
    const handleEasterEgg = useCallback(() => {
      if (easterEggCooldownRef.current) return
      
      easterEggCooldownRef.current = true
      setShowEasterEgg(true)
      
      // Cooldown de 5 segundos para evitar spam
      setTimeout(() => {
        easterEggCooldownRef.current = false
      }, 5000)
    }, [])

    // Escuchar evento de Easter Egg
    useEffect(() => {
      const handleGestureEasterEgg = (event: CustomEvent) => {
        console.log('🚫 Gesto inapropiado detectado [0,0,1,0,0] - Mostrando mensaje educativo')
        handleEasterEgg()
      }

      window.addEventListener('gestureEasterEgg', handleGestureEasterEgg as EventListener)
      
      return () => {
        window.removeEventListener('gestureEasterEgg', handleGestureEasterEgg as EventListener)
      }
    }, [handleEasterEgg])

    // Inicializar MediaPipe cuando el componente se monta
    useEffect(() => {
      if (!isInitialized) {
        initializeGestureRecognizer()
      }
    }, [isInitialized, initializeGestureRecognizer])

    const startCamera = useCallback(async () => {
      if (!videoRef.current || !canvasRef.current) return

      setLoading(true)
      setError(null)

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280, max: 1920 },
            height: { ideal: 720, max: 1080 },
            facingMode: 'user'
          }
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsStreaming(true)

          // Esperar a que el video esté completamente cargado
          const handleVideoReady = () => {
            if (videoRef.current && canvasRef.current && isInitialized) {
              // Configurar canvas con las dimensiones del video
              const video = videoRef.current
              const canvas = canvasRef.current
              
              // Esperar un frame para asegurar que las dimensiones están disponibles
              setTimeout(() => {
                if (video.videoWidth > 0 && video.videoHeight > 0) {
                  canvas.width = video.videoWidth
                  canvas.height = video.videoHeight
                  
                  // Iniciar reconocimiento solo si está activo
                  if (isActive) {
                    startRecognition(video, canvas)
                  }
                } else {
                  console.warn('Video dimensions not ready, retrying...')
                  // Reintentar después de un momento
                  setTimeout(handleVideoReady, 100)
                }
              }, 100)
            }
          }

          // Usar multiple events para asegurar que capturamos cuando el video está listo
          videoRef.current.onloadedmetadata = handleVideoReady
          videoRef.current.oncanplay = handleVideoReady
          videoRef.current.onloadeddata = handleVideoReady
        }

      } catch (err) {
        console.error('Error accediendo a la cámara:', err)
        setError(t('productShowcase.gestureRecognition.cameraError'))
      } finally {
        setLoading(false)
      }
    }, [isActive, isInitialized, startRecognition, t])

    const stopCamera = useCallback(() => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
      
      stopRecognition()
      setIsStreaming(false)
      console.log('Cámara y reconocimiento desactivados')
    }, [stopRecognition])

    const restartCamera = useCallback(async () => {
      stopCamera()
      await new Promise(resolve => setTimeout(resolve, 500))
      await startCamera()
    }, [stopCamera, startCamera])

    // Manejar activación/desactivación
    useEffect(() => {
      if (isActive && isInitialized) {
        if (!isStreaming) {
          startCamera()
        } else if (videoRef.current && canvasRef.current) {
          startRecognition(videoRef.current, canvasRef.current)
        }
      } else {
        // Si no está activo, detener tanto el reconocimiento como la cámara
        stopRecognition()
        if (isStreaming) {
          stopCamera()
        }
      }
    }, [isActive, isInitialized, isStreaming, startCamera, startRecognition, stopRecognition, stopCamera])

    // Limpiar al desmontar
    useEffect(() => {
      return () => {
        stopCamera()
      }
    }, [stopCamera])

    useImperativeHandle(ref, () => ({
      startCamera,
      stopCamera,
      restartCamera
    }))

    const displayError = error || gestureError

    return (
      <motion.div
        className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-100 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Área de video */}
        <div className="relative aspect-video bg-gray-900 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover scale-x-[-1]"
            style={{ minHeight: '240px' }}
          />

          {/* Canvas para overlay de landmarks */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full scale-x-[-1] pointer-events-none"
            style={{ minHeight: '240px' }}
          />

          {/* Botones de control */}
          <div className="absolute bottom-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setShowFingers(!showFingers)}
              className={`p-2 backdrop-blur-sm rounded-full text-white transition-colors ${
                showFingers ? 'bg-yellow-500/70 hover:bg-yellow-500/90' : 'bg-black/50 hover:bg-black/70'
              }`}
              title="Toggle Finger States"
            >
              <Zap className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setShowDebug(!showDebug)}
              className={`p-2 backdrop-blur-sm rounded-full text-white transition-colors ${
                showDebug ? 'bg-blue-500/70 hover:bg-blue-500/90' : 'bg-black/50 hover:bg-black/70'
              }`}
              title="Toggle Debug Info"
            >
              <Bug className="w-4 h-4" />
            </button>
          </div>

          {/* Debug info */}
          <GestureDebug
            videoRef={videoRef}
            canvasRef={canvasRef}
            isInitialized={isInitialized}
            isRecognizing={isRecognizing}
            isStreaming={isStreaming}
            error={displayError}
            show={showDebug}
          />

          {/* Display de gesto detectado */}
          <GestureDisplay gesture={currentGesture} isRecognizing={isRecognizing} />

          {/* Display de dedos para Easter Egg */}
          <FingerDisplay fingers={currentFingers} isRecognizing={isRecognizing} showFingers={showFingers} />

          {/* Notificación de Easter Egg */}
          <EasterEggNotification 
            show={showEasterEgg} 
            onClose={() => setShowEasterEgg(false)} 
          />

          {/* Estado de carga */}
          {loading && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center text-white max-w-sm text-center">
                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                <p className="text-sm mb-2">{t('productShowcase.gestureRecognition.loading')}</p>
                <p className="text-xs text-gray-300">
                  {t('productShowcase.gestureRecognition.loadingDetails')}
                </p>
              </div>
            </motion.div>
          )}

          {/* Mensaje de error */}
          <AnimatePresence>
            {displayError && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center p-4 bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center text-white">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 text-red-400" />
                  <p className="text-red-400 text-sm mb-3">{displayError}</p>
                  <button
                    onClick={restartCamera}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
                  >
                    {t('productShowcase.gestureRecognition.retryButton')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mensaje cuando no está activo */}
          <AnimatePresence>
            {!isActive && !loading && !displayError && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-600/20 to-purple-600/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Hand className="w-12 sm:w-16 h-12 sm:h-16 text-white/70 mb-4" />
                <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 text-center">
                  {t('productShowcase.gestureRecognition.title')}
                </h3>
                <p className="text-white/90 text-center font-medium text-sm sm:text-base mb-2">
                  {t('productShowcase.gestureRecognition.subtitle')}
                </p>
                <p className="text-white/70 text-center text-xs">
                  {t('productShowcase.gestureRecognition.description')}
                </p>
                <div className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="text-white text-sm">{t('productShowcase.gestureRecognition.gesturesAvailable')}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicador de estado en vivo */}
          {isStreaming && isRecognizing && (
            <motion.div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white text-xs font-medium">{t('productShowcase.states.recognizing')}</span>
              {showFingers && (
                <>
                  <span className="text-white text-xs">•</span>
                  <span className="text-yellow-400 text-xs font-medium">DEDOS</span>
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* Panel de información de gestos disponibles */}
        {isActive && !currentGesture && isRecognizing && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 mx-auto max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-black/60 backdrop-blur-md rounded-lg p-3 text-white text-center">
              <p className="text-xs font-medium mb-2">{t('productShowcase.demos.gesture.availableGestures')}</p>
              <div className="text-[10px] text-gray-300 grid grid-cols-2 gap-1 mb-2">
                {(t('productShowcase.demos.gesture.gestureList', { returnObjects: true }) as string[]).map((gesture) => (
                  <span key={gesture}>{gesture}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  }
)

GestureRecognition.displayName = 'GestureRecognition' 