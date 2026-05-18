"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const blobShapes = [
  "74% 26% 63% 37% / 45% 36% 64% 55% ",
];




// const PRIMARY_BG = "#4a635a";
const PRIMARY_BG = "#FDF2EB";

const People = () => {


  return (
    <div
      className=" relative w-full overflow-hidden  mx-auto flex flex-col gap-2 lg:gap-10 items-center"
      style={{ backgroundColor: PRIMARY_BG }}
    >



      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className=" relative z-10 mx-auto px-2 pt-[8rem] lg:pt-[11rem] lg:pb-[5rem]"
      >
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className=" rounded-xl w-full mx-auto flex flex-col lg:flex-row  lg:gap-8 items-center px-2 lg:px-10"
        >
          {/* Left Content */}
          <div className=" lg:w-1/2 flex flex-col justify-between h-full lg:gap-[1.2rem]">
            
            {/* Content */}

              <div >

                <h3 className="text-[1.7rem] lg:text-[2.5rem] font-bold text-primary mb-2 text-left w-[90%] lg:w-full">
                  Our People
                </h3>
              </div>

              <div
                className="grid gap-y-5"
              >

                <p className="text-md lg:text-xl text-primary text-left mb-5 lg:w-[80%]">
                  We are a registered charity, governed by an independent Board of Trustees and a Managing Director. 
                </p>

                <p className="text-md lg:text-xl text-primary text-left mb-5 lg:w-[80%]">
                  Together, we raise over ₦500 million every year to support groundbreaking research into life-saving cardiac treatments at The Gracespring Health Foundation.
                </p>

              </div>


          </div>

          {/* Right Image Blob */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            
            {/* Content */}
            <div>

              <div
                className="border-[0.4rem] border-primary w-full overflow-hidden flex ml-[0.5rem] py-2 mx-auto"
                style={{ borderRadius: blobShapes }}
              >
                <Image
                  src="/assets/images/donation/001.svg"
                  width={1000}
                  height={1000}
                  alt="about-us-at-gracespring-health-foundation"
                  className="lg:w-full h-[17rem] lg:h-[27rem] object-cover object-top"
                  style={{ borderRadius: blobShapes, objectPosition: "50% 10%" }}
                />
              </div>

            </div>

          </div>

        </motion.div>

      </motion.div>


    </div>
  );
};

export default People;