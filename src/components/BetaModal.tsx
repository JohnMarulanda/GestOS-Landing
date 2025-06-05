"use client"

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

interface BetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BetaModal = ({ isOpen, onClose }: BetaModalProps) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const email = "gestos031@gmail.com";
  const subject = t('betaModal.contact.subject');

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      // Mostrar confirmación visual
      const button = document.getElementById('copy-button');
      if (button) {
        const originalText = button.textContent;
        button.textContent = t('betaModal.contact.copiedButton');
        button.style.background = '#10B981';
        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '';
        }, 2000);
      }
    } catch (err) {
      console.error('Error al copiar el email:', err);
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const openEmailClient = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  };

  // Animaciones de entrada y salida
  useEffect(() => {
    if (!modalRef.current || !contentRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        // Animación de entrada
        gsap.set(modalRef.current, { display: 'flex' });
        gsap.fromTo(overlayRef.current, 
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(contentRef.current,
          { 
            opacity: 0,
            scale: 0.8,
            y: 50
          },
          { 
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.7)",
            delay: 0.1
          }
        );
      } else {
        // Animación de salida
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in"
        });
        gsap.to(contentRef.current, {
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(modalRef.current, { display: 'none' });
          }
        });
      }
    }, modalRef);

    return () => ctx.revert();
  }, [isOpen]);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ display: 'none' }}
    >
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        ref={contentRef}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{t('betaModal.title')}</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('betaModal.warning.title')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {t('betaModal.warning.security')}
              </p>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 mb-3">
            {t('betaModal.contact.instruction')}
          </p>
          
          <div className="bg-white rounded-lg border border-gray-200 p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{email}</p>
                <p className="text-xs text-gray-500">Asunto: {subject}</p>
              </div>
              <button
                id="copy-button"
                onClick={copyEmailToClipboard}
                className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t('betaModal.contact.copyButton')}
              </button>
            </div>
          </div>

          <button
            onClick={openEmailClient}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t('betaModal.contact.openEmailButton')}
          </button>
        </div>

        {/* Footer */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            {t('betaModal.buttons.continueViewing')}
          </button>
        </div>
      </div>
    </div>
  );
}; 