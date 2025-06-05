"use client"

import ArrowRight from "@/assets/arrow-right.svg";
import cogImage from "@/assets/hands/DivineTouch.png";
import cylinderImage from "@/assets/hands/Victory.png";
import noodleImage from "@/assets/hands/Love.png";
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Registrar plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Mover textVariations fuera del componente para evitar recreación en cada render
const textVariations = [
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
];

// Componente de Scroll Indicator
const ScrollIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada del indicador
      gsap.from(indicatorRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 2.5,
        ease: "power2.out"
      });

      // Animación continua de bounce
      gsap.to(indicatorRef.current, {
        y: -8,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Fade out cuando se hace scroll
      ScrollTrigger.create({
        trigger: indicatorRef.current,
        start: "top 80%",
        end: "top 60%",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(indicatorRef.current, {
            opacity: 1 - self.progress,
            duration: 0.3
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={indicatorRef}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 cursor-pointer hover:text-white transition-colors"
      onClick={() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }}
    >
      <span className="text-sm font-medium tracking-wide">Scroll para explorar</span>
      <div className="w-6 h-10 border-2 border-white/40 rounded-full relative">
        <div className="w-1 h-3 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-scroll-dot"></div>
      </div>
      <svg 
        className="w-5 h-5 animate-bounce" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  );
};

export const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const cogRef = useRef<HTMLImageElement>(null);
  const cylinderRef = useRef<HTMLImageElement>(null);
  const noodleRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Estado para mostrar contenido inicial inmediatamente
  const [displayText, setDisplayText] = useState(textVariations[0]);

  // Animación de cambio de texto (ahora sin dependencia problemática)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textVariations.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []); // Dependencias vacías - solo se ejecuta una vez

  // Actualizar el texto mostrado cuando cambia el índice
  useEffect(() => {
    setDisplayText(textVariations[currentTextIndex]);
  }, [currentTextIndex]); // Solo depende de currentTextIndex

  // ANIMACIONES PRINCIPALES (SE EJECUTAN UNA SOLA VEZ AL CARGAR)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Asegurar que los botones sean visibles desde el inicio
      gsap.set(buttonsRef.current, { opacity: 1, visibility: "visible" });
      gsap.set(buttonsRef.current?.children || [], { opacity: 0, y: 20 });

      // Timeline principal para la entrada inicial - SIN ocultar el texto
      const mainTl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      // Animación de entrada de elementos - el texto YA está visible
      mainTl
        .from(".hero-tag", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2
        })
        // El título y subtítulo NO empiezan con opacity 0, solo con movimiento
        .from(titleRef.current, {
          y: 50,
          duration: 1.2,
          ease: "power4.out"
        }, "-=0.6")
        .from(subtitleRef.current, {
          y: 30,
          duration: 0.8
        }, "-=0.6")
        .to(buttonsRef.current?.children || [], {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)"
        }, "-=0.4");

      // Animaciones de las imágenes flotantes mejoradas
      gsap.set([cogRef.current, cylinderRef.current, noodleRef.current], {
        opacity: 0,
        scale: 0.8,
        rotation: -10
      });

      const imagesTl = gsap.timeline({ delay: 0.5 });
      
      imagesTl
        .to(cogRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        })
        .to(cylinderRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, "-=1")
        .to(noodleRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 30,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, "-=0.8");

    }, heroRef);

    return () => ctx.revert();
  }, []); // Solo se ejecuta una vez al montar el componente

  // ANIMACIONES CONTINUAS (SE EJECUTAN UNA SOLA VEZ Y SIGUEN PARA SIEMPRE)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eliminamos las animaciones flotantes continuas para imágenes decorativas
      // Solo mantenemos las animaciones de scroll
    }, heroRef);

    return () => ctx.revert();
  }, []); // Solo se ejecuta una vez

  // SCROLL TRIGGERS (SE EJECUTAN UNA SOLA VEZ)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll effect SIMPLE para las imágenes (solo movimiento vertical y escalado)
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(cogRef.current, {
            y: progress * -300,
            scale: 1 + progress * 0.6,
            duration: 0.3,
            ease: "none"
          });
          
          gsap.to(cylinderRef.current, {
            y: progress * -250,
            scale: 1 + progress * 0.5,
            duration: 0.3,
            ease: "none"
          });
          
          gsap.to(noodleRef.current, {
            y: progress * -200,
            scale: 1 + progress * 0.4,
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Efecto parallax para el contenido principal (sin afectar botones)
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to([titleRef.current, subtitleRef.current], {
            y: progress * -50,
            opacity: 1 - progress * 0.3,
            duration: 0.3,
            ease: "none"
          });
          // Los botones se mantienen visibles sin parallax
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []); // Solo se ejecuta una vez

  // ANIMACIÓN ESPECÍFICA PARA CAMBIO DE TEXTO (SOLO AFECTA AL TEXTO)
  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || currentTextIndex === 0) return;

    // Crear un contexto separado solo para el cambio de texto
    const textCtx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Animación de salida más suave (solo para el texto)
      tl.to([titleRef.current, subtitleRef.current], {
        y: -20,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.03
      })
      // Animación de entrada más fluida (solo para el texto)
      .fromTo([titleRef.current, subtitleRef.current], 
        {
          y: 20,
          opacity: 0,
          filter: "blur(6px)"
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.05
        }
      );

    }, [titleRef.current, subtitleRef.current]); // Contexto específico solo para estos elementos

    return () => textCtx.revert();
  }, [currentTextIndex]); // Solo se ejecuta cuando cambia el texto (y no en el primer render)

  return (
    <section 
      ref={heroRef}
      className="relative pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEFFE_60%)] overflow-hidden min-h-screen flex items-center"
    >
      <div className="container" ref={containerRef}>
        <div className="md:flex items-center">
          <div className="md:w-[478px]" ref={textContainerRef}>
            <div className="tag hero-tag mb-4">GestOS Version 1.0</div>
            
            <h1 
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text leading-tight pb-1 mt-6"
            >
              {displayText.title}
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl text-black-600 tracking-tight mt-6"
            >
              {displayText.subtitle}
            </p>

            {/* Botones con estilos de respaldo para asegurar visibilidad */}
            <div 
              ref={buttonsRef} 
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-8 z-10 relative"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              {/* Botón principal de descarga */}
              <button 
                className="btn btn-primary inline-flex"
                onClick={() => {
                  console.log('Descargar clicked');
                  alert('¡Botón Descargar funcionando!');
                }}
              >
                Descargar
              </button>

              {/* Botones de repositorios */}
              <div className="flex gap-3 flex-wrap">
                <button 
                  className="btn btn-text gap-2 inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg px-4 py-2 border border-white/20 hover:border-white/40"
                  onClick={() => {
                    window.open('https://github.com/JohnMarulanda/GestureAI-UI', '_blank');
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm font-medium">Frontend</span>
                </button>

                <button 
                  className="btn btn-text gap-2 inline-flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg px-4 py-2 border border-white/20 hover:border-white/40"
                  onClick={() => {
                    window.open('https://github.com/JohnMarulanda/GestureAI-Core', '_blank');
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm font-medium">Backend</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            {/* Imagen principal con animación GSAP */}
            <img 
              ref={cogRef}
              src={cogImage.src} 
              alt="cog" 
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0" 
            />
            
            {/* Imágenes decorativas con animaciones Framer Motion */}
            <motion.img 
              ref={cylinderRef}
              src={cylinderImage.src} 
              alt="cylinder" 
              width={220} 
              height={220} 
              className="hidden md:block -top-8 -left-32 md:absolute"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.img 
              ref={noodleRef}
              src={noodleImage.src} 
              alt="noodle" 
              width={230} 
              height={230} 
              className="absolute top-[524px] left-[448px] hidden md:block md:absolute"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};
