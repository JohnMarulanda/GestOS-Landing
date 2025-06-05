"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { 
  Volume2, 
  AppWindow, 
  SquarePlay, 
  Monitor, 
  Command, 
  Mouse, 
  Compass, 
  House, 
  MoreHorizontal, 
  Minus,
  X,
  ArrowLeft,
  Eye,
  Zap,
  Brain,
  Hand,
  Camera
} from "lucide-react";
import pyramidImage from "@/assets/hands/Up.png";
import starImage from "@/assets/hands/Love.png";
import cylinderImage from "@/assets/hands/PointingUp.png";
import victoryImage from "@/assets/hands/Victory.png";
import fistImage from "@/assets/hands/Fist.png";
import openPalmImage from "@/assets/hands/OpenPalm.png";
import downImage from "@/assets/hands/Down.png";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

// Registrar GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Componente del Control Panel simplificado para demo
const DemoControlPanel = () => {
  const { t } = useTranslation();
  const [currentSet, setCurrentSet] = useState(0);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [gestureStatus, setGestureStatus] = useState<Record<string, 'inactive' | 'loading' | 'active'>>({
    gesture1: 'inactive',
    gesture2: 'active', // Uno activo para demo
    gesture3: 'inactive',
    gesture4: 'inactive',
    gesture5: 'inactive',
    gesture6: 'inactive',
    gesture7: 'inactive',
    gesture8: 'inactive'
  });

  const gestureSets = [
    [
      { id: 'gesture1', label: 'Volumen', icon: Volume2 },
      { id: 'gesture2', label: 'Aplicaciones', icon: AppWindow },
      { id: 'gesture3', label: 'Multimedia', icon: SquarePlay },
      { id: 'gesture4', label: 'Sistema', icon: Monitor }
    ],
    [
      { id: 'gesture5', label: 'Atajos', icon: Command },
      { id: 'gesture6', label: 'Mouse', icon: Mouse },
      { id: 'gesture7', label: 'Navegación', icon: Compass },
      { id: 'gesture8', label: 'Inicio', icon: House }
    ]
  ];

  const toggleGestureSet = () => {
    setCurrentSet((prev) => (prev === 0 ? 1 : 0));
  };

  const getStatusColor = (status: 'inactive' | 'loading' | 'active') => {
    switch (status) {
      case 'loading':
        return 'bg-yellow-400';
      case 'active':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  const toggleGesture = (gestureId: string) => {
    setGestureStatus(prev => ({
      ...prev,
      [gestureId]: prev[gestureId] === 'active' ? 'inactive' : 'active'
    }));
  };

  const handleShowDemo = () => {
    setIsVisible(true);
    setIsMinimized(false);
  };

  const handleHideDemo = () => {
    setIsVisible(false);
    setIsMinimized(true);
  };

  if (!isVisible) {
    return (
      <div className="absolute right-1/2 transform translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col items-center gap-4">
          <motion.button
            onClick={handleShowDemo}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Eye className="w-4 h-4" />
            {t('whatIs.demo.showButton')}
          </motion.button>
          <motion.p 
            className="text-xs text-gray-300 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t('whatIs.demo.demoIndicator')}
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20">
      {/* Banner de demostración */}
      <motion.div
        className="absolute -top-20 right-0 bg-orange-100 border border-orange-300 text-orange-800 px-3 py-2 rounded-lg text-xs font-medium shadow-lg mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {t('whatIs.demo.demoBanner')}
      </motion.div>

      {isMinimized ? (
        <motion.button
          className="bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-sm rounded-lg p-3 shadow-lg cursor-pointer flex items-center justify-center h-12 w-12 border border-white/20"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsMinimized(false)}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </motion.button>
      ) : (
        <motion.div
          className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 shadow-2xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Window Controls */}
          <div className="flex justify-between items-center mb-4 px-1">
            <button
              onClick={() => setIsMinimized(true)}
              className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center"
            >
              <Minus className="w-2 h-2 text-yellow-900" />
            </button>
            <button
              onClick={handleHideDemo}
              className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center"
            >
              <X className="w-2 h-2 text-red-900" />
            </button>
          </div>

          {/* Gesture Buttons */}
          <div className="flex flex-col gap-3">
            <motion.div className="flex flex-col gap-3">
              {gestureSets[currentSet].map((gesture, index) => (
                <motion.button
                  key={gesture.id}
                  onClick={() => toggleGesture(gesture.id)}
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200 relative ${
                    gestureStatus[gesture.id] === 'active'
                      ? 'bg-cyan-500 hover:bg-cyan-400 shadow-lg shadow-cyan-500/25'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <gesture.icon
                    className={`w-7 h-7 ${
                      gestureStatus[gesture.id] === 'active' ? 'text-white' : 'text-gray-300'
                    }`}
                  />
                  {gestureStatus[gesture.id] !== 'inactive' && (
                    <motion.div
                      className={`absolute -top-1 -right-1 w-3 h-3 ${getStatusColor(gestureStatus[gesture.id])} rounded-full border-2 border-gray-900`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Toggle Button */}
            <div className="border-t border-gray-700/50 pt-3">
              <motion.button
                onClick={toggleGestureSet}
                className="w-14 h-14 rounded-xl bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-all duration-200 shadow-lg shadow-purple-600/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: currentSet === 0 ? 0 : 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <MoreHorizontal className="w-7 h-7 text-white" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Componente reutilizable para las tarjetas de función
interface FunctionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  gestures: Array<{ emoji: string; label: string }>;
  badgeColor: string;
}

const FunctionCard: React.FC<FunctionCardProps> = ({
  icon: Icon,
  title,
  description,
  gradientFrom,
  gradientTo,
  gestures,
  badgeColor
}) => {
  return (
    <div className="function-card bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-2">
      <div className={`bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl p-3 w-fit mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h4 className="font-bold text-gray-900 mb-2 text-lg">{title}</h4>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {gestures.map((gesture, index) => (
          <div key={index} className={`flex items-center gap-1 text-xs ${badgeColor} px-2 py-1 rounded-full`}>
            <span className="font-mono">{gesture.emoji}</span>
            <span>{gesture.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WhatIs = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const howWorksHeaderRef = useRef<HTMLDivElement>(null);
  const howWorksTitleRef = useRef<HTMLHeadingElement>(null);
  const howWorksDescRef = useRef<HTMLParagraphElement>(null);
  const functionsHeaderRef = useRef<HTMLDivElement>(null);
  const functionsTitleRef = useRef<HTMLHeadingElement>(null);
  const functionsDescRef = useRef<HTMLParagraphElement>(null);
  const pyramidRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const victoryRef = useRef<HTMLDivElement>(null);
  const fistRef = useRef<HTMLDivElement>(null);
  const openPalmRef = useRef<HTMLDivElement>(null);
  const downRef = useRef<HTMLDivElement>(null);

  // Obtener datos traducidos
  const howWorksFeatures = t('whatIs.howWorks.features', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const sidebarCards = t('whatIs.sidebarFunctions.cards', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    gestures: Array<{ emoji: string; label: string }>;
  }>;

  const appWindows = t('whatIs.appWindows.windows', { returnObjects: true }) as Array<{
    title: string;
    subtitle: string;
    description: string;
    badges: string[];
  }>;

  const recognitionGestures = t('whatIs.sidebarFunctions.recognitionInfo.gestures', { returnObjects: true }) as string[];

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: howWorksFeatures[0]?.title || "Visión por Computadora",
      description: howWorksFeatures[0]?.description || "Detecta y analiza gestos de manos en tiempo real usando algoritmos avanzados de visión por computadora"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: howWorksFeatures[1]?.title || "Inteligencia Artificial", 
      description: howWorksFeatures[1]?.description || "Librerías de machine learning adaptadas a gestos únicos para una experiencia personalizada."  
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: howWorksFeatures[2]?.title || "Respuesta Eficiente",
      description: howWorksFeatures[2]?.description || "Latencia baja para una experiencia fluida y natural."
    },
    {
      icon: <Hand className="w-8 h-8" />,
      title: howWorksFeatures[3]?.title || "Control Intuitivo",
      description: howWorksFeatures[3]?.description || "Gestos naturales que cualquier persona puede aprender y usar sin entrenamiento previo"
    }
  ];

  // ANIMACIONES DE ENTRADA CON GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animaciones de entrada del header
      const headerTl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      headerTl
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

      // Animaciones de entrada del contenido principal
      const contentTl = gsap.timeline({ delay: 0.8 });
      
      contentTl
        .from(leftContentRef.current, {
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        })
        .from(rightContentRef.current, {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.7");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ANIMACIONES CONTINUAS PARA IMÁGENES DECORATIVAS
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eliminamos las animaciones flotantes continuas para imágenes decorativas
      // Solo mantenemos las animaciones de scroll
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // SCROLL TRIGGERS PARA PARALLAX DRAMÁTICO
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Configurar aceleración por hardware para mejor renderizado
      gsap.set([pyramidRef.current, starRef.current, cylinderRef.current], {
        force3D: true,
        transformOrigin: "center center"
      });

      // Parallax SUAVE para las imágenes decorativas (sin scale excesivo)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Pyramid - Movimiento vertical optimizado
          gsap.to(pyramidRef.current, {
            y: progress * -350,
            scale: 1 + progress * 0.3, // Reducido de 0.9 a 0.3
            duration: 0.3,
            ease: "none"
          });
          
          // Star - Movimiento vertical optimizado
          gsap.to(starRef.current, {
            y: progress * -280,
            scale: 1 + progress * 0.25, // Reducido de 0.8 a 0.25
            duration: 0.3,
            ease: "none"
          });
          
          // Cylinder - Movimiento vertical optimizado
          gsap.to(cylinderRef.current, {
            y: progress * -220,
            scale: 1 + progress * 0.2, // Reducido de 0.6 a 0.2
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Parallax SUAVE para el header
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(tagRef.current, {
            y: progress * -50, // Reducido de -60
            opacity: 1 - progress * 0.5, // Reducido de 0.6
            scale: 1 + progress * 0.05, // Reducido de 0.1
            duration: 0.4,
            ease: "none"
          });
          
          gsap.to(titleRef.current, {
            y: progress * -60, // Reducido de -80
            opacity: 1 - progress * 0.3, // Reducido de 0.4
            duration: 0.4,
            ease: "none"
          });
          
          gsap.to(descriptionRef.current, {
            y: progress * -40, // Reducido de -50
            opacity: 1 - progress * 0.4, // Reducido de 0.5
            duration: 0.4,
            ease: "none"
          });
        }
      });

      // Parallax para el contenido principal
      ScrollTrigger.create({
        trigger: leftContentRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(leftContentRef.current, {
            y: progress * -30, // Reducido de -40
            duration: 0.4,
            ease: "none"
          });
          
          gsap.to(rightContentRef.current, {
            y: progress * -45, // Reducido de -60
            duration: 0.4,
            ease: "none"
          });
        }
      });

      // Animaciones de entrada para "Cómo funciona"
      ScrollTrigger.create({
        trigger: howWorksHeaderRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo([howWorksTitleRef.current, howWorksDescRef.current], 
            { 
              opacity: 0, 
              y: 60,
              scale: 0.98 // Menos escala inicial
            },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 1.2, 
              ease: "power3.out",
              stagger: 0.2
            }
          );
        }
      });

      // Parallax suave para la sección "Cómo funciona"
      ScrollTrigger.create({
        trigger: howWorksHeaderRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(howWorksHeaderRef.current, {
            y: progress * -80, // Reducido de -100
            rotateX: progress * 3, // Reducido de 5 a 3
            duration: 0.4,
            ease: "none",
            transformPerspective: 1000
          });
        }
      });

      // Animaciones de entrada para "Funciones de la barra lateral"
      ScrollTrigger.create({
        trigger: functionsHeaderRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo([functionsTitleRef.current, functionsDescRef.current], 
            { 
              opacity: 0, 
              y: 60,
              scale: 0.98 // Menos escala inicial
            },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 1.2, 
              ease: "power3.out",
              stagger: 0.2
            }
          );
        }
      });

      // Parallax suave para las tarjetas de función
      ScrollTrigger.create({
        trigger: functionsHeaderRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(functionsHeaderRef.current, {
            y: progress * -60, // Reducido de -80
            duration: 0.4,
            ease: "none"
          });
        }
      });

      // Animaciones escalonadas para tarjetas de características
      ScrollTrigger.batch(".feature-card", {
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            {
              opacity: 0,
              y: 60, // Reducido de 80
              scale: 0.95, // Reducido de 0.9
              filter: "blur(3px)" // Reducido de 5px
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out",
              stagger: 0.15
            }
          );
        },
        onLeave: (elements) => {
          gsap.to(elements, {
            opacity: 0.6, // Reducido de 0.5
            scale: 0.98, // Reducido de 0.95
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

      // Animaciones escalonadas para tarjetas de funciones
      ScrollTrigger.batch(".function-card", {
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            {
              opacity: 0,
              y: 50, // Reducido de 60
              scale: 0.95, // Reducido de 0.9
              rotateY: 8 // Reducido de 15
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateY: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.1,
              transformPerspective: 1000
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // En el useEffect de SCROLL TRIGGERS, agregar las animaciones para las nuevas imágenes
  // Parallax SUAVE para las nuevas imágenes decorativas (después del scrolltrigger existente)
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "50% bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Victory - Movimiento vertical optimizado
          gsap.to(victoryRef.current, {
            y: progress * -180,
            scale: 1 + progress * 0.15,
            rotation: progress * 10,
            duration: 0.3,
            ease: "none"
          });
          
          // Fist - Movimiento vertical optimizado
          gsap.to(fistRef.current, {
            y: progress * -240,
            scale: 1 + progress * 0.2,
            rotation: progress * -8,
            duration: 0.3,
            ease: "none"
          });
          
          // OpenPalm - Movimiento vertical optimizado
          gsap.to(openPalmRef.current, {
            y: progress * -200,
            scale: 1 + progress * 0.18,
            rotation: progress * 12,
            duration: 0.3,
            ease: "none"
          });
          
          // Down - Movimiento vertical optimizado
          gsap.to(downRef.current, {
            y: progress * -160,
            scale: 1 + progress * 0.12,
            rotation: progress * -6,
            duration: 0.3,
            ease: "none"
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="bg-gradient-to-b from-[#D2DCFF] to-[#FFFFFF] pt-24 pb-10 overflow-hidden relative"
      id="que-es"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div 
          ref={headerRef}
          className="max-w-[640px] mx-auto mb-16 text-center"
        >
          <div className="flex justify-center mb-6">
            <div ref={tagRef} className="tag">{t('whatIs.mainBadge')}</div>
          </div>
          <h2 
            ref={titleRef}
            className="text-4xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text leading-tight pb-1"
          >
            {t('whatIs.mainTitle')}
          </h2>
          <p 
            ref={descriptionRef}
            className="text-xl text-black/60 mt-6 tracking-tight"
          >
            {t('whatIs.mainDescription')}
          </p>
        </div>

        {/* Contenido principal con demo del control panel */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Descripción principal */}
          <div
            ref={leftContentRef}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                {t('whatIs.mainContent.title')}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('whatIs.mainContent.description1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('whatIs.mainContent.description2')}
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500 rounded-lg p-2 flex-shrink-0">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('whatIs.mainContent.noHardwareTitle')}</h4>
                  <p className="text-gray-600">
                    {t('whatIs.mainContent.noHardwareDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo del control panel */}
          <div
            ref={rightContentRef}
            className="relative"
          >
            {/* Mockup de pantalla */}
            <div className="bg-gray-900 rounded-2xl p-4 shadow-2xl relative overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl h-80 relative">
                {/* Simulación de ventanas */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg p-3 w-32 h-20"></div>
                <div className="absolute top-16 left-20 bg-white/15 backdrop-blur-sm rounded-lg p-3 w-40 h-24"></div>
                <div className="absolute bottom-4 left-4 right-20 bg-white/10 backdrop-blur-sm rounded-lg p-3 h-16"></div>
                
                {/* Efecto de partículas */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
              </div>
            </div>
            
            {/* Control Panel Demo */}
            <DemoControlPanel />
          </div>
        </div>

        {/* Cómo funciona */}
        <div ref={howWorksHeaderRef} className="mb-20">
          <div className="text-center mb-12">
            <h3 
              ref={howWorksTitleRef}
              className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text mb-4"
            >
              {t('whatIs.howWorks.title')}
            </h3>
            <p 
              ref={howWorksDescRef}
              className="text-xl text-black/60 max-w-2xl mx-auto"
            >
              {t('whatIs.howWorks.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-3 w-fit mb-4">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Funciones de la barra lateral */}
        <div ref={functionsHeaderRef} className="text-center">
          <h3 
            ref={functionsTitleRef}
            className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text mb-6"
          >
            {t('whatIs.sidebarFunctions.title')}
          </h3>
          <p 
            ref={functionsDescRef}
            className="text-xl text-black/60 max-w-3xl mx-auto mb-12"
          >
            {t('whatIs.sidebarFunctions.subtitle')}
          </p>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Fila 1: Gestos básicos */}
              {sidebarCards.slice(0, 4).map((card, index) => (
                <FunctionCard
                  key={index}
                  icon={[Volume2, AppWindow, SquarePlay, Monitor][index]}
                  title={card.title}
                  description={card.description}
                  gradientFrom={["from-blue-500", "from-green-500", "from-purple-500", "from-red-500"][index]}
                  gradientTo={["to-purple-600", "to-teal-600", "to-pink-600", "to-orange-600"][index]}
                  gestures={card.gestures}
                  badgeColor={["text-blue-600 bg-blue-50", "text-green-600 bg-green-50", "text-purple-600 bg-purple-50", "text-red-600 bg-red-50"][index]}
                />
              ))}
            </div>

            {/* Fila 2: Gestos avanzados */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sidebarCards.slice(4, 8).map((card, index) => (
                <FunctionCard
                  key={index + 4}
                  icon={[Command, Mouse, Compass, House][index]}
                  title={card.title}
                  description={card.description}
                  gradientFrom={["from-amber-500", "from-indigo-500", "from-cyan-500", "from-pink-500"][index]}
                  gradientTo={["to-yellow-600", "to-blue-600", "to-blue-500", "to-rose-600"][index]}
                  gestures={card.gestures}
                  badgeColor={["text-amber-600 bg-amber-50", "text-indigo-600 bg-indigo-50", "text-cyan-600 bg-cyan-50", "text-pink-600 bg-pink-50"][index]}
                />
              ))}
            </div>

            {/* Nota informativa */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-6 border border-blue-100">
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 mb-3 text-lg md:text-xl">{t('whatIs.sidebarFunctions.recognitionInfo.title')}</h4>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
                  {t('whatIs.sidebarFunctions.recognitionInfo.description')}
                </p>
                <div className="grid grid-cols-4 md:flex md:justify-center gap-2 md:gap-4 mt-6 max-w-xs md:max-w-none mx-auto">
                  {recognitionGestures.map((gestureLabel, index) => {
                    const gestureEmojis = ["🤚", "✊", "✋", "👆", "👎", "👍", "✌️", "🤟"];
                    const gestureTitles = ["None", "Closed_Fist", "Open_Palm", "Pointing_Up", "Thumb_Down", "Thumb_Up", "Victory", "ILoveYou"];
                    return (
                      <div key={index} className="flex flex-col items-center gap-1">
                        <span className="text-xl md:text-2xl" title={gestureTitles[index]}>{gestureEmojis[index]}</span>
                        <span className="text-xs text-gray-500 hidden md:block">{gestureLabel}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nueva sección: Ventanas de la Aplicación */}
        <div className="mt-32 mb-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text mb-6">
              {t('whatIs.appWindows.title')}
            </h3>
            <p className="text-xl text-black/60 max-w-3xl mx-auto">
              {t('whatIs.appWindows.subtitle')}
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-16">
            {/* Gesture Testing - Ventana Principal */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-3">
                    <Hand className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{appWindows[0]?.title}</h4>
                    <p className="text-cyan-600 font-medium">{appWindows[0]?.subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600">
                  {appWindows[0]?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {appWindows[0]?.badges.map((badge, index) => (
                    <span key={index} className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">{badge}</span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">📸</div>
                <p className="text-gray-500">Captura de pantalla próximamente</p>
              </div>
            </div>

            {/* Info Gestures - Catálogo */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-100 rounded-2xl p-8 text-center lg:order-1">
                <div className="text-gray-400 text-6xl mb-4">📸</div>
                <p className="text-gray-500">Captura de pantalla próximamente</p>
              </div>
              <div className="space-y-6 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-3">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{appWindows[1]?.title}</h4>
                    <p className="text-green-600 font-medium">{appWindows[1]?.subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600">
                  {appWindows[1]?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {appWindows[1]?.badges.map((badge, index) => (
                    <span key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">{badge}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Settings - Configuración */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-3">
                    <Monitor className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{appWindows[2]?.title}</h4>
                    <p className="text-purple-600 font-medium">{appWindows[2]?.subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600">
                  {appWindows[2]?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {appWindows[2]?.badges.map((badge, index) => (
                    <span key={index} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">{badge}</span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">📸</div>
                <p className="text-gray-500">Captura de pantalla próximamente</p>
              </div>
            </div>

            {/* Help & Support - Ayuda */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-100 rounded-2xl p-8 text-center lg:order-1">
                <div className="text-gray-400 text-6xl mb-4">📸</div>
                <p className="text-gray-500">Captura de pantalla próximamente</p>
              </div>
              <div className="space-y-6 lg:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-3">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{appWindows[3]?.title}</h4>
                    <p className="text-amber-600 font-medium">{appWindows[3]?.subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600">
                  {appWindows[3]?.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {appWindows[3]?.badges.map((badge, index) => (
                    <span key={index} className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Nota final */}
          <div className="mt-16 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">{t('whatIs.appWindows.finalNote.title')}</h4>
              <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
                {t('whatIs.appWindows.finalNote.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

        {/* Elementos decorativos optimizados - existentes */}
      <div
        ref={pyramidRef}
        className="hidden lg:block absolute -left-32 top-16 will-change-transform"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={pyramidImage} 
          alt="pyramid" 
          height={300} 
          width={300}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>
      
      <div
        ref={starRef}
        className="hidden lg:block absolute -right-36 top-1/3 will-change-transform"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={starImage} 
          alt="star" 
          height={300} 
          width={300}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>
      
      <div
        ref={cylinderRef}
        className="hidden lg:block absolute -left-20 bottom-16 will-change-transform"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={cylinderImage} 
          alt="cylinder" 
          height={250} 
          width={250}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>

      {/* Nuevos elementos decorativos para la sección de ventanas */}
      <div
        ref={victoryRef}
        className="hidden lg:block absolute -right-28 bottom-1/3 will-change-transform"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={victoryImage} 
          alt="victory gesture" 
          height={280} 
          width={280}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>

      <div
        ref={fistRef}
        className="hidden lg:block absolute -left-36 bottom-1/2 will-change-transform"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={fistImage} 
          alt="fist gesture" 
          height={260} 
          width={260}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>

      <div
        ref={openPalmRef}
        className="hidden lg:block absolute -right-20 bottom-1/4 will-change-transform"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={openPalmImage} 
          alt="open palm gesture" 
          height={240} 
          width={240}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>

      <div
        ref={downRef}
        className="hidden lg:block absolute -left-24 bottom-1/4 will-change-transform"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={downImage} 
          alt="thumbs down gesture" 
          height={220} 
          width={220}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>
    </section>
  );
};
  