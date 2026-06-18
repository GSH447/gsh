import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Dialysis Unit",
  category: "Specialty Units",
  tagline: "Safe, Ultra-Pure Renal Replacement and Hemodialysis Therapies",
  overview: "Our state-of-the-art Dialysis Unit provides regular outpatient and emergency inpatient hemodialysis sessions using advanced water purification plants to support patients with acute or end-stage renal diseases.",
  features: [
    "High-Efficiency Acute and Maintenance Chronic Hemodialysis Sessions",
    "Advanced Double-Pass RO Water Treatment and Purification Assurance",
    "Intra-Dialytic Critical Management and Continuous Patient Tracking",
    "Emergency Bedside Hemodialysis Access inside Intensive Care Units"
  ]
};

export default function DialysisPage() {
  return <ServicePageLayout data={pageData} />;
}