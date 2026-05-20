"use client";
import Hero2 from "../../components/Hero2"; //Hero components
import Cta1 from "../../components/Cta1";
import Product_ServicesPage from "../../components/Product&Services"; //Product and Services components
import ServicesShortCutPage from "../../components/ServicesShortCutPath"; //Services Short Cut Path components
import BlogStories from "../../components/Blogs";

export default function Home() {
  return (
    <>
      <Hero2/>
      

      <Cta1/>

      <ServicesShortCutPage/>

      <Product_ServicesPage/>

      <BlogStories/>  
      
 
    </>
  );
}
