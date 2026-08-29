"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Accordion = ({ accordionId, question, answer, isOpen, toggleAccordion, index }) => {
  // Define the rotating colors based on the image provided
  const bgColors = [
    "bg-[#1A56DB]", // Bright Blue
    "bg-[#113285]", // Dark Blue
    "bg-[#DCB060]", // Mustard/Tan
    "bg-[#2D3748]", // Slate (fallback for 4th item)
    "bg-[#1A202C]", // Darker Slate (fallback for 5th item)
  ];
  
  const textColors = [
    "text-white", 
    "text-white", 
    "text-[#1a1a1a]", 
    "text-white", 
    "text-white"
  ];

  const bgColor = bgColors[index % bgColors.length];
  const textColor = textColors[index % textColors.length];
  const isFirst = index === 0;

  return (
    <div
      // Increase z-index for subsequent items and apply negative margin to create the "stacked" overlap
      className={`relative w-full max-w-4xl mx-auto flex flex-col items-start ${
        isFirst ? "mt-0" : "-mt-4 sm:-mt-5"
      }`}
      style={{ zIndex: index + 10 }}
    >
      {/* Folder Tab (Only rendered on the first item to match design) */}
      {isFirst && (
        <div className="relative h-[30px] sm:h-[40px] w-[70%] sm:w-[45%]">
          <div
            className={`absolute inset-0 ${bgColor} rounded-tl-[20px]`}
            style={{ clipPath: "polygon(0 0, 85% 0, 100% 100%, 0 100%)" }}
          ></div>
        </div>
      )}

      {/* Main Accordion Body */}
      <div
        className={`${bgColor} w-full transition-colors duration-300 shadow-[0_-8px_20px_rgba(0,0,0,0.12)] ${
          isFirst
            ? "rounded-tr-[20px] rounded-b-[20px]"
            : "rounded-[20px]"
        }`}
      >
        <button
          onClick={() => toggleAccordion(accordionId)}
          className={`w-full cursor-pointer flex flex-row gap-4 justify-between items-center select-none px-6 md:px-10 py-6 md:py-8 ${textColor}`}
        >
          <p className="text-[18px] md:text-[22px] text-left w-full font-bold leading-snug">
            {question}
          </p>
          <div className="flex flex-shrink-0 items-center justify-center">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                // Minus Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-80">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              ) : (
                // Plus Icon
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-80">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              )}
            </motion.div>
          </div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden w-full"
            >
              {/* pb-12 ensures the text isn't covered by the negative margin of the overlapping item below it */}
              <p className={`text-[15px] md:text-[17px] leading-relaxed px-6 md:px-10 pb-12 md:pb-14 pt-2 opacity-90 ${textColor}`}>
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Accordion;

// "use client";
// import React from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";

// const Accordion = ({ accordionId, question, answer, isOpen, toggleAccordion }) => {  
//   return (
//     <div
//       className={`lg:w-[70%] flex m-auto w-full duration-300 flex-col py-6 px-6 my-2 justify-center items-start rounded-lg border border-[#f3d9c7] ${
//         isOpen ? "h-auto bg-primary text-white" : "h-auto min-h-[100px] bg-white text-black"
//       }`}
//     >
//       <div
//         onClick={() => toggleAccordion(accordionId)}
//         className="w-full cursor-pointer flex flex-row gap-4 justify-between items-center select-none"
//       >
//         <p className="text-[16px] md:text-[18px] w-full font-bold leading-snug">
//           {question}
//         </p>
//         <div className="flex flex-shrink-0 distribution-end items-end integration-wrapper">
//           {isOpen ? (
//             <div className="bg-white w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors duration-200">
//               <Image 
//                 src="/assets/icons/arrow-down-primary.svg" 
//                 alt="Collapse" 
//                 width={20}
//                 height={20}
//                 className="w-[18px] h-[18px]"
//               />
//             </div>
//           ) : (
//             <div className="bg-[#5CB338] w-[42px] h-[42px] rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-[#e0bba3]">
//               <Image 
//                 src="/assets/icons/right-arrow-black.svg" 
//                 alt="Expand" 
//                 width={20}
//                 height={20}
//                 className="w-[18px] h-[18px]"
//               />
//             </div>
//           )}
//         </div>
//       </div>
      
//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0, marginTop: 0 }}
//             animate={{ height: "auto", opacity: 1, marginTop: 12 }}
//             exit={{ height: 0, opacity: 0, marginTop: 0 }}
//             transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
//             className="overflow-hidden w-full dynamic-content-box"
//           >
//             <p className="text-[15px] md:text-[15.5px] leading-relaxed opacity-95 pr-2">
//               {answer}
//             </p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Accordion;


// // "use client";
// // import React from "react";
// // import { AnimatePresence, motion } from "framer-motion";
// // import Image from "next/image";

// // const Accordion = ({accordionId, question, answer, isOpen, toggleAccordion,}) => {  
  
// //   return (


// //     <div
// //       className={`lg:w-[70%] flex m-auto w-full duration-300 flex-col py-10 px-5 my-4 justify-center items-start rounded-lg ${
// //         isOpen ? "h-auto bg-[#E86512] text-white" : "h-[132px] bg-white text-black"
// //       }`}
// //     >

// //       <div
// //         onClick={() => toggleAccordion(accordionId)}
// //         className='w-full cursor-pointer flex flex-row gap-3 rounded-md justify-between items-center'
// //       >
// //         <p className={`text-[15px] md:text-[18.687px] w-full font-bold`}>
// //           {question}
// //         </p>
// //         <div className='flex mr-auto justify-end items-end'>
// //           {isOpen ? (

// //             <div className="bg-white w-[50px] h-[50px] hover:bg-[black] rounded-full  flex items-center justify-center">
// //             <Image 
// //               src={"/assets/icons/arrow-down-primary.svg"} 
// //               alt="Arrow-doown" 
// //               width={30}
// //               height={30}
// //               className=" w-[20px] h-[20px]"
// //             />
// //             </div>

// //           ) : (
            

// //             <div className="bg-[#F9D8C3] w-[50px] h-[50px] hover:bg-[black] rounded-full  flex items-center justify-center">
// //               <Image 
// //                 src={"/assets/icons/right-arrow-black.svg"} 
// //                 alt="Arrow-right" 
// //                 width={30}
// //                 height={30}
// //                 className="w-[20px] h-[20px]"
// //               />
// //             </div>

// //           )}
// //         </div>
// //       </div>
      
// //       <AnimatePresence>
// //         {isOpen && (
// //           <motion.div
// //             initial={{ height: 0, opacity: 0 }}
// //             animate={{ height: "auto", opacity: 1 }}
// //             exit={{ height: 0, opacity: 0 }}
// //             transition={{ type: "tween", duration: 0.5 }}
// //             className='flex mt-2 flex-col w-full rounded-md justify-center items-start'
// //           >
// //             <p className='text-[15.29px] px-2 w-[90%]'>{answer}</p>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
      
// //     </div>
// //   );
// // };

// // export default Accordion;
