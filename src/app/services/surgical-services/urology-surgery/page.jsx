import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Urology Surgery",
  category: "Surgical Services",
  tagline: "Advanced Endourological and Reconstructive Care",
  overview: "Our Urology Surgery team specializes in minimally invasive endourology, laser therapies, and complex reconstructions for conditions affecting the kidneys, urinary bladder, prostate gland, and reproductive system.",
  features: [
    "Transurethral Resection of the Prostate (TURP) & Laser Prostatectomy",
    "Advanced Kidney and Bladder Stone Management (ESWL & PCNL)",
    "Reconstructive Urinary Tract Operations & Stricture Repairs",
    "Urological Oncology for Prostate, Renal, and Bladder Malignancies"
  ]
};

export default function UrologyPage() {
  return <ServicePageLayout data={pageData} />;
}