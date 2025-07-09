"use client";

import { useEffect, useState } from 'react';
import i18n from '../i18n/config';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initI18n = async () => {
      try {
        // Asegurar que i18n está inicializado
        if (!i18n.isInitialized) {
          await i18n.init();
        }

        // Verificar y establecer idioma inglés por defecto
        const currentLang = i18n.language;
        if (!currentLang || currentLang === 'undefined' || currentLang === 'es-ES' || currentLang === 'es') {
          console.log('Configurando idioma inglés por defecto');
          await i18n.changeLanguage('en');
          localStorage.setItem('i18nextLng', 'en');
        }

        setIsInitialized(true);
      } catch (error) {
        console.error('Error inicializando i18n:', error);
        // Incluso si hay error, mostrar el contenido
        setIsInitialized(true);
      }
    };

    initI18n();
  }, []);

  // Mostrar contenido incluso si no está completamente inicializado
  // para evitar bloqueos
  return <>{children}</>;
} 