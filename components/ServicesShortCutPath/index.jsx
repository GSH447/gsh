"use client";
import Services_short_cut from "./Services_short_cut";
import { services_short_cut } from "../SiteMaps/data";
import Link from "next/link";
import Image from "next/image";

export default function ServicesShortCutPage() {
  return (
    <div className="relative w-full min-h-screen">
      
      {/* Content layer */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-screen p-5 lg:p-[10%]">
        
        <div className="flex flex-col items-center w-full">

          <div className="flex flex-col items-center w-full gap-8 mb-12"  >
            <h1 className="text-3xl lg:text-6xl font-bold text-center">
              Specialist Medical Care
            </h1>

            <div>

              <div>
                <p>ADULTS >></p>
              </div>
              
              <div>
                <p>CHILDREN >></p>
              </div>
              
              <div>
                <p>FAMILY >></p>
              </div>

            </div>

            <p className="text-sm lg:text-lg text-center font-medium mt-4 max-w-3xl">
              Our specialist care services are designed to provide expert medical attention and personalized treatment plans for patients with complex health conditions. Our team of highly skilled specialists is dedicated to delivering comprehensive care, utilizing the latest medical advancements and technologies to ensure the best possible outcomes for our patients.
            </p>
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