"use client";
import Link from "next/link";
import Image from "next/image";
// import HeroVideo from "../Video/index"

export default function Cta1() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* Top Border */}
      <div className="flex">
        <div className="border-[10px] border-[#5CB338] w-full"></div>
        <div className="border-[10px] border-[#6F92E7] w-full"></div>
        <div className="border-[10px] border-[#4a912d] w-full"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12 px-5 lg:px-20">

        {/* LEFT COLUMN - ABOUT US */}
        <div className="text-black space-y-6">

          <p className="uppercase tracking-widest text-sm text-[#2A157c] font-semibold">
            24/7 GLOBAL STANDARD OF PRIVATE HEALTHCARE
          </p>

          <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
            Excellence in Care,
            <br />
            Our Shared Path
          </h2>

          <p className="leading-8 text-sm text-[#2A157c]">
            ABOUT GRACESPRING HOSPITALS
          </p>

          <p className="leading-8 text-[#2A157c]">
            A <b>private hospital on the Lekki-Epe corridor, Sangotedo </b>.
            delivering consultant-led patient-centred care aligned with global best clinical standards.
            Maternity, ICU, Surgery, Dialysis and advanced Imaging all under one roof, also also easily 
            <b> accessed via the new Lagos Calabar Costal Road.</b>
          </p>

          {/* Three Wings */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">
                Pistis
              </h3>
              <p className="text-sm text-black">
                Faith in care through trust, precision and clinical
                excellence.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">
                Elpis
              </h3>
              <p className="text-sm text-black">
                Hope in healing through innovation and recovery.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <h3 className="font-semibold text-lg mb-2">
                Agape
              </h3>
              <p className="text-sm text-black">
                Love in service through compassion and dignity.
              </p>
            </div>

          </div> */}

          <Link
            href="/who-we-are/about-us"
            className="inline-block mt-4 bg-[#5CB338] hover:bg-[#4a912d] text-black px-6 py-3 rounded-lg transition"
          >
            Learn More
          </Link>

        </div>

        {/* RIGHT COLUMN - IMAGE */}
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">

          {/* <HeroVideo/> */}
          <Image
            src="/assets/images/about/surgeon.jpg"
            alt="Gracespring Hospitals"
            fill
            className="object-cover"
          />

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