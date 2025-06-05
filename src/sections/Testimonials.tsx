"use client"

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

// Registrar GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TestimonialsColumn = (props: { className?: string; testimonials: any[], duration?: number }) => {
  return (
    <div className={props.className}> 
      <motion.div className="flex flex-col gap-6"
      animate={{ translateY: "-50%" }}
      transition={{ repeat: Infinity, repeatType: "loop", duration: props.duration || 10, ease: "linear" }}
      >
        {[...new Array(2).fill(0).map((_, index) =>
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name, username }, testIndex) => (
              <div key={`${index}-${testIndex}`} className="card">
                <div>{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5">{name}</div>
                    <div className="leading-5 tracking-tight text-black/60">{username}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        )]}
      </motion.div>
    </div>
  );
}

export const Testimonials = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const testimonialsContainerRef = useRef<HTMLDivElement>(null);

  // Obtener testimonios traducidos
  const testimonials = t('testimonials.list', { returnObjects: true }) as Array<{
    text: string;
    name: string;
    username: string;
  }>;

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

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
        }, "-=0.6")
        .from(buttonRef.current, {
          y: 20,
          opacity: 0,
          scale: 0.9,
          duration: 0.8
        }, "-=0.4");

      // Animación de entrada para el contenedor de testimonios
      gsap.fromTo(testimonialsContainerRef.current,
        {
          opacity: 0,
          y: 80
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 1
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // SCROLL TRIGGERS PARA PARALLAX DRAMÁTICO
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax LLAMATIVO para el header
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(tagRef.current, {
            y: progress * -60,
            scale: 1 + progress * 0.05,
            duration: 0.3,
            ease: "none"
          });
          
          gsap.to(titleRef.current, {
            y: progress * -80,
            duration: 0.3,
            ease: "none"
          });
          
          gsap.to(descriptionRef.current, {
            y: progress * -50,
            duration: 0.3,
            ease: "none"
          });

          gsap.to(buttonRef.current, {
            y: progress * -40,
            scale: 1 - progress * 0.05,
            duration: 0.3,
            ease: "none"
          });
        }
      });

      // Efectos 3D para el header durante el scroll
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(headerRef.current, {
            rotateX: progress * 8,
            scale: 1 + progress * 0.05,
            duration: 0.3,
            ease: "none",
            transformPerspective: 1000
          });
        }
      });

      // Parallax para el contenedor de testimonios
      ScrollTrigger.create({
        trigger: testimonialsContainerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(testimonialsContainerRef.current, {
            y: progress * -40,
            duration: 0.3,
            ease: "none"
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF]" id="testimonios">
      <div className="container">
        <div ref={headerRef} className="flex flex-col items-center">
          <div className="flex justify-center">
            <div ref={tagRef} className="tag">
              {t('testimonials.badge')}
            </div>
          </div>
          <h2 ref={titleRef} className="text-center text-4xl font-bold tracking-tighter bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 text-transparent bg-clip-text leading-tight pb-1 mt-5">
            {t('testimonials.title')}
          </h2>
          <p ref={descriptionRef} className="text-center text-xl text-black/60 mt-6 tracking-tight">
            {t('testimonials.subtitle')}
          </p>
          
        <div ref={buttonRef} className="mt-12 flex justify-center">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe-xFfvsmlu-toMN2OKWokRlKbVYD-nDxtjD9j-bCESe6djrg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary">
            {t('testimonials.button')}
          </a>
        </div>
        </div>
        <div ref={testimonialsContainerRef} className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};
