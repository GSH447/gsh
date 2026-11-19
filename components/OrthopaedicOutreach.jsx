"use client";

import React, { useEffect, useState } from "react";
import { Phone, CheckCircle2, X } from "lucide-react";

const CONDITIONS = [
  {
    title: "Hip & Knee Conditions",
    img: "/assets/orthopaedic/hip-knee.png",
    alt: "Hip and knee",
    items: [
      "Osteoarthritis & joint pains",
      "Sports injuries",
      "Difficulty walking",
    ],
  },
  {
    title: "Back & Spine Conditions",
    img: "/assets/orthopaedic/back-spine.png",
    alt: "Back and spine",
    items: [
      "Lumbar spondylosis",
      "Spinal stenosis",
      "Spondylolisthesis",
      "Low back pain",
    ],
  },
  {
    title: "Neck & Arm Conditions",
    img: "/assets/orthopaedic/neck-arm.png",
    alt: "Neck and arm",
    items: [
      "Cervical spondylosis",
      "Cervical stenosis",
      "Neck & arm pain",
    ],
  },
  {
    title: "Trauma & Limb Problems",
    img: "/assets/orthopaedic/trauma-limb.png",
    alt: "Trauma and limb",
    items: [
      "Fractures and injuries",
      "Limb deformities",
      "Disabilities",
    ],
  },
];

const FREE_ITEMS = [
  "Free Vital Signs Assessment",
  "Free Specialist Orthopaedic Consultations",
  "Free Clinical Assessment & Medical Advice",
  "Free Follow-up Consultations within the three-day period",
];

const DAYS = ["Thu 26 Nov", "Fri 27 Nov", "Sat 28 Nov", "Any day"];

export default function OrthopaedicOutreach({ autoOpenSeconds = 0 }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [waUrl, setWaUrl] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [day, setDay] = useState("Any day");

  useEffect(() => {
    const secs = Number(autoOpenSeconds) || 0;
    if (secs <= 0) return;
    const timer = setTimeout(() => {
      setModalOpen(true);
    }, secs * 1000);
    return () => clearTimeout(timer);
  }, [autoOpenSeconds]);

  const openModal = () => {
    setModalOpen(true);
    setSent(false);
    setError("");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanName = (name || "").trim();
    const cleanPhone = (phone || "").trim();

    if (!cleanName || cleanPhone.replace(/\D/g, "").length < 7) {
      setError("Please enter your name and a valid phone number.");
      return;
    }

    const lines = [
      "Hello Gracespring, I would like to register for the Free Orthopaedic Health Outreach (26-28 November 2026).",
      "",
      `Name: ${cleanName}`,
      `Phone: ${cleanPhone}`,
      `Area of concern: ${area || "Not specified"}`,
      `Preferred day: ${day}`,
    ];

    const url = `https://wa.me/2347056482776?text=${encodeURIComponent(
      lines.join("\n")
    )}`;

    setWaUrl(url);
    setSent(true);
    setError("");

    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback button in modal still lets user open WhatsApp directly
    }
  };

  return (
    <div className="w-full bg-white text-[#1a1450]">
      {/* ============ HERO ============ */}
      <section className="bg-[#261f90] text-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-16 flex flex-col gap-9">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">

            <a
              href="tel:+2347056482776"
              className="inline-flex items-center gap-2.5 min-h-[44px] text-[#fdc41f] text-lg font-extrabold"
            >
              <Phone className="w-5 h-5 text-[#fdc41f]" aria-hidden="true" />
              0705 648 2776
            </a>
          </div>

          {/* Hero row */}
          <div className="flex flex-wrap gap-10 items-start">
            {/* Left: message and CTAs */}
            <div className="flex-[999_1_520px] min-w-0 flex flex-col gap-5">
              <div className="self-start bg-[#fdc41f] text-[#1a1450] rounded-full px-4 py-2 text-[15px] font-extrabold tracking-wide">
                3 DAYS · FREE SPECIALIST CARE
              </div>

              <div className="flex flex-col">
                <div className="text-[52px] sm:text-[76px] lg:text-[96px] font-black text-[#fdc41f] leading-none">
                  FREE
                </div>
                <div className="text-[36px] sm:text-[54px] lg:text-[68px] font-black text-white leading-[1.05]">
                  ORTHOPAEDIC
                </div>
                <div className="text-[30px] sm:text-[44px] lg:text-[56px] font-black text-[#fdc41f] leading-[1.1]">
                  HEALTH OUTREACH
                </div>
              </div>

              <div className="text-xl sm:text-2xl lg:text-[28px] font-medium text-white">
                Move Better. Live Better.
              </div>

              {/* Date card */}
              <div className="self-start max-w-full bg-[#fdc41f] text-[#1a1450] rounded-[20px] px-6 pt-4 pb-[18px] flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline gap-x-[18px] gap-y-1.5">
                  <div className="text-[34px] sm:text-[46px] lg:text-[56px] font-black leading-[1.05] tracking-[1px]">
                    26 · 27 · 28
                  </div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-extrabold">
                    NOVEMBER 2026
                  </div>
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-extrabold leading-[1.3]">
                  Gracespring Hospitals, Ajayi Apata Estate, Sangotedo
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3.5 items-center">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2.5 min-h-[56px] px-[30px] bg-[#fdc41f] text-[#1a1450] rounded-[14px] text-lg font-black cursor-pointer hover:brightness-95 transition"
                >
                  Register now →
                </button>
                <a
                  href="tel:+2347056482776"
                  className="inline-flex items-center justify-center min-h-[56px] px-7 border-2 border-white text-white rounded-[14px] text-lg font-extrabold hover:bg-white/10 transition"
                >
                  Call to book
                </a>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Gracespring%20Hospitals%20Ajayi%20Apata%20Estate%20Sangotedo%20Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] text-[#fdc41f] text-base font-extrabold hover:underline"
                >
                  Get directions →
                </a>
                <a
                  href="#treating"
                  className="inline-flex items-center min-h-[44px] text-white text-base font-bold hover:underline"
                >
                  See what we treat ↓
                </a>
              </div>

              <div className="text-sm font-medium text-[#e6e4f7]">
                Please call to book before visiting.
              </div>
            </div>

            {/* Right: lead consultant card */}
            <div className="flex-[1_1_320px] min-w-0 max-w-[420px] bg-white text-[#1a1450] rounded-[24px] p-[18px] flex flex-col gap-3.5">
              <img
                src="/assets/orthopaedic/lead-consultant.png"
                alt="Dr Thompson Akpokonyan, lead consultant"
                className="w-full h-auto aspect-[213/152] object-cover rounded-[16px] block"
              />
              <div className="flex flex-col gap-1 px-1.5">
                <div className="text-xs font-extrabold text-[#261f90] tracking-[0.6px]">
                  MEET OUR LEAD CONSULTANT
                </div>
                <div className="text-2xl font-black leading-[1.15]">
                  Dr Thompson Akpokonyan
                </div>
                <div className="text-sm font-bold text-[#261f90]">
                  MBBS, FWACS, HSE
                </div>
                <div className="text-[15px] font-medium leading-[1.4]">
                  Consultant Orthopaedic Surgeon &amp; Traumatologist
                </div>
                <div className="text-[13px] font-medium leading-[1.5] text-[#4a4680] mt-1">
                  Arthroplasty · Arthroscopy · Spine Surgery · Hip &amp; Knee
                  Replacement
                </div>
              </div>
              <div className="border-t border-[#e4e2f3] pt-3 pb-1 px-1.5 flex flex-wrap items-center gap-3">
                <div className="text-xs font-extrabold text-[#261f90] tracking-[0.5px]">
                  IN COLLABORATION WITH
                </div>
                <img
                  src="/assets/orthopaedic/najoda-foundation.png"
                  alt="Najoda Foundation"
                  className="w-[120px] h-8 object-cover rounded-[6px] block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT WE TREAT ============ */}
      <section id="treating" className="bg-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-16 flex flex-col gap-7">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black text-[#261f90] leading-[1.1]">
              What are we treating?
            </h2>
            <div className="text-sm font-extrabold text-[#5a5890] tracking-[0.6px]">
              BONES · JOINTS · MOBILITY
            </div>
          </div>

          <div className="flex flex-wrap gap-[22px]">
            {CONDITIONS.map((group) => (
              <div
                key={group.title}
                className="flex-[1_1_230px] min-w-0 flex flex-col gap-3"
              >
                <img
                  src={group.img}
                  alt={group.alt}
                  className="w-full h-[120px] object-cover rounded-[14px] block"
                />
                <h3 className="text-xl font-black text-[#261f90] pb-2 border-b-[3px] border-[#fdc41f]">
                  {group.title}
                </h3>
                <ul className="m-0 pl-5 list-disc text-base font-medium leading-[1.6]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHAT IS FREE ============ */}
      <section className="bg-[#f1f0fb]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-14 flex flex-col gap-6">
          <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-black text-[#261f90] leading-[1.1]">
            What is free during the three days?
          </h2>
          <div className="flex flex-wrap gap-4">
            {FREE_ITEMS.map((label) => (
              <div
                key={label}
                className="flex-[1_1_230px] min-w-0 bg-white rounded-[16px] px-5 py-[18px] flex gap-3.5 items-start"
              >
                <CheckCircle2
                  className="w-7 h-7 shrink-0 text-[#261f90] fill-[#fdc41f]"
                  aria-hidden="true"
                />
                <div className="text-[17px] font-extrabold leading-[1.3]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="bg-[#fdc41f] text-[#1a1450]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-14 flex flex-wrap gap-x-10 gap-y-7 items-center justify-between">
          <div className="flex-[1_1_360px] min-w-0 flex flex-col gap-2.5">
            <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-black leading-[1.1]">
              Register today. Your mobility matters.
            </h2>
            <p className="text-lg font-semibold leading-[1.5]">
              26 · 27 · 28 November 2026 · Gracespring Hospitals, Sangotedo
            </p>
          </div>
          <div className="flex flex-wrap gap-3.5 items-center">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center justify-center min-h-[56px] px-[30px] bg-[#261f90] text-white rounded-[14px] text-lg font-black cursor-pointer hover:brightness-110 transition"
            >
              Register now →
            </button>
            <a
              href="tel:+2347056482776"
              className="inline-flex items-center justify-center min-h-[56px] px-7 border-2 border-[#261f90] text-[#261f90] rounded-[14px] text-lg font-extrabold hover:bg-[#261f90]/5 transition"
            >
              0705 648 2776
            </a>
            <a
              href="mailto:care@gracespringhospitals.com?subject=Free%20Orthopaedic%20Outreach%20Registration"
              className="inline-flex items-center min-h-[44px] text-[#261f90] text-base font-extrabold underline"
            >
              care@gracespringhospitals.com
            </a>
          </div>
        </div>
      </section>

      {/* ============ VENUE + NOTES ============ */}
      <section className="bg-[#1a1450] text-white">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-10 flex flex-wrap gap-x-12 gap-y-7">
          <div className="flex-[1_1_340px] min-w-0 flex flex-col gap-2">
            <div className="text-[13px] font-extrabold text-[#fdc41f] tracking-[0.6px]">
              VENUE
            </div>
            <div className="text-lg font-bold leading-[1.5]">
              Gracespring Hospitals, Block 3, Plot 32, Ajayi Apata Estate,
              Opposite Mobil Filling Station, Sangotedo, Eti-Osa, Lekki-Epe
              Expressway, Lagos.
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Gracespring%20Hospitals%20Ajayi%20Apata%20Estate%20Sangotedo%20Lagos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] text-[#fdc41f] text-base font-extrabold hover:underline"
            >
              Get directions →
            </a>
          </div>
          <div className="flex-[1_1_340px] min-w-0 flex flex-col gap-2">
            <div className="text-[13px] font-extrabold text-[#fdc41f] tracking-[0.6px]">
              IMPORTANT INFORMATION
            </div>
            <ul className="m-0 pl-5 list-disc text-[15px] font-medium leading-[1.6] text-[#e6e4f7]">
              <li>
                Please bring any previous medical records, e.g. X-rays (if less
                than 12 months).
              </li>
              <li>
                Additional tests or imaging may be recommended and are not free.
              </li>
              <li>
                Further treatment, medications or surgery will be discussed
                separately with patients.
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-[#261f90] py-3.5 px-5 sm:px-8 lg:px-12 text-center text-sm font-medium">
          Mobility is freedom. Everyone deserves the opportunity to move without
          pain.
        </div>
      </section>

      {/* ============ REGISTRATION POP-UP ============ */}
      {modalOpen && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto flex flex-col items-center justify-start pt-16 px-4 pb-8">
          <button
            type="button"
            aria-label="Close registration window"
            onClick={closeModal}
            className="fixed inset-0 w-full h-full border-0 bg-[#140e50]/75 cursor-default"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reg-title"
            className="relative w-full max-w-[520px] bg-white text-[#1a1450] rounded-[24px] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#261f90] text-white px-7 pt-6 pb-[22px] flex flex-col gap-2.5">
              <button
                type="button"
                aria-label="Close"
                onClick={closeModal}
                className="absolute right-3 top-3 w-11 h-11 flex items-center justify-center bg-transparent border-0 cursor-pointer text-white hover:bg-white/10 rounded-full transition"
              >
                <X className="w-[22px] h-[22px]" aria-hidden="true" />
              </button>
              <div className="self-start bg-[#fdc41f] text-[#1a1450] rounded-full px-3.5 py-1.5 text-xs font-extrabold tracking-[0.4px]">
                FREE · 26 · 27 · 28 NOV 2026
              </div>
              <h2
                id="reg-title"
                className="text-[28px] font-black leading-[1.15] pr-9"
              >
                Register for your free orthopaedic consultation
              </h2>
            </div>

            {/* Form state */}
            {!sent ? (
              <form
                onSubmit={handleSubmit}
                className="px-7 pt-6 pb-7 flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reg-name"
                    className="text-sm font-extrabold text-[#261f90]"
                  >
                    Full name
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Adaeze Okafor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-h-[50px] px-3.5 border-2 border-[#cfcdea] rounded-[12px] bg-white text-[#1a1450] text-base font-medium focus:outline-none focus:border-[#261f90]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reg-phone"
                    className="text-sm font-extrabold text-[#261f90]"
                  >
                    Phone / WhatsApp number
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="e.g. 0801 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full min-h-[50px] px-3.5 border-2 border-[#cfcdea] rounded-[12px] bg-white text-[#1a1450] text-base font-medium focus:outline-none focus:border-[#261f90]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="reg-area"
                    className="text-sm font-extrabold text-[#261f90]"
                  >
                    Area of concern (optional)
                  </label>
                  <select
                    id="reg-area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full min-h-[50px] px-3 border-2 border-[#cfcdea] rounded-[12px] bg-white text-[#1a1450] text-base font-medium focus:outline-none focus:border-[#261f90]"
                  >
                    <option value="">Choose an option</option>
                    <option value="Hip & Knee">Hip &amp; Knee</option>
                    <option value="Back & Spine">Back &amp; Spine</option>
                    <option value="Neck & Arm">Neck &amp; Arm</option>
                    <option value="Trauma & Limb">Trauma &amp; Limb</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-sm font-extrabold text-[#261f90]">
                    Preferred day
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {DAYS.map((label) => {
                      const selected = day === label;
                      return (
                        <button
                          key={label}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setDay(label)}
                          className={
                            selected
                              ? "flex-[1_1_auto] min-h-[46px] px-3.5 bg-[#261f90] text-white border-2 border-[#261f90] rounded-[12px] text-[15px] font-extrabold cursor-pointer"
                              : "flex-[1_1_auto] min-h-[46px] px-3.5 bg-white text-[#261f90] border-2 border-[#cfcdea] rounded-[12px] text-[15px] font-extrabold cursor-pointer hover:border-[#261f90]"
                          }
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="bg-[#fff3d1] border-l-[5px] border-[#fdc41f] rounded-[8px] px-3.5 py-2.5 text-sm font-bold leading-[1.4]"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="flex items-center justify-center min-h-[56px] px-6 bg-[#fdc41f] text-[#1a1450] border-0 rounded-[14px] text-lg font-black cursor-pointer hover:brightness-95 transition"
                >
                  Send on WhatsApp →
                </button>

                <div className="text-[13px] font-medium leading-[1.5] text-[#4a4680]">
                  This opens WhatsApp with your details already typed in. Tap Send
                  there to complete your request. Prefer to talk?{" "}
                  <a
                    href="tel:+2347056482776"
                    className="text-[#261f90] font-extrabold underline"
                  >
                    Call 0705 648 2776
                  </a>
                </div>
              </form>
            ) : (
              /* Success state */
              <div className="px-7 pt-7 pb-[30px] flex flex-col gap-4">
                <div className="flex gap-3.5 items-center">
                  <CheckCircle2
                    className="w-11 h-11 shrink-0 text-[#261f90] fill-[#fdc41f]"
                    aria-hidden="true"
                  />
                  <div className="text-[22px] font-black leading-[1.2]">
                    WhatsApp is ready with your details
                  </div>
                </div>
                <div className="text-base font-medium leading-[1.6]">
                  Please tap <b>Send</b> in WhatsApp so our team receives your
                  request. We will contact you to confirm. If WhatsApp did not
                  open, use the button below.
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center min-h-[56px] px-6 bg-[#fdc41f] text-[#1a1450] rounded-[14px] text-lg font-black hover:brightness-95 transition"
                >
                  Open WhatsApp →
                </a>
                <button
                  type="button"
                  onClick={closeModal}
                  className="min-h-[48px] bg-transparent border-2 border-[#261f90] text-[#261f90] rounded-[14px] text-base font-extrabold cursor-pointer hover:bg-[#261f90]/5 transition"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}