import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Pulmonology Specialist Care",
  category: "Internal Medicine",
  tagline: "Expert Management of Respiratory and Chronic Lung Diseases",
  overview: "Our Pulmonology department evaluates and manages obstructive, restrictive, and infectious lung diseases, utilizing modern pulmonary function assessments to support respiratory health.",
  features: [
    "Spirometry and Complete Pulmonary Function Diagnostics",
    "Advanced Management of Chronic Asthma, COPD, and Bronchiectasis",
    "Evaluation of Interstitial Lung Diseases & Pulmonary Tuberculosis Care",
    "Sleep Apnea Evaluations and Non-Invasive Ventilation Setup"
  ]
};

export default function PulmonologyPage() {
  return <ServicePageLayout data={pageData} />;
}