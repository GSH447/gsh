"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, MapPin, ShieldAlert, Clock3, MessageSquare, Mail, Globe, Milestone } from "lucide-react";

export default function ServicePageLayout({ data }) {
  if (!data) return null;

  return (
    // Clean, corporate health gradient using soft grays, clinical blues, and white foundations
    <main className="min-h-screen bg-gradient-to-tr from-slate-50 via-white to-sky-50/40 text-slate-900 selection:bg-[#5CB338] selection:text-white overflow-x-hidden">
      
      {/* 1. ULTRA-WIDE CINEMATIC HERO SECTION */}
      <section className="relative w-full h-[50vh] min-h-[450px] max-h-[650px] flex items-center bg-[#1e1b4b] overflow-hidden">
        {/* Visual Background Architecture */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/images/about/gsh.png"
            alt={data.title || "Gracespring Hospitals Service"}
            fill
            priority
            className="object-cover object-center opacity-25 scale-100"
          />
          {/* Subtle medical grid structure overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111029] via-[#1e1b4b]/95 lg:via-[#1e1b4b]/85 to-transparent" />
        </div>

        {/* Dynamic content positioning centered for wide screens */}
        <div className="w-full max-w-[1600px] mx-auto px-8 xl:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-self-start inline-block text-emerald-400 font-bold tracking-widest text-xs uppercase mb-5 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 w-fit"
            >
              {data.category || "Specialist Clinical Unit"}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-white leading-tight"
            >
              {data.title}
            </motion.h1>
            
            {data.tagline && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 text-base xl:text-lg text-slate-300 font-normal max-w-2xl leading-relaxed"
              >
                {data.tagline}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Brand Tri-Color Accent Bar */}
      <div className="flex w-full h-[6px] shadow-sm">
        <div className="bg-[#5CB338] w-full" />
        <div className="bg-[#6F92E7] w-full" />
        <div className="bg-[#4a912d] w-full" />
      </div>

      {/* 2. THREE-COLUMN LARGE DESKTOP HEALTH DASHBOARD */}
      <section className="w-full max-w-[1600px] mx-auto px-8 xl:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* COLUMN 1: METRICS & PHYSICAL CITATION PANEL */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-28">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 text-xs text-slate-400 font-bold tracking-wider uppercase">
                <Clock3 size={14} className="text-[#6F92E7]" />
                Availability Tracker
              </div>
              <p className="text-sm font-bold text-[#4a912d] flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#5CB338] animate-pulse" />
                Continuous 24/7 Operations
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Consulting reviews are prioritized via pre-scheduled queues. Walk-in diagnostics are sorted according to triage urgency levels.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
              <div className="flex items-start gap-3 text-xs text-slate-600">
                <MapPin size={18} className="text-[#5CB338] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800 mb-1">Official Facility Citation</p>
                  <p className="leading-relaxed text-slate-500 font-medium">
                    Gracespring Hospitals,<br />
                    Block 3, Plot 32, Ajayi Apata Estate,<br />
                    Sangotedo, Eti-Osa, Lekki, Lagos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: PRIMARY CLINICAL NARRATIVE */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm"
            >
              <h2 className="text-xs font-bold tracking-widest uppercase text-[#5CB338] border-b border-slate-100 pb-4 mb-6 flex items-center gap-2">
                <Milestone size={14} />
                Clinical Overview & Protocol
              </h2>
              <p className="text-slate-600 leading-relaxed text-base xl:text-md font-normal whitespace-pre-line antialiased max-w-prose">
                {data.overview || "System information matrix uploading dynamically."}
              </p>
            </motion.div>

            {/* Quality Standard Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-100 via-white to-sky-50/30 border border-slate-200 flex items-start gap-4">
              <ShieldAlert className="text-[#6F92E7] shrink-0 mt-0.5" size={22} />
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">Institutional Regulatory Compliance</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  All active procedures inside our units match state safety mandates under the guidance framework of the Health Facility Monitoring and Accreditation Agency (HEFAMAA) Lagos.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 3: MULTI-CHANNEL BOOKING & EMERGENCY CONTROL TRAY */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
            
            {/* EMERGENCY PHONE CALL BANNER */}
            <Link
              href="tel:07056482776"
              className="flex items-center gap-3 bg-red-600 font-bold tracking-wide uppercase py-3 px-6 rounded-xl shadow-md hover:bg-red-700 transition-all active:scale-98 w-full h-14 justify-center group"
            >
              <div className="relative w-[50px] h-[50px] shrink-0">
                <Image 
                  src="/assets/images/emergency/emergencies.gif" 
                  alt="Emergency Alert"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white text-xs xl:text-sm tracking-wider">For Emergencies, Call 0705 648 2776</span>
            </Link>

            {/* WHATSAPP CONSULTATION BANNER */}
            <Link
              href="https://wa.me/2347056482776" 
              className="flex items-center gap-3 bg-[#25D366] font-bold tracking-wide uppercase py-3 px-6 rounded-xl shadow-md hover:bg-[#20ba59] transition-all active:scale-98 w-full h-14 justify-center group"
            >
              <div className="relative w-[38px] h-[38px] shrink-0">
                <Image 
                  src="/assets/images/emergency/Whatsap-Icon-Animation.gif" 
                  alt="WhatsApp Chat"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white text-xs xl:text-sm tracking-wider">WhatsApp Chat: 0705 648 2776</span>
            </Link>

            {/* EXPANDED ALTERNATIVE OPTIONS TRAY */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xl space-y-6"
            >
              <div>
                <h3 className="text-xs font-bold text-slate-800 tracking-wider uppercase flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Activity className="text-[#5CB338] h-4 w-4" />
                  Unit Offerings
                </h3>
                
                {data.features && data.features.length > 0 && (
                  <ul className="space-y-2.5 mt-3">
                    {data.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium leading-tight">
                        <CheckCircle2 className="text-[#5CB338] h-3.5 w-3.5 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* BOOKING CHANNEL SYSTEM SELECTIONS */}
              <div className="space-y-2.5 border-t border-slate-100 pt-4">
                <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">Alternative Booking Mediums</p>
                
                {/* 1. Patient Portal Access */}
                <Link 
                  href="/patient-portal" // Update with live hospital portal link
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/60 hover:from-slate-100 hover:to-slate-200/80 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <Globe size={14} className="text-[#6F92E7]" />
                    Use Patient Portal Systems
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal group-hover:text-[#5CB338] transition-colors">Instant Appoint →</span>
                </Link>

                {/* 2. Direct Care Email System */}
                <a 
                  href="mailto:care@gracespringhospitals.com?subject=Specialist Consultation Booking Request"
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/60 hover:from-slate-100 hover:to-slate-200/80 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <Mail size={14} className="text-slate-500" />
                    care@gracespringhospitals.com
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal group-hover:text-[#5CB338] transition-colors">Email Us →</span>
                </a>

                {/* 3. Text Message System Channel */}
                <a 
                  href="sms:07056482776?body=Hello Gracespring Hospitals, I would like to book an appointment."
                  className="w-full p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/60 hover:from-slate-100 hover:to-slate-200/80 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-between group"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-amber-500" />
                    SMS Text Message Booking
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal group-hover:text-[#5CB338] transition-colors">Send Text →</span>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </section>
    </main>
  );
}


// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Activity, CheckCircle2, ArrowRight, MapPin, PhoneCall, ShieldAlert, Clock3 } from "lucide-react";

// export default function ServicePageLayout({ data }) {
//   if (!data) return null;

//   return (
//     <main className="min-h-screen bg-slate-950 text-white selection:bg-[#5CB338] overflow-x-hidden">
      
//       {/* 1. ULTRA-WIDE CINEMATIC HERO SECTION */}
//       <section className="relative w-full h-[65vh] min-h-[550px] max-h-[750px] flex items-center bg-[#111029] overflow-hidden">
//         {/* Visual Stage Layer */}
//         <div className="absolute inset-0 z-0">
//           <Image
//             src="/assets/images/about/gsh.png"
//             alt={data.title || "Gracespring Hospitals Service"}
//             fill
//             priority
//             className="object-cover object-center opacity-15 xl:opacity-20 scale-100 transition-transform duration-1000"
//           />
//           {/* Diagnostic ambient vector mesh */}
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_50%_60%_at_70%_40%,#000_80%,transparent_100%)] opacity-40" />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a1a] via-[#111029]/95 lg:via-[#111029]/80 to-transparent" />
//         </div>

//         {/* Constrained wide content container matching high-res displays */}
//         <div className="w-full max-w-[1600px] mx-auto px-8 xl:px-16 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
//           <div className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center">
//             <motion.span 
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="inline-self-start inline-block text-emerald-400 font-bold tracking-widest text-xs uppercase mb-6 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20"
//             >
//               {data.category || "Specialist Clinical Unit"}
//             </motion.span>
            
//             <motion.h1 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="text-4xl md:text-6xl xl:text-7xl font-black tracking-tight text-white leading-tight"
//             >
//               {data.title}
//             </motion.h1>
            
//             {data.tagline && (
//               <motion.p 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="mt-6 text-lg xl:text-xl text-slate-400 font-normal max-w-2xl leading-relaxed"
//               >
//                 {data.tagline}
//               </motion.p>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Brand Tri-Color Accent Divider Line */}
//       <div className="flex w-full h-[6px]">
//         <div className="bg-[#5CB338] w-full" />
//         <div className="bg-[#6F92E7] w-full" />
//         <div className="bg-[#4a912d] w-full" />
//       </div>

//       {/* 2. THREE-COLUMN LARGE DESKTOP CLINICAL DASHBOARD */}
//       <section className="w-full max-w-[1600px] mx-auto px-8 xl:px-16 py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          
//           {/* COLUMN 1: TRACKING META & LOCAL CITATION (Left flank on large viewports) */}
//           <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-28">
//             <div className="p-6 rounded-2xl bg-slate-900/20 border border-slate-900/60 space-y-4">
//               <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium tracking-wide uppercase">
//                 <Clock3 size={14} className="text-[#6F92E7]" />
//                 Availability Status
//               </div>
//               <p className="text-sm font-bold text-emerald-400 flex items-center gap-2">
//                 <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
//                 24/7 Emergency Admissions
//               </p>
//               <p className="text-xs text-slate-400 leading-normal">
//                 Outpatient consulting hours run Monday through Saturday by strict prior booking alignment.
//               </p>
//             </div>

//             <div className="p-6 rounded-2xl bg-slate-900/20 border border-slate-900/60 space-y-3">
//               <div className="flex items-start gap-3 text-xs text-slate-400">
//                 <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
//                 <div>
//                   <p className="font-semibold text-slate-300 mb-1">Physical Citation</p>
//                   <p className="leading-relaxed text-slate-400">
//                     Gracespring Hospitals,<br />
//                     Block 3, Plot 32, Ajayi Apata Estate,<br />
//                     Sangotedo, Eti-Osa, Lekki, Lagos.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* COLUMN 2: EXPANSIVE NARRATIVE STREAM (Center primary area) */}
//           <div className="lg:col-span-5 space-y-12">
//             <motion.div
//               initial={{ opacity: 0, x: -10 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5 }}
//             >
//               <h2 className="text-xs font-bold tracking-wider uppercase text-emerald-400 border-b border-slate-900 pb-3 mb-6">
//                 Clinical Overview & Protocol
//               </h2>
//               {/* Maximized line ergonomics using max-w-prose */}
//               <p className="text-slate-300 leading-relaxed text-base xl:text-lg font-normal whitespace-pre-line antialiased max-w-prose">
//                 {data.overview || "Clinical information framework detail updating instantly."}
//               </p>
//             </motion.div>

//             {/* Quality Standard Flagout */}
//             <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-900 flex items-start gap-4">
//               <ShieldAlert className="text-[#6F92E7] shrink-0 mt-1" size={22} />
//               <div>
//                 <h4 className="text-sm font-bold text-slate-200 mb-1">Institutional Guideline</h4>
//                 <p className="text-xs text-slate-400 leading-relaxed">
//                   All medical protocols deployed within this theater meet national healthcare benchmarks and the regulatory framework of the Lagos State Health Facility Monitoring and Accreditation Agency (HEFAMAA).
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* COLUMN 3: CAPABILITIES CONTROL PANEL (Right wing execution deck) */}
//           <div className="lg:col-span-4 lg:sticky lg:top-28">
//             <motion.div 
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.1 }}
//               className="p-8 rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-900/20 border border-slate-900 backdrop-blur-md shadow-2xl"
//             >
//               <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-6 flex items-center gap-2.5 border-b border-slate-800 pb-4">
//                 <Activity className="text-[#5CB338] h-4 w-4" />
//                 Core Capability Index
//               </h3>
              
//               {data.features && data.features.length > 0 ? (
//                 <ul className="space-y-4 mb-8">
//                   {data.features.map((feature, i) => (
//                     <li key={i} className="flex items-start gap-3.5 text-sm text-slate-300 font-normal leading-snug">
//                       <CheckCircle2 className="text-[#5CB338] h-4 w-4 shrink-0 mt-0.5" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-xs text-slate-500 italic mb-8">Specialized therapeutic options specified on reservation request.</p>
//               )}

//               <div className="space-y-3.5">
//                 <Link 
//                   href="/contact" 
//                   className="w-full py-4 bg-[#5CB338] hover:bg-[#4ea22f] text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#5CB338]/10 active:translate-y-0.5 text-center"
//                 >
//                   Book Specialist Consultation
//                   <ArrowRight size={16} />
//                 </Link>
                
//                 <a 
//                   href="tel:+23480000000" 
//                   className="w-full py-3 bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 text-center tracking-wider uppercase"
//                 >
//                   <PhoneCall size={13} className="text-emerald-400" />
//                   Contact Admissions Officer
//                 </a>
//               </div>
//             </motion.div>
//           </div>

//         </div>
//       </section>
//     </main>
//   );
// }

// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { Activity, CheckCircle2, ArrowRight, MapPin, PhoneCall } from "lucide-react";

// export default function ServicePageLayout({ data }) {
//   if (!data) return null;

//   return (
//     <main className="min-h-screen bg-slate-950 text-white selection:bg-[#5CB338]">
      
//       {/* 1. PREMIUM INSTITUTIONAL HERO SECTION */}
//       <section className="relative w-full h-[55vh] min-h-[420px] flex items-center justify-center bg-[#111029] overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <Image
//             src="/assets/images/about/gsh.png" // Shared primary premium banner fallback asset
//             alt={data.title || "Gracespring Hospitals Service"}
//             fill
//             priority
//             className="object-cover object-center opacity-25 scale-102 transition-transform duration-700"
//           />
//           {/* Subtle diagnostic technical mesh background layer */}
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a1a] via-[#111029]/95 to-transparent" />
//         </div>

//         <div className="container mx-auto px-6 lg:px-16 relative z-10 w-full text-left max-w-5xl">
//           <motion.span 
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-block text-emerald-400 font-bold tracking-widest text-xs uppercase mb-4 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20"
//           >
//             {data.category || "Specialist Clinical Unit"}
//           </motion.span>
          
//           <motion.h1 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl leading-tight"
//           >
//             {data.title}
//           </motion.h1>
          
//           {data.tagline && (
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//               className="mt-4 text-base md:text-lg text-slate-400 font-normal max-w-3xl leading-relaxed"
//             >
//               {data.tagline}
//             </motion.p>
//           )}
//         </div>
//       </section>

//       {/* Brand Tri-Color Accent Divider Line */}
//       <div className="flex w-full h-[6px]">
//         <div className="bg-[#5CB338] w-full" />
//         <div className="bg-[#6F92E7] w-full" />
//         <div className="bg-[#4a912d] w-full" />
//       </div>

//       {/* 2. MAIN STRUCTURAL LAYOUT BLOCK */}
//       <section className="container mx-auto px-6 lg:px-16 py-16 max-w-5xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
//           {/* Narrative Content Window */}
//           <div className="lg:col-span-2 space-y-10">
//             <motion.div
//               initial={{ opacity: 0, x: -15 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4 }}
//             >
//               <h2 className="text-xl font-bold text-white border-l-4 border-[#5CB338] pl-3 mb-6 tracking-tight uppercase text-xs tracking-wider text-emerald-400">
//                 Clinical Overview & Protocol
//               </h2>
//               <p className="text-slate-300 leading-relaxed text-base font-normal whitespace-pre-line antialiased">
//                 {data.overview || "Clinical information framework detail updating instantly."}
//               </p>
//             </motion.div>

//             {/* Quick Location Anchor Tag for Google Local SEO Crawlers */}
//             <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80 flex items-start gap-3.5 text-xs text-slate-400">
//               <MapPin size={18} className="text-emerald-500 shrink-0 mt-0.5" />
//               <div>
//                 <p className="font-semibold text-slate-300 mb-0.5">Facility Location & Citations</p>
//                 <p className="leading-relaxed">Gracespring Hospitals, Block 3, Plot 32, Ajayi Apata estate, Sangotedo, Eti-Osa, Lekki - Lagos.</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar: Sticky Capabilities Control Panel */}
//           <div className="lg:col-span-1 sticky top-28">
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.4, delay: 0.15 }}
//               className="p-6 rounded-2xl bg-slate-900/40 border border-slate-900 backdrop-blur-md shadow-xl"
//             >
//               <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-5 flex items-center gap-2 border-b border-slate-800 pb-3">
//                 <Activity className="text-[#5CB338] h-4 w-4" />
//                 Core Capabilities
//               </h3>
              
//               {data.features && data.features.length > 0 ? (
//                 <ul className="space-y-4">
//                   {data.features.map((feature, i) => (
//                     <li key={i} className="flex items-start gap-3 text-sm text-slate-300 font-normal leading-snug">
//                       <CheckCircle2 className="text-[#5CB338] h-4 w-4 shrink-0 mt-0.5" />
//                       <span>{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-xs text-slate-500 italic">Specialized therapeutic options specified on reservation request.</p>
//               )}

//               <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
//                 <Link 
//                   href="/contact" 
//                   className="w-full py-3.5 bg-[#5CB338] hover:bg-[#4ea22f] text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#5CB338]/10 active:translate-y-0.5 text-center"
//                 >
//                   Book Specialist Consultation
//                   <ArrowRight size={16} />
//                 </Link>
                
//                 <a 
//                   href="tel:+23480000000" // Replace with live Gracespring emergency phone line
//                   className="w-full py-2.5 bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
//                 >
//                   <PhoneCall size={13} className="text-emerald-400" />
//                   Speak with Desk Officer
//                 </a>
//               </div>
//             </motion.div>
//           </div>

//         </div>
//       </section>
//     </main>
//   );
// }

// import React from 'react';
// import Link from 'next/link';
// import { Activity, CheckCircle2, ArrowRight } from 'lucide-react';

// export default function ServicePageLayout({ data }) {
//   if (!data) return null;

//   return (
//     <main className="min-h-screen bg-slate-950 text-white selection:bg-[#5CB338]">
//       {/* Premium Institutional Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-900 py-20 lg:py-24">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
//         <div className="container mx-auto px-4 relative z-10 max-w-5xl">
//           <span className="text-xs font-bold uppercase tracking-widest text-[#5CB338] px-3 py-1 rounded-full bg-[#5CB338]/10 border border-[#5CB338]/20">
//             {data.category}
//           </span>
//           <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
//             {data.title}
//           </h1>
//           <p className="text-lg md:text-xl text-slate-400 mt-4 font-medium max-w-3xl leading-relaxed">
//             {data.tagline}
//           </p>
//         </div>
//       </section>

//       {/* Main Structural Layout Block */}
//       <section className="container mx-auto px-4 py-16 max-w-5xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
//           {/* Narrative Content */}
//           <div className="lg:col-span-2 space-y-8">
//             <div>
//               <h2 className="text-xl font-bold text-white border-l-4 border-[#5CB338] pl-3 mb-4">
//                 Clinical Overview
//               </h2>
//               <p className="text-slate-300 leading-relaxed text-base font-normal whitespace-pre-line">
//                 {data.overview}
//               </p>
//             </div>
//           </div>

//           {/* Right Sidebar: Capabilities Panel */}
//           <div className="lg:col-span-1">
//             <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-900 backdrop-blur-sm sticky top-24">
//               <h3 className="text-md font-bold text-white tracking-tight mb-4 flex items-center gap-2">
//                 <Activity className="text-[#5CB338] h-5 w-5" />
//                 Core Capabilities
//               </h3>
              
//               <ul className="space-y-3.5">
//                 {data.features.map((feature, i) => (
//                   <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 font-medium">
//                     <CheckCircle2 className="text-[#5CB338] h-4 w-4 shrink-0 mt-0.5" />
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-8 pt-6 border-t border-slate-800/80">
//                 <Link 
//                   href="/contact" 
//                   className="w-full py-3 bg-[#5CB338] hover:bg-[#4ea22f] text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#5CB338]/10"
//                 >
//                   Book Specialist Consultation
//                   <ArrowRight size={16} />
//                 </Link>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>
//     </main>
//   );
// }