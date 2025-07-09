"use client"

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Volume2, Maximize, Eye, Youtube, Clock, Users } from 'lucide-react';
import Image from "next/image";
import victoryImage from "@/assets/hands/Victory.png";
import loveImage from "@/assets/hands/Love.png";
import openPalmImage from "@/assets/hands/OpenPalm.png";

// Registrar GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const VideoDemo = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const victoryRef = useRef<HTMLDivElement>(null);
  const loveRef = useRef<HTMLDivElement>(null);
  const openPalmRef = useRef<HTMLDivElement>(null);

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

      // Animaciones de entrada de las imágenes decorativas
      gsap.set([victoryRef.current, loveRef.current, openPalmRef.current], {
        opacity: 0,
        scale: 0.8,
        rotation: -15
      });

      const imagesTl = gsap.timeline({ delay: 0.8 });
      
      imagesTl
        .to(victoryRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        })
        .to(loveRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, "-=1")
        .to(openPalmRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, "-=0.8");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // SCROLL TRIGGERS PARA PARALLAX
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Configurar aceleración por hardware para mejor renderizado
      gsap.set([victoryRef.current, loveRef.current, openPalmRef.current], {
        force3D: true,
        transformOrigin: "center center"
      });

      // Parallax SUAVE para las imágenes decorativas
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Victory - Movimiento vertical optimizado
          gsap.to(victoryRef.current, {
            y: progress * -300,
            scale: 1 + progress * 0.3,
            duration: 0.3,
            ease: "none"
          });
          
          // Love - Movimiento vertical optimizado
          gsap.to(loveRef.current, {
            y: progress * -250,
            scale: 1 + progress * 0.25,
            duration: 0.3,
            ease: "none"
          });
          
          // OpenPalm - Movimiento vertical optimizado
          gsap.to(openPalmRef.current, {
            y: progress * -200,
            scale: 1 + progress * 0.2,
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Parallax para el header
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(headerRef.current, {
            y: progress * -60,
            rotateX: progress * 4,
            scale: 1 + progress * 0.02,
            duration: 0.4,
            ease: "none",
            transformPerspective: 1000
          });
        }
      });

      // Animación de entrada para el contenedor del video
      ScrollTrigger.create({
        trigger: videoContainerRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(videoContainerRef.current, 
            { 
              opacity: 0, 
              y: 80,
              scale: 0.9,
              rotateX: 20
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 1.5, 
              ease: "power3.out",
              transformPerspective: 1000
            }
          );
        }
      });

      // Animación de entrada para las estadísticas
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(statsRef.current?.children || [], 
            { 
              opacity: 0, 
              y: 40,
              scale: 0.9
            },
            { 
              opacity: 1, 
              y: 0,
              scale: 1,
              duration: 0.8, 
              ease: "power3.out",
              stagger: 0.1,
              delay: 0.3
            }
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlayVideo = () => {
    setShowVideo(true);
    setIsPlaying(true);
  };

  return (
    <section 
      ref={sectionRef}
      className="bg-gradient-to-b from-[#D2DCFF] to-[#FFFFFF] py-20 overflow-hidden relative"
      id="video-demo"
    >
      <div className="container mx-auto px-4">
        {/* Header de la sección */}
        <div 
          ref={headerRef}
          className="max-w-[640px] mx-auto mb-16 text-center"
        >
          <div className="flex justify-center mb-6">
            <div ref={tagRef} className="tag">{t('videoDemo.badge')}</div>
          </div>
          <h2 
            ref={titleRef}
            className="text-4xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text leading-tight pb-1"
          >
            {t('videoDemo.title')}
          </h2>
          <p 
            ref={descriptionRef}
            className="text-xl text-black/60 mt-6 tracking-tight"
          >
            {t('videoDemo.description')}
          </p>
        </div>

        {/* Contenedor del video */}
        <div 
          ref={videoContainerRef}
          className="max-w-5xl mx-auto mb-16 opacity-0"
        >
          <div className="relative group">
            {/* Video Container */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 group-hover:scale-105 transition-transform duration-500">
                {!showVideo ? (
                  // Video Thumbnail/Preview
                  <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500">
                    {/* Thumbnail overlay */}
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    {/* Play button */}
                    <motion.button
                      onClick={handlePlayVideo}
                      className="relative z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-6 transition-all duration-300 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-16 h-16 text-white ml-2" fill="white" />
                    </motion.button>

                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      DEMO EN VIVO
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
                      2:30
                    </div>

                    {/* Gesture icons overlay - 8 gestos completos */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/4 text-4xl opacity-60 animate-pulse">✊</div>
                      <div className="absolute top-1/3 right-1/4 text-4xl opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}>✋</div>
                      <div className="absolute bottom-1/3 left-1/3 text-4xl opacity-60 animate-pulse" style={{ animationDelay: '1s' }}>👍</div>
                      <div className="absolute bottom-1/4 right-1/3 text-4xl opacity-60 animate-pulse" style={{ animationDelay: '1.5s' }}>✌️</div>
                      <div className="absolute top-1/2 left-1/6 text-4xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }}>👎</div>
                      <div className="absolute top-1/2 right-1/6 text-4xl opacity-60 animate-pulse" style={{ animationDelay: '2.5s' }}>☝️</div>
                      <div className="absolute top-1/6 left-1/2 text-4xl opacity-60 animate-pulse" style={{ animationDelay: '3s' }}>🤟</div>
                      <div className="absolute bottom-1/6 left-1/2 text-4xl opacity-60 animate-pulse" style={{ animationDelay: '3.5s' }}>🫳</div>
                    </div>
                  </div>
                ) : (
                  // YouTube Embed
                  <iframe
                    src="https://www.youtube.com/embed/ipG22HUoBoE?autoplay=1&rel=0&modestbranding=1"
                    title="GestOS Demo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-2xl"
                  ></iframe>
                )}
              </div>

              {/* Video Controls Info */}
              {!showVideo && (
                <div className="mt-4 text-center">
                  <p className="text-gray-600 text-sm mb-3">
                    {t('videoDemo.previewText')}
                  </p>
                  <motion.button
                    onClick={handlePlayVideo}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Youtube className="w-5 h-5" />
                    {t('videoDemo.watchButton')}
                  </motion.button>
                </div>
              )}
            </div>

            {/* Decorative glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </div>
        </div>

        {/* Video Stats */}
        <div 
          ref={statsRef}
          className="max-w-4xl mx-auto"
        >

          {/* Sección de gestos completos */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('videoDemo.gestures.title')}
              </h3>
              <p className="text-gray-600">
                {t('videoDemo.gestures.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {((t('videoDemo.gestures.list', { returnObjects: true }) as Array<{
                emoji: string;
                name: string;
              }>)).map((gesture, index) => (
                <motion.div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-md hover:shadow-lg transition-all duration-300 text-center group cursor-pointer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {gesture.emoji}
                  </div>
                  <p className="text-xs font-medium text-gray-700">{gesture.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to action adicional */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                {t('videoDemo.callToAction.title')}
              </h4>
              <p className="text-gray-600 mb-4">
                {t('videoDemo.callToAction.description')}
              </p>
              <motion.button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const element = document.getElementById('call-to-action');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Eye className="w-4 h-4" />
                {t('videoDemo.callToAction.button')}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos optimizados */}
      <div
        ref={victoryRef}
        className="hidden md:block absolute -right-36 -top-32 will-change-transform opacity-0"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={victoryImage} 
          alt="victory" 
          height={300} 
          width={300}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>

      <div
        ref={loveRef}
        className="hidden md:block absolute -left-36 top-1/2 -translate-y-1/2 will-change-transform opacity-0"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={loveImage} 
          alt="love" 
          height={300} 
          width={300}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>

      <div
        ref={openPalmRef}
        className="hidden lg:block absolute -right-20 bottom-0 will-change-transform opacity-0"
        style={{ 
          imageRendering: 'crisp-edges',
          backfaceVisibility: 'hidden',
          perspective: '1000px'
        }}
      >
        <Image 
          src={openPalmImage} 
          alt="open palm" 
          height={250} 
          width={250}
          quality={95}
          priority={false}
          className="select-none"
        />
      </div>
    </section>
  );
}; 