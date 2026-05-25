'use client';

import { motion } from 'framer-motion';
import {
  // ShieldCheck,
  // HeartPulse,
  // FileText,
  // FlaskConical,
  // CalendarDays,
  Phone,
} from 'lucide-react';
import { useState } from 'react';

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },

  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',

    transition: {
      delay: i * 0.03,
      duration: 0.45,
    },
  }),
};

const AnimatedText = ({ text, className = '' }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.3,
      }}
      className={`flex flex-wrap ${className}`}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function PatientPortal() {
  const [mrn, setMrn] = useState('');
  const [phone, setPhone] = useState('');

  const handleMrnChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setMrn(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 12);
    setPhone(value);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6F92E7]/20 blur-3xl rounded-full" />

      <div className="relative z-10 container mx-auto px-4 lg:px-10 py-16 lg:py-24">

        {/* <div className="grid lg:grid-cols-2 gap-12 items-center"> */}

        <div className="mt-5 grid lg:grid-cols-1 gap-12 items-center">
          {/* LEFT SIDE */}
          {/* <div className="space-y-8">

            <div className="space-y-6">

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-[#EEF4FF] text-[#2A157C] px-4 py-2 rounded-full text-sm font-semibold"
              >
                <ShieldCheck size={18} />
                Secure Patient Access
              </motion.div>

              <div className="space-y-3">

                <AnimatedText
                  text="Patient Portal"
                  className="text-4xl lg:text-6xl font-black text-[#1E1E1E]"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 text-lg max-w-xl leading-relaxed"
                >
                  Access your medical records, laboratory reports,
                  appointments, prescriptions, and healthcare services securely
                  from anywhere.
                </motion.p>

              </div>
            </div> */}

            {/* FEATURES */}
            {/* <div className="grid sm:grid-cols-2 gap-4">

              {[
                {
                  icon: <FileText size={22} />,
                  title: 'Medical Records',
                },

                {
                  icon: <FlaskConical size={22} />,
                  title: 'Lab Results',
                },

                {
                  icon: <CalendarDays size={22} />,
                  title: 'Appointments',
                },

                {
                  icon: <HeartPulse size={22} />,
                  title: 'Care Tracking',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{
                    y: -5,
                  }}
                  className="bg-white border border-gray-100 shadow-xl rounded-3xl p-5 flex items-center gap-4"
                >
                  <div className="bg-[#EEF4FF] text-[#2A157C] p-3 rounded-2xl">
                    {item.icon}
                  </div>

                  <h3 className="font-bold text-gray-800">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div> */}

          {/* RIGHT SIDE LOGIN */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-8 lg:p-10 mx-auto"
          >

            <div className="space-y-2 mb-8">

              {/* <h2 className="text-3xl font-black text-[#1E1E1E]">
                Login
              </h2> */}

              <AnimatedText
                text="Patient Portal"
                className="text-4xl lg:text-6xl font-black text-[#1E1E1E]"
              />

              <p className="text-gray-500">
                Enter your Medical Record Number (MRN)
                and registered telephone number.
              </p>

            </div>

            <form className="space-y-6">

              {/* MRN */}
              <div className="space-y-2">

                <label className="font-semibold text-sm text-gray-700">
                  Medical Record Number (MRN)
                </label>


                <input
                  type="text"
                  value={mrn}
                  onChange={handleMrnChange}
                  placeholder="Enter MRN"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#6F92E7]"
                />

                {/* <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter MRN"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#6F92E7]"
                /> */}

                {/* <input
                  type="number"
                  maxLength={7}
                  placeholder="Enter MRN"
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-[#6F92E7]"
                /> */}

              </div>

              {/* PHONE */}
              <div className="space-y-2">

                <label className="font-semibold text-sm text-gray-700">
                  Telephone Number
                </label>

                <div className="relative">

                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />


                <input
                  type="password"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter Telephone Number"
                  className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-[#6F92E7]"
                />


                  {/* <input
                    type="password"
                    inputMode="numeric"
                    maxLength={12}
                    placeholder="Enter Telephone Number"
                    className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-[#6F92E7]"
                  /> */}

                  {/* <input
                    type="password"
                    placeholder="Enter Telephone Number"
                    className="w-full border border-gray-200 rounded-2xl pl-12 pr-5 py-4 outline-none focus:ring-2 focus:ring-[#6F92E7]"
                  /> */}

                </div>

              </div>

              {/* BUTTON */}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() =>
                  alert(
                    'The Patient Portal is currently under development and will be available soon.'
                  )
                }
                className="w-full bg-[#2A157C] hover:bg-[#3b239d] text-white font-bold py-4 rounded-2xl transition-all shadow-xl"
              >
                Login
              </motion.button>


              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#2A157C] hover:bg-[#3b239d] text-white font-bold py-4 rounded-2xl transition-all shadow-xl"
              >
                Access Portal
              </motion.button> */}

            </form>

            {/* HELP */}
            <div className="mt-8 text-center text-sm text-gray-500 leading-relaxed">
              Need assistance accessing your account?
              <br />
              Email: <a href="mailto:care@gracespringhospitals.com" className="text-[#6F92E7] hover:underline">
                care@gracespringhospitals.com
              </a>
              
              <br />
              Call: <a href="tel:+2347056482776" className="text-[#6F92E7] hover:underline">
                +234 705-648-2776
              </a>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}