"use client";
import About from "./About";
import AboutFoundation from "./AboutFoundation";
import Aboutus from "./Aboutus";
import AboutImage from "./AboutImage";
import Aboutdifference from "./Aboutdifference";
import SubscribeCTA from "../../Banner/CTA/subscribe";
import Vmo from "./vmo";

export default function AboutPage() {
  return (

    <>
    
      <Aboutus/>
      <AboutFoundation/>
      <About/>
      <AboutImage/>
      <Aboutdifference/>
      <Vmo/>
    
      <SubscribeCTA/>
    </>
  );
}
