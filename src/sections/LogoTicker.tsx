"use client"; 

import opencvLogo from "@/assets/logos/opencv.webp";
import tailwindLogo from "@/assets/logos/Tailwindcss.webp";
import electronLogo from "@/assets/logos/Electron.png";
import pythonLogo from "@/assets/logos/Python.png";
import mediapipeLogo from "@/assets/logos/Mediapipe.png";
import reactLogo from "@/assets/logos/React.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const LogoTicker = () => {
  const { t } = useTranslation();

  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <h2 className="text-lg md:text-xl text-center text-black/70 mb-8 font-medium">
          {t('logoTicker.title')}
        </h2>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div className="flex gap-14 flex-none pr-14" animate={{ translateX: "-50%" }} transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "loop" }}>
            <Image src={pythonLogo} alt="Python" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src={reactLogo} alt="React" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src={tailwindLogo} alt="TailwindCSS" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src={electronLogo} alt="Electron" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" /> 
            <Image src={mediapipeLogo} alt="MediaPipe" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src={opencvLogo} alt="OpenCV" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />

            {/* Se repite el logo */}
            <Image src={pythonLogo} alt="Python" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src={reactLogo} alt="React" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src={tailwindLogo} alt="TailwindCSS" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src={electronLogo} alt="Electron" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src={mediapipeLogo} alt="MediaPipe" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
            <Image src={opencvLogo} alt="OpenCV" width={120} height={120} className="logo-ticker-image grayscale hover:grayscale-0 transition-all duration-300" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};