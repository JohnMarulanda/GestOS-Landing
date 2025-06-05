"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";

// Parámetros de interacción más dramáticos
const sheenSize = 500;
const cardRotation = 25; // Aumentado para efecto más dramático
const cardScale = 1.1;   // Aumentado para efecto más dramático

interface InteractiveCardProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  icon?: ReactNode;
  gradient?: string;
  badge?: string;
  delay?: number;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  subtitle,
  description,
  image,
  icon,
  gradient = "from-blue-400 via-purple-400 to-cyan-400",
  badge,
  delay = 0
}) => {
  // Motion values
  const xPcnt = useSpring(0, { bounce: 0 });
  const yPcnt = useSpring(0, { bounce: 0 });
  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });
  const scale = useSpring(1, { bounce: 0 });

  // Valores de rotación calculados con efecto más dramático
  const rotateX = useTransform(
    yPcnt,
    [-0.5, 0.5],
    [`-${cardRotation}deg`, `${cardRotation}deg`]
  );
  const rotateY = useTransform(
    xPcnt,
    [-0.5, 0.5],
    [`${cardRotation}deg`, `-${cardRotation}deg`]
  );

  // Valores de brillo calculados
  const sheenX = useTransform(() => mouseX.get() - sheenSize / 2);
  const sheenY = useTransform(() => mouseY.get() - sheenSize / 2);

  // Función helper para obtener posición del mouse
  const getMousePosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;

    return {
      currentMouseX,
      currentMouseY,
      containerWidth: width,
      containerHeight: height,
    };
  };

  // Event handlers
  const handleMouseMove: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY, containerWidth, containerHeight } =
      getMousePosition(e);

    xPcnt.set(currentMouseX / containerWidth - 0.5);
    yPcnt.set(currentMouseY / containerHeight - 0.5);

    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseEnter: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY } = getMousePosition(e);

    mouseX.jump(currentMouseX);
    mouseY.jump(currentMouseY);
    scale.set(cardScale);
  };

  const handleMouseLeave: MouseEventHandler = () => {
    xPcnt.set(0);
    yPcnt.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 100
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col h-80 w-64 rounded-2xl bg-gradient-to-br ${gradient} p-6 shadow-2xl overflow-hidden group cursor-pointer border border-white/20 mx-auto`}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        scale,
        zIndex: 1,
      }}
    >
      {/* Efecto de brillo */}
      <motion.div
        className="absolute z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-full blur-xl pointer-events-none"
        style={{
          height: sheenSize,
          width: sheenSize,
          background: "radial-gradient(white, transparent 70%)",
          left: sheenX,
          top: sheenY,
        }}
      />

      {/* Contenido de la tarjeta */}
      <div className="relative z-20 flex flex-col h-full">
        {/* Header con imagen o icono */}
        <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4 bg-white/10 backdrop-blur-sm border border-white/20">
          {image ? (
            <Image 
              src={image} 
              alt={title} 
              fill 
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/80">
              {icon || (
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl font-bold">{title.charAt(0)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contenido de texto */}
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
            {title}
          </h3>
          <p className="text-sm text-white/80 font-medium">
            {subtitle}
          </p>
          <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto flex justify-between items-center">
          {badge && (
            <span className="text-xs font-medium px-3 py-1.5 bg-white/20 text-white border border-white/30 rounded-full backdrop-blur-sm">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Overlay adicional para mejor contraste */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}; 