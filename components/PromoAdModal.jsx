"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function PromoAdModal({
  adKey = "orthopaedic-outreach-nov-2026",
  showOnMount = true,
  delayMs = 300,
  scrollThresholdVh = 120,
  badgeText = "3 DAYS · FREE SPECIALIST CARE",
  headlineTop = "FREE",
  headlineMiddle = "ORTHOPAEDIC",
  headlineBottom = "HEALTH OUTREACH",
  tagline = "Move Better. Live Better.",
  dateText = "26 · 27 · 28",
  monthYearText = "NOVEMBER 2026",
  venueText = "Gracespring Hospitals, Ajayi Apata Estate, Sangotedo",
  primaryCtaLabel = "Register now →",
  primaryCtaHref = "/programs-and-services/orthopaedic-outreach",
  secondaryCtaLabel = "Call to book",
  secondaryCtaHref = "tel:+2347056482776",
  directionsHref =
    "https://www.google.com/maps/search/?api=1&query=Gracespring%20Hospitals%20Ajayi%20Apata%20Estate%20Sangotedo%20Lagos",
  treatHref = "/programs-and-services/orthopaedic-outreach#treating",
  consultant = {
    label: "MEET OUR LEAD CONSULTANT",
    name: "Dr Thompson Akpokonyan",
    credentials: "MBBS, FWACS, HSE",
    role: "Consultant Orthopaedic Surgeon & Traumatologist",
    specialties:
      "Arthroplasty · Arthroscopy · Spine Surgery · Hip & Knee Replacement",
    imageSrc: "/assets/orthopaedic/lead-consultant.png",
    imageAlt: "Dr Thompson Akpokonyan, lead consultant",
    partnerLabel: "IN COLLABORATION WITH",
    partnerLogoSrc: "/assets/orthopaedic/najoda-foundation.png",
    partnerLogoAlt: "Najoda Foundation",
  },
}) {
  const [isOpen, setIsOpen] = useState(false);

  const loadTriggeredRef = useRef(false);
  const scrollTriggeredRef = useRef(false);

  useEffect(() => {
    if (!showOnMount || typeof window === "undefined") return;

    const loadKey = `gsh_ad_load_${adKey}`;
    const scrollKey = `gsh_ad_scroll_${adKey}`;

    const alreadyShownOnLoad = window.sessionStorage.getItem(loadKey) === "1";
    const alreadyShownOnScroll = window.sessionStorage.getItem(scrollKey) === "1";

    let loadTimer = null;

    // 1. Trigger on page load (once per browser session)
    if (!alreadyShownOnLoad && !loadTriggeredRef.current) {
      const waitTime = Math.max(0, Number(delayMs) || 0);
      loadTimer = window.setTimeout(() => {
        if (loadTriggeredRef.current) return;
        loadTriggeredRef.current = true;
        window.sessionStorage.setItem(loadKey, "1");
        setIsOpen(true);
      }, waitTime);
    }

    // 2. Trigger when user scrolls past 120vh (once per browser session)
    const getScrollY = () =>
      Math.max(
        window.scrollY || 0,
        window.pageYOffset || 0,
        document.documentElement ? document.documentElement.scrollTop || 0 : 0,
        document.body ? document.body.scrollTop || 0 : 0
      );

    const handleScroll = () => {
      if (alreadyShownOnScroll || scrollTriggeredRef.current) return;
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      const thresholdPx = (vh * Number(scrollThresholdVh || 120)) / 100;

      if (thresholdPx > 0 && getScrollY() >= thresholdPx) {
        scrollTriggeredRef.current = true;
        window.sessionStorage.setItem(scrollKey, "1");
        setIsOpen(true);
      }
    };

    if (!alreadyShownOnScroll && Number(scrollThresholdVh) > 0) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
      handleScroll();
    }

    return () => {
      if (loadTimer) window.clearTimeout(loadTimer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [adKey, showOnMount, delayMs, scrollThresholdVh]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const closeModal = () => setIsOpen(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${headlineTop} ${headlineMiddle} ${headlineBottom}`}
      className="fixed inset-0 z-[1100] overflow-y-auto flex items-center justify-center p-2.5 sm:p-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close announcement modal"
        onClick={closeModal}
        className="fixed inset-0 w-full h-full bg-[#0e0a38]/75 backdrop-blur-[2px] border-0 cursor-pointer"
      />

        
      {/* Modal Card matching design */}
      <div className="relative z-10 w-full max-w-[380px] sm:max-w-[680px] lg:max-w-[1060px] rounded-[18px] sm:rounded-[28px] bg-[#261f90] text-white shadow-2xl overflow-hidden border border-white/15 my-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close modal"
          className="absolute right-2.5 top-2.5 sm:right-5 sm:top-5 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        <div className="p-3.5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-7 lg:gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-2 sm:gap-5 pr-8 sm:pr-10 lg:pr-0">
            {badgeText && (
              <span className="inline-block bg-[#fdc41f] text-[#1a1450] rounded-full px-2.5 py-0.5 sm:px-4 sm:py-1.5 text-[10px] sm:text-sm font-black tracking-wide uppercase">
                {badgeText}
              </span>
            )}

            <Link
              href={primaryCtaHref}
              onClick={closeModal}
              className="flex flex-col leading-none group"
            >
              <span className="text-2xl sm:text-6xl lg:text-[68px] font-black text-[#fdc41f] tracking-tight group-hover:brightness-105 transition">
                {headlineTop}
              </span>
              <span className="text-xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.05] tracking-tight">
                {headlineMiddle}
              </span>
              <span className="text-lg sm:text-4xl lg:text-[44px] font-black text-[#fdc41f] leading-[1.1] tracking-tight">
                {headlineBottom}
              </span>
            </Link>

            {tagline && (
              <p className="text-xs sm:text-2xl font-semibold text-white/95">
                {tagline}
              </p>
            )}

            {/* Gold Date & Venue Card */}
            <div className="w-full sm:w-auto max-w-full bg-[#fdc41f] text-[#1a1450] rounded-[12px] sm:rounded-[18px] px-3 py-2 sm:px-5 sm:py-4 flex flex-col gap-0.5 sm:gap-1 shadow-md">
              <div className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4 gap-y-0.5">
                <span className="text-lg sm:text-4xl lg:text-[44px] font-black leading-none tracking-wider">
                  {dateText}
                </span>
                <span className="text-xs sm:text-xl font-black uppercase tracking-wide">
                  {monthYearText}
                </span>
              </div>
              <p className="text-[11px] sm:text-base font-extrabold leading-snug">
                {venueText}
              </p>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1">
              <Link
                href={primaryCtaHref}
                onClick={closeModal}
                className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[52px] px-3.5 sm:px-7 rounded-[10px] sm:rounded-[12px] bg-[#fdc41f] text-[#1a1450] text-xs sm:text-lg font-black hover:brightness-95 transition"
              >
                {primaryCtaLabel}
              </Link>

              <a
                href={secondaryCtaHref}
                onClick={closeModal}
                className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[52px] px-3.5 sm:px-6 rounded-[10px] sm:rounded-[12px] border-2 border-white text-white text-xs sm:text-lg font-extrabold hover:bg-white/10 transition"
              >
                {secondaryCtaLabel}
              </a>
            </div>

            {/* Quick Links Row */}
            <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-[11px] sm:text-base font-bold">
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fdc41f] hover:underline inline-flex items-center py-0.5"
              >
                Get directions →
              </a>
              <Link
                href={treatHref}
                onClick={closeModal}
                className="text-white hover:underline inline-flex items-center py-0.5"
              >
                See what we treat ↓
              </Link>
            </div>
          </div>

          {/* Right Column: Consultant Card (Compact horizontal strip on mobile, full card on sm+) */}
          {consultant && (
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full sm:max-w-[360px] bg-white text-[#1a1450] rounded-[14px] sm:rounded-[22px] p-2.5 sm:p-4 flex flex-row sm:flex-col items-center sm:items-stretch gap-2.5 sm:gap-3 shadow-xl">
                <div className="relative w-16 h-16 sm:w-full sm:h-auto sm:aspect-[4/3] shrink-0 rounded-[10px] sm:rounded-[14px] overflow-hidden bg-gray-100">
                  <img
                    src={consultant.imageSrc}
                    alt={consultant.imageAlt}
                    className="w-full h-full object-cover object-top block"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-0.5 sm:px-1">
                  <span className="text-[9px] sm:text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase truncate">
                    {consultant.label}
                  </span>
                  <h3 className="text-sm sm:text-2xl font-black text-[#1a1450] leading-tight truncate sm:whitespace-normal">
                    {consultant.name}
                  </h3>
                  <p className="text-[10px] sm:text-sm font-extrabold text-[#261f90]">
                    {consultant.credentials}
                  </p>
                  <p className="text-[10px] sm:text-sm font-semibold text-[#1a1450] leading-snug sm:mt-0.5 line-clamp-1 sm:line-clamp-none">
                    {consultant.role}
                  </p>
                  <p className="hidden sm:block text-xs font-medium text-[#4a4680] leading-relaxed mt-1">
                    {consultant.specialties}
                  </p>
                </div>

                {consultant.partnerLogoSrc && (
                  <div className="hidden sm:flex border-t border-[#e4e2f3] pt-2.5 px-1 items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase">
                      {consultant.partnerLabel}
                    </span>
                    <img
                      src={consultant.partnerLogoSrc}
                      alt={consultant.partnerLogoAlt}
                      className="h-7 w-auto object-contain block"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { X } from "lucide-react";

// export default function PromoAdModal({
//   adKey = "orthopaedic-outreach-nov-2026",
//   showOnMount = true,
//   delayMs = -1,
//   scrollThresholdVh = 100,
//   badgeText = "3 DAYS · FREE SPECIALIST CARE",
//   headlineTop = "FREE",
//   headlineMiddle = "ORTHOPAEDIC",
//   headlineBottom = "HEALTH OUTREACH",
//   tagline = "Move Better. Live Better.",
//   dateText = "26 · 27 · 28",
//   monthYearText = "NOVEMBER 2026",
//   venueText = "Gracespring Hospitals, Ajayi Apata Estate, Sangotedo",
//   primaryCtaLabel = "Register now →",
//   primaryCtaHref = "/programs-and-services/orthopaedic-outreach",
//   secondaryCtaLabel = "Call to book",
//   secondaryCtaHref = "tel:+2347056482776",
//   directionsHref =
//     "https://www.google.com/maps/search/?api=1&query=Gracespring%20Hospitals%20Ajayi%20Apata%20Estate%20Sangotedo%20Lagos",
//   treatHref = "/programs-and-services/orthopaedic-outreach#treating",
//   consultant = {
//     label: "MEET OUR LEAD CONSULTANT",
//     name: "Dr Thompson Akpokonyan",
//     credentials: "MBBS, FWACS, HSE",
//     role: "Consultant Orthopaedic Surgeon & Traumatologist",
//     specialties:
//       "Arthroplasty · Arthroscopy · Spine Surgery · Hip & Knee Replacement",
//     imageSrc: "/assets/orthopaedic/lead-consultant.png",
//     imageAlt: "Dr Thompson Akpokonyan, lead consultant",
//     partnerLabel: "IN COLLABORATION WITH",
//     partnerLogoSrc: "/assets/orthopaedic/najoda-foundation.png",
//     partnerLogoAlt: "Najoda Foundation",
//   },
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (!showOnMount || typeof window === "undefined") return;

//     // sessionStorage clears when the tab/browser is closed and reopened,
//     // while keeping it dismissed during in-app route navigation.
//     const storageKey = `gsh_ad_seen_${adKey}`;
//     if (window.sessionStorage.getItem(storageKey)) return;

//     let triggered = false;
//     let timer = null;

//     const getCurrentScrollTop = () => {
//       return Math.max(
//         window.scrollY || 0,
//         document.documentElement ? document.documentElement.scrollTop || 0 : 0,
//         document.body ? document.body.scrollTop || 0 : 0
//       );
//     };

//     const cleanupListeners = () => {
//       if (timer) {
//         window.clearTimeout(timer);
//         timer = null;
//       }
//       window.removeEventListener("scroll", handleScroll, true);
//       document.removeEventListener("scroll", handleScroll, true);
//     };

//     const triggerModal = () => {
//       if (triggered) return;
//       triggered = true;
//       window.sessionStorage.setItem(storageKey, "1");
//       cleanupListeners();
//       setIsOpen(true);
//     };

//     const handleScroll = () => {
//       const vh = window.innerHeight || document.documentElement.clientHeight || 0;
//       const thresholdPx = (vh * Number(scrollThresholdVh || 0)) / 100;
//       if (thresholdPx > 0 && getCurrentScrollTop() >= thresholdPx) {
//         triggerModal();
//       }
//     };

//     if (typeof delayMs === "number" && delayMs >= 0) {
//       timer = window.setTimeout(triggerModal, delayMs);
//     }

//     if (Number(scrollThresholdVh) > 0) {
//       // Capture phase (`true`) catches scroll events even if a parent container scrolls
//       window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
//       document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
//       handleScroll();
//     }

//     return () => {
//       cleanupListeners();
//     };
//   }, [adKey, showOnMount, delayMs, scrollThresholdVh]);

//   useEffect(() => {
//     if (!isOpen) return;

//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const closeModal = () => setIsOpen(false);

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-label={`${headlineTop} ${headlineMiddle} ${headlineBottom}`}
//       className="fixed inset-0 z-[1100] overflow-y-auto flex items-center justify-center p-2.5 sm:p-6"
//     >
//       {/* Backdrop */}
//       <button
//         type="button"
//         aria-label="Close announcement modal"
//         onClick={closeModal}
//         className="fixed inset-0 w-full h-full bg-[#0e0a38]/75 backdrop-blur-[2px] border-0 cursor-pointer"
//       />

//       {/* Modal Card matching design */}
//       <div className="relative z-10 w-full max-w-[380px] sm:max-w-[680px] lg:max-w-[1060px] rounded-[18px] sm:rounded-[28px] bg-[#261f90] text-white shadow-2xl overflow-hidden border border-white/15 my-auto">
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={closeModal}
//           aria-label="Close modal"
//           className="absolute right-2.5 top-2.5 sm:right-5 sm:top-5 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
//         >
//           <X className="w-4 h-4 sm:w-6 sm:h-6" />
//         </button>

//         <div className="p-3.5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-7 lg:gap-8 items-center">
//           {/* Left Column */}
//           <div className="lg:col-span-7 flex flex-col items-start gap-2 sm:gap-5 pr-8 sm:pr-10 lg:pr-0">
//             {badgeText && (
//               <span className="inline-block bg-[#fdc41f] text-[#1a1450] rounded-full px-2.5 py-0.5 sm:px-4 sm:py-1.5 text-[10px] sm:text-sm font-black tracking-wide uppercase">
//                 {badgeText}
//               </span>
//             )}

//             <Link
//               href={primaryCtaHref}
//               onClick={closeModal}
//               className="flex flex-col leading-none group"
//             >
//               <span className="text-2xl sm:text-6xl lg:text-[68px] font-black text-[#fdc41f] tracking-tight group-hover:brightness-105 transition">
//                 {headlineTop}
//               </span>
//               <span className="text-xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.05] tracking-tight">
//                 {headlineMiddle}
//               </span>
//               <span className="text-lg sm:text-4xl lg:text-[44px] font-black text-[#fdc41f] leading-[1.1] tracking-tight">
//                 {headlineBottom}
//               </span>
//             </Link>

//             {tagline && (
//               <p className="text-xs sm:text-2xl font-semibold text-white/95">
//                 {tagline}
//               </p>
//             )}

//             {/* Gold Date & Venue Card */}
//             <div className="w-full sm:w-auto max-w-full bg-[#fdc41f] text-[#1a1450] rounded-[12px] sm:rounded-[18px] px-3 py-2 sm:px-5 sm:py-4 flex flex-col gap-0.5 sm:gap-1 shadow-md">
//               <div className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4 gap-y-0.5">
//                 <span className="text-lg sm:text-4xl lg:text-[44px] font-black leading-none tracking-wider">
//                   {dateText}
//                 </span>
//                 <span className="text-xs sm:text-xl font-black uppercase tracking-wide">
//                   {monthYearText}
//                 </span>
//               </div>
//               <p className="text-[11px] sm:text-base font-extrabold leading-snug">
//                 {venueText}
//               </p>
//             </div>

//             {/* Primary & Secondary Action Buttons */}
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1">
//               <Link
//                 href={primaryCtaHref}
//                 onClick={closeModal}
//                 className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[52px] px-3.5 sm:px-7 rounded-[10px] sm:rounded-[12px] bg-[#fdc41f] text-[#1a1450] text-xs sm:text-lg font-black hover:brightness-95 transition"
//               >
//                 {primaryCtaLabel}
//               </Link>

//               <a
//                 href={secondaryCtaHref}
//                 onClick={closeModal}
//                 className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[52px] px-3.5 sm:px-6 rounded-[10px] sm:rounded-[12px] border-2 border-white text-white text-xs sm:text-lg font-extrabold hover:bg-white/10 transition"
//               >
//                 {secondaryCtaLabel}
//               </a>
//             </div>

//             {/* Quick Links Row */}
//             <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-[11px] sm:text-base font-bold">
//               <a
//                 href={directionsHref}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#fdc41f] hover:underline inline-flex items-center py-0.5"
//               >
//                 Get directions →
//               </a>
//               <Link
//                 href={treatHref}
//                 onClick={closeModal}
//                 className="text-white hover:underline inline-flex items-center py-0.5"
//               >
//                 See what we treat ↓
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: Consultant Card (Compact horizontal strip on mobile, full card on sm+) */}
//           {consultant && (
//             <div className="lg:col-span-5 flex justify-center lg:justify-end">
//               <div className="w-full sm:max-w-[360px] bg-white text-[#1a1450] rounded-[14px] sm:rounded-[22px] p-2.5 sm:p-4 flex flex-row sm:flex-col items-center sm:items-stretch gap-2.5 sm:gap-3 shadow-xl">
//                 <div className="relative w-16 h-16 sm:w-full sm:h-auto sm:aspect-[4/3] shrink-0 rounded-[10px] sm:rounded-[14px] overflow-hidden bg-gray-100">
//                   <img
//                     src={consultant.imageSrc}
//                     alt={consultant.imageAlt}
//                     className="w-full h-full object-cover object-top block"
//                   />
//                 </div>

//                 <div className="flex-1 min-w-0 flex flex-col gap-0.5 sm:px-1">
//                   <span className="text-[9px] sm:text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase truncate">
//                     {consultant.label}
//                   </span>
//                   <h3 className="text-sm sm:text-2xl font-black text-[#1a1450] leading-tight truncate sm:whitespace-normal">
//                     {consultant.name}
//                   </h3>
//                   <p className="text-[10px] sm:text-sm font-extrabold text-[#261f90]">
//                     {consultant.credentials}
//                   </p>
//                   <p className="text-[10px] sm:text-sm font-semibold text-[#1a1450] leading-snug sm:mt-0.5 line-clamp-1 sm:line-clamp-none">
//                     {consultant.role}
//                   </p>
//                   <p className="hidden sm:block text-xs font-medium text-[#4a4680] leading-relaxed mt-1">
//                     {consultant.specialties}
//                   </p>
//                 </div>

//                 {consultant.partnerLogoSrc && (
//                   <div className="hidden sm:flex border-t border-[#e4e2f3] pt-2.5 px-1 items-center justify-between gap-2">
//                     <span className="text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase">
//                       {consultant.partnerLabel}
//                     </span>
//                     <img
//                       src={consultant.partnerLogoSrc}
//                       alt={consultant.partnerLogoAlt}
//                       className="h-7 w-auto object-contain block"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { X } from "lucide-react";

// export default function PromoAdModal({
//   adKey = "orthopaedic-outreach-nov-2026",
//   showOnMount = true,
//   delayMs = 400,
//   scrollThresholdVh = 100,
//   badgeText = "3 DAYS · FREE SPECIALIST CARE",
//   headlineTop = "FREE",
//   headlineMiddle = "ORTHOPAEDIC",
//   headlineBottom = "HEALTH OUTREACH",
//   tagline = "Move Better. Live Better.",
//   dateText = "26 · 27 · 28",
//   monthYearText = "NOVEMBER 2026",
//   venueText = "Gracespring Hospitals, Ajayi Apata Estate, Sangotedo",
//   primaryCtaLabel = "Register now →",
//   primaryCtaHref = "/programs-and-services/orthopaedic-outreach",
//   secondaryCtaLabel = "Call to book",
//   secondaryCtaHref = "tel:+2347056482776",
//   directionsHref =
//     "https://www.google.com/maps/search/?api=1&query=Gracespring%20Hospitals%20Ajayi%20Apata%20Estate%20Sangotedo%20Lagos",
//   treatHref = "/programs-and-services/orthopaedic-outreach#treating",
//   consultant = {
//     label: "MEET OUR LEAD CONSULTANT",
//     name: "Dr Thompson Akpokonyan",
//     credentials: "MBBS, FWACS, HSE",
//     role: "Consultant Orthopaedic Surgeon & Traumatologist",
//     specialties:
//       "Arthroplasty · Arthroscopy · Spine Surgery · Hip & Knee Replacement",
//     imageSrc: "/assets/orthopaedic/lead-consultant.png",
//     imageAlt: "Dr Thompson Akpokonyan, lead consultant",
//     partnerLabel: "IN COLLABORATION WITH",
//     partnerLogoSrc: "/assets/orthopaedic/najoda-foundation.png",
//     partnerLogoAlt: "Najoda Foundation",
//   },
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (!showOnMount || typeof window === "undefined") return;

//     // sessionStorage clears when the tab/browser is closed and reopened,
//     // while keeping it dismissed during in-app route navigation.
//     const storageKey = `gsh_ad_seen_${adKey}`;
//     if (window.sessionStorage.getItem(storageKey)) return;

//     let triggered = false;
//     let timer = null;

//     const triggerModal = () => {
//       if (triggered) return;
//       triggered = true;
//       window.sessionStorage.setItem(storageKey, "1");
//       if (timer) window.clearTimeout(timer);
//       window.removeEventListener("scroll", handleScroll);
//       setIsOpen(true);
//     };

//     const handleScroll = () => {
//       const thresholdPx = (window.innerHeight * Number(scrollThresholdVh || 0)) / 100;
//       if (window.scrollY >= thresholdPx) {
//         triggerModal();
//       }
//     };

//     if (delayMs >= 0) {
//       timer = window.setTimeout(triggerModal, delayMs);
//     }

//     if (scrollThresholdVh > 0) {
//       window.addEventListener("scroll", handleScroll, { passive: true });
//       handleScroll();
//     }

//     return () => {
//       if (timer) window.clearTimeout(timer);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [adKey, showOnMount, delayMs, scrollThresholdVh]);

//   useEffect(() => {
//     if (!isOpen) return;

//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const closeModal = () => setIsOpen(false);

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-label={`${headlineTop} ${headlineMiddle} ${headlineBottom}`}
//       className="fixed inset-0 z-[1100] overflow-y-auto flex items-center justify-center p-2.5 sm:p-6"
//     >
//       {/* Backdrop */}
//       <button
//         type="button"
//         aria-label="Close announcement modal"
//         onClick={closeModal}
//         className="fixed inset-0 w-full h-full bg-[#0e0a38]/75 backdrop-blur-[2px] border-0 cursor-pointer"
//       />

//       {/* Modal Card matching design */}
//       <div className="relative z-10 w-full max-w-[380px] sm:max-w-[680px] lg:max-w-[1060px] rounded-[18px] sm:rounded-[28px] bg-[#261f90] text-white shadow-2xl overflow-hidden border border-white/15 my-auto">
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={closeModal}
//           aria-label="Close modal"
//           className="absolute right-2.5 top-2.5 sm:right-5 sm:top-5 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
//         >
//           <X className="w-4 h-4 sm:w-6 sm:h-6" />
//         </button>

//         <div className="p-3.5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-7 lg:gap-8 items-center">
//           {/* Left Column */}
//           <div className="lg:col-span-7 flex flex-col items-start gap-2 sm:gap-5 pr-8 sm:pr-10 lg:pr-0">
//             {badgeText && (
//               <span className="inline-block bg-[#fdc41f] text-[#1a1450] rounded-full px-2.5 py-0.5 sm:px-4 sm:py-1.5 text-[10px] sm:text-sm font-black tracking-wide uppercase">
//                 {badgeText}
//               </span>
//             )}

//             <Link
//               href={primaryCtaHref}
//               onClick={closeModal}
//               className="flex flex-col leading-none group"
//             >
//               <span className="text-2xl sm:text-6xl lg:text-[68px] font-black text-[#fdc41f] tracking-tight group-hover:brightness-105 transition">
//                 {headlineTop}
//               </span>
//               <span className="text-xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.05] tracking-tight">
//                 {headlineMiddle}
//               </span>
//               <span className="text-lg sm:text-4xl lg:text-[44px] font-black text-[#fdc41f] leading-[1.1] tracking-tight">
//                 {headlineBottom}
//               </span>
//             </Link>

//             {tagline && (
//               <p className="text-xs sm:text-2xl font-semibold text-white/95">
//                 {tagline}
//               </p>
//             )}

//             {/* Gold Date & Venue Card */}
//             <div className="w-full sm:w-auto max-w-full bg-[#fdc41f] text-[#1a1450] rounded-[12px] sm:rounded-[18px] px-3 py-2 sm:px-5 sm:py-4 flex flex-col gap-0.5 sm:gap-1 shadow-md">
//               <div className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4 gap-y-0.5">
//                 <span className="text-lg sm:text-4xl lg:text-[44px] font-black leading-none tracking-wider">
//                   {dateText}
//                 </span>
//                 <span className="text-xs sm:text-xl font-black uppercase tracking-wide">
//                   {monthYearText}
//                 </span>
//               </div>
//               <p className="text-[11px] sm:text-base font-extrabold leading-snug">
//                 {venueText}
//               </p>
//             </div>

//             {/* Primary & Secondary Action Buttons */}
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1">
//               <Link
//                 href={primaryCtaHref}
//                 onClick={closeModal}
//                 className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[52px] px-3.5 sm:px-7 rounded-[10px] sm:rounded-[12px] bg-[#fdc41f] text-[#1a1450] text-xs sm:text-lg font-black hover:brightness-95 transition"
//               >
//                 {primaryCtaLabel}
//               </Link>

//               <a
//                 href={secondaryCtaHref}
//                 onClick={closeModal}
//                 className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[52px] px-3.5 sm:px-6 rounded-[10px] sm:rounded-[12px] border-2 border-white text-white text-xs sm:text-lg font-extrabold hover:bg-white/10 transition"
//               >
//                 {secondaryCtaLabel}
//               </a>
//             </div>

//             {/* Quick Links Row */}
//             <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-[11px] sm:text-base font-bold">
//               <a
//                 href={directionsHref}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#fdc41f] hover:underline inline-flex items-center py-0.5"
//               >
//                 Get directions →
//               </a>
//               <Link
//                 href={treatHref}
//                 onClick={closeModal}
//                 className="text-white hover:underline inline-flex items-center py-0.5"
//               >
//                 See what we treat ↓
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: Consultant Card (Compact horizontal strip on mobile, full card on sm+) */}
//           {consultant && (
//             <div className="lg:col-span-5 flex justify-center lg:justify-end">
//               <div className="w-full sm:max-w-[360px] bg-white text-[#1a1450] rounded-[14px] sm:rounded-[22px] p-2.5 sm:p-4 flex flex-row sm:flex-col items-center sm:items-stretch gap-2.5 sm:gap-3 shadow-xl">
//                 <div className="relative w-16 h-16 sm:w-full sm:h-auto sm:aspect-[4/3] shrink-0 rounded-[10px] sm:rounded-[14px] overflow-hidden bg-gray-100">
//                   <img
//                     src={consultant.imageSrc}
//                     alt={consultant.imageAlt}
//                     className="w-full h-full object-cover object-top block"
//                   />
//                 </div>

//                 <div className="flex-1 min-w-0 flex flex-col gap-0.5 sm:px-1">
//                   <span className="text-[9px] sm:text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase truncate">
//                     {consultant.label}
//                   </span>
//                   <h3 className="text-sm sm:text-2xl font-black text-[#1a1450] leading-tight truncate sm:whitespace-normal">
//                     {consultant.name}
//                   </h3>
//                   <p className="text-[10px] sm:text-sm font-extrabold text-[#261f90]">
//                     {consultant.credentials}
//                   </p>
//                   <p className="text-[10px] sm:text-sm font-semibold text-[#1a1450] leading-snug sm:mt-0.5 line-clamp-1 sm:line-clamp-none">
//                     {consultant.role}
//                   </p>
//                   <p className="hidden sm:block text-xs font-medium text-[#4a4680] leading-relaxed mt-1">
//                     {consultant.specialties}
//                   </p>
//                 </div>

//                 {consultant.partnerLogoSrc && (
//                   <div className="hidden sm:flex border-t border-[#e4e2f3] pt-2.5 px-1 items-center justify-between gap-2">
//                     <span className="text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase">
//                       {consultant.partnerLabel}
//                     </span>
//                     <img
//                       src={consultant.partnerLogoSrc}
//                       alt={consultant.partnerLogoAlt}
//                       className="h-7 w-auto object-contain block"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { X } from "lucide-react";

// export default function PromoAdModal({
//   adKey = "orthopaedic-outreach-nov-2026",
//   showOnMount = true,
//   delayMs = 400,
//   badgeText = "3 DAYS · FREE SPECIALIST CARE",
//   headlineTop = "FREE",
//   headlineMiddle = "ORTHOPAEDIC",
//   headlineBottom = "HEALTH OUTREACH",
//   tagline = "Move Better. Live Better.",
//   dateText = "26 · 27 · 28",
//   monthYearText = "NOVEMBER 2026",
//   venueText = "Gracespring Hospitals, Ajayi Apata Estate, Sangotedo",
//   primaryCtaLabel = "Register now →",
//   primaryCtaHref = "/programs-and-services/orthopaedic-outreach",
//   secondaryCtaLabel = "Call to book",
//   secondaryCtaHref = "tel:+2347056482776",
//   directionsHref =
//     "https://www.google.com/maps/search/?api=1&query=Gracespring%20Hospitals%20Ajayi%20Apata%20Estate%20Sangotedo%20Lagos",
//   treatHref = "/programs-and-services/orthopaedic-outreach#treating",
//   consultant = {
//     label: "MEET OUR LEAD CONSULTANT",
//     name: "Dr Thompson Akpokonyan",
//     credentials: "MBBS, FWACS, HSE",
//     role: "Consultant Orthopaedic Surgeon & Traumatologist",
//     specialties:
//       "Arthroplasty · Arthroscopy · Spine Surgery · Hip & Knee Replacement",
//     imageSrc: "/assets/orthopaedic/lead-consultant.png",
//     imageAlt: "Dr Thompson Akpokonyan, lead consultant",
//     partnerLabel: "IN COLLABORATION WITH",
//     partnerLogoSrc: "/assets/orthopaedic/najoda-foundation.png",
//     partnerLogoAlt: "Najoda Foundation",
//   },
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (!showOnMount || typeof window === "undefined") return;

//     // sessionStorage clears when the tab/browser is closed and reopened,
//     // while keeping it dismissed during in-app route navigation.
//     const storageKey = `gsh_ad_seen_${adKey}`;
//     const alreadyShownThisSession = window.sessionStorage.getItem(storageKey);

//     if (alreadyShownThisSession) return;

//     const timer = window.setTimeout(() => {
//       window.sessionStorage.setItem(storageKey, "1");
//       setIsOpen(true);
//     }, delayMs);

//     return () => window.clearTimeout(timer);
//   }, [adKey, showOnMount, delayMs]);

//   useEffect(() => {
//     if (!isOpen) return;

//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const closeModal = () => setIsOpen(false);

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-label={`${headlineTop} ${headlineMiddle} ${headlineBottom}`}
//       className="fixed inset-0 z-[1100] overflow-y-auto flex items-center justify-center p-2.5 sm:p-6"
//     >
//       {/* Backdrop */}
//       <button
//         type="button"
//         aria-label="Close announcement modal"
//         onClick={closeModal}
//         className="fixed inset-0 w-full h-full bg-[#0e0a38]/75 backdrop-blur-[2px] border-0 cursor-pointer"
//       />

//       {/* Modal Card matching design */}
//       <div className="relative z-10 w-full max-w-[380px] sm:max-w-[680px] lg:max-w-[1060px] rounded-[18px] sm:rounded-[28px] bg-[#261f90] text-white shadow-2xl overflow-hidden border border-white/15 my-auto">
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={closeModal}
//           aria-label="Close modal"
//           className="absolute right-2.5 top-2.5 sm:right-5 sm:top-5 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
//         >
//           <X className="w-4 h-4 sm:w-6 sm:h-6" />
//         </button>

//         <div className="p-3.5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-7 lg:gap-8 items-center">
//           {/* Left Column */}
//           <div className="lg:col-span-7 flex flex-col items-start gap-2 sm:gap-5 pr-8 sm:pr-10 lg:pr-0">
//             {badgeText && (
//               <span className="inline-block bg-[#fdc41f] text-[#1a1450] rounded-full px-2.5 py-0.5 sm:px-4 sm:py-1.5 text-[10px] sm:text-sm font-black tracking-wide uppercase">
//                 {badgeText}
//               </span>
//             )}

//             <Link
//               href={primaryCtaHref}
//               onClick={closeModal}
//               className="flex flex-col leading-none group"
//             >
//               <span className="text-2xl sm:text-6xl lg:text-[68px] font-black text-[#fdc41f] tracking-tight group-hover:brightness-105 transition">
//                 {headlineTop}
//               </span>
//               <span className="text-xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.05] tracking-tight">
//                 {headlineMiddle}
//               </span>
//               <span className="text-lg sm:text-4xl lg:text-[44px] font-black text-[#fdc41f] leading-[1.1] tracking-tight">
//                 {headlineBottom}
//               </span>
//             </Link>

//             {tagline && (
//               <p className="text-xs sm:text-2xl font-semibold text-white/95">
//                 {tagline}
//               </p>
//             )}

//             {/* Gold Date & Venue Card */}
//             <div className="w-full sm:w-auto max-w-full bg-[#fdc41f] text-[#1a1450] rounded-[12px] sm:rounded-[18px] px-3 py-2 sm:px-5 sm:py-4 flex flex-col gap-0.5 sm:gap-1 shadow-md">
//               <div className="flex flex-wrap items-baseline gap-x-2.5 sm:gap-x-4 gap-y-0.5">
//                 <span className="text-lg sm:text-4xl lg:text-[44px] font-black leading-none tracking-wider">
//                   {dateText}
//                 </span>
//                 <span className="text-xs sm:text-xl font-black uppercase tracking-wide">
//                   {monthYearText}
//                 </span>
//               </div>
//               <p className="text-[11px] sm:text-base font-extrabold leading-snug">
//                 {venueText}
//               </p>
//             </div>

//             {/* Primary & Secondary Action Buttons */}
//             <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1">
//               <Link
//                 href={primaryCtaHref}
//                 onClick={closeModal}
//                 className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[52px] px-3.5 sm:px-7 rounded-[10px] sm:rounded-[12px] bg-[#fdc41f] text-[#1a1450] text-xs sm:text-lg font-black hover:brightness-95 transition"
//               >
//                 {primaryCtaLabel}
//               </Link>

//               <a
//                 href={secondaryCtaHref}
//                 onClick={closeModal}
//                 className="inline-flex items-center justify-center min-h-[36px] sm:min-h-[52px] px-3.5 sm:px-6 rounded-[10px] sm:rounded-[12px] border-2 border-white text-white text-xs sm:text-lg font-extrabold hover:bg-white/10 transition"
//               >
//                 {secondaryCtaLabel}
//               </a>
//             </div>

//             {/* Quick Links Row */}
//             <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-[11px] sm:text-base font-bold">
//               <a
//                 href={directionsHref}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#fdc41f] hover:underline inline-flex items-center py-0.5"
//               >
//                 Get directions →
//               </a>
//               <Link
//                 href={treatHref}
//                 onClick={closeModal}
//                 className="text-white hover:underline inline-flex items-center py-0.5"
//               >
//                 See what we treat ↓
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: Consultant Card (Compact horizontal strip on mobile, full card on sm+) */}
//           {consultant && (
//             <div className="lg:col-span-5 flex justify-center lg:justify-end">
//               <div className="w-full sm:max-w-[360px] bg-white text-[#1a1450] rounded-[14px] sm:rounded-[22px] p-2.5 sm:p-4 flex flex-row sm:flex-col items-center sm:items-stretch gap-2.5 sm:gap-3 shadow-xl">
//                 <div className="relative w-16 h-16 sm:w-full sm:h-auto sm:aspect-[4/3] shrink-0 rounded-[10px] sm:rounded-[14px] overflow-hidden bg-gray-100">
//                   <img
//                     src={consultant.imageSrc}
//                     alt={consultant.imageAlt}
//                     className="w-full h-full object-cover object-top block"
//                   />
//                 </div>

//                 <div className="flex-1 min-w-0 flex flex-col gap-0.5 sm:px-1">
//                   <span className="text-[9px] sm:text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase truncate">
//                     {consultant.label}
//                   </span>
//                   <h3 className="text-sm sm:text-2xl font-black text-[#1a1450] leading-tight truncate sm:whitespace-normal">
//                     {consultant.name}
//                   </h3>
//                   <p className="text-[10px] sm:text-sm font-extrabold text-[#261f90]">
//                     {consultant.credentials}
//                   </p>
//                   <p className="text-[10px] sm:text-sm font-semibold text-[#1a1450] leading-snug sm:mt-0.5 line-clamp-1 sm:line-clamp-none">
//                     {consultant.role}
//                   </p>
//                   <p className="hidden sm:block text-xs font-medium text-[#4a4680] leading-relaxed mt-1">
//                     {consultant.specialties}
//                   </p>
//                 </div>

//                 {consultant.partnerLogoSrc && (
//                   <div className="hidden sm:flex border-t border-[#e4e2f3] pt-2.5 px-1 items-center justify-between gap-2">
//                     <span className="text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase">
//                       {consultant.partnerLabel}
//                     </span>
//                     <img
//                       src={consultant.partnerLogoSrc}
//                       alt={consultant.partnerLogoAlt}
//                       className="h-7 w-auto object-contain block"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { X } from "lucide-react";

// export default function PromoAdModal({
//   adKey = "orthopaedic-outreach-nov-2026",
//   showOnMount = true,
//   delayMs = 400,
//   badgeText = "3 DAYS · FREE SPECIALIST CARE",
//   headlineTop = "FREE",
//   headlineMiddle = "ORTHOPAEDIC",
//   headlineBottom = "HEALTH OUTREACH",
//   tagline = "Move Better. Live Better.",
//   dateText = "26 · 27 · 28",
//   monthYearText = "NOVEMBER 2026",
//   venueText = "Gracespring Hospitals, Ajayi Apata Estate, Sangotedo",
//   primaryCtaLabel = "Register now →",
//   primaryCtaHref = "/programs-and-services/orthopaedic-outreach",
//   secondaryCtaLabel = "Call to book",
//   secondaryCtaHref = "tel:+2347056482776",
//   directionsHref =
//     "https://www.google.com/maps/search/?api=1&query=Gracespring%20Hospitals%20Ajayi%20Apata%20Estate%20Sangotedo%20Lagos",
//   treatHref = "/programs-and-services/orthopaedic-outreach#treating",
//   consultant = {
//     label: "MEET OUR LEAD CONSULTANT",
//     name: "Dr Thompson Akpokonyan",
//     credentials: "MBBS, FWACS, HSE",
//     role: "Consultant Orthopaedic Surgeon & Traumatologist",
//     specialties:
//       "Arthroplasty · Arthroscopy · Spine Surgery · Hip & Knee Replacement",
//     imageSrc: "/assets/orthopaedic/lead-consultant.png",
//     imageAlt: "Dr Thompson Akpokonyan, lead consultant",
//     partnerLabel: "IN COLLABORATION WITH",
//     partnerLogoSrc: "/assets/orthopaedic/najoda-foundation.png",
//     partnerLogoAlt: "Najoda Foundation",
//   },
// }) {
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (!showOnMount || typeof window === "undefined") return;

//     // sessionStorage clears when the tab/browser is closed and reopened,
//     // while keeping it dismissed during in-app route navigation.
//     const storageKey = `gsh_ad_seen_${adKey}`;
//     const alreadyShownThisSession = window.sessionStorage.getItem(storageKey);

//     if (alreadyShownThisSession) return;

//     const timer = window.setTimeout(() => {
//       window.sessionStorage.setItem(storageKey, "1");
//       setIsOpen(true);
//     }, delayMs);

//     return () => window.clearTimeout(timer);
//   }, [adKey, showOnMount, delayMs]);

//   useEffect(() => {
//     if (!isOpen) return;

//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") {
//         setIsOpen(false);
//       }
//     };

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const closeModal = () => setIsOpen(false);

//   return (
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-label={`${headlineTop} ${headlineMiddle} ${headlineBottom}`}
//       className="fixed inset-0 z-[1100] overflow-y-auto flex items-center justify-center p-3 sm:p-6"
//     >
//       {/* Backdrop */}
//       <button
//         type="button"
//         aria-label="Close announcement modal"
//         onClick={closeModal}
//         className="fixed inset-0 w-full h-full bg-[#0e0a38]/75 backdrop-blur-[2px] border-0 cursor-pointer"
//       />

//       {/* Modal Card matching design */}
//       <a href="/programs-and-services/orthopaedic-outreach">
//       <div className="relative z-10 w-full max-w-[1060px] rounded-[24px] sm:rounded-[28px] bg-[#261f90] text-white shadow-2xl overflow-hidden border border-white/15 my-auto">
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={closeModal}
//           aria-label="Close modal"
//           className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
//         >
//           <X className="w-5 h-5 sm:w-6 sm:h-6" />
//         </button>

//         <div className="p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-center">
//           {/* Left Column */}
//           <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-5 pr-2 lg:pr-0">
//             {badgeText && (
//               <span className="inline-block bg-[#fdc41f] text-[#1a1450] rounded-full px-4 py-1.5 text-xs sm:text-sm font-black tracking-wide uppercase">
//                 {badgeText}
//               </span>
//             )}

//             <div className="flex flex-col leading-none">
//               <span className="text-4xl sm:text-6xl lg:text-[68px] font-black text-[#fdc41f] tracking-tight">
//                 {headlineTop}
//               </span>
//               <span className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.05] tracking-tight">
//                 {headlineMiddle}
//               </span>
//               <span className="text-2xl sm:text-4xl lg:text-[44px] font-black text-[#fdc41f] leading-[1.1] tracking-tight">
//                 {headlineBottom}
//               </span>
//             </div>

//             {tagline && (
//               <p className="text-lg sm:text-2xl font-semibold text-white/95">
//                 {tagline}
//               </p>
//             )}

//             {/* Gold Date & Venue Card */}
//             <div className="w-full sm:w-auto max-w-full bg-[#fdc41f] text-[#1a1450] rounded-[18px] px-5 py-4 flex flex-col gap-1 shadow-md">
//               <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
//                 <span className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-none tracking-wider">
//                   {dateText}
//                 </span>
//                 <span className="text-base sm:text-xl font-black uppercase tracking-wide">
//                   {monthYearText}
//                 </span>
//               </div>
//               <p className="text-sm sm:text-base font-extrabold leading-snug">
//                 {venueText}
//               </p>
//             </div>

//             {/* Primary & Secondary Action Buttons */}
//             <div className="flex flex-wrap items-center gap-3 pt-1">
//               <Link
//                 href={primaryCtaHref}
//                 onClick={closeModal}
//                 className="inline-flex items-center justify-center min-h-[48px] sm:min-h-[52px] px-6 sm:px-7 rounded-[12px] bg-[#fdc41f] text-[#1a1450] text-base sm:text-lg font-black hover:brightness-95 transition"
//               >
//                 {primaryCtaLabel}
//               </Link>

//               <a
//                 href={secondaryCtaHref}
//                 onClick={closeModal}
//                 className="inline-flex items-center justify-center min-h-[48px] sm:min-h-[52px] px-6 rounded-[12px] border-2 border-white text-white text-base sm:text-lg font-extrabold hover:bg-white/10 transition"
//               >
//                 {secondaryCtaLabel}
//               </a>
//             </div>

//             {/* Quick Links Row */}
//             <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm sm:text-base font-bold">
//               <a
//                 href={directionsHref}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-[#fdc41f] hover:underline inline-flex items-center py-1"
//               >
//                 Get directions →
//               </a>
//               <Link
//                 href={treatHref}
//                 onClick={closeModal}
//                 className="text-white hover:underline inline-flex items-center py-1"
//               >
//                 See what we treat ↓
//               </Link>
//             </div>
//           </div>

//           {/* Right Column: Consultant Card */}
//           {consultant && (
//             <div className="lg:col-span-5 flex justify-center lg:justify-end">
//               <div className="w-full max-w-[360px] bg-white text-[#1a1450] rounded-[22px] p-4 flex flex-col gap-3 shadow-xl">
//                 <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden bg-gray-100">
//                   <img
//                     src={consultant.imageSrc}
//                     alt={consultant.imageAlt}
//                     className="w-full h-full object-cover object-top block"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-0.5 px-1">
//                   <span className="text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase">
//                     {consultant.label}
//                   </span>
//                   <h3 className="text-xl sm:text-2xl font-black text-[#1a1450] leading-tight">
//                     {consultant.name}
//                   </h3>
//                   <p className="text-xs sm:text-sm font-extrabold text-[#261f90]">
//                     {consultant.credentials}
//                   </p>
//                   <p className="text-xs sm:text-sm font-semibold text-[#1a1450] leading-snug mt-0.5">
//                     {consultant.role}
//                   </p>
//                   <p className="text-[11px] sm:text-xs font-medium text-[#4a4680] leading-relaxed mt-1">
//                     {consultant.specialties}
//                   </p>
//                 </div>

//                 {consultant.partnerLogoSrc && (
//                   <div className="border-t border-[#e4e2f3] pt-2.5 px-1 flex items-center justify-between gap-2">
//                     <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#261f90] uppercase">
//                       {consultant.partnerLabel}
//                     </span>
//                     <img
//                       src={consultant.partnerLogoSrc}
//                       alt={consultant.partnerLogoAlt}
//                       className="h-7 w-auto object-contain block"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       </a>
//     </div>
//   );
// }