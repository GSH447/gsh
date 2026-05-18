"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const blobShapes = [
  "74% 26% 63% 37% / 45% 36% 64% 55% ",
];




const PRIMARY_BG = "#FDF2EB";

const ContactInformation = ({
    contactInformationBg,
    contactInformationHeader,
    cihTextColor,
    cihTextSize,
    cihOfficeText,
    cihPhoneText,
    cihPostText
}) => {


  return (

    <>


      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto py-[2.5rem] lg:p-10 mb-[5rem]"
        style={{backgroundColor: contactInformationBg || PRIMARY_BG}}
      >
        

        <div
            className="w-fit mx-auto px-10 lg:px-0"
        >
            <h2
                style={{
                    color: cihTextColor || "#223A5C",
                    fontSize: cihTextSize || "2.5rem",
                }}
                className="!sm:text-[1rem]"
            >
                
                {contactInformationHeader || "Other ways to contact us"}
            
            </h2>

        </div>

        <div
          className=" grid gap-10 lg:grid-cols-3 p-10"
        >

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="  items-center p-10 grid gap-10 rounded-md shadow-md lg:shadow-xl"
          >

            
            {/* Content */}

            <div
              className=" w-fit m-auto"
            >

                <div className=" relative flex justify-center items-center">

                    {/* SVG Blob background flipped horizontally */}
                    <svg
                        width="180"
                        height="200"
                        viewBox="0 0 100 100"
                        className="absolute transform scale-x-[-1] transform rotate-[120deg] -ml-10 -mt-10" // rotate 90 degrees clockwise, flips horizontally
                    >
                        <path
                        d="M10,10 C50,0 80,20 70,50 C60,80 30,90 20,60 C10,30 20,10 30,10 Z"
                        fill="#e28ad2" // primary color
                        />
                    </svg>

                    {/* Icon on top */}
                    <Image
                        src="/assets/icons/office-building.png"
                        width={1000}
                        height={1000}
                        alt="chat icon"
                        className="relative z-10 w-[5rem] h-[4rem]"
                    />

                </div>
                
            </div>
            
            <div className=" flex flex-col justify-between gap-[1rem] m-auto">
            
                {/* Content */}

                <div
                    className=""
                >

                    <h2 className="text-[1.6rem] font-extrabold text-primary mb-2 text-center">
                        {cihOfficeText || "Visit our Office"}
                    </h2>

                </div>

                <div
                    className=""
                >

                <div className=" text-center m-auto grid">
             

                    <p
                    className="inline-block text-sm text-primary font-semibold"
                    >
                      The Gracespring Health Foundation   
                    </p>
                    <p
                    className="inline-block text-sm text-primary font-semibold"
                    > 
                      Block 3, Plot 32, Ajayi Apata estate
                    </p>
                    
                    <p
                    className="inline-block text-sm text-primary font-semibold"
                    >
                      Sangotedo, Lekki, Lagos 
                    </p>
                    
                    {/* <p
                    className="inline-block text-lg text-primary font-semibold"
                    >
                      NG
                    </p> */}
                </div>
                </div>


            

                {/* CTA */}
                <div className=" text-center m-auto grid">
                    <p
                    className="inline-block text-sm text-primary font-semibold"
                    >
                      Monday - Friday, 9am - 5pm.
                    </p>

                </div>


            </div>


          </motion.div>



          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="  items-center p-10 grid gap-10 rounded-md shadow-md lg:shadow-xl"
          >

            
            {/* Content */}

            <div
              className=" w-fit m-auto"
            >

                <div className=" relative flex justify-center items-center">

                    {/* SVG Blob background flipped horizontally */}
                    <svg
                        width="180"
                        height="200"
                        viewBox="0 0 100 100"
                        className="absolute transform scale-x-[-1] transform rotate-[120deg] -ml-10 -mt-10" // rotate 90 degrees clockwise, flips horizontally
                    >
                        <path
                        d="M10,10 C50,0 80,20 70,50 C60,80 30,90 20,60 C10,30 20,10 30,10 Z"
                        fill="#e29a8a" // primary color
                        />
                    </svg>

                    {/* Icon on top */}
                    <Image
                        src="/assets/icons/telephone.png"
                        width={1000}
                        height={1000}
                        alt="chat icon"
                        className="relative z-10 w-[5rem] h-[4rem]"
                    />

                </div>
                
            </div>
            
            <div className=" flex flex-col justify-between gap-[1rem] m-auto">
            
                {/* Content */}

                <div
                    className=""
                >

                    <h2 className="text-[1.6rem] font-extrabold text-primary mb-2 text-center">
                        {cihPhoneText || "By phone"}
                    </h2>

                </div>

                <div
                    className=""
                >

                    <p className="text-md text-primary text-center font-bold">
                        Get in touch with our supporter care team
                    </p>

                    
                    <p className="text-md text-primary text-center font-bold">
                        on <Link href={"tel:+2348082550192"}>+234 808-255-0192</Link>  
                    </p>

                    
                    <p className="text-md text-primary text-center font-bold">
                        Monday - Friday between 9am- 5pm.
                    </p>

                </div>


            

                {/* CTA */}
                <div className=" text-center m-auto grid">
                    <Link
                    href={"tel:+2348082550192"}
                    className="inline-block text-sm text-primary font-semibold underline"
                    >
                      Call us
                    </Link>

         
                </div>


            </div>


          </motion.div>







          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="  items-center p-10 grid gap-10 rounded-md shadow-md lg:shadow-xl"
          >

            
            {/* Content */}

            <div
              className=" w-fit m-auto"
            >

                <div className=" relative flex justify-center items-center">

                    {/* SVG Blob background flipped horizontally */}
                    <svg
                        width="180"
                        height="200"
                        viewBox="0 0 100 100"
                        className="absolute transform scale-x-[-1] transform rotate-[120deg] -ml-10 -mt-10" // rotate 90 degrees clockwise, flips horizontally
                    >
                        <path
                        d="M10,10 C50,0 80,20 70,50 C60,80 30,90 20,60 C10,30 20,10 30,10 Z"
                        fill="#8ae293" // primary color
                        />
                    </svg>

                    {/* Icon on top */}
                    <Image
                        src="/assets/icons/mailbox.png"
                        width={1000}
                        height={1000}
                        alt="chat icon"
                        className="relative z-10 w-[5rem] h-[4rem]"
                    />

                </div>
                
            </div>
            
            <div className=" flex flex-col justify-between gap-[1rem] m-auto">
            
                {/* Content */}

                <div
                    className=""
                >

                    <h2 className="text-[1.6rem] font-extrabold text-primary mb-2 text-center">
                        {cihPostText || "By post or mail"}
                    </h2>

                </div>

                <div
                    className=""
                >

                    <p className="text-md text-primary text-center font-bold">
                        Please address any post to us at:
                    </p>

                </div>


            

                {/* CTA */}
                <div className=" text-center m-auto grid">
                    <p
                    className="inline-block text-sm text-primary font-semibold"
                    >
                      Fundraising Operations
                    </p>

                    <p
                    className="inline-block text-sm text-primary font-semibold"
                    >
                      The Gracespring Health Foundation   
                    </p>
                    <p
                    className="inline-block text-sm text-primary font-semibold"
                    > 
                      Block 3, Plot 32, Ajayi Apata estate
                    </p>
                    
                    <p
                    className="inline-block text-sm text-primary font-semibold"
                    >
                      Sangotedo, Lekki, Lagos 
                    </p>
                    
                    {/* <p
                    className="inline-block text-lg text-primary font-semibold"
                    >
                      NG
                    </p> */}
                </div>
                

                <div
                    className=""
                >

                    <p className="text-md text-primary text-center font-bold">
                        Please address any mail to us:
                    </p>

                </div>


            

                {/* CTA */}
                <div className=" text-center m-auto grid">
                    <Link
                    href={"mailto:gracespringhealthfoundation@outlook.com"}
                    className="inline-block text-sm text-primary font-semibold underline"
                    >
                      Email us
                    </Link>

                </div>


            </div>


          </motion.div>

        </div>

      </motion.div>



    </>
  );
};

export default ContactInformation;