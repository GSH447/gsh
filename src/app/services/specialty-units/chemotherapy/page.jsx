import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Chemotherapy Unit",
  category: "Specialty Units",
  tagline: "Dedicated Ambulatory and Inpatient Cytotoxic Infusion Care",
  overview: "Our Chemotherapy Unit features custom day-care suites structured for safe oncological drug administration, strict bio-safety compliance, and comprehensive post-infusion toxicity management.",
  features: [
    "Safe Central or Peripheral Intravenous Cytotoxic Drug Infusions",
    "Pre-Chemotherapy Lab Safety Verifications & Antiemetic Coverage",
    "Specialized Management of Port-a-Caths and PICC Access Lines",
    "Patient Education Frameworks on Dietary Adjustments and Side Effects"
  ]
};

export default function ChemotherapyPage() {
  return <ServicePageLayout data={pageData} />;
}