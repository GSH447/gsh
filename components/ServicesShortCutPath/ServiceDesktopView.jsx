"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const defaultCardBackgrounds = ["#F4F7FE", "#F5FDF9", "#FBF7FF"];

export default function ServiceShortCutDesktop({ servicesData }) {
  const swiperRef = useRef(null);
  const paginationRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [navContainer, setNavContainer] = useState(null);

  const itemsToRender = servicesData || [];
  
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === itemsToRender.length - 1; 

  // Wait for the DOM to render so we can grab the element in the parent component
  useEffect(() => {
    setNavContainer(document.getElementById('swiper-nav-container'));
  }, []);

  // Custom Navigation Buttons Component
  const NavigationButtons = () => (
    itemsToRender.length > 1 ? (
      <>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isFirstSlide}
          className={`shadow-md border border-slate-600 bg-transparent w-10 h-10 flex items-center justify-center rounded-full transition-all ${
            isFirstSlide ? "opacity-30 cursor-not-allowed text-gray-500" : "hover:border-white text-white active:scale-95"
          }`}
        >
          <span className="text-lg font-bold">←</span>
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isLastSlide}
          className={`shadow-md border border-slate-600 bg-transparent w-10 h-10 flex items-center justify-center rounded-full transition-all ${
            isLastSlide ? "opacity-30 cursor-not-allowed text-gray-500" : "hover:border-white text-white active:scale-95"
          }`}
        >
          <span className="text-lg font-bold">→</span>
        </button>
      </>
    ) : null
  );

  return (
    <div className="w-full relative">
      
      {/* Inject navigation arrows into the parent's header if the container exists */}
      {navContainer && createPortal(<NavigationButtons />, navContainer)}

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={24} // Adjusted spacing based on reference
        slidesPerView={1} 
        slidesPerGroup={1} 
        autoplay={itemsToRender.length > 1 ? { delay: 6500, disableOnInteraction: true } : false}
        modules={[Navigation, Autoplay, Pagination]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        pagination={{ 
          clickable: true, 
          el: paginationRef.current,
          // Custom pagination classes to override swiper defaults easily
          bulletClass: 'swiper-pagination-bullet bg-gray-500 opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active bg-[#E86512] opacity-100'
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3, // Show 3 cards at a time as seen in screenshot
          }
        }}
        className="w-full pb-8" // Padding bottom to give space for dots
      >
        {itemsToRender.map((item, index) => {
          const fallbackBg = defaultCardBackgrounds[index % defaultCardBackgrounds.length];

          return (
            <SwiperSlide key={item.id || index} className="h-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                // Adjusted dimensions and layout to match screenshot exactly
                className="w-full flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 h-full rounded-[4px] overflow-hidden min-h-[400px]"
                style={{ backgroundColor: fallbackBg }}
              >
                {/* Image Frame Container - Taller format */}
                <div className="w-full h-[220px] relative overflow-hidden bg-white mb-6">
                   <div className="w-full h-full relative group p-4 flex items-center justify-center">
                     <Image
                        src={item.image}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                   </div>
                </div>

                {/* Title & Link Action - Padded to match design */}
                <div className="text-left flex-1 flex flex-col justify-between px-6 pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6 leading-tight line-clamp-2" style={{ fontFamily: 'Georgia, serif' }}>
                      {item.title}
                    </h3>
                  </div>

                  <div className="text-left mt-auto">
                    <Link
                      href={item.url || "#"}
                      // Button styling to exactly match the orange "EXPLORE UNIT →"
                      className="inline-flex items-center justify-center gap-2 bg-[#E86512] hover:bg-[#d45a0f] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-colors duration-200"
                    >
                      Explore Unit <span className="text-[10px] ml-1">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Pagination Dots placed below the swiper */}
      <div className="flex justify-start items-center w-full mt-4 pl-4">
        {itemsToRender.length > 1 && (
          <div ref={paginationRef} className="swiper-pagination !static !w-auto flex gap-2" />
        )}
      </div>

    </div>
  );
}

// "use client";

// import React, { useState, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const defaultCardBackgrounds = ["#F4F7FE", "#FFF9F5", "#F5FDF9", "#FBF7FF"];

// export default function ServiceShortCutDesktop({ servicesData }) {
//   const swiperRef = useRef(null);
//   const paginationRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const itemsToRender = servicesData || [];
  
//   // --- UPDATED LOGIC FOR 1 SLIDE ---
//   const isFirstSlide = currentIndex === 0;
//   // If showing 1 item at a time, the last slide index is total length - 1
//   const isLastSlide = currentIndex === itemsToRender.length - 1; 

//   return (
//     <div className="w-full pb-10">
//       <section className="mx-auto">
//         <Swiper
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           spaceBetween={30}
//           // Explicitly set to 1
//           slidesPerView={1} 
//           slidesPerGroup={1} 
//           // --- UPDATED AUTOPLAY CONDITION > 1 ---
//           autoplay={itemsToRender.length > 1 ? { delay: 6500, disableOnInteraction: true } : false}
//           modules={[Navigation, Autoplay, Pagination]}
//           onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
//           pagination={{ clickable: true, el: paginationRef.current }}
//           // --- REMOVED BREAKPOINTS PROP ---
//           className="w-full pb-12"
//         >
//           {itemsToRender.map((item, index) => {
//             const fallbackBg = defaultCardBackgrounds[index % defaultCardBackgrounds.length];

//             return (
//               <SwiperSlide key={item.id || index} className="h-auto pb-4">
//                 <motion.div
//                   initial={{ opacity: 0, y: 25 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   // Adjusted delay logic slightly since we are mapping individual items directly now
//                   transition={{ duration: 0.4, delay: 0.1 }}
//                   className="border border-slate-100 border-2 border-[green] w-full p-2 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 bg-white h-full"
//                   style={{ backgroundColor: fallbackBg }}
//                 >
//                   {/* Image Frame Container */}
//                   <div className="flex justify-center mb-6">
//                     <div className="w-full h-56 relative overflow-hidden flex items-center justify-center bg-slate-100 shadow-inner group">
//                       <Image
//                         src={item.image}
//                         alt={item.alt || item.title}
//                         fill
//                         className="object-contain transition-transform duration-500 group-hover:scale-105"
//                       />
//                     </div>
//                   </div>

//                   {/* Title & Link Action */}
//                   <div className="text-left flex-1 flex flex-col justify-between min-h-[120px]">
//                     <div>
//                       <h3 className="text-lg font-extrabold text-slate-800 mb-3 leading-snug line-clamp-2">
//                         {item.title}
//                       </h3>
//                     </div>

//                     <div className="text-left mt-2">
//                       <Link
//                         href={item.url || "#"}
//                         className="inline-flex items-center gap-2 bg-[#E86512] hover:bg-slate-900 text-white hover:text-white border border-slate-200 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
//                       >
//                         Explore Unit <span>→</span>
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 w-full">
//           <div>
//             {/* Navigation Controls - UPDATED CONDITION > 1 */}
//             {itemsToRender.length > 1 && (
//               <div className="flex items-center gap-3 mt-4 md:mt-0">
//                 <button
//                   onClick={() => swiperRef.current?.slidePrev()}
//                   disabled={isFirstSlide}
//                   className={`shadow-md border border-slate-200 bg-white w-10 h-10 flex items-center justify-center rounded-full transition-all ${
//                     isFirstSlide ? "opacity-30 cursor-not-allowed" : "hover:border-[#E86512] active:scale-95"
//                   }`}
//                 >
//                   <span className="text-lg font-bold text-slate-600">←</span>
//                 </button>
//                 <button
//                   onClick={() => swiperRef.current?.slideNext()}
//                   disabled={isLastSlide}
//                   className={`shadow-md border border-slate-200 bg-white w-10 h-10 flex items-center justify-center rounded-full transition-all ${
//                     isLastSlide ? "opacity-30 cursor-not-allowed" : "hover:border-[#E86512] active:scale-95"
//                   }`}
//                 >
//                   <span className="text-lg font-bold text-slate-600">→</span>
//                 </button>
//               </div>
//             )}
//           </div>

//           <div>
//             {/* Pagination - UPDATED CONDITION > 1 */}
//             {itemsToRender.length > 1 && (
//               <div className="flex justify-center mt-4">
//                 <div ref={paginationRef} className="swiper-pagination !static flex gap-2" />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// "use client";

// import React, { useState, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const defaultCardBackgrounds = ["#F4F7FE", "#FFF9F5", "#F5FDF9", "#FBF7FF"];

// export default function ServiceShortCutDesktop({ servicesData }) {
//   const swiperRef = useRef(null);
//   const paginationRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const itemsToRender = servicesData || [];
  
//   // Calculate if we are at the end based on items, not chunks
//   const isFirstSlide = currentIndex === 0;
//   // If showing 3 items at a time, the last slide index is (total - 3)
//   const isLastSlide = currentIndex >= itemsToRender.length - 3; 

//   return (
//     <div className="w-full pb-10">
//       <section className="mx-auto">
//         <Swiper
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           spaceBetween={30}
//           // Default to 1 on mobile, overridden by breakpoints below
//           slidesPerView={1} 
//           // THIS is what makes it slide 1 by 1
//           slidesPerGroup={1} 
//           autoplay={itemsToRender.length > 3 ? { delay: 6500, disableOnInteraction: true } : false}
//           modules={[Navigation, Autoplay, Pagination]}
//           onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
//           pagination={{ clickable: true, el: paginationRef.current }}
//           // Breakpoints handle showing multiple items horizontally without chunking the array
//           breakpoints={{
//             768: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             }
//           }}
//           className="w-full pb-12"
//         >
//           {itemsToRender.map((item, index) => {
//             const fallbackBg = defaultCardBackgrounds[index % defaultCardBackgrounds.length];

//             return (
//               <SwiperSlide key={item.id || index} className="h-auto pb-4">
//                 <motion.div
//                   initial={{ opacity: 0, y: 25 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
//                   className="border border-slate-100 border-2 border-[green] w-full p-2 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 bg-white h-full"
//                   style={{ backgroundColor: fallbackBg }}
//                 >
//                   {/* Image Frame Container */}
//                   <div className="flex justify-center mb-6">
//                     <div className="w-full h-56 relative overflow-hidden flex items-center justify-center bg-slate-100 shadow-inner group">
//                       <Image
//                         src={item.image}
//                         alt={item.alt || item.title}
//                         fill
//                         className="object-contain transition-transform duration-500 group-hover:scale-105"
//                       />
//                     </div>
//                   </div>

//                   {/* Title & Link Action */}
//                   <div className="text-left flex-1 flex flex-col justify-between min-h-[120px]">
//                     <div>
//                       <h3 className="text-lg font-extrabold text-slate-800 mb-3 leading-snug line-clamp-2">
//                         {item.title}
//                       </h3>
//                     </div>

//                     <div className="text-left mt-2">
//                       <Link
//                         href={item.url || "#"}
//                         className="inline-flex items-center gap-2 bg-[#E86512] hover:bg-slate-900 text-white hover:text-white border border-slate-200 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
//                       >
//                         Explore Unit <span>→</span>
//                       </Link>
//                     </div>
//                   </div>
//                 </motion.div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 w-full">
//           <div>
//             {/* Navigation Controls */}
//             {itemsToRender.length > 3 && (
//               <div className="flex items-center gap-3 mt-4 md:mt-0">
//                 <button
//                   onClick={() => swiperRef.current?.slidePrev()}
//                   disabled={isFirstSlide}
//                   className={`shadow-md border border-slate-200 bg-white w-10 h-10 flex items-center justify-center rounded-full transition-all ${
//                     isFirstSlide ? "opacity-30 cursor-not-allowed" : "hover:border-[#E86512] active:scale-95"
//                   }`}
//                 >
//                   <span className="text-lg font-bold text-slate-600">←</span>
//                 </button>
//                 <button
//                   onClick={() => swiperRef.current?.slideNext()}
//                   disabled={isLastSlide}
//                   className={`shadow-md border border-slate-200 bg-white w-10 h-10 flex items-center justify-center rounded-full transition-all ${
//                     isLastSlide ? "opacity-30 cursor-not-allowed" : "hover:border-[#E86512] active:scale-95"
//                   }`}
//                 >
//                   <span className="text-lg font-bold text-slate-600">→</span>
//                 </button>
//               </div>
//             )}
//           </div>

//           <div>
//             {itemsToRender.length > 3 && (
//               <div className="flex justify-center mt-4">
//                 <div ref={paginationRef} className="swiper-pagination !static flex gap-2" />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useRef } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, Pagination } from "swiper/modules";

// // Import styles safely
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";


// const defaultCardBackgrounds = ["#F4F7FE", "#FFF9F5", "#F5FDF9", "#FBF7FF"];

// export default function ServiceShortCutDesktop({ servicesData }) {
//   const swiperRef = useRef(null);
//   const paginationRef = useRef(null);
//   // const [isFirstSlide, setIsFirstSlide] = useState(true);
//   // const [isLastSlide, setIsLastSlide] = useState(false);

//   const itemsToRender = servicesData || [];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // const itemsToRender = servicesData || [];
//   const totalSlides = Math.ceil(itemsToRender.length / 3);
//   const isFirstSlide = currentIndex === 0;
//   const isLastSlide = currentIndex === totalSlides - 1;

//   // Chunk array dynamically into rows of 3 elements per slide
//   const chunkedServices = [];
//   for (let i = 0; i < itemsToRender.length; i += 3) {
//     chunkedServices.push(itemsToRender.slice(i, i + 3));
//   }

//   return (
//     <div className=" w-full pb-10">
//       <section className=" mx-auto">


// {/* SWIPER COMPONENT */}
//       {/* <Swiper
//         onSwiper={(swiper) => {
//           swiperRef.current = swiper;
//           setIsFirstSlide(swiper.isBeginning);
//           setIsLastSlide(swiper.isEnd);
//         }}
//         onSlideChange={(swiper) => {
//           setIsFirstSlide(swiper.isBeginning);
//           setIsLastSlide(swiper.isEnd);
//         }}
//         spaceBetween={30}
//         autoplay={{ delay: 6500, disableOnInteraction: true }}
//         modules={[Navigation, Autoplay, Pagination]}
//         pagination={{ clickable: true, el: paginationRef.current }}
        
//         // Dynamic viewport breakpoints responsive map
//         breakpoints={{
//           // Baseline Desktop Layout (minimum display requirements)
//           1024: {
//             slidesPerView: 3,
//           },
//           // Large Desktop Monitors
//           1440: {
//             slidesPerView: 4,
//           },
//           // Ultra Large / TV Displays (32 inches wide and beyond)
//           1920: {
//             slidesPerView: 5,
//           },
//           // Massive 4K Display environments
//           2560: {
//             slidesPerView: 6,
//           }
//         }}
//         className="w-full"
//       > */}
//         <Swiper
//           onSwiper={(swiper) => (swiperRef.current = swiper)}
//           spaceBetween={30}
//           slidesPerView={1}
//           autoplay={totalSlides > 1 ? { delay: 6500, disableOnInteraction: true } : false}
//           modules={[Navigation, Autoplay, Pagination]}
//           onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
//           pagination={{ clickable: true, el: paginationRef.current }}
//           // breakpoints={{
//           // // Baseline Desktop Layout (minimum display requirements)
//           // 1024: {
//           //   slidesPerView: 3,
//           // },
//           // // Large Desktop Monitors
//           // 1440: {
//           //   slidesPerView: 4,
//           // },
//           // // Ultra Large / TV Displays (32 inches wide and beyond)
//           // 1920: {
//           //   slidesPerView: 5,
//           // },
//           // // Massive 4K Display environments
//           // 2560: {
//           //   slidesPerView: 6,
//           // }}}
//         >
//           {chunkedServices.map((slideChunk, slideIndex) => (
//             <SwiperSlide key={slideIndex} className="pb-12">
//               <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {slideChunk.map((item, index) => {
//                   const globalIdx = slideIndex * 3 + index;
//                   const fallbackBg = defaultCardBackgrounds[globalIdx % defaultCardBackgrounds.length];

//                   return (
//                     <motion.div
//                       key={item.id || globalIdx}
//                       initial={{ opacity: 0, y: 25 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.4, delay: index * 0.08 }}
//                       className="border border-slate-100 border-2 border-[green] w-full p-2 flex flex-col justify-between shadow-sm  hover:shadow-xl transition-all duration-300 bg-white"
//                       style={{ backgroundColor: fallbackBg }}
//                     >
//                       {/* Image Frame Container */}
//                       <div className="flex justify-center mb-6">
//                         <div
//                           className="w-full h-56 relative overflow-hidden flex items-center justify-center bg-slate-100 shadow-inner group"
//                         >
//                           <Image
//                             src={item.image}
//                             alt={item.alt || item.title}
//                             fill
//                             className="object-contain transition-transform duration-500 group-hover:scale-105"
//                           />
//                         </div>
//                       </div>

//                       {/* Title & Link Action */}
//                       <div className="text-left flex-1 flex flex-col justify-between min-h-[120px]">
//                         <div>
//                           <h3 className="text-lg font-extrabold text-slate-800 mb-3 leading-snug line-clamp-2">
//                             {item.title}
//                           </h3>
//                         </div>

//                         <div className="text-left mt-2">
//                           <Link
//                             href={item.url}
//                             className="inline-flex items-center gap-2 bg-primary hover:bg-slate-900 text-white hover:text-white border border-slate-200 px-5 py-2.5 rounded-full text-xs text-slate-800 font-bold uppercase tracking-wider transition-all duration-200 shadow-sm"
//                           >
//                             Explore Unit <span>→</span>
//                           </Link>
//                         </div>
//                       </div>

//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 w-full">

//           <div>

//             {/* Navigation Controls */}
//             {totalSlides > 1 && (
//               <div className="flex items-center gap-3 mt-4 md:mt-0">
//                 <button
//                   onClick={() => swiperRef.current?.slidePrev()}
//                   disabled={isFirstSlide}
//                   className={`shadow-md border border-slate-200 bg-white w-10 h-10 flex items-center justify-center rounded-full transition-all ${
//                     isFirstSlide ? "opacity-30 cursor-not-allowed" : "hover:border-[#6F92E7] active:scale-95"
//                   }`}
//                 >
//                   <span className="text-lg font-bold text-slate-600">←</span>
//                 </button>
//                 <button
//                   onClick={() => swiperRef.current?.slideNext()}
//                   disabled={isLastSlide}
//                   className={`shadow-md border border-slate-200 bg-white w-10 h-10 flex items-center justify-center rounded-full transition-all ${
//                     isLastSlide ? "opacity-30 cursor-not-allowed" : "hover:border-[#6F92E7] active:scale-95"
//                   }`}
//                 >
//                   <span className="text-lg font-bold text-slate-600">→</span>
//                 </button>
//               </div>
//             )}


//           </div>

//           <div>

//             {totalSlides > 1 && (
//               <div className="flex justify-center mt-4">
//                 <div ref={paginationRef} className="swiper-pagination !static flex gap-2" />
//               </div>
//             )}
            
//           </div>

//         </div>

//       </section>
//     </div>
//   );
// }