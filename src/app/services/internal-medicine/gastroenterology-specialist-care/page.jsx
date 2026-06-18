import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Gastroenterology Specialist Care",
  category: "Internal Medicine",
  tagline: "Advanced Diagnostics and Care for Digestives and Liver Health",
  overview: "Our Gastroenterology Unit offers extensive diagnostic workups and therapeutic clinical care for diseases of the esophagus, stomach, intestines, liver, gallbladder, and pancreas.",
  features: [
    "Diagnostic and Therapeutic Upper GI Endoscopy & Colonoscopy",
    "Management of Peptic Ulcer Disease, GERD, and H. Pylori Eradication",
    "Treatment Protocols for Chronic Hepatitis B, C, and Liver Cirrhosis",
    "Clinical Care for Inflammatory Bowel Disease (IBD) & Malabsorption"
  ]
};

export default function GastroenterologyPage() {
  return <ServicePageLayout data={pageData} />;
}