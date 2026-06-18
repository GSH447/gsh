import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Diagnostic Services",
  category: "Specialty Units",
  tagline: "High-Precision Laboratory Pathology and Advanced Medical Imaging",
  overview: "Our fully automated diagnostic labs and imaging systems deliver swift, dependable reports, enabling our clinical departments to implement accurate, evidence-based treatments.",
  features: [
    "Fully Automated Haematology, Clinical Biochemistry, and Endocrinology Panels",
    "Digital X-Ray Systems, Routine Ultrasonography, and Vascular Doppler Studies",
    "Microbiological Culturing, Antimicrobial Sensitivity Profiles, and PCR Workups",
    "Rapid Emergency Turnaround Times for Inpatient Critical Lab Profiles"
  ]
};

export default function DiagnosticsPage() {
  return <ServicePageLayout data={pageData} />;
}