import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "General Surgery",
  category: "Surgical Services",
  tagline: "Pioneering Laparoscopic & Minimally Invasive Solutions",
  overview: "Our General Surgery framework handles high-volume abdominal procedures with an emphasis on advanced minimal access (laparoscopic) interventions.",
  features: [
    "Laparoscopic Cholecystectomy (Gallbladder Removal)",
    "Laparoscopic and Open Hernia Repair (Inguinal, Umbilical, Incisional)",
    "Colorectal Resections for Diverticular Disease & Bowel Cancer",
    "Appendicectomy and Acute Trauma Surgical Interventions"
  ]
};

export default function GeneralSurgeryPage() {
  return <ServicePageLayout data={pageData} />;
}