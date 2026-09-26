import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  size?: number;
  variant?: "gold" | "dark" | "ivory";
  showText?: boolean;
}

export default function Logo({ className = "", size = 48, variant = "gold", showText = true }: LogoProps) {
  // Select color scheme
  const colors = {
    gold: {
      primary: "#c5a85c", // Temple Brass/Gold
      secondary: "#0d261b", // Forest Green
      accent: "#faf8f5" // Ivory
    },
    dark: {
      primary: "#0d261b", // Forest Green
      secondary: "#c5a85c",
      accent: "#1e1e1e" // Soft Charcoal
    },
    ivory: {
      primary: "#faf8f5", // Ivory
      secondary: "#c5a85c",
      accent: "#faf8f5"
    }
  }[variant];

  return (
    <div className={`flex items-center gap-3 ${className}`} id="locallore-brand-logo">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: -10, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="cursor-pointer"
      >
        {/* Outer Circular Brass Seal Border */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke={colors.primary}
          strokeWidth="2"
          strokeDasharray="4 2"
          className="opacity-90"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke={colors.primary}
          strokeWidth="0.75"
          className="opacity-70"
        />

        {/* Embedded Compass Star (Zenith/North Star) */}
        <path
          d="M50 15 L52 23 L60 25 L52 27 L50 35 L48 27 L40 25 L48 23 Z"
          fill={colors.primary}
          className="opacity-95"
        />

        {/* The Temple Gopuram (Central Pillar & Monumental Gate) */}
        {/* Combining traditional tiers with clean geometry */}
        <path
          d="M42 68 
             L44 60 
             L41 60 
             L43 51 
             L40 51 
             L43 41 
             L47 41 
             L45 34 
             L55 34 
             L53 41 
             L57 41 
             L54 51 
             L57 51 
             L54 60 
             L56 60 
             L58 68 Z"
          stroke={colors.primary}
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Gopuram inner tiers lines */}
        <line x1="45" y1="56" x2="55" y2="56" stroke={colors.primary} strokeWidth="1" />
        <line x1="46" y1="47" x2="54" y2="47" stroke={colors.primary} strokeWidth="1" />
        
        {/* The Open Storybook pages forming the temple foundation/base */}
        <path
          d="M50 68 
             C38 68, 25 64, 20 60 
             C24 68, 38 72, 50 72 
             C62 72, 76 68, 80 60 
             C75 64, 62 68, 50 68 Z"
          fill={colors.primary}
          className="opacity-90"
        />
        {/* Book spine line */}
        <line x1="50" y1="68" x2="50" y2="72" stroke={variant === "ivory" ? "#c5a85c" : colors.secondary} strokeWidth="1.5" />

        {/* Coconut Palm tree gracefully rising out from the left and arching over the Gopuram */}
        <path
          d="M32 63 C28 50, 32 38, 44 33"
          stroke={colors.primary}
          strokeWidth="1.25"
          strokeLinecap="round"
          fill="none"
          className="opacity-85"
        />
        {/* Palm Fronds */}
        <path
          d="M44 33 C42 30, 36 29, 32 30 
             M44 33 C46 30, 41 27, 36 26 
             M44 33 C42 34, 38 35, 34 37"
          stroke={colors.primary}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* Ocean Waves at the very base */}
        <path
          d="M22 79 C28 77, 32 81, 38 79 C44 77, 48 81, 54 79 C60 77, 64 81, 70 79 C76 77, 80 81, 85 79"
          stroke={colors.primary}
          strokeWidth="1.25"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M25 84 C30 82, 34 86, 40 84 C46 82, 50 86, 56 84 C62 82, 66 86, 72 84 C78 82, 82 86, 87 84"
          stroke={colors.primary}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          className="opacity-60"
        />
      </motion.svg>

      {showText && (
        <div className="flex flex-col select-none">
          <span 
            className="font-serif font-semibold tracking-widest text-lg leading-tight uppercase transition-colors"
            style={{ color: colors.primary }}
          >
            LocalLore
          </span>
          <span 
            className="font-mono text-[9px] tracking-widest uppercase opacity-70 transition-colors"
            style={{ color: colors.primary }}
          >
            Stories • Places • Culture
          </span>
        </div>
      )}
    </div>
  );
}
