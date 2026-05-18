"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../lib/axios";

const COOKIE_KEY = "cookieConsent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = async (value) => {
    localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);

    // Optional backend tracking
    try {
      await axiosInstance.post("/?route=auth/track", {
        page_url: window.location.pathname,
        consent: value,
      });
    } catch (err) {
      console.error("Consent tracking failed");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="
            fixed bottom-0 left-0 right-0 z-[9999]
            bg-white border-t shadow-lg
          "
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Text */}
            <p className="text-sm text-gray-700 max-w-2xl">
              We use cookies to improve your experience, analyze traffic, and
              personalize content. By clicking “Accept all”, you agree to our
              use of cookies. Read our{" "}
              <Link href="/privacy-policy" className="text-primary underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/cookie-policy" className="text-primary underline">
                Cookie Policy
              </Link>.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleConsent("accepted")}
                className="
                  px-4 py-2 text-sm rounded-md
                  border border-gray-300
                  text-gray-700 hover:bg-gray-100
                  transition
                "
              >
                Reject
              </button>

              <button
                onClick={() => handleConsent("accepted")}
                className="
                  px-4 py-2 text-sm rounded-md
                  bg-primary text-white
                  hover:bg-black transition
                "
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import axiosInstance from "@/utils/axios";

// const COOKIE_KEY = "cookieConsent";

// const ConsentValue = "accepted" | "rejected";

// export default function CookieConsent() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const consent = localStorage.getItem(COOKIE_KEY);
//     if (!consent) setVisible(true);
//   }, []);

//   const handleConsent = async (value: ConsentValue) => {
//     localStorage.setItem(COOKIE_KEY, value);
//     setVisible(false);

//     // Optional backend tracking
//     try {
//       await axiosInstance.post("/?route=auth/track", {
//         page_url: window.location.pathname,
//         consent: value,
//       });
//     } catch (err) {
//       console.error("Consent tracking failed");
//     }
//   };

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           initial={{ y: 100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: 100, opacity: 0 }}
//           transition={{ duration: 0.4 }}
//           className="
//             fixed bottom-0 left-0 right-0 z-[9999]
//             bg-white border-t shadow-lg
//           "
//         >
//           <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
//             {/* Text */}
//             <p className="text-sm text-gray-700 max-w-2xl">
//               We use cookies to improve your experience, analyze traffic, and
//               personalize content. By clicking “Accept all”, you consent to the
//               use of cookies. Read our{" "}
//               <Link href="/privacy-policy" className="text-primary underline">
//                 Privacy Policy
//               </Link>{" "}
//               and{" "}
//               <Link href="/cookie-policy" className="text-primary underline">
//                 Cookie Policy
//               </Link>.
//             </p>

//             {/* Actions */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => handleConsent("rejected")}
//                 className="
//                   px-4 py-2 text-sm rounded-md
//                   border border-gray-300
//                   text-gray-700 hover:bg-gray-100
//                   transition
//                 "
//               >
//                 Reject
//               </button>

//               <button
//                 onClick={() => handleConsent("accepted")}
//                 className="
//                   px-4 py-2 text-sm rounded-md
//                   bg-primary text-white
//                   hover:bg-black transition
//                 "
//               >
//                 Accept all
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



// import  React,{ useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { WavingHand } from "@mui/icons-material";
// import { useRouter } from "next/navigation";
// import axiosInstance from "@/utils/axios";

// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";


// export default function CookieConsent() {
//   const router = useRouter();
//   const [showConsent, setShowConsent] = useState(false);


//   useEffect(() => {
//     const consent = localStorage.getItem("cookieConsent");
//     if (!consent) {
//       setShowConsent(true);
//     } else {
//       sendVisitorData("accepted");
//     }
//   }, []);

//   const handleConsent = (action = "accept") => {
//     localStorage.setItem("cookieConsent", "true");
//     setShowConsent(false);
//     sendVisitorData(action);
//     router.push("/doctor")
//   };

  
//   const handleConsentCreateAnAccount = (action = "accept") => {
//     localStorage.setItem("cookieConsent", "true");
//     setShowConsent(false);
//     sendVisitorData(action);
//     router.push("https://app.timobhealthinternational.org/account/signup")
//   };
  
//   const  handleConsentLogin = (action = "accept") => {
//     localStorage.setItem("cookieConsent", "true");
//     setShowConsent(false);
//     sendVisitorData(action);
//     router.push("https://app.timobhealthinternational.org/account/signin")
//   };

//   const handleCloseConsent = (action = "accept") => {
//     localStorage.setItem("cookieConsent", "true");
//     setShowConsent(false);
//     sendVisitorData(action);
//   };

//   const sendVisitorData = async (action = "accept") => {
//     try {
//       const response = await axiosInstance.post("/?route=auth/track", {
//         page_url: window.location.pathname,
//         action,
//       });

//       const { status, message } = response.data;
//       if (status !== "success") setError(message || "Unknown error");
//     } catch (err) {
//       setError(err?.message || "Error occurred");
//     }
//   };



// const steps = [
//   // {
//   //   label: "Create an account",
//   //   icon: <PersonAddAlt1Icon fontSize="small" />,
//   //   onClick: () => handleConsentCreateAnAccount("accept"),
//   // },
//   {
//     label: "Find a medical professional",
//     icon: <LocalHospitalIcon fontSize="small" />,
//       onClick: () => handleConsent("accept"),
//   },
//   {
//     label: "Seek clarity and ask questions?",
//     icon: <HelpOutlineIcon fontSize="small" />,
//       onClick: () => handleConsent("accept"),
//   },
//   {
//     label: "Stay healthy - Health is Wealth",
//     icon: <FavoriteIcon fontSize="small" />,
//       onClick: () => handleConsent("accept"),
//   },
//   {
//     label: "Monitor your health record",
//     icon: <MonitorHeartIcon fontSize="small" />,
//       onClick: () => handleConsentLogin("accept"),
//   },
// ];

//   return (
//     <AnimatePresence>
//       {showConsent && (
//         <motion.div
//           className="fixed inset-0 bg-black/50  flex items-center justify-center z-[9999]"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             className=" relative bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl p-6  text-center bottom-0"
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             transition={{ duration: 0.4 }}
//           >
//             {/* Close (top-right) */}
//             <button
//               // onClick={closePopup}
//                onClick={() => handleCloseConsent("accept")}
//               className="bg-primary absolute top-3 right-3 p-2 rounded-full shadow-md hover:scale-110 transition"
//             >
//               <CloseIcon />
//             </button>

//             <div>
          
//               <div
//                 className="w-[75%] lg:w-[87%] mx-auto"
//               >

//                 <h2 className="text-black text-sm lg:text-xl font-bold mb-2">
//                   <WavingHand/> Virtual consultation available 24/7
//                 </h2>

//               </div>
                

//             </div>

//             <div className=" flex flex-col md:flex-row items-center justify-center lg:gap-6 ">
//               {steps.map((step, index) => (
//                 <React.Fragment key={index}>
//                   {/* Step button */}
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.97 }}
//                     className="flex flex-col md:flex-row items-center text-center md:text-left space-y-2 md:space-y-0 md:space-x-2"
//                   >
//                     <Button
//                       onClick={step.onClick}
//                       startIcon={step.icon}
//                       variant="contained"
//                       fullWidth
//                       sx={{
//                         color: "#000",
//                         background: "#00d0ff",
//                         fontWeight: "bold",
//                         fontSize: "0.9rem",
//                         py: 1.2,
//                         borderRadius: 2,
//                         textTransform: "none",
//                         "&:hover": { background: "#000", color: "#fff" },
//                         boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
//                       }}
//                     >
//                       {step.label}
//                     </Button>
//                   </motion.div>

//                   {/* Connector Line or Arrow */}
//                   {index < steps.length - 1 && (
//                     <div className="flex flex-col md:flex-row items-center justify-center">
//                       {/* Vertical line (mobile) */}
//                       <div className="hidden md:block text-[#00d0ff] text-3xl mx-2">
//                         →
//                       </div>
//                       <div className="block md:hidden h-6 w-1 bg-[#00d0ff] lg:my-2 rounded-full"></div>
//                     </div>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
            
//           </motion.div>

          
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
