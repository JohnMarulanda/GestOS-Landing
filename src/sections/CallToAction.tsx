"use client"

import starImage from "@/assets/hands/Victory.png";
import springImage from "@/assets/hands/Fist.png";
import Image from "next/image";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { BetaModal } from '@/components/BetaModal';

// Registrar GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CallToAction = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<HTMLDivElement>(null);

  // ANIMACIONES DE ENTRADA CON GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animaciones de entrada del contenido
      const contentTl = gsap.timeline({
        defaults: { ease: "power3.out" }
      });

      contentTl
        .from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.2
        })
        .from(descriptionRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8
        }, "-=0.6")
        .from(buttonsRef.current, {
          y: 20,
          opacity: 0,
          scale: 0.9,
          duration: 0.8
        }, "-=0.4");

      // Animaciones de entrada de las imágenes decorativas
      gsap.set([starRef.current, springRef.current], {
        opacity: 0,
        scale: 0.8,
        rotation: -20
      });

      const imagesTl = gsap.timeline({ delay: 0.6 });
      
      imagesTl
        .to(starRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        })
        .to(springRef.current, {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.7)"
        }, "-=1");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ANIMACIONES CONTINUAS PARA IMÁGENES DECORATIVAS
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eliminamos las animaciones flotantes continuas para imágenes decorativas
      // Solo mantenemos las animaciones de scroll
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // SCROLL TRIGGERS PARA PARALLAX OPTIMIZADO
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Configurar aceleración por hardware para mejor renderizado
      gsap.set([starRef.current, springRef.current], {
        force3D: true,
        transformOrigin: "center center"
      });

      // Parallax SUAVE para las imágenes decorativas (sin scale excesivo)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Star - Movimiento vertical optimizado
          gsap.to(starRef.current, {
            y: progress * -280,
            scale: 1 + progress * 0.25, // Reducido de 0.8 a 0.25
            duration: 0.3,
            ease: "none"
          });
          
          // Spring - Movimiento vertical optimizado
          gsap.to(springRef.current, {
            y: progress * -250,
            scale: 1 + progress * 0.2, // Reducido de 0.7 a 0.2
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Parallax suave para el contenido
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(titleRef.current, {
            y: progress * -45, // Reducido de -60
            duration: 0.4,
            ease: "none"
          });
          
          gsap.to(descriptionRef.current, {
            y: progress * -30, // Reducido de -40
            duration: 0.4,
            ease: "none"
          });
          
          gsap.to(buttonsRef.current, {
            y: progress * -25, // Reducido de -30
            duration: 0.4,
            ease: "none"
          });
        }
      });

      // Efectos 3D suaves para el contenido durante el scroll
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(contentRef.current, {
            rotateX: progress * 3, // Reducido de 6 a 3
            scale: 1 + progress * 0.015, // Reducido de 0.03 a 0.015
            duration: 0.4,
            ease: "none",
            transformPerspective: 1000
          });
        }
      });

      // Animación de entrada para el contenido principal
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.fromTo(contentRef.current,
            { 
              opacity: 0, 
              y: 50, // Reducido de 60
              scale: 0.98 // Reducido de 0.95
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

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] overflow-x-clip" id="call-to-action">
      <div className="container">   
        <div ref={contentRef} className="flex flex-col items-center relative">
          <h2 ref={titleRef} className="text-center text-4xl font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text leading-tight pb-1 mt-5">
            {t('callToAction.title')}
          </h2>
          <p className="text-center text-sm text-black/60 mt-2 font-medium">
            {t('callToAction.subtitle')}
          </p>
          <p ref={descriptionRef} className="text-center text-xl text-black/60 mt-6 tracking-tight">
            {t('callToAction.description')}
          </p>
          <div
            ref={starRef}
            className="absolute -top-[137px] -left-[300px] opacity-0 will-change-transform"
            style={{ 
              imageRendering: 'crisp-edges',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <Image 
              src={starImage} 
              alt="start" 
              width={400} 
              height={400}
              quality={95}
              priority={false}
              className="select-none"
            />
          </div>
          <div
            ref={springRef}
            className="absolute -top-[19px] -right-[331px] opacity-0 will-change-transform"
            style={{ 
              imageRendering: 'crisp-edges',
              backfaceVisibility: 'hidden',
              perspective: '1000px'
            }}
          >
            <Image 
              src={springImage} 
              alt="spring" 
              width={400} 
              height={400}
              quality={95}
              priority={false}
              className="select-none"
            />
          </div>
        </div>
        <div ref={buttonsRef} className="flex justify-center gap-2 mt-10">
          <button 
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            {t('callToAction.primaryButton')}
          </button>
        </div>   
      </div>
      
      {/* Beta Modal */}
      <BetaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />   
    </section>
  );
};
