"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAP = () => {
  const contextRef = useRef<gsap.Context>();

  useEffect(() => {
    // Crear contexto GSAP para fácil cleanup
    contextRef.current = gsap.context(() => {});

    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return contextRef.current;
};

export const useScrollAnimation = (
  trigger: string | Element,
  animation: () => gsap.core.Timeline | gsap.core.Tween,
  options?: ScrollTrigger.Vars
) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = animation();
      
      ScrollTrigger.create({
        trigger,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...options,
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, [trigger, animation, options]);
}; 