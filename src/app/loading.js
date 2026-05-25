"use client";
import { motion } from "framer-motion";

const Loading = () => {
  return (

    <div className="h-screen flex gap-3 flex-col m-auto">

      <div className="m-auto">


        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          className="flex items-center justify-center h-screen"
        >
        <div className="loading-animation-container">
          <div className="loading-content">
            <div className="spinner-ring"></div>
            <div className="logo-g">G</div>
          </div>
        </div>
        </motion.div>

      </div>

    
    </div>

  );
}

export default Loading;
