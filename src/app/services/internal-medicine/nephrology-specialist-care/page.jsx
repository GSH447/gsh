import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Nephrology Specialist Care",
  category: "Internal Medicine",
  tagline: "Comprehensive Kidney Care and Hypertension Management",
  overview: "Our Nephrology division provides specialized management for patients with acute kidney injuries, chronic kidney diseases, glomerulonephritis, and severe hypertensive nephropathies, backed by our modern dialysis ecosystem.",
  features: [
    "Slowing Progression Protocols for Chronic Kidney Disease (CKD)",
    "Management of Fluid, Electrolyte, and Acid-Base Imbalances",
    "Pre-Dialysis Care, Vascular Access Coordination & Patient Education",
    "Clinical Management of Glomerular Diseases and Polycystic Kidneys"
  ]
};

export default function NephrologyPage() {
  return <ServicePageLayout data={pageData} />;
}