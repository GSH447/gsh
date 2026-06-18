import React from 'react';
// import ServicePageLayout from "../../../../components/ServicePageLayout/index";

import ServicePageLayout from "../../../../../components/ServicePageLayout";

const pageData = {
  title: "Cardiothoracic and Vascular Surgery",
  category: "Surgical Services",
  tagline: "World-Class Open Heart, Thoracic, and Endovascular Interventions",
  overview: "Our Cardiothoracic and Vascular Surgery unit provides comprehensive surgical treatment for diseases affecting the heart, lungs, esophagus, mediastinum, and major blood vessels.",
  features: [
    "Adult & Paediatric Open Heart Surgery (Congenital & Acquired)",
    "Video-Assisted Thoracoscopic Surgery (VATS) - Minimally Invasive",
    "Aneurysm Repairs (including EVAR & TEVAR techniques)",
    "Coronary Artery Bypass Grafting (CABG) & Valve Replacements",
    "Creation of Arterio-Venous (AV) Fistulae for Dialysis Access"
  ]
};

export default function CardiothoracicPage() {
  return <ServicePageLayout data={pageData} />;
}