"use client";

import { useEffect } from 'react';
import '../i18n/config';

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // La configuración de i18n se carga automáticamente al importar el archivo config
  }, []);

  return <>{children}</>;
} 