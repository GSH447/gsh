"use client";
import Hero2 from "../../components/Hero2"; //Hero components
import CTA from "../../components/Banner/CTA"; //SubscribeCTA components
import Product_ServicesPage from "../../components/Product&Services"; //Product and Services components
import ServicesShortCutPage from "../../components/ServicesShortCutPath"; //Services Short Cut Path components
import Feedback from "../../components/Feedbacks";
import Benefactor01 from "../../components/Feedbacks/benefactor/01";
import MakeADifference from "../../components/MakeADifference/01";
import SaveALife from "../../components/SaveALife";
import { save_a_life } from "../../components/SiteMaps/data";
import SubscribeCTA from "../../components/Banner/CTA/subscribe";

export default function Home() {
  return (
    <>
      <Hero2/>
      
      <Product_ServicesPage/>

      <ServicesShortCutPage/>

      {/* <div
        className="-mt-[28.5rem] lg:-mt-[9rem]"
      >
        <CTA/>
      </div>
      <Feedback/>
      <Benefactor01/>
      <MakeADifference
        bgColor={"#d77dbf"}
        title={"Make a difference today"}
        description={"Every donation takes us a step closer to another life-saving breakthrough."}
      />
      <SaveALife
        save_a_life={save_a_life}
      />
      <SubscribeCTA/> */}

      {/* <FooterCurves/> */}

      {/* <AboutPage/>

      <WorkwithUs/>
      <TeamPage/>
      <FAQs/>
      <ContactPage/>  */}
    </>
  );
}
