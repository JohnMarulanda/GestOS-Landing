"use client"

import Logo from "@/assets/Icono.ico";
import FondoFooter from "@/assets/hands/FondoFooter.png";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100; // Offset para compensar el header sticky
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
  <footer className="relative bg-black text-white text-sm py-10 text-center overflow-hidden">
    {/* Imagen de fondo con opacidad */}
    <div className="absolute inset-0 z-0">
      <Image 
        src={FondoFooter} 
        alt="Fondo Footer" 
        fill
        className="object-cover opacity-20"
        priority={false}
      />
      {/* Overlay adicional para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
    
    {/* Contenido del footer */}
    <div className="container relative z-10">
      <div className="inline-flex relative before:content-[''] before:absolute before:h-full before:w-full before:blur before:bg-gradient-to-b from-black via-cyan-500 via-blue-500 to-teal-500 before:opacity-10 before:z-[-1] before:rounded-full" >
        <Image src={Logo} alt="logo" width={40} height={40} />
      </div>
        <nav className="flex flex-col md:flex-row md:justify-center items-center gap-6 mt-6">
          <a href="#hero" onClick={(e) => smoothScroll(e, 'hero')} className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-105 transform cursor-pointer">{t('footer.nav.home')}</a>
          <a href="#prueba" onClick={(e) => smoothScroll(e, 'prueba')} className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-105 transform cursor-pointer">{t('footer.nav.demo')}</a>
          <a href="#que-es" onClick={(e) => smoothScroll(e, 'que-es')} className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-105 transform cursor-pointer">{t('footer.nav.whatIs')}</a>
          <a href="#informacion" onClick={(e) => smoothScroll(e, 'informacion')} className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-105 transform cursor-pointer">{t('footer.nav.information')}</a>
          <a href="#testimonios" onClick={(e) => smoothScroll(e, 'testimonios')} className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-105 transform cursor-pointer">{t('footer.nav.testimonials')}</a>
          <a href="#call-to-action" onClick={(e) => smoothScroll(e, 'call-to-action')} className="text-white/70 hover:text-white transition-colors duration-300 hover:scale-105 transform cursor-pointer">{t('footer.nav.download')}</a>
        </nav>
        <div className="flex justify-center gap-6 mt-6">
          <a 
            href="https://www.linkedin.com/in/john-marulanda/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 active:scale-110 group"
          >
            <FaLinkedin className="w-6 h-6 group-hover:drop-shadow-lg group-hover:shadow-blue-400/50" />
          </a>
          <a 
            href="https://www.instagram.com/j._.marulanda/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-pink-400 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 active:scale-110 group"
          >
            <FaInstagram className="w-6 h-6 group-hover:drop-shadow-lg group-hover:shadow-pink-400/50" />
          </a>
          <a 
            href="https://github.com/JohnMarulanda" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/70 hover:text-gray-300 transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 active:scale-110 group"
          >
            <FaGithub className="w-6 h-6 group-hover:drop-shadow-lg group-hover:shadow-gray-300/50" />
          </a>
        </div>
        <p className="text-white/60 mt-6">{t('footer.copyright')}</p>  
    </div>
  </footer> 
  ) ;
};
