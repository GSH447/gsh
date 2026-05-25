"use client";
import Services_short_cut from "./Services_short_cut";
import { services_short_cut } from "../SiteMaps/data";
import { motion } from "framer-motion";


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
      delay: i * 0.04,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const AnimatedText = ({
  text,
  className = '',
}) => {
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
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function ServicesShortCutPage() {
  return (
    <div className="relative w-full min-h-screen">
      
      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-5 lg:p-[10%]">
        
        <div className="flex flex-col items-center w-full">


          <div className="flex flex-col items-center w-full gap-8 mb-12">

          {/* MAIN TITLE */}
              <AnimatedText
                text="Specialist Medical Care"
                className="justify-center text-3xl lg:text-6xl font-bold text-center"
              />

              {/* TAGS */}
              <div className="gap-6 flex flex-wrap justify-center text-lg max-w-3xl mx-auto p-4">

                <AnimatedText
                  text="ADULTS"
                  className="font-semibold"
                />

                <AnimatedText
                  text="CHILDREN"
                  className="font-semibold"
                />

                <AnimatedText
                  text="FAMILY"
                  className="font-semibold"
                />

              </div>


            {/* Description */}
            <motion.p
              className="text-sm lg:text-lg text-center font-medium mt-4 max-w-3xl"
             
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              Our specialist care services are designed to provide expert medical
              attention and personalized treatment plans for patients with complex
              health conditions. Our team of highly skilled specialists is dedicated
              to delivering comprehensive care, utilizing the latest medical
              advancements and technologies to ensure the best possible outcomes for
              our patients.
            </motion.p>

          </div>

 

          {/* 2. Product Services Grid Component (Center) */}
          <div className="w-full flex justify-center">
            <Services_short_cut services_short_cut={services_short_cut} />
          </div>


        </div>

      </div>

      {/* Bottom Border */}
      <div className="flex">
        <div className="border-[10px] border-[#5CB338] w-full"></div>
        <div className="border-[10px] border-[#6F92E7] w-full"></div>
        <div className="border-[10px] border-[#4a912d] w-full"></div>
      </div>

    </div>
  );
}