"use client";

import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/Icono.ico";
import MenuIcon from "@/assets/menu.svg";
import { useState } from "react";
import Image from "next/image";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    setIsMenuOpen(false); // Cerrar el menú móvil después de hacer clic
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block text-center">Controla el mundo con un solo gesto</p>
        <div className="inline-flex gap-1 items-center">
          <a 
            href="#call-to-action" 
            onClick={(e) => smoothScroll(e, 'call-to-action')}
            className="text-center cursor-pointer hover:text-white/80 transition-colors"
          >
            Dale un vistazo a nuestra aplicación
          </a>
          <ArrowRight className="w-4 h-4 inline-flex justify-center items-center" />
        </div>
      </div>
      <div className="py-4 relative">
        <div className="container">
          <div className="flex justify-between items-center">
            <Image src={Logo} alt="logo" width={40} height={40} />    
            <button 
              onClick={toggleMenu}
              className="md:hidden transition-transform duration-300 ease-in-out"
              aria-label="Toggle menu"
            >
              <MenuIcon className={`w-6 h-6 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="#hero" onClick={(e) => smoothScroll(e, 'hero')} className="hover:text-black transition-colors cursor-pointer">Inicio</a>
              <a href="#prueba" onClick={(e) => smoothScroll(e, 'prueba')} className="hover:text-black transition-colors cursor-pointer">Prueba</a>
              <a href="#informacion" onClick={(e) => smoothScroll(e, 'informacion')} className="hover:text-black transition-colors cursor-pointer">Información</a>
              <a href="#que-es" onClick={(e) => smoothScroll(e, 'que-es')} className="hover:text-black transition-colors cursor-pointer">¿Qué es?</a>
              <a href="#testimonios" onClick={(e) => smoothScroll(e, 'testimonios')} className="hover:text-black transition-colors cursor-pointer">Testimonios</a>
              <button 
                onClick={() => {
                  const element = document.getElementById('call-to-action');
                  if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-items aling-items justify-center items-center tracking-tight hover:bg-black/90 transition-colors cursor-pointer"
              >
                Comienza tu prueba
              </button>
            </nav>
          </div>

          {/* Menú móvil */}
          <div 
            className={`mt-5 md:hidden absolute left-0 right-0 bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF]  shadow-lg transform transition-all duration-300 ease-in-out ${
              isMenuOpen 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <nav className="flex flex-col gap-4 py-4 text-black/60">
              <a href="#hero" onClick={(e) => smoothScroll(e, 'hero')} className="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer">Inicio</a>
              <a href="#prueba" onClick={(e) => smoothScroll(e, 'prueba')} className="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer">Prueba</a>
              <a href="#informacion" onClick={(e) => smoothScroll(e, 'informacion')} className="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer">Información</a>
              <a href="#que-es" onClick={(e) => smoothScroll(e, 'que-es')} className="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer">¿Qué es?</a>
              <a href="#testimonios" onClick={(e) => smoothScroll(e, 'testimonios')} className="px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer">Testimonios</a>
              <button 
                onClick={() => {
                  const element = document.getElementById('call-to-action');
                  if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                  setIsMenuOpen(false);
                }}
                className="mx-4 bg-black text-white px-4 py-2 rounded-lg font-medium tracking-tight hover:bg-black/90 transition-colors duration-200 cursor-pointer"
              >
                Comienza tu prueba
              </button>
            </nav>
          </div>
        </div>
      </div> 
    </header> 
  );
};
