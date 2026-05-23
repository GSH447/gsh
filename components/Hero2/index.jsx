"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// 1. Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  // {
  //   title: "Excellence in Care, Our Shared Path",
  //   description: "Our identity is reflected through our three wings—each inspired by timeless virtues that define our approach to healing and service: Pistis (Faith), Elpis (Hope), and Agape (Love).",
  //   buttonText: "Read more",
  //   buttonUrl: "/who-we-are/about-us",
  //   bgImage: "/assets/images/hero/gsh.jpg", // Replace with your image paths
  // },
  {
    title: "Multispecialty healthcare facility",
    description: "Health is wealth, and access to proper, affordable, and timely healthcare is a fundamental aspiration of every society.",
    buttonText: "Contact us",
    buttonUrl: "/patient-support/contact-us",
    bgImage: "/assets/images/hero/doctor.jpg", 
  },
  {
    title: "Professionalism, compassion, and clinical excellence. ",
    description: "Our commitment to quality, safety, and dignity of care is guided by our enduring promise.",
    buttonText: "Find a Doctor",
    buttonUrl: "/services/surgery",
    bgImage: "/assets/images/hero/room.jpg",
  }
];

const HeroStatistics = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  const statsData = [
    { value: 20, suffix: "+", label: "Specialties" },
    { value: 40, suffix: "+", label: "Caregivers" },
    { value: 3, suffix: "+", label: "Surgeries" },
  ];

  return (
    <div
      ref={ref}
      className="absolute bottom-6 left-4 right-4 lg:bottom-10 lg:right-[3.1rem] lg:left-auto flex flex-row lg:items-center bg-black/50 lg:p-6 rounded-md backdrop-blur-sm border border-white/10 z-30 "
    >
      {statsData.map((stat, index) => (
        <React.Fragment key={index}>
          <div className=" flex-1 text-center lg:py-0 py-3 lg:border-none border-b border-white/20 last:border-b-0 last:pb-0 first:pt-0 ">
            <p className="text-white lg:text-5xl font-extrabold leading-tight" style={{ fontFamily: "AvenirBold" }}>
              {inView ? <CountUp start={0} end={stat.value} duration={2.5} /> : 0}
              <span className="text-white lg:text-5xl">{stat.suffix}</span>
            </p>
            <p className="text-white/80 text-sm mt-1 whitespace-normal leading-tight mx-auto max-w-[150px]">
              {stat.label}
            </p>
          </div>
          {index < statsData.length - 1 && (
            <div className=" lg:h-16 lg:w-px h-px w-full bg-white/20 lg:mx-8 lg:my-0 my-3" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};




const Hero2 = () => {
  return (
    <section className=" relative w-full h-screen overflow-hidden">
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        speed={1000} // Smooth transition between slides
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="  relative h-full overflow-hidden">
            {/* ZOOM-OUT BACKGROUND IMAGE */}
            {/* ZOOM-OUT BACKGROUND IMAGE */}
            <motion.div 
              initial={{ scale: 1.15 }} 
              whileInView={{ scale: 1 }} 
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={slide.bgImage}
                alt={slide.title}
                fill
                className="object-cover"
                // CHANGE THIS VALUE: 
                // "center 0%" is the very top, "center 100%" is the very bottom.
                // Setting it to 20% or 30% will bring the image "down".
                style={{ objectPosition: "center 50%" }} 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            </motion.div>



            {/* TEXT CONTENT */}
            <div className="relative z-20 mx-auto h-full grid items-center px-4 pb-32 lg:pb-0">
            {/* <div className=" relative z-20  mx-auto h-full grid items-center px-2"> */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="border-[red] max-w-2xl grid gap-6"
              >
                <div
                  className=" h-[32vh] flex items-center"
                >
                  <p className=" text-white text-4xl lg:text-6xl font-bold leading-tight grid gap-y-4" style={{ fontFamily: "AvenirBold" }}>
                    {slide.title}
                  </p>
                </div>
                
                <div
                  className=""
                >
                  <p className="text-white/80 text-md lg:text-xl border-l-4 border-[#2A157c] pl-6">
                    {slide.description}
                  </p>
                </div>
                
                <div
                  className=""
                >
                  <Link href={slide.buttonUrl} className=" inline-flex items-center gap-3  px-8 py-2 lg:py-4 rounded-full font-bold bg-white hover:bg-[#2A157c] hover:text-white font-extrabold transition-all shadow-xl">
                    {slide.buttonText} <ArrowRight size={20} />
                  </Link>
                </div>

              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* CUSTOM NAVIGATION (Placed inside Swiper to stay visible) */}


        {/* <div className="border-2 border-[#6F92E7] absolute bottom-12 left-3 z-50 flex-row-reverse items-center gap-6"> */}

        
        {/* <div className=" lg:absolute bottom-12 left-3 z-50 flex items-center gap-6"> */}
        <div className=" absolute bottom-[18vh] lg:bottom-6 left-4 z-40 flex items-center gap-4">

          <div className=" flex gap-2">
            <button className="prev-btn p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
              <ChevronLeft size={24} />
            </button>
            <button className="next-btn p-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className=" custom-pagination flex gap-2"></div> {/* Dots */}
          
        </div>
      </Swiper>

      {/* FIXED STATISTICS (Outside Swiper so it never moves) */}
      <HeroStatistics />
      
    </section>
  );
};

export default Hero2;






