"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { services_short_cut } from "../SiteMaps/data";
import ServiceShortCutDesktop from "./ServiceDesktopView"; 


// const letterVariants = {
//   hidden: {
//     opacity: 0,
//     y: 50,
//     filter: 'blur(8px)',
//   },
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     filter: 'blur(0px)',
//     transition: {
//       delay: i * 0.04,
//       duration: 0.5,
//       ease: 'easeOut',
//     },
//   }),
// };

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: 'blur(8px)',
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.02, // Slightly sped up for better flow, adjust as needed
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};



const AnimatedText = ({ text, className = '' }) => {
  // Track global index for the staggered delay effect across the whole sentence
  let globalIndex = 0; 

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.3,
      }}
    >
      {/* Step 1: Split by spaces to keep words intact */}
      {text.split(' ').map((word, wordIndex) => (
        // Wrapper span prevents the word itself from breaking
        <span key={wordIndex} className="inline-block mr-[0.25em] whitespace-nowrap">
          {/* Step 2: Split the word into animated characters */}
          {word.split('').map((char, charIndex) => {
            const currentIndex = globalIndex++;
            return (
              <motion.span
                key={charIndex}
                custom={currentIndex}
                variants={letterVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.div>
  );
};



// const AnimatedText = ({
//   text,
//   className = '',
// }) => {
//   return (
//     <motion.div
//       className={`flex flex-wrap ${className}`}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{
//         once: false,
//         amount: 0.3,
//       }}
//     >
//       {text.split('').map((char, index) => (
//         <motion.span
//           key={index}
//           custom={index}
//           variants={letterVariants}
//           className="inline-block"
//         >
//           {char === ' ' ? '\u00A0' : char}
//         </motion.span>
//       ))}
//     </motion.div>
//   );
// };

const SpecialistCare = () => {
  return (
    <section className="w-full relative py-20 px-6 lg:px-12 overflow-hidden bg-[#070b19]">
      
      {/* --- 3D MEDICAL ANIMATED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Deep Background Glow to establish the rich blue base */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#1d4ed8] rounded-full blur-[200px] opacity-20"></div>

        {/* Floating Medical Capsule (Pill Shape) - Top Right */}
        <motion.div
          animate={{ 
            y: [-20, 30, -20], 
            x: [0, -20, 0],
            rotate: [15, 25, 15] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] right-[5%] w-[120px] h-[350px] md:w-[160px] md:h-[450px] rounded-full border border-blue-400/20 bg-gradient-to-br from-blue-600/20 to-transparent backdrop-blur-md shadow-[inset_15px_15px_40px_rgba(59,130,246,0.3)] opacity-70"
        />

        {/* Floating Macro Cell/Ring (Torus Shape) - Bottom Left */}
        <motion.div
          animate={{ 
            y: [0, -50, 0], 
            rotate: [0, -15, 0], 
            scale: [1, 1.05, 1] 
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-15%] left-[-10%] w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full border-[50px] md:border-[90px] border-blue-500/10 bg-transparent backdrop-blur-sm shadow-[inset_0_0_60px_rgba(37,99,235,0.2),0_0_60px_rgba(37,99,235,0.2)] opacity-80"
        />

        {/* Out-of-focus background capsule (Depth of Field effect) */}
        <motion.div
          animate={{ 
            y: [40, -40, 40], 
            x: [30, -30, 30],
            rotate: [-45, -30, -45] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[40%] left-[35%] w-[400px] h-[200px] rounded-full bg-blue-500/10 blur-[12px] border border-blue-300/10 shadow-[inset_20px_20px_50px_rgba(37,99,235,0.4)] opacity-50"
        />
        
        {/* Small floating plasma bubble */}
        <motion.div
          animate={{ 
            y: [0, -100, 0], 
            x: [0, 50, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[30%] w-[100px] h-[100px] rounded-full bg-gradient-to-tr from-blue-600/30 to-blue-300/10 backdrop-blur-md border border-blue-200/20 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5)]"
        />
      </div>
      {/* -------------------------------------- */}

      {/* Top Section: Two-Column Layout (Ensure z-10 so it sits above background) */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-8 mb-12 relative z-10">
        
        {/* LEFT COLUMN: Circular Image */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-start relative pl-0 lg:pl-12 pt-12 lg:pt-0">
          <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] flex-shrink-0">
            <div className="absolute inset-[-40px] md:inset-[-60px] rounded-full border border-blue-400/30 pointer-events-none" />
            <div className="absolute inset-[-80px] md:inset-[-120px] rounded-full border border-blue-400/10 pointer-events-none" />
            <div className="w-full h-full rounded-full overflow-hidden relative z-10 shadow-2xl">
              <Image
                src="/assets/images/services/hmo.jpg"
                alt="Specialist Medical Care Consultation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 380px"
              />
            </div>
          </div>
          <div className="mt-16 md:mt-24 lg:mt-28 max-w-sm text-center lg:text-left relative">
     {/* <AnimatedText
  text="Created by doctors, for patients. We understand the unique needs of complex health conditions and have set the standard in specialized care."
  className="text-2xl lg:text-2xl font-bold text-left text-white"
/>
 */}

 <AnimatedText
  text="Created by doctors, for patients. We understand the unique needs of complex health conditions and have set the standard in specialized care."
  className="text-2xl lg:text-2xl font-bold text-left text-white"
/>
          </div>
        </div>

        {/* RIGHT COLUMN: Content & Carousel */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-[#E86512] font-semibold text-sm md:text-base tracking-wide uppercase mb-6"
          >
            <div className="gap-6 flex flex-wrap justify-center text-sm lg:text-base max-w-3xl mx-auto tracking-wider text-slate-500">
              <AnimatedText text="ADULTS" className="font-bold border-b-2 border-transparent hover:border-emerald-500 transition-colors cursor-default pb-1" />
              <AnimatedText text="CHILDREN" className="font-bold border-b-2 border-transparent hover:border-emerald-500 transition-colors cursor-default pb-1" />
              <AnimatedText text="FAMILY" className="font-bold border-b-2 border-transparent hover:border-emerald-500 transition-colors cursor-default pb-1" />
            </div>

          </motion.div>

          {/* Navigation Container Header (Title + Navigation Arrows) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full mb-8">
             <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-0"
              style={{ fontFamily: 'Georgia, serif' }}
            >
                   <div className="mt-2">
                      {/* MAIN TITLE */}
                      <AnimatedText
                        text="Specialist Medical Care"
                        className="text-2xl lg:text-3xl font-bold text-center text-white"
                      />
                    </div>
            </motion.h2>

            <div id="swiper-nav-container" className="flex items-center gap-3"></div>
          </div>

        {/* CONTENT INNER CONTAINER */}
        <div className="flex flex-col items-center w-full gap-8 mb-12 max-w-7xl mx-auto px-4 relative z-10">
          
 



  
      </div>
          {/* Carousel */}
          <div className="w-full relative">
            <ServiceShortCutDesktop servicesData={services_short_cut} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default SpecialistCare;
// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { services_short_cut } from "../SiteMaps/data";
// import ServiceShortCutDesktop from "./ServiceDesktopView";

// const SpecialistCare = () => {
//   return (
//     <section className="w-full bg-[#1A1C23] py-20 px-6 lg:px-12 overflow-hidden">
      
//       {/* Top Section: Two-Column Layout */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-8 mb-12">
        
//         {/* LEFT COLUMN: Circular Image */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-start relative pl-0 lg:pl-12 pt-12 lg:pt-0">
//           <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] flex-shrink-0">
//             <div className="absolute inset-[-40px] md:inset-[-60px] rounded-full border border-blue-500/30 pointer-events-none" />
//             <div className="absolute inset-[-80px] md:inset-[-120px] rounded-full border border-blue-500/10 pointer-events-none" />
//             <div className="w-full h-full rounded-full overflow-hidden relative z-10 shadow-2xl">
//               <Image
//                 src="/assets/images/services/hmo.jpg"
//                 alt="Specialist Medical Care Consultation"
//                 fill
//                 className="object-cover"
//                 sizes="(max-width: 768px) 280px, 380px"
//               />
//             </div>
//           </div>
//           <div className="mt-16 md:mt-24 lg:mt-28 max-w-sm text-center lg:text-left z-10 relative">
//             <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
//               Created by doctors, for patients. We understand the unique needs of complex health conditions and have set the standard in specialized care.
//             </p>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Content & Carousel */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start z-10 text-center lg:text-left relative">
          
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="flex items-center gap-3 text-[#E86512] font-semibold text-sm md:text-base tracking-wide uppercase mb-6"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#E86512]"></span>
//             <span>Adults • Children • Family</span>
//           </motion.div>

//           {/* Navigation Container Header (Title + Navigation Arrows) */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full mb-8">
//              <motion.h2 
//               initial={{ opacity: 0, y: 15 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-0"
//             >
//               Specialist Medical Care
//             </motion.h2>

//             {/* A placeholder div where we will inject the navigation arrows from the Swiper component */}
//             <div id="swiper-nav-container" className="flex items-center gap-3"></div>
//           </div>

//           {/* Carousel */}
//           <div className="w-full relative">
//             <ServiceShortCutDesktop servicesData={services_short_cut} />
//           </div>

//         </div>
//       </div>

//     </section>
//   );
// };

// export default SpecialistCare;

// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import {services_short_cut} from "../SiteMaps/data";
// import ServiceShortCutDesktop from "./ServiceDesktopView"; // <-- Import the carousel

// const dummyServices = [
//   { id: 1, title: "Pediatric Care", image: "/assets/pediatrics.png", url: "/pediatrics" },
//   { id: 2, title: "Cardiology Unit", image: "/assets/cardio.png", url: "/cardiology" },
//   { id: 3, title: "Neurology", image: "/assets/neuro.png", url: "/neurology" },
//   { id: 4, title: "Orthopedics", image: "/assets/ortho.png", url: "/orthopedics" },
// ];

// const SpecialistCare = () => {
//   return (
//     <section className="w-full bg-[#1A1C23] py-20 px-6 lg:px-12 overflow-hidden">
      
//       {/* Top Section: Two-Column Layout */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 mb-24">
        
//         {/* LEFT COLUMN: Circular Image */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center relative pl-0 lg:pl-12 pt-12 lg:pt-0">
//           <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] flex-shrink-0">
//             <div className="absolute inset-[-40px] md:inset-[-60px] rounded-full border border-blue-500/30 pointer-events-none" />
//             <div className="absolute inset-[-80px] md:inset-[-120px] rounded-full border border-blue-500/10 pointer-events-none" />
//             <div className="w-full h-full rounded-full overflow-hidden relative z-10 shadow-2xl">
//               <Image
//                 src="/assets/images/services/hmo.jpg"
//                 alt="Specialist Medical Care Consultation"
//                 fill
//                 className="object-cover"
//                 sizes="(max-width: 768px) 280px, 380px"
//               />
//             </div>
//           </div>
//           <div className="mt-16 md:mt-24 lg:mt-28 max-w-sm text-center lg:text-left z-10 relative">
//             <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
//               Created by doctors, for patients. We understand the unique needs of complex health conditions and have set the standard in specialized care.
//             </p>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Content */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start z-10 text-center lg:text-left">
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="flex items-center gap-3 text-[#E86512] font-semibold text-sm md:text-base tracking-wide uppercase mb-6"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#E86512]"></span>
//             <span>Adults • Children • Family</span>
//           </motion.div>

//           <motion.h2 
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
//           >
//             Specialist Medical Care
//           </motion.h2>

          
//           {/* <ServiceShortCutDesktop servicesData={dummyServices} /> */}
//           <ServiceShortCutDesktop servicesData={services_short_cut} />

//         </div>
//       </div>

//     </section>
//   );
// };

// export default SpecialistCare;

// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import ServiceShortCutDesktop from "./ServiceDesktopView"; // <-- Import the carousel


// // import ServiceShortCutDesktop from "ServiceShortCutDesktop"; // <-- Import the carousel
// // import ServiceShortCutDesktop from "./ServiceShortCutDesktop"; // <-- Import the carousel

// // Assuming you have your mock data here or passed in as a prop
// const dummyServices = [
//   { id: 1, title: "Pediatric Care", image: "/assets/pediatrics.png", url: "/pediatrics" },
//   { id: 2, title: "Cardiology Unit", image: "/assets/cardio.png", url: "/cardiology" },
//   { id: 3, title: "Neurology", image: "/assets/neuro.png", url: "/neurology" },
//   { id: 4, title: "Orthopedics", image: "/assets/ortho.png", url: "/orthopedics" },
// ];

// const SpecialistCare = () => {
//   return (
//     <section className="w-full bg-[#1A1C23] py-20 px-6 lg:px-12 overflow-hidden">
      
//       {/* Top Section: Two-Column Layout */}
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8 mb-24">
        
//         {/* LEFT COLUMN: Circular Image */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center relative pl-0 lg:pl-12 pt-12 lg:pt-0">
//           <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] flex-shrink-0">
//             <div className="absolute inset-[-40px] md:inset-[-60px] rounded-full border border-blue-500/30 pointer-events-none" />
//             <div className="absolute inset-[-80px] md:inset-[-120px] rounded-full border border-blue-500/10 pointer-events-none" />
//             <div className="w-full h-full rounded-full overflow-hidden relative z-10 shadow-2xl">
//               <Image
//                 src="/assets/images/services/hmo.jpg"
//                 alt="Specialist Medical Care Consultation"
//                 fill
//                 className="object-cover"
//                 sizes="(max-width: 768px) 280px, 380px"
//               />
//             </div>
//           </div>
//           <div className="mt-16 md:mt-24 lg:mt-28 max-w-sm text-center lg:text-left z-10 relative">
//             <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
//               Created by doctors, for patients. We understand the unique needs of complex health conditions and have set the standard in specialized care.
//             </p>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Content */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start z-10 text-center lg:text-left">
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="flex items-center gap-3 text-[#E86512] font-semibold text-sm md:text-base tracking-wide uppercase mb-6"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#E86512]"></span>
//             <span>Adults • Children • Family</span>
//           </motion.div>

//           <motion.h2 
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
//           >
//             Specialist Medical Care
//           </motion.h2>

//           <motion.p
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl font-light mb-10"
//           >
//             Our specialist care services are designed to provide expert medical
//             attention and personalized treatment plans for patients with complex
//             health conditions. Our team of highly skilled specialists is dedicated
//             to delivering comprehensive care.
//           </motion.p>

//           <motion.button
//             whileHover={{ y: -4, boxShadow: "0px 6px 0px #000" }}
//             whileTap={{ y: 2, boxShadow: "0px 1px 0px #000" }}
//             className="px-8 py-4 bg-[#E86512] text-white font-bold uppercase tracking-wider rounded-xl border-2 border-white relative transition-all duration-150 shadow-[0px_4px_0px_#000]"
//           >
//             <Link href="/who-we-are/about-us" className="flex items-center gap-2 block w-full h-full">
//               Quick Consultation
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="5" y1="12" x2="19" y2="12"></line>
//                 <polyline points="12 5 19 12 12 19"></polyline>
//               </svg>
//             </Link>
//           </motion.button>
//         </div>
//       </div>

//       {/* Bottom Section: Dynamic Carousel Injection */}
//       <div className="max-w-7xl mx-auto w-full border-t border-gray-700 pt-16">
//         <div className="mb-8">
//           <h3 className="text-2xl font-bold text-white">Our Core Services</h3>
//           <p className="text-gray-400 mt-2">Swipe to explore our specialized medical wings.</p>
//         </div>
        
//         {/* Render Carousel Here */}
//         <div className="w-full">
//           <ServiceShortCutDesktop servicesData={dummyServices} />
//         </div>
//       </div>

//     </section>
//   );
// };

// export default SpecialistCare;


// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";

// const SpecialistCare = () => {
//   return (
//     <section className="w-full bg-[#1A1C23] py-20 px-6 lg:px-12 overflow-hidden">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
        
//         {/* LEFT COLUMN: Circular Image with Concentric Rings */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center relative pl-0 lg:pl-12 pt-12 lg:pt-0">
          
//           <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] flex-shrink-0">
//             {/* Concentric Decorative Rings */}
//             <div className="absolute inset-[-40px] md:inset-[-60px] rounded-full border border-blue-500/30 pointer-events-none" />
//             <div className="absolute inset-[-80px] md:inset-[-120px] rounded-full border border-blue-500/10 pointer-events-none" />
//             <div className="absolute inset-[-120px] md:inset-[-180px] rounded-full border border-blue-500/5 pointer-events-none" />
            
//             {/* Main Circular Image */}
//             <div className="w-full h-full rounded-full overflow-hidden relative z-10 shadow-2xl">
//               <Image
//                 src="/assets/images/specialist-care.jpg"
//                 alt="Specialist Medical Care Consultation"
//                 fill
//                 className="object-cover"
//                 sizes="(max-width: 768px) 280px, 380px"
//               />
//             </div>
//           </div>

//           {/* Small Supporting Text below image (matching the reference layout) */}
//           <div className="mt-20 md:mt-24 lg:mt-32 max-w-sm text-center lg:text-left z-10 relative">
//             <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
//               Created by doctors, for patients. We understand the unique needs of complex health conditions and have set the standard in specialized care.
//             </p>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: Content, Tags, and Button */}
//         <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start z-10 text-center lg:text-left">
          
//           {/* Subtitle / Tags (Replaces the "MEDVA by the numbers" block) */}
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="flex items-center gap-3 text-[#E86512] font-semibold text-sm md:text-base tracking-wide uppercase mb-6"
//           >
//             <span className="w-2 h-2 rounded-full bg-[#E86512]"></span>
//             <span>Adults • Children • Family</span>
//           </motion.div>

//           {/* MAIN TITLE */}
//           <motion.h2 
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8"
//           >
//             Specialist Medical Care
//           </motion.h2>

//           {/* Description */}
//           <motion.p
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ delay: 0.2 }}
//             className="text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl font-light mb-10"
//           >
//             Our specialist care services are designed to provide expert medical
//             attention and personalized treatment plans for patients with complex
//             health conditions. Our team of highly skilled specialists is dedicated
//             to delivering comprehensive care, utilizing the latest medical
//             advancements and technologies to ensure the best possible outcomes for
//             our patients.
//           </motion.p>

//           {/* Button Container */}
//           <motion.button
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.3 }}
//             whileHover={{ y: -4, boxShadow: "0px 6px 0px #000" }}
//             whileTap={{ y: 2, boxShadow: "0px 1px 0px #000" }}
//             className="px-8 py-4 bg-[#E86512] text-white font-bold uppercase tracking-wider rounded-xl border-2 border-white relative transition-all duration-150 shadow-[0px_4px_0px_#000]"
//           >
//             <Link href="/who-we-are/about-us" className="flex items-center gap-2 block w-full h-full">
//               Quick Consultation
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="5" y1="12" x2="19" y2="12"></line>
//                 <polyline points="12 5 19 12 12 19"></polyline>
//               </svg>
//             </Link>
//           </motion.button>
          
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SpecialistCare;