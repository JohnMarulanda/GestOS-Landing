"use client";

import { InteractiveCard } from "@/components/InteractiveCard";
import { useRef, useEffect } from "react";
import { Brain, Zap, Eye, Hand } from "lucide-react";
import Image from "next/image";
import springImage from "@/assets/hands/OpenPalm.png";
import starImage from "@/assets/hands/Fist.png";
import cylinderImage from "@/assets/hands/Victory.png";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

// Registrar GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Iconos para las tarjetas
const cardIcons = [
  <Brain className="w-12 h-12" />,
  <Zap className="w-12 h-12" />,
  <Eye className="w-12 h-12" />,
  <Hand className="w-12 h-12" />
];

const cardGradients = [
  "from-purple-500 via-pink-500 to-red-500",
  "from-yellow-400 via-orange-500 to-red-500",
  "from-blue-500 via-cyan-500 to-teal-500",
  "from-green-400 via-blue-500 to-purple-600"
];

export const Information = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);

  // Obtener datos de tarjetas traducidos
  const cardsData = (t('information.cards', { returnObjects: true }) as Array<{
    title: string;
    subtitle: string;
    description: string;
    badge: string;
  }>).map((card, index) => ({
    ...card,
    icon: cardIcons[index],
    gradient: cardGradients[index]
  }));

  // EFECTOS DE SCROLL OPTIMIZADOS CON GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Configurar aceleración por hardware para mejor renderizado
      gsap.set([springRef.current, starRef.current, cylinderRef.current], {
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
          
          // Spring - Movimiento vertical optimizado
          gsap.to(springRef.current, {
            y: progress * -300,
            scale: 1 + progress * 0.3, // Reducido de 0.8 a 0.3
            duration: 0.3,
            ease: "none"
          });
          
          // Star - Movimiento vertical optimizado
          gsap.to(starRef.current, {
            y: progress * -250,
            scale: 1 + progress * 0.25, // Reducido de 0.7 a 0.25
            duration: 0.3,
            ease: "none"
          });
          
          // Cylinder - Movimiento vertical optimizado
          gsap.to(cylinderRef.current, {
            y: progress * -200,
            scale: 1 + progress * 0.2, // Reducido de 0.5 a 0.2
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Parallax SUAVE para el contenedor de tarjetas
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(cardsContainerRef.current, {
            y: progress * -80, // Reducido de -120 a -80
            duration: 0.4,
            ease: "none"
          });
        }
      });

      // Efectos 3D suaves para el header durante el scroll
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(headerRef.current, {
            y: progress * -60, // Reducido de -80
            rotateX: progress * 4, // Reducido de 8 a 4
            scale: 1 + progress * 0.02, // Reducido de 0.05 a 0.02
            duration: 0.4,
            ease: "none",
            transformPerspective: 1000
          });
        }
      });

      // Animación de entrada para el header
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(headerRef.current, 
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
              ease: "power3.out"
            }
          );
        }
      });

      // Animación de entrada para las tarjetas
      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(cardsContainerRef.current, 
            { 
              opacity: 0, 
              y: 60 // Reducido de 80
            },
            { 
              opacity: 1, 
              y: 0,
              duration: 1, 
              ease: "power3.out",
              delay: 0.3
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-20 overflow-hidden"
      id="informacion"
    >
      <div className="container mx-auto px-4">
        {/* Header de la sección */}
        <div 
          ref={headerRef}
          className="max-w-[540px] mx-auto mb-16 opacity-0"
        >
          <div className="flex justify-center">
            <div className="tag">{t('information.sectionBadge')}</div>
          </div>
          <h2 className="text-center text-4xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text leading-tight pb-1 mt-5">
            {t('information.sectionTitle')}
          </h2>
          <p className="text-center text-xl text-black/60 mt-6 tracking-tight">
            {t('information.sectionSubtitle')}
          </p>
        </div>

        {/* Layout de 4 tarjetas */}
        <div className="relative">
          {/* Una sola fila - 4 tarjetas en desktop, columna en móvil y tablet */}
          <div 
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6 xl:gap-4 justify-items-center opacity-0"
          >
            {cardsData.map((card, index) => (
              <InteractiveCard 
                key={index}
                {...card} 
                delay={0.1 * (index + 1)} 
              />
            ))}
          </div>

          {/* Elementos decorativos optimizados */}
          <div
            ref={springRef}
            className="hidden md:block absolute -right-36 -top-32 will-change-transform"
            style={{ 
              imageRendering: 'crisp-edges',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <Image 
              src={springImage} 
              alt="spring" 
              height={300} 
              width={300}
              quality={95}
              priority={false}
              className="select-none"
            />
          </div>

          <div
            ref={starRef}
            className="hidden md:block absolute -left-36 top-1/2 -translate-y-1/2 will-change-transform"
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
            className="hidden lg:block absolute -right-20 bottom-0 will-change-transform"
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
        </div>
      </div>
    </section>
  );
};
