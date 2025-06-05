"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollingProps {
  children: React.ReactNode;
}

export const SmoothScrolling = ({ children }: SmoothScrollingProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Crear instancia de Lenis con configuración mejorada
    lenisRef.current = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2.5,
      infinite: false,
      autoResize: true,
      prevent: (node) => node.classList.contains('lenis-prevent'),
    });

    // Sincronizar Lenis con GSAP ScrollTrigger
    lenisRef.current.on('scroll', (e) => {
      ScrollTrigger.update();
    });

    // Función para el loop de animación optimizada
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // ScrollTrigger refresh cuando se completa la inicialización
    ScrollTrigger.refresh();

    // Event listeners para responsive
    const handleResize = () => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Prevent scroll on specific elements
    const preventScrollElements = document.querySelectorAll('.lenis-prevent');
    preventScrollElements.forEach(el => {
      el.addEventListener('wheel', (e) => e.stopPropagation());
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Método para scroll programático
  useEffect(() => {
    if (lenisRef.current) {
      // Hacer disponible globalmente para uso en componentes
      (window as any).lenis = lenisRef.current;
    }
  }, []);

  return <>{children}</>;
}; 