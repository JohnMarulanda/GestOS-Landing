"use client"

import { AnimatePresence, motion } from 'framer-motion'
import pyramidImage from "@/assets/hands/Up.png"
import tubImage from "@/assets/hands/Down.png"
import { Hand, Loader2, Eye, Play, Brain, Monitor, Camera, Zap, Smartphone } from 'lucide-react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GestureRecognition, GestureRecognitionRef } from '@/components/GestureRecognition'
import { VideoGestureControl, VideoGestureControlRef } from '@/components/VideoGestureControl'
import SimonSaysGame, { SimonSaysGameRef } from '@/components/SimonSaysGame'
import { useTranslation } from 'react-i18next'

// Registrar GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Tipos para las diferentes opciones de demostración
type DemoOption = 'gesture' | 'video' | 'simon'

// Componente Dock Icon para las opciones de demostración
interface DemoDockIconProps {
  icon: React.ElementType
  title: string
  description: string
  active?: boolean
  onClick: () => void
  loading?: boolean
  color?: string
}

const DemoDockIcon: React.FC<DemoDockIconProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  active, 
  onClick, 
  loading,
  color = 'blue'
}) => {
  const { t } = useTranslation();
  
  const colorClasses = {
    blue: active 
      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25' 
      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
    purple: active 
      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-purple-500/25' 
      : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200',
    green: active 
      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/25' 
      : 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200'
  }

  return (
    <motion.button
      className={`p-4 rounded-2xl transition-all duration-300 shadow-lg flex flex-col items-center gap-3 min-w-[280px] border ${
        colorClasses[color as keyof typeof colorClasses]
      } ${active ? 'scale-105' : ''}`}
      onClick={onClick}
      whileHover={{ scale: active ? 1.05 : 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading}
    >
      <div className="flex items-center gap-3 w-full">
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Icon className="w-6 h-6" />
        )}
        
        <div className="text-left flex-1">
          <h3 className="font-semibold text-lg">
            {title}
          </h3>
          <p className="text-sm opacity-75">
            {loading ? t('productShowcase.demos.gesture.loading') : description}
          </p>
        </div>
      </div>
      
      {!loading && (
        <div className="text-xs opacity-60 text-center">
          {active ? t('productShowcase.states.active') : t('productShowcase.states.clickToActivate')}
        </div>
      )}
    </motion.button>
  )
}

// Dock con múltiples opciones de demostración
interface MultiDemoProps {
  activeDemo: DemoOption | null
  onDemoChange: (demo: DemoOption | null) => void
  gestureLoading: boolean
  videoLoading: boolean
  simonLoading: boolean
}

const MultiDemoPanel: React.FC<MultiDemoProps> = ({
  activeDemo,
  onDemoChange,
  gestureLoading,
  videoLoading,
  simonLoading
}) => {
  const { t } = useTranslation();
  
  const demos = [
    {
      id: 'gesture' as DemoOption,
      icon: Hand,
      title: t('productShowcase.demos.gesture.title'),
      description: t('productShowcase.demos.gesture.description'),
      color: 'blue'
    },
    {
      id: 'video' as DemoOption,
      icon: Play,
      title: t('productShowcase.demos.video.title'),
      description: t('productShowcase.demos.video.description'),
      color: 'purple'
    },
    {
      id: 'simon' as DemoOption,
      icon: Brain,
      title: 'Simon Says',
      description: 'Juego de memoria con gestos',
      color: 'green'
    }
  ];

  const gestureList = t('productShowcase.demos.gesture.gestureList', { returnObjects: true }) as string[];
  const videoControls = t('productShowcase.demos.video.controls', { returnObjects: true }) as Array<{
    gesture: string;
    action: string;
  }>;

  const simonGestures = [
    { emoji: '✊', name: 'Puño' },
    { emoji: '✋', name: 'Palma' },
    { emoji: '✌️', name: 'Victoria' },
    { emoji: '👍', name: 'Arriba' },
    { emoji: '👎', name: 'Abajo' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <motion.div
        className="bg-white/70 backdrop-blur-lg rounded-3xl border border-white/30 shadow-2xl p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {t('productShowcase.demoPanel.title')}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {t('productShowcase.demoPanel.subtitle')}
          </p>
          
          {/* Aviso de rendimiento */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs">
            <div className="flex items-center justify-center gap-2 mb-1">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-amber-800 font-medium">{t('productShowcase.demoPanel.performanceWarning.title')}</span>
            </div>
            <p className="text-amber-700">
              {t('productShowcase.demoPanel.performanceWarning.description')}
            </p>
          </div>
        </div>

        {/* Demo Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mb-6">
          {demos.map((demo) => (
            <DemoDockIcon
              key={demo.id}
              icon={demo.icon}
              title={demo.title}
              description={demo.description}
              color={demo.color}
              active={activeDemo === demo.id}
              onClick={() => onDemoChange(activeDemo === demo.id ? null : demo.id)}
              loading={
                demo.id === 'gesture' ? gestureLoading :
                demo.id === 'video' ? videoLoading :
                demo.id === 'simon' ? simonLoading : false
              }
            />
          ))}
        </div>

        {/* Info Panel cuando hay algo activo */}
        <AnimatePresence>
          {activeDemo && (
            <motion.div
              className="pt-6 border-t border-gray-200/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <div className={`rounded-xl p-4 ${
                activeDemo === 'gesture' 
                  ? 'bg-gradient-to-r from-blue-50 to-cyan-50' 
                  : activeDemo === 'video'
                  ? 'bg-gradient-to-r from-purple-50 to-pink-50'
                  : 'bg-gradient-to-r from-green-50 to-emerald-50'
              }`}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Eye className={`w-5 h-5 ${
                      activeDemo === 'gesture' ? 'text-blue-600' : 
                      activeDemo === 'video' ? 'text-purple-600' :
                      'text-green-600'
                    }`} />
                    <span className={`font-semibold ${
                      activeDemo === 'gesture' ? 'text-blue-800' : 
                      activeDemo === 'video' ? 'text-purple-800' :
                      'text-green-800'
                    }`}>
                      {activeDemo === 'gesture' 
                        ? t('productShowcase.demos.gesture.activeStatus')
                        : activeDemo === 'video'
                        ? t('productShowcase.demos.video.activeStatus')
                        : 'Simon Says Activo'
                      }
                    </span>
                  </div>
                  
                  {activeDemo === 'gesture' ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-700 mb-3">
                      {gestureList.map((gesture) => (
                        <div key={gesture} className="bg-white/60 rounded-lg p-2">
                          <span className="font-medium">{gesture}</span>
                        </div>
                      ))}
                    </div>
                  ) : activeDemo === 'video' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-700 mb-3">
                      {videoControls.map((control, index) => (
                        <div key={index} className="bg-white/60 rounded-lg p-2 flex items-center gap-2">
                          <span className={`${
                            control.gesture === '👍' ? 'text-green-500' :
                            control.gesture === '👎' ? 'text-red-500' :
                            'text-blue-500'
                          }`}>{control.gesture}</span>
                          <span className="font-medium">{control.action}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs text-gray-700 mb-3">
                      {simonGestures.map((gesture, index) => (
                        <div key={index} className="bg-white/60 rounded-lg p-2 flex items-center gap-2">
                          <span className="text-lg">{gesture.emoji}</span>
                          <span className="font-medium">{gesture.name}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-600">
                    {activeDemo === 'gesture' 
                      ? t('productShowcase.demos.gesture.instructions')
                      : activeDemo === 'video'
                      ? t('productShowcase.demos.video.instructions')
                      : 'Memoriza y repite las secuencias de gestos para entrenar tu memoria'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// Componente de recomendación para móviles
const MobileRecommendation: React.FC = () => {
  const { t } = useTranslation();
  
  const requirements = t('productShowcase.mobileRecommendation.requirements', { returnObjects: true }) as string[];
  
  return (
    <motion.div
      className="lg:hidden w-full max-w-4xl mx-auto px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
    >
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200/60 shadow-2xl p-4 sm:p-6 md:p-8 overflow-hidden">
        {/* Header con icono */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 sm:p-3 rounded-xl">
              <Monitor className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 px-2">
            {t('productShowcase.mobileRecommendation.title')}
          </h3>
          <p className="text-gray-600 text-base sm:text-lg px-2">
            {t('productShowcase.mobileRecommendation.subtitle')}
          </p>
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <p className="text-gray-700 text-center mb-4 font-medium text-sm sm:text-base px-2">
            {t('productShowcase.mobileRecommendation.description')}
          </p>
          
          {/* Lista de requisitos */}
          <div className="grid grid-cols-1 gap-3">
            {requirements.map((requirement, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-white/80 rounded-xl p-3 border border-gray-100 mx-auto max-w-sm w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-cyan-500 text-lg flex-shrink-0">{requirement.split(' ')[0]}</div>
                <span className="text-gray-700 text-sm sm:text-base font-medium break-words">
                  {requirement.substring(requirement.indexOf(' ') + 1)}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recomendación principal */}
        <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-teal-50 border border-cyan-200/50 rounded-2xl p-4 sm:p-6 text-center">
          <p className="text-base sm:text-lg mb-4 font-medium text-gray-800 px-2">
            {t('productShowcase.mobileRecommendation.recommendation')}
          </p>
          
          <motion.button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-4 sm:px-6 rounded-xl shadow-lg inline-flex items-center gap-2 transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              // Copiar URL al portapapeles para facilitar el acceso
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            <Monitor className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="break-words">{t('productShowcase.mobileRecommendation.cta')}</span>
          </motion.button>
          
          <p className="text-cyan-600 text-xs mt-3">
            💡 URL copiada al portapapeles
          </p>
        </div>

        {/* Iconos decorativos */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-6 opacity-40">
          <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          <Hand className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
          <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
        </div>
      </div>
    </motion.div>
  )
}

// Componente principal del ProductShowcase actualizado
export const ProductShowcase = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const pyramidRef = useRef<HTMLImageElement>(null)
  const tubRef = useRef<HTMLImageElement>(null)
  const demoContainerRef = useRef<HTMLDivElement>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  const [activeDemo, setActiveDemo] = useState<DemoOption | null>(null)
  const [gestureLoading, setGestureLoading] = useState(false)
  const [videoLoading, setVideoLoading] = useState(false)
  const [simonLoading, setSimonLoading] = useState(false)
  
  const gestureRef = useRef<GestureRecognitionRef>(null)
  const videoRef = useRef<VideoGestureControlRef>(null)
  const simonRef = useRef<SimonSaysGameRef>(null)

  const handleDemoChange = useCallback(async (demo: DemoOption | null) => {
    if (demo && demo !== activeDemo) {
      // Activar nueva demo
      if (demo === 'gesture') {
        setGestureLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        setActiveDemo(demo)
        setGestureLoading(false)
      } else if (demo === 'video') {
        setVideoLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        setActiveDemo(demo)
        setVideoLoading(false)
      } else if (demo === 'simon') {
        setSimonLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        setActiveDemo(demo)
        setSimonLoading(false)
      }
    } else {
      // Desactivar demo actual
      setActiveDemo(null)
    }
  }, [activeDemo])

  // ANIMACIONES GSAP (SOLO PARA TEXTO E IMÁGENES DECORATIVAS)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animaciones de entrada del texto
      const textTl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      textTl
        .from(tagRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2
        })
        .from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out"
        }, "-=0.6")
        .from(descriptionRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8
        }, "-=0.6");

      // Animaciones de entrada de las imágenes decorativas
      gsap.set([pyramidRef.current, tubRef.current], {
        opacity: 0,
        scale: 0.8,
        rotation: -15
      });

      const imagesTl = gsap.timeline({ delay: 0.8 });
      
      imagesTl
        .to(pyramidRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        })
        .to(tubRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, "-=1");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // SCROLL TRIGGERS PARA PARALLAX
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax SIMPLE para las imágenes decorativas
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Pyramid - Movimiento vertical simple
          gsap.to(pyramidRef.current, {
            y: progress * -350,
            scale: 1 + progress * 0.7,
            duration: 0.2,
            ease: "none"
          });
          
          // Tub - Movimiento vertical simple
          gsap.to(tubRef.current, {
            y: progress * -300,
            scale: 1 + progress * 0.6,
            duration: 0.2,
            ease: "none"
          });
        }
      });

      // Efecto dinámico para el dock
      ScrollTrigger.create({
        trigger: dockRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(dockRef.current, {
            y: progress * -30,
            rotateX: progress * 8,
            scale: 1 + progress * 0.05,
            duration: 0.3,
            ease: "none",
            transformPerspective: 800
          });
        }
      });

      // Animación de entrada para el contenedor de demos
      ScrollTrigger.create({
        trigger: demoContainerRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(demoContainerRef.current, 
            { 
              opacity: 0, 
              y: 100, 
              scale: 0.8,
              rotateX: 20,
              rotateY: -10
            },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotateX: 0,
              rotateY: 0,
              duration: 1.5, 
              ease: "power3.out",
              transformPerspective: 1000
            }
          );
        }
      });

      // Animación de entrada para el dock
      ScrollTrigger.create({
        trigger: dockRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(dockRef.current,
            { 
              opacity: 0, 
              y: 60,
              scale: 0.9,
              rotateX: 15
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 1.2, 
              ease: "power3.out", 
              delay: 0.4,
              transformPerspective: 800
            }
          );
        }
      });

      // Animaciones escalonadas para elementos adicionales
      ScrollTrigger.batch([tagRef.current, titleRef.current, descriptionRef.current], {
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            {
              opacity: 0,
              y: 60,
              scale: 0.95,
              filter: "blur(5px)"
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
              stagger: 0.2
            }
          );
        },
        onLeave: (elements) => {
          gsap.to(elements, {
            opacity: 0.3,
            scale: 0.98,
            duration: 0.5
          });
        },
        onEnterBack: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            duration: 0.5
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip" id="demo">
      <div className="container">
        <div className="max-w-[540px] mx-auto"> 
          <div className="flex justify-center">
            <div ref={tagRef} className="tag">{t('productShowcase.badge')}</div>
          </div>
          <h2 
            ref={titleRef}
            className="text-center text-4xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text leading-tight pb-1 mt-5"
          >
            {t('productShowcase.title')}
          </h2>
          <p 
            ref={descriptionRef}
            className="text-center text-xl text-black/60 mt-6 tracking-tight"
          >
            {t('productShowcase.description')}
          </p>
        </div>
        
        {/* Contenedor principal con las demostraciones - Solo en pantallas grandes */}
        <div className="relative mt-16 hidden lg:block">
          <div ref={demoContainerRef} className="max-w-6xl mx-auto opacity-0">
            <AnimatePresence mode="wait">
              {activeDemo === 'gesture' && (
                <motion.div
                  key="gesture"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <GestureRecognition
                    ref={gestureRef}
                    isActive={activeDemo === 'gesture'}
                    onToggle={(active) => !active && setActiveDemo(null)}
                  />
                </motion.div>
              )}
              
              {activeDemo === 'video' && (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <VideoGestureControl
                    ref={videoRef}
                    isActive={activeDemo === 'video'}
                    onToggle={(active) => !active && setActiveDemo(null)}
                  />
                </motion.div>
              )}

              {activeDemo === 'simon' && (
                <motion.div
                  key="simon"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <SimonSaysGame
                    ref={simonRef}
                    isActive={activeDemo === 'simon'}
                    onToggle={(active) => !active && setActiveDemo(null)}
                  />
                </motion.div>
              )}

              {!activeDemo && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300"
                >
                  <div className="text-center text-gray-500">
                    <Hand className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">{t('productShowcase.states.inactive')}</h3>
                    <p className="text-sm">{t('productShowcase.states.inactiveSubtitle')}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Panel de demostraciones - Solo en pantallas grandes */}
          <div ref={dockRef} className="mt-8 opacity-0">
            <MultiDemoPanel
              activeDemo={activeDemo}
              onDemoChange={handleDemoChange}
              gestureLoading={gestureLoading}
              videoLoading={videoLoading}
              simonLoading={simonLoading}
            />
          </div>

          {/* Elementos decorativos con GSAP - Solo en pantallas grandes */}
          <img 
            ref={pyramidRef}
            src={pyramidImage.src} 
            alt="pyramid" 
            height={248} 
            width={248} 
            className="hidden xl:block absolute -right-36 -top-32 opacity-0" 
          />
          <img 
            ref={tubRef}
            src={tubImage.src} 
            alt="tub" 
            height={220} 
            width={220} 
            className="hidden xl:block absolute -left-36 -bottom-30 opacity-0" 
          />
        </div>

        {/* Recomendación para dispositivos móviles - Solo en pantallas pequeñas */}
        <div className="mt-16">
          <MobileRecommendation />
        </div>
      </div>
    </section>
  )
}
