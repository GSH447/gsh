"use client";
import Hero2 from "../../components/Hero2"; //Hero components
import { motion } from "framer-motion";  
import Link from "next/link";
import Cta1 from "../../components/Cta1";
import HeroVideo from "../../components/Videos/index"; //Hero Video components
import Product_ServicesPage from "../../components/Product&Services"; //Product and Services components
import ServicesShortCutPage from "../../components/ServicesShortCutPath"; //Services Short Cut Path components
import BlogStories from "../../components/Blogs";
import SpecialistCare from "../../components/ServicesShortCutPath/SpecialistCare"; //Specialist Care components


export default function Home() {
  return (
    <>
      <Hero2/>
      
      {/* Top Border */}
      <div className="flex">
        <div className="border-[10px] border-[#5CB338] w-full"></div>
        <div className="border-[10px] border-[#6F92E7] w-full"></div>
        <div className="border-[10px] border-[#4a912d] w-full"></div>
      </div>

      <HeroVideo/>
            {/* Top Border */}
      <div className="flex">
        <div className="border-[10px] border-[#5CB338] w-full"></div>
        <div className="border-[10px] border-[#6F92E7] w-full"></div>
        <div className="border-[10px] border-[#4a912d] w-full"></div>
      </div>


      {/* <Cta1/> */}

      <SpecialistCare/>

      {/* <ServicesShortCutPage/> */}

      <Product_ServicesPage/>

      <BlogStories/>  
      
 
    </>
  );
}
