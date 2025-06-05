"use client";

import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/Icono.ico";
import MenuIcon from "@/assets/menu.svg";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/LanguageSelector";

export const Header = () => {
  const { t } = useTranslation();
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
        <p className="text-white/60 hidden md:block text-center">{t('header.topBanner')}</p>
        <div className="inline-flex gap-1 items-center">
          <a 
            href="#call-to-action" 
            onClick={(e) => smoothScroll(e, 'call-to-action')}
            className="text-center cursor-pointer hover:text-white/80 transition-colors"
          >
            {t('header.ctaBanner')}
          </a>
          <ArrowRight className="w-4 h-4 inline-flex justify-center items-center" />
        </div>
      </div>
      <div className="py-4 relative">
        <div className="container">
          <div className="flex justify-between items-center">
            <Image src={Logo} alt="logo" width={40} height={40} />    
            
            {/* Selector de idioma y botón hamburguesa para móvil */}
            <div className="flex items-center gap-3 md:hidden">
              <LanguageSelector />
              <button 
                onClick={toggleMenu}
                className="transition-transform duration-300 ease-in-out"
                aria-label="Toggle menu"
              >
                <MenuIcon className={`w-6 h-6 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="#inicio" className="hover:text-black transition-colors">{t('header.nav.home')}</a>
              <a href="#demo" className="hover:text-black transition-colors">{t('header.nav.demo')}</a>
              <a href="#informacion" className="hover:text-black transition-colors">{t('header.nav.information')}</a>
              <a href="#que-es" className="hover:text-black transition-colors">{t('header.nav.whatIs')}</a>
              <a href="#testimonios" className="hover:text-black transition-colors">{t('header.nav.testimonials')}</a>
              <button 
                className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight"
                aria-label={t('header.startTrial')}
              >
                {t('header.startTrial')}
              </button>
              <LanguageSelector />
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
            <div className="py-6 px-4 space-y-4">
              <a 
                href="#inicio" 
                className="block text-lg font-semibold text-gray-900 hover:text-cyan-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.home')}
              </a>
              <a 
                href="#demo" 
                className="block text-lg font-semibold text-gray-900 hover:text-cyan-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.demo')}
              </a>
              <a 
                href="#informacion" 
                className="block text-lg font-semibold text-gray-900 hover:text-cyan-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.information')}
              </a>
              <a 
                href="#que-es" 
                className="block text-lg font-semibold text-gray-900 hover:text-cyan-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.whatIs')}
              </a>
              <a 
                href="#testimonios" 
                className="block text-lg font-semibold text-gray-900 hover:text-cyan-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.nav.testimonials')}
              </a>
              <LanguageSelector />
              <button 
                className="w-full bg-black text-white px-4 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
                aria-label={t('header.startTrial')}
              >
                {t('header.startTrial')}
              </button>
            </div>
          </div>
        </div>
      </div> 
    </header> 
  );
};
