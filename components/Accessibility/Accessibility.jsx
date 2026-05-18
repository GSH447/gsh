'use client'

import { useState } from 'react';
import { motion } from "framer-motion";
// import { Accessibility, X } from 'lucide-react';
import { X } from 'lucide-react';
import ClientFeedbackForm from './ClientFeedbackForm';

const AccessibilityComp = () => {

  const [accessibilityOptions, setAccessibilityOptions] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);


  const handleAccessibilityOptions = () => {
    setAccessibilityOptions(true);
    setIsSpinning(false);
  };

  const handleCloseModal = () => {
    setAccessibilityOptions(false);
    setIsSpinning(true);
  };

  return (
    <div className="relative">

      {/* Trigger Button */}
      <button className="accessibility" onClick={handleAccessibilityOptions}>
        <div className="grid place-items-center">
          <motion.div
            animate={isSpinning ? { rotateX: 360, rotateY: 360, rotateZ: 0 } : { rotateX: 0, rotateY: 0, rotateZ: 0 }}
            transition={{
              repeat: isSpinning ? Infinity : 0,
              duration: 5,
              ease: "linear",
            }}
            style={{
              perspective: 1000,
              display: "inline-block",
            }}
          >
            {/* <Accessibility className="h-10 w-10" /> */}
          </motion.div>
          <div>F</div>
          <div>e</div>
          <div>e</div>
          <div>d</div>
          <div>b</div>
          <div>a</div>
          <div>c</div>
          <div>k</div>
        </div>
      </button>

      {/* Modal Popup */}
      {accessibilityOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">

            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              aria-label="Close Accessibility Options"
            >
              <X />
            </button>

            {/* Modal Content */}
            {/* Client Feedback Form */}
            <ClientFeedbackForm />
            {/* Add more accessibility options here */}
          </div>
        </div>
      )}

    </div>
  );
};

export default AccessibilityComp;