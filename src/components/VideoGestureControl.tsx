import { motion, AnimatePresence } from 'framer-motion'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback } from 'react'
import { Play, Pause, SkipForward, SkipBack, Loader2, AlertCircle, Youtube, Eye, Volume2 } from 'lucide-react'
import { useGestureRecognizer, GestureResult } from '@/hooks/useGestureRecognizer'
import { useTranslation } from 'react-i18next'

export interface VideoGestureControlRef {
  startCamera: () => Promise<void>
  stopCamera: () => void
  restartCamera: () => Promise<void>
}

interface VideoGestureControlProps {
  isActive: boolean
  onToggle?: (active: boolean) => void
}

// Declarar la API de YouTube para TypeScript
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

// Componente para mostrar el gesto y la acción de video
interface VideoGestureDisplayProps {
  gesture: GestureResult | null
  isRecognizing: boolean
  lastAction: string | null
}

const VideoGestureDisplay: React.FC<VideoGestureDisplayProps> = ({ gesture, isRecognizing, lastAction }) => {
  const { t } = useTranslation();
  
  const getActionForGesture = (gestureName: string) => {
    switch (gestureName) {
      case 'Pulgar Arriba':
        return { action: t('productShowcase.demos.video.controls.0.action'), icon: SkipForward, color: 'text-green-400' }
      case 'Pulgar Abajo':
        return { action: t('productShowcase.demos.video.controls.1.action'), icon: SkipBack, color: 'text-red-400' }
      case 'Te Amo':
        return { action: t('productShowcase.demos.video.controls.2.action'), icon: Play, color: 'text-blue-400' }
      default:
        return null
    }
  }

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
          <div className="bg-black/80 backdrop-blur-md rounded-xl p-4 text-white min-w-[220px]">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">{t('productShowcase.demos.video.activeStatus')}</span>
            </div>
            
            {gesture && getActionForGesture(gesture.gesture) ? (
              <motion.div
                key={gesture.gesture}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-blue-300">{gesture.gesture}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                
                {(() => {
                  const actionInfo = getActionForGesture(gesture.gesture)
                  const ActionIcon = actionInfo?.icon
                  return actionInfo && ActionIcon ? (
                    <div className={`flex items-center gap-2 ${actionInfo.color}`}>
                      <ActionIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{actionInfo.action}</span>
                    </div>
                  ) : null
                })()}
                
                <div className="text-xs text-gray-300">
                  {t('productShowcase.gestureRecognition.confidence')}: {gesture.confidence}% | {gesture.handedness}
                </div>
              </motion.div>
            ) : (
              <div className="text-sm text-gray-400">
                {t('productShowcase.videoControl.useGestures')}
              </div>
            )}

            {lastAction && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-3 pt-2 border-t border-gray-600"
              >
                <div className="text-xs text-yellow-400">
                  {t('productShowcase.videoControl.lastAction')}: {lastAction}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Componente del reproductor de video con control real
interface VideoPlayerProps {
  onVideoAction: (action: string) => void
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onVideoAction }) => {
  const { t } = useTranslation();
  const playerRef = useRef<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Video de demostración - un video educativo de tecnología
  const videoId = "M7lc1UVf-VE" // TED Talk sobre IA - cambiar por el video que prefieras

  // Cargar la API de YouTube
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT) {
        initializePlayer()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.body.appendChild(script)

      window.onYouTubeIframeAPIReady = () => {
        initializePlayer()
      }
    }

    const initializePlayer = () => {
      if (!window.YT || !window.YT.Player) {
        console.error('YouTube API no disponible')
        return
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          fs: 1,
          iv_load_policy: 3
        },
        events: {
          onReady: (event: any) => {
            console.log('YouTube player listo')
            setIsPlayerReady(true)
            setDuration(event.target.getDuration())
          },
          onStateChange: (event: any) => {
            const state = event.data
            setIsPlaying(state === window.YT.PlayerState.PLAYING)
            
            if (state === window.YT.PlayerState.PLAYING) {
              // Actualizar tiempo cada segundo
              const updateTime = () => {
                if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
                  setCurrentTime(playerRef.current.getCurrentTime())
                  if (isPlaying) {
                    setTimeout(updateTime, 1000)
                  }
                }
              }
              updateTime()
            }
          }
        }
      })
    }

    loadYouTubeAPI()

    return () => {
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy()
      }
    }
  }, [videoId])

  // Funciones de control del video
  const seekForward = useCallback(() => {
    if (!playerRef.current || !isPlayerReady) return
    
    try {
      const currentTime = playerRef.current.getCurrentTime()
      const newTime = Math.min(currentTime + 10, duration)
      playerRef.current.seekTo(newTime, true)
      onVideoAction('forward')
      console.log(`Video adelantado a ${newTime}s`)
    } catch (error) {
      console.error('Error adelantando video:', error)
    }
  }, [isPlayerReady, duration, onVideoAction])

  const seekBackward = useCallback(() => {
    if (!playerRef.current || !isPlayerReady) return
    
    try {
      const currentTime = playerRef.current.getCurrentTime()
      const newTime = Math.max(currentTime - 10, 0)
      playerRef.current.seekTo(newTime, true)
      onVideoAction('backward')
      console.log(`Video retrocedido a ${newTime}s`)
    } catch (error) {
      console.error('Error retrocediendo video:', error)
    }
  }, [isPlayerReady, onVideoAction])

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current || !isPlayerReady) return
    
    try {
      const state = playerRef.current.getPlayerState()
      if (state === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo()
        console.log('Video pausado')
      } else {
        playerRef.current.playVideo()
        console.log('Video reproducido')
      }
      onVideoAction('play_pause')
    } catch (error) {
      console.error('Error pausando/reproduciendo video:', error)
    }
  }, [isPlayerReady, onVideoAction])

  // Exponer funciones para uso externo
  useEffect(() => {
    window.videoControls = {
      seekForward,
      seekBackward,
      togglePlayPause
    }
  }, [seekForward, seekBackward, togglePlayPause])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      {/* Contenedor del reproductor de YouTube */}
      <div id="youtube-player" className="w-full h-full" />
      
      {/* Overlay de controles de gestos */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-2">
              <Youtube className="w-4 h-4 text-red-500" />
              <span>{t('productShowcase.videoControl.gestureControl')}</span>
              {isPlayerReady && (
                <span className="text-xs opacity-75">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={seekBackward}
                className="flex items-center gap-1 hover:text-red-400 transition-colors disabled:opacity-50"
                disabled={!isPlayerReady}
                title={`${t('productShowcase.demos.video.controls.1.action')} (👎)`}
              >
                <SkipBack className="w-4 h-4" />
                <span className="text-xs">👎</span>
              </button>
              
              <button
                onClick={togglePlayPause}
                className="flex items-center gap-1 hover:text-blue-400 transition-colors disabled:opacity-50"
                disabled={!isPlayerReady}
                title={`${t('productShowcase.demos.video.controls.2.action')} (🤟)`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span className="text-xs">🤟</span>
              </button>
              
              <button
                onClick={seekForward}
                className="flex items-center gap-1 hover:text-green-400 transition-colors disabled:opacity-50"
                disabled={!isPlayerReady}
                title={`${t('productShowcase.demos.video.controls.0.action')} (👍)`}
              >
                <SkipForward className="w-4 h-4" />
                <span className="text-xs">👍</span>
              </button>
            </div>
          </div>
          
          {isPlayerReady && (
            <div className="mt-2">
              <div className="w-full bg-gray-600 rounded-full h-1">
                <div 
                  className="bg-red-600 h-1 rounded-full transition-all duration-200"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {!isPlayerReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-white text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p className="text-sm">{t('productShowcase.videoControl.loading')}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export const VideoGestureControl = forwardRef<VideoGestureControlRef, VideoGestureControlProps>(
  ({ isActive, onToggle }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isStreaming, setIsStreaming] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [lastAction, setLastAction] = useState<string | null>(null)
    const [actionCooldown, setActionCooldown] = useState(false)

    const {
      isInitialized,
      isRecognizing,
      currentGesture,
      error: gestureError,
      initializeGestureRecognizer,
      startRecognition,
      stopRecognition
    } = useGestureRecognizer()

    const { t } = useTranslation();

    // Manejar acciones de video basadas en gestos
    const handleVideoAction = useCallback((action: string) => {
      const actionMessages: Record<string, string> = {
        forward: t('productShowcase.videoControl.actions.forward'),
        backward: t('productShowcase.videoControl.actions.backward'),
        play_pause: t('productShowcase.videoControl.actions.playPause')
      }
      
      setLastAction(actionMessages[action] || action)
      
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => setLastAction(null), 3000)
    }, [t])

    // Procesar gestos para control de video REAL
    useEffect(() => {
      if (currentGesture && isActive && !actionCooldown) {
        let action = ''
        
        switch (currentGesture.gesture) {
          case 'Pulgar Arriba':
            action = 'forward'
            break
          case 'Pulgar Abajo':
            action = 'backward'
            break
          case 'Te Amo':
            action = 'play_pause'
            break
          default:
            return
        }

        if (action && currentGesture.confidence > 70) {
          // Ejecutar acción REAL en el video
          if (window.videoControls) {
            switch (action) {
              case 'forward':
                window.videoControls.seekForward()
                break
              case 'backward':
                window.videoControls.seekBackward()
                break
              case 'play_pause':
                window.videoControls.togglePlayPause()
                break
            }
          }
          
          handleVideoAction(action)
          
          // Cooldown de 2 segundos para evitar acciones repetidas
          setActionCooldown(true)
          setTimeout(() => setActionCooldown(false), 2000)
        }
      }
    }, [currentGesture, isActive, actionCooldown, handleVideoAction])

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
            width: { ideal: 640, max: 1280 },
            height: { ideal: 480, max: 720 },
            facingMode: 'user'
          }
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsStreaming(true)

          const handleVideoReady = () => {
            if (videoRef.current && canvasRef.current && isInitialized) {
              const video = videoRef.current
              const canvas = canvasRef.current
              
              setTimeout(() => {
                if (video.videoWidth > 0 && video.videoHeight > 0) {
                  canvas.width = video.videoWidth
                  canvas.height = video.videoHeight
                  
                  if (isActive) {
                    startRecognition(video, canvas)
                  }
                } else {
                  setTimeout(handleVideoReady, 100)
                }
              }, 100)
            }
          }

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
    }, [isActive, isInitialized, startRecognition])

    const stopCamera = useCallback(() => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
      
      stopRecognition()
      setIsStreaming(false)
      console.log('Control de video desactivado')
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
        // Limpiar controles globales
        delete window.videoControls
      }
    }, [stopCamera])

    useImperativeHandle(ref, () => ({
      startCamera,
      stopCamera,
      restartCamera
    }))

    const displayError = error || gestureError

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reproductor de Video */}
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              {t('productShowcase.videoControl.title')}
            </h3>
            <VideoPlayer onVideoAction={handleVideoAction} />
            
            {/* Instrucciones */}
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">{t('productShowcase.videoControl.instructions')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-purple-700">
                {(t('productShowcase.demos.video.controls', { returnObjects: true }) as Array<{
                  gesture: string;
                  action: string;
                }>).map((control, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span>{control.gesture}</span>
                    <span>{control.action}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-purple-600 mt-2">
                {t('productShowcase.videoControl.instructionText')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Cámara de Control */}
        <div className="order-1 lg:order-2">
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-100 border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="relative aspect-video bg-gray-900 overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />

              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full scale-x-[-1] pointer-events-none"
              />

              <VideoGestureDisplay 
                gesture={currentGesture} 
                isRecognizing={isRecognizing}
                lastAction={lastAction}
              />

              {loading && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="flex flex-col items-center text-white max-w-sm text-center">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <p className="text-sm mb-2">{t('productShowcase.demos.video.loading')}</p>
                  </div>
                </motion.div>
              )}

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

              <AnimatePresence>
                {!isActive && !loading && !displayError && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Volume2 className="w-12 sm:w-16 h-12 sm:h-16 text-white/70 mb-4" />
                    <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 text-center">
                      {t('productShowcase.videoControl.controlTitle')}
                    </h3>
                    <p className="text-white/90 text-center font-medium text-sm sm:text-base mb-2">
                      {t('productShowcase.videoControl.controlSubtitle')}
                    </p>
                    <div className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <span className="text-white text-sm">{t('productShowcase.videoControl.gestureControls')}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isStreaming && isRecognizing && (
                <motion.div
                  className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-medium">{t('productShowcase.states.controllingVideo')}</span>
                </motion.div>
              )}

              {/* Cooldown indicator */}
              {actionCooldown && (
                <motion.div
                  className="absolute bottom-4 left-4 px-3 py-1 bg-yellow-500/80 backdrop-blur-sm rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <span className="text-black text-xs font-medium">{t('productShowcase.states.cooldown')}</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }
)

VideoGestureControl.displayName = 'VideoGestureControl'

// Declarar controles globales para TypeScript
declare global {
  interface Window {
    videoControls?: {
      seekForward: () => void
      seekBackward: () => void
      togglePlayPause: () => void
    }
  }
} 