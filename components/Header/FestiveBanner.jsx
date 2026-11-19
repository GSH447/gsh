"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X, Sparkles } from "lucide-react";

const SNOWFLAKES = [
  { left: "8%", size: 3, duration: 6, delay: 0 },
  { left: "22%", size: 2, duration: 8, delay: 1.5 },
  { left: "36%", size: 3.5, duration: 7, delay: 0.6 },
  { left: "54%", size: 2.5, duration: 9, delay: 2.1 },
  { left: "71%", size: 3, duration: 6.5, delay: 1.0 },
  { left: "86%", size: 2, duration: 7.5, delay: 0.3 },
  { left: "94%", size: 3, duration: 8.5, delay: 1.8 },
];

const ORNAMENTS = [
  { side: "left-[5%]", stringH: "h-2", size: "w-4 h-4", color: "from-red-400 via-red-600 to-red-900", glow: "rgba(239,68,68,0.65)", sway: [-4, 4, -4], dur: 4.2 },
  { side: "left-[15%]", stringH: "h-3.5", size: "w-3.5 h-3.5", color: "from-yellow-200 via-amber-400 to-amber-700", glow: "rgba(251,191,36,0.65)", sway: [3, -3, 3], dur: 4.8 },
  { side: "right-[15%]", stringH: "h-3", size: "w-4 h-4", color: "from-red-400 via-red-600 to-red-900", glow: "rgba(239,68,68,0.65)", sway: [-3.5, 3.5, -3.5], dur: 4.5 },
  { side: "right-[5%]", stringH: "h-2", size: "w-3.5 h-3.5", color: "from-yellow-200 via-amber-400 to-amber-700", glow: "rgba(251,191,36,0.65)", sway: [4, -4, 4], dur: 3.9 },
];

export default function FestiveBanner() {
  const [visible, setVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const lights = Array.from({ length: 28 }, (_, i) => i);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Seasonal Greeting"
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#052010] via-[#0f4a27] to-[#052010] text-white py-3.5 px-10 border-b border-[#d4af37]/40 select-none"
    >
      {/* Warm Radial Spotlight Behind Text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,208,97,0.14)_0%,transparent_65%)]"
      />

      {/* Gently Drifting Snowflakes */}
      {!shouldReduceMotion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {SNOWFLAKES.map((flake, idx) => (
            <motion.span
              key={idx}
              className="absolute -top-2 rounded-full bg-white/80 blur-[0.3px]"
              style={{
                left: flake.left,
                width: flake.size,
                height: flake.size,
              }}
              animate={{
                y: [0, 56],
                x: [-4, 4, -4],
                opacity: [0, 0.85, 0],
              }}
              transition={{
                duration: flake.duration,
                repeat: Infinity,
                delay: flake.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* 3D Hanging Ornaments with Caps & Specular Highlights */}
      <div aria-hidden="true" className="pointer-events-none hidden md:block">
        {ORNAMENTS.map((item, idx) => (
          <motion.div
            key={idx}
            className={`absolute top-0 ${item.side} flex flex-col items-center origin-top`}
            animate={shouldReduceMotion ? undefined : { rotate: item.sway }}
            transition={{ duration: item.dur, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Hanging thread */}
            <div className={`w-[1px] ${item.stringH} bg-gradient-to-b from-yellow-200/40 to-yellow-300/90`} />
            {/* Gold ornament cap */}
            <div className="w-1.5 h-1 rounded-t-sm bg-yellow-300" />
            {/* Bauble body */}
            <div
              className={`relative ${item.size} rounded-full bg-gradient-to-br ${item.color}`}
              style={{ boxShadow: `0 0 10px ${item.glow}` }}
            >
              {/* Glossy highlight */}
              <span className="absolute top-0.5 left-1 w-1 h-1 rounded-full bg-white/60" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Centered Festive Message */}
      <div className="relative z-10 max-w-[1600px] mx-auto flex items-center justify-center gap-2 text-center">
        <Sparkles className="hidden sm:inline-block w-3.5 h-3.5 text-[#F5D061] shrink-0 opacity-90" />
        <p className="text-xs sm:text-sm md:text-base font-medium tracking-wide text-white/95 drop-shadow-sm">
          Season&apos;s greetings from Gracespring Hospitals. Merry{" "}
          <span className="italic font-bold bg-gradient-to-r from-[#FDE68A] via-[#F5D061] to-[#FBBF24] bg-clip-text text-transparent">
            Christmas
          </span>{" "}
          in advance!
        </p>
        <Sparkles className="hidden sm:inline-block w-3.5 h-3.5 text-[#F5D061] shrink-0 opacity-90" />
      </div>

      {/* Dismiss Button */}
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss seasonal banner"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Bottom Fairy Lights with Subtle Wire */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between px-3 border-t border-yellow-200/15 pt-0.5"
      >
        {lights.map((i) => {
          const isWarm = i % 3 !== 0;
          return (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full mb-0.5"
              style={{
                backgroundColor: isWarm ? "#FDE047" : "#FCA5A5",
                boxShadow: isWarm
                  ? "0 0 7px 2px rgba(253, 224, 71, 0.75)"
                  : "0 0 7px 2px rgba(248, 113, 113, 0.7)",
              }}
              animate={shouldReduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: (i % 5) * 0.35,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// export default function FestiveBanner() {
//   // Subtle twinkling fairy light positions along the bottom string
//   const lights = Array.from({ length: 24 }, (_, i) => i);

//   return (
//     <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#072b16] via-[#12522d] to-[#072b16] text-white py-3 px-4 border-b border-[#d4af37]/30 select-none">
//       {/* Subtle Snowflakes / Sparkles */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         {[
//           { left: "12%", top: "20%", delay: 0 },
//           { left: "28%", top: "65%", delay: 0.8 },
//           { left: "45%", top: "18%", delay: 1.4 },
//           { left: "68%", top: "30%", delay: 0.4 },
//           { left: "82%", top: "60%", delay: 1.1 },
//           { left: "92%", top: "22%", delay: 0.6 },
//         ].map((dot, idx) => (
//           <motion.span
//             key={idx}
//             className="absolute w-1 h-1 rounded-full bg-white/70"
//             style={{ left: dot.left, top: dot.top }}
//             animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
//             transition={{
//               duration: 2.5,
//               repeat: Infinity,
//               delay: dot.delay,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       {/* Hanging Ornaments (Hidden on very small screens to keep text clean) */}
//       <div className="pointer-events-none hidden sm:block">
//         {/* Left Red Bauble */}
//         <motion.div
//           className="absolute top-0 left-[6%] flex flex-col items-center origin-top"
//           animate={{ rotate: [-3, 3, -3] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <div className="w-[1px] h-2 bg-yellow-300/70" />
//           <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 via-red-600 to-red-900 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
//         </motion.div>

//         {/* Left Gold Bauble */}
//         <motion.div
//           className="absolute top-0 left-[18%] flex flex-col items-center origin-top"
//           animate={{ rotate: [3, -3, 3] }}
//           transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <div className="w-[1px] h-3 bg-yellow-300/70" />
//           <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-amber-700 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
//         </motion.div>

//         {/* Right Red Bauble */}
//         <motion.div
//           className="absolute top-0 right-[18%] flex flex-col items-center origin-top"
//           animate={{ rotate: [-2.5, 2.5, -2.5] }}
//           transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <div className="w-[1px] h-2.5 bg-yellow-300/70" />
//           <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 via-red-600 to-red-900 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
//         </motion.div>

//         {/* Right Gold Bauble */}
//         <motion.div
//           className="absolute top-0 right-[6%] flex flex-col items-center origin-top"
//           animate={{ rotate: [2.5, -2.5, 2.5] }}
//           transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <div className="w-[1px] h-2 bg-yellow-300/70" />
//           <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-yellow-200 via-amber-400 to-amber-700 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
//         </motion.div>
//       </div>

//       {/* Centered Festive Message */}
//       <div className="relative z-10 max-w-[1600px] mx-auto flex items-center justify-center text-center">
//         <p className="text-xs sm:text-sm md:text-base font-medium tracking-wide text-white/95">
//           Season&apos;s greetings from Gracespring Hospitals. Merry{" "}
//           <span className="italic font-bold text-[#F5D061]">Christmas</span> in
//           advance!
//         </p>
//       </div>

//       {/* Bottom String of Twinkling Fairy Lights */}
//       <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-end justify-between px-2">
//         {lights.map((i) => (
//           <motion.span
//             key={i}
//             className="w-1.5 h-1.5 rounded-full mb-0.5"
//             style={{
//               backgroundColor: i % 2 === 0 ? "#FDE047" : "#FEF08A",
//               boxShadow: "0 0 6px 2px rgba(253, 224, 71, 0.7)",
//             }}
//             animate={{ opacity: [0.35, 1, 0.35] }}
//             transition={{
//               duration: 1.8,
//               repeat: Infinity,
//               delay: (i % 4) * 0.4,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }