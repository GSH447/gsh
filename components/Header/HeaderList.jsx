// "use client";

// import { usePathname } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import MobileNav from "./MobileNav";
// import TopBar from "./TopBar"; // Import the top bar
// import Link from "next/link";
// import { cn } from "../../lib/utils";
// import { links } from "../SiteMaps";
// import { ChevronDown } from "lucide-react";
// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [hovering, setHovering] = useState(null);
//   const subRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (typeof window !== "undefined") {
//         // Triggers sticky visual behavior past the TopBar height
//         setIsScrolled(window.scrollY >= 40);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   function handleMouseEnter(index) {
//     if (links[index].subLinks) {
//       setHovering(index);
//     } else {
//       setHovering(null);
//     }
//   }

//   return (
//     <>
//       {/* 1. Standard non-sticky layout top section */}
//       <TopBar />

//       {/* 2. Sticky navigation layer underneath */}
//       <header
//         className={cn(
//           "sticky top-0 z-50 w-full transition-all duration-300 flex items-center justify-between py-2 min-h-16 h-auto",
//           pathname === "/"
//             ? isScrolled
//               ? "bg-[#2A157c] shadow-md px-4 sm:px-6 xl:px-12 2xl:px-16"
//               : "bg-transparent px-4 sm:px-6 xl:px-12 2xl:px-16"
//             : "bg-[#2A157c] shadow-md px-4 sm:px-6 xl:px-12 2xl:px-16"
//         )}
//       >
//         {/* BRANDING / LOGO CONTAINER */}
//         <div className="flex-shrink-0 z-50">
//           <Link href="/">
//             <Image
//               src="/assets/logo/siteLogo-nobg.png"
//               width={180}
//               height={60}
//               alt="Gracespring Hospitals"
//               className="w-32 sm:w-40 xl:w-48 h-auto object-contain"
//               priority
//             />
//           </Link>
//         </div>

//         {/* DESKTOP & TELEVISION MAIN INNER WRAPPER */}
//         <div className="hidden xl:flex flex-1 items-center justify-between ml-8 max-w-[1600px] 3xl:max-w-[2200px]">
          
//           {/* DESKTOP NAVIGATION LINKS */}
//           <nav
//             className="flex items-center gap-1 2xl:gap-3 position-relative"
//             onMouseLeave={() => {
//               if (!subRef.current) setHovering(null);
//             }}
//           >
//             {links.map((link, index) => (
//               <div
//                 key={link.label}
//                 className="relative group"
//                 onMouseEnter={() => handleMouseEnter(index)}
//               >
//                 <Link
//                   href={link.href || "#"}
//                   className={cn(
//                     "flex items-center gap-x-1 transition-all px-3 py-2 rounded-md text-sm 2xl:text-base font-medium whitespace-nowrap text-white/90 hover:text-white hover:bg-white/10",
//                     pathname === link.href && "font-bold text-white bg-white/5",
//                     hovering === index && "bg-white/10"
//                   )}
//                 >
//                   {link.label}
//                   {link.subLinks && (
//                     <ChevronDown
//                       className={cn(
//                         "w-4 h-4 transition-transform duration-200",
//                         hovering === index && "rotate-180"
//                       )}
//                     />
//                   )}
//                 </Link>
//               </div>
//             ))}

//             {/* DESKTOP MEGA DROPDOWN MENU */}
//             <div
//               ref={subRef}
//               className={cn(
//                 "absolute top-[4.5rem] left-1/2 -translate-x-1/2 p-6 w-[90vw] max-w-[1400px] bg-[#EDEDF7] shadow-2xl rounded-xl z-50 transition-all duration-200 grid grid-cols-4 gap-8",
//                 hovering !== null
//                   ? "opacity-100 pointer-events-auto scale-100"
//                   : "opacity-0 pointer-events-none scale-95"
//               )}
//               onMouseLeave={() => setHovering(null)}
//             >
//               {hovering !== null && links[hovering].navImage && (
//                 <div className="flex flex-col h-full">
//                   <div className="relative group overflow-hidden rounded-lg w-full aspect-[4/3]">
//                     <Image
//                       src={links[hovering].navImage}
//                       alt={links[hovering].label}
//                       fill
//                       priority
//                       className="object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   </div>
//                   {links[hovering].caption && (
//                     <p className="mt-2 text-xs font-medium text-gray-500 text-left">
//                       {links[hovering].caption}
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Sub-Links Loops */}
//               {hovering !== null &&
//                 links[hovering].subLinks?.map((subLink, idx) => (
//                   <div key={idx} className="flex flex-col space-y-3">
//                     {subLink.header && (
//                       <>
//                         <Link
//                           className="text-sm font-bold tracking-tight text-[#2A157C] hover:text-[#5CB338] transition-colors"
//                           href={subLink.href || "#"}
//                         >
//                           {subLink.header}
//                         </Link>

//                         {subLink.navImage?.[0]?.src && (
//                           <div className="relative w-full h-24 rounded-md overflow-hidden bg-gray-100">
//                             <Image
//                               src={subLink.navImage[0].src}
//                               alt={subLink.header}
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                         )}

//                         {subLink.subMenu && (
//                           <nav className="flex flex-col space-y-1.5">
//                             {subLink.subMenu.map((menuItem) => (
//                               <Link
//                                 key={menuItem.label}
//                                 href={menuItem.href}
//                                 className="text-xs text-gray-600 hover:text-[#5CB338] transition-colors font-medium"
//                               >
//                                 {menuItem.label}
//                               </Link>
//                             ))}
//                           </nav>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </nav>

//           {/* TOP LEVEL ACTION BUTTONS */}
//           <div className="flex flex-row items-center gap-2 2xl:gap-4 pl-4">
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-[#5CB338] hover:bg-[#4a912d] text-white font-bold text-xs 2xl:text-sm py-2 px-4 2xl:px-5 rounded-full shadow-md transition-colors whitespace-nowrap"
//             >
//               <Link href="/book-an-appointment">Book an Appointment</Link>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-[#6F92E7] hover:bg-[#5a7bc9] text-white font-bold text-xs 2xl:text-sm py-2 px-4 2xl:px-5 rounded-full shadow-md transition-colors whitespace-nowrap"
//             >
//               <Link href="/patient-portal">Patient Portal</Link>
//             </motion.button>

//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               className="bg-white hover:bg-gray-100 text-[#5CB338] font-extrabold text-xs 2xl:text-sm py-2 px-4 2xl:px-5 rounded-full shadow-md transition-colors whitespace-nowrap"
//             >
//               <Link href="https://foundation.gracespringhospitals.com/">Our Foundation</Link>
//             </motion.button>
//           </div>
//         </div>

//         {/* MOBILE & TABLET TRIGGER BOX */}
//         <div className="flex xl:hidden items-center gap-x-4">
//           <MobileNav />
//         </div>
//       </header>
//     </>
//   );
// }

"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { links } from "../SiteMaps";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hovering, setHovering] = useState(null);
  const subRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setIsScrolled(window.scrollY >= 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleMouseEnter(index) {
    if (links[index].subLinks) {
      setHovering(index);
    } else {
      setHovering(null);
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 flex items-center justify-between py-2 min-h-16 h-auto",
        pathname === "/"
          ? isScrolled
            ? "bg-[#2A157c] shadow-md px-4 sm:px-6 xl:px-12 2xl:px-16"
            : "bg-transparent px-4 sm:px-6 xl:px-12 2xl:px-16"
          : "bg-[#2A157c] shadow-md px-4 sm:px-6 xl:px-12 2xl:px-16"
      )}
    >
      {/* BRANDING / LOGO CONTAINER */}
      <div className="flex-shrink-0 z-50">
        <Link href="/">
          <Image
            src="/assets/logo/siteLogo-nobg.png"
            width={180}
            height={60}
            alt="Gracespring Hospitals"
            className="w-32 sm:w-40 xl:w-48 h-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* DESKTOP & TELEVISION MAIN INNER WRAPPER */}
      <div className="hidden xl:flex flex-1 items-center justify-between ml-8 max-w-[1600px] 3xl:max-w-[2200px]">
        
        {/* DESKTOP NAVIGATION LINKS */}
        <nav
          className="  flex items-center gap-1 2xl:gap-3 position-relative"
          onMouseLeave={() => {
            if (!subRef.current) setHovering(null);
          }}
        >
          {links.map((link, index) => (
            <div
              key={link.label}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <Link
                href={link.href || "#"}
                className={cn(
                  "flex items-center gap-x-1 transition-all px-3 py-2 rounded-md text-sm 2xl:text-base font-medium whitespace-nowrap text-white/90 hover:text-white hover:bg-white/10",
                  pathname === link.href && "font-bold text-white bg-white/5",
                  hovering === index && "bg-white/10"
                )}
              >
                {link.label}
                {link.subLinks && (
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      hovering === index && "rotate-180"
                    )}
                  />
                )}
              </Link>
            </div>
          ))}

          {/* DESKTOP MEGA DROPDOWN MENU */}
          <div
            ref={subRef}
            className={cn(
              " absolute top-[7rem] left-1/2 -translate-x-1/2 p-6 w-[90vw] max-w-[1400px] bg-[#EDEDF7] shadow-2xl rounded-xl z-50 transition-all duration-200 grid grid-cols-4 gap-8",
              hovering !== null
                ? "opacity-100 pointer-events-auto scale-100"
                : "opacity-0 pointer-events-none scale-95"
            )}
            onMouseLeave={() => setHovering(null)}
          >
            {hovering !== null && links[hovering].navImage && (
              <div className="flex flex-col h-full">
                <div className="relative group overflow-hidden rounded-lg w-full aspect-[4/3]">
                  <Image
                    src={links[hovering].navImage}
                    alt={links[hovering].label}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {links[hovering].caption && (
                  <p className="mt-2 text-xs font-medium text-gray-500 text-left">
                    {links[hovering].caption}
                  </p>
                )}
              </div>
            )}

            {/* Sub-Links Loops */}
            {hovering !== null &&
              links[hovering].subLinks?.map((subLink, idx) => (
                <div key={idx} className="flex flex-col space-y-3">
                  {subLink.header && (
                    <>
                      <Link
                        className="text-sm font-bold tracking-tight text-[#2A157C] hover:text-[#5CB338] transition-colors"
                        href={subLink.href || "#"}
                      >
                        {subLink.header}
                      </Link>

                      {subLink.navImage?.[0]?.src && (
                        <div className="relative w-full h-24 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={subLink.navImage[0].src}
                            alt={subLink.header}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {subLink.subMenu && (
                        <nav className="flex flex-col space-y-1.5">
                          {subLink.subMenu.map((menuItem) => (
                            <Link
                              key={menuItem.label}
                              href={menuItem.href}
                              className="text-xs text-gray-600 hover:text-[#5CB338] transition-colors font-medium"
                            >
                              {menuItem.label}
                            </Link>
                          ))}
                        </nav>
                      )}
                    </>
                  )}
                </div>
              ))}
          </div>
        </nav>

        {/* TOP LEVEL ACTION BUTTONS CONTAINER (Desktop & Ultra-wide Screen layout) */}
        <div className=" flex flex-row items-center gap-2 2xl:gap-4 pl-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#5CB338] hover:bg-[#4a912d] text-white font-bold text-xs 2xl:text-sm py-2 px-4 2xl:px-5 rounded-full shadow-md transition-colors whitespace-nowrap"
          >
            <Link href="/book-an-appointment">Book an Appointment</Link>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#6F92E7] hover:bg-[#5a7bc9] text-white font-bold text-xs 2xl:text-sm py-2 px-4 2xl:px-5 rounded-full shadow-md transition-colors whitespace-nowrap"
          >
            <Link href="/patient-portal">Patient Portal</Link>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white hover:bg-gray-100 text-[#5CB338] font-extrabold text-xs 2xl:text-sm py-2 px-4 2xl:px-5 rounded-full shadow-md transition-colors whitespace-nowrap"
          >
            <Link href="https://foundation.gracespringhospitals.com/">Gracespring Health Foundation</Link>
          </motion.button>
        </div>
      </div>

      {/* MOBILE & TABLET / MEDIUM LAPTOP TRIGGER BOX */}
      <div className="flex xl:hidden items-center gap-x-4">
        <MobileNav />
      </div>
    </header>
  );
}

// // "use client";

// // import { usePathname } from "next/navigation";
// // import React, { useEffect, useRef, useState } from "react";
// // import MobileNav from "./MobileNav";
// // import Link from "next/link";
// // // import { cn } from "../../lib/utils";
// // import { cn } from "../../lib/utils";
// // // import { links } from "../../constants/navLinks";
// // import { links } from "../SiteMaps";
// // import { ChevronDown } from "lucide-react";
// // import Image from "next/image";
// // import { motion } from "framer-motion";

// // export default function Navbar() {
// //   const pathname = usePathname();
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [hovering, setHovering] = useState(null);
// //   // const subRef = useRef() as React.MutableRefObject;
// //   const subRef = useRef(null);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (typeof window !== "undefined") {
// //         if (window.scrollY >= 20) {
// //           setIsScrolled(true);
// //         } else {
// //           setIsScrolled(false);
// //         }
// //       }
// //     };
// //     window.addEventListener("scroll", handleScroll);

// //     return () => {
// //       window.removeEventListener("scroll", handleScroll);
// //     };
// //   }, []);

// //   function handleMouseEnter(index) {
// //     if (links[index].subLinks) {
// //       setHovering(index);
// //     } else {
// //       setHovering(null);
// //     }
// //   }

// //   return (

// //     <header
// //       className={cn(
// //         "fixed top-0 z-50 w-full transition-all duration-300 flex",
// //         pathname === "/"
// //           ? (
// //               isScrolled
// //                 ? "bg-[#2A157c] shadow-md px-5"
// //                 : "bg-transparent px-3"
// //             )
// //           : "bg-[#2A157c] shadow-md px-5"
// //       )}
// //     >



// //       <div className="w-fit">
// //         <Link href="/">
// //           <Image
// //             // src={isScrolled ? "/assets/logo/siteLogo.png" : "/assets/logo/siteLogo-nobg.png"}
// //             src={"/assets/logo/siteLogo-nobg.png"}
// //             width={1000}
// //             height={1000}
// //             alt="Gracespring Hospitals"
// //             className="gshf-Logo"
// //             priority
// //             id="logo"
// //           />
// //         </Link>
// //       </div>

// //       <div className=" container flex h-14 max-w-screen-2xl items-center justify-end m-auto">
// //         {/* Mobile sidebar */}
// //         <MobileNav />

// //         <div className=" hidden md:flex items-center gap-x-10">


// //           <nav
// //             className=" flex items-center gap-3 mx-auto"
// //             onMouseLeave={() => {
// //               if (!subRef.current) {
// //                 setHovering(null);
// //               }
// //             }}
// //           >
// //             {links.map((link, index) => (
// //               <div
// //                 key={link.label}
// //                 className="block group"
// //                 onMouseEnter={() => handleMouseEnter(index)}
// //               >
// //                 <Link
// //                   href={link.href || "#"}
// //                   className={cn(
// //                     "flex items-center gap-x-0.5 transition-all px-3 py-1 rounded-md whitespace-nowrap",
// //                     isScrolled
// //                       ? "text-white hover:text-white hover:bg-white/10"
// //                       : "text-white hover:text-white hover:bg-white/10",
// //                     pathname === link.href && "font-semibold",
// //                     hovering === index && "font-semibold"
// //                   )}
// //                 >
// //                   {link.label}
// //                   {link.subLinks && (
// //                     <ChevronDown
// //                       className={cn(
// //                         "w-5 h-5 transition-all group-hover:text-accent",
// //                         hovering === index && "rotate-180"
// //                       )}
// //                     />
// //                   )}
// //                 </Link>
// //               </div>
// //             ))}

// //             <div
// //               ref={subRef}

// //               className={cn(
// //                 " absolute top-[7.6rem] left-1/2 -translate-x-1/2 p-8 w-[85%] bg-[#EDEDF7] transition-all ease-in-out mx-auto shadow-lg rounded-md z-50 min-h-[50vh]",
// //                 hovering !== null
// //                   ? "opacity-100 pointer-events-auto border-t border-b border-accent"
// //                   : "opacity-0 pointer-events-none border-none"
// //               )}

// //               onMouseLeave={() => setHovering(null)}
// //             >
// //               <div className="grid grid-cols-4 max-w-[1560px] mx-auto gap-10 py-8">
// //                 {hovering !== null && links[hovering].navImage && (
// //                   /* Main Featured Image Column */
// //                   <div className="flex flex-col items-start h-full"> 
// //                     <div className="relative group overflow-hidden rounded-lg w-full aspect-[4/5]">
// //                       <Image
// //                         src={links[hovering].navImage}
// //                         alt={links[hovering].label}
// //                         fill
// //                         priority
// //                         className="object-left transition-transform duration-500 group-hover:scale-105"
// //                       />
// //                     </div>
// //                     {links[hovering].caption && (
// //                       <p className="mt-3 text-sm font-medium text-gray-500 text-left w-full">
// //                         {links[hovering].caption}
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}

// //                 {/* Sub-Links Columns */}
// //                 {hovering !== null &&
// //                   links[hovering].subLinks?.map((subLink, index) => (
// //                     <div key={index} className="flex flex-col space-y-4">
// //                       {subLink.header && (
// //                         <div className="flex flex-col space-y-3">
// //                           <Link
// //                             className="text-base font-bold tracking-tight text-foreground hover:text-primary transition-colors"
// //                             href={subLink.href || "#"}
// //                           >
// //                             {subLink.header}
// //                           </Link>

// //                           {subLink.navImage?.[0]?.src && (
// //                             <div className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100">
// //                               <Image
// //                                 src={subLink.navImage[0].src}
// //                                 alt={subLink.header}
// //                                 fill
// //                                 className="object-cover hover:scale-105 transition-transform duration-300"
// //                               />
// //                             </div>
// //                           )}

// //                           {subLink.subMenu && (
// //                             <nav className="flex flex-col space-y-2">
// //                               {subLink.subMenu.map((menuItem) => (
// //                                 <Link
// //                                   key={menuItem.label}
// //                                   href={menuItem.href}
// //                                   className="text-sm text-muted-foreground hover:text-primary transition-colors"
// //                                 >
// //                                   {menuItem.label}
// //                                 </Link>
// //                               ))}
// //                             </nav>
// //                           )}
// //                         </div>
// //                       )}
// //                     </div>
// //                   ))}
// //               </div>
// //             </div>
// //           </nav>
// //         </div>


// //         <div className=" flex flex-row items-center gap-4 p-4 md:p-0">

// //           {/* Button 1: Book an Appointment (Green) */}
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             className=" w-full bg-[#5CB338] hover:bg-[#4a912d] text-white font-bold py-2.5 px-6 rounded-full shadow-lg hidden lg:flex items-center justify-center gap-2 transition-colors"
// //           >
// //             <Link href="/book-an-appointment" className="text-[15px] md:text-[16px]">
// //               <span className="block lg:hidden">B</span><span className="hidden lg:flex whitespace-nowrap">Book an Appointment</span>
// //             </Link>
// //           </motion.button>

// //           {/* Button 2: Patient Portal (Blue) */}
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             className="lg:w-full md:w-auto bg-[#6F92E7] hover:bg-[#5a7bc9] text-white font-bold py-2.5 px-6 rounded-full shadow-lg hidden lg:flex items-center justify-center gap-2 transition-colors"
// //           >
// //             <Link href="/patient-portal" className="text-[15px] md:text-[16px]">
// //               <span className="block lg:hidden">P</span><span className="hidden lg:block whitespace-nowrap">Patient Portal</span>
// //             </Link>
// //           </motion.button>

// //           {/* Button 3: Our Foundation (Green) */}
// //           <motion.button
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             className="lg:w-full md:w-auto bg-white hover:bg-[#4a912d]  text-[#5CB338] font-extrabold py-2.5 px-6 rounded-full shadow-lg hidden lg:flex items-center justify-center gap-2 transition-colors"
// //           >
// //             <Link href="https://foundation.gracespringhospitals.com/" className="text-[15px] md:text-[16px]">
// //               <span className="block lg:hidden">F</span><span className="hidden lg:block whitespace-nowrap">Gracespring Health Foundation</span>
// //             </Link>
// //           </motion.button>

// //         </div>


// //       </div>

// //     </header>
// //   );
// // }
