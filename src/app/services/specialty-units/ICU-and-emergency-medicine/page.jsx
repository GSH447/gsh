import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "ICU & Emergency Medicine",
  category: "Specialty Units",
  tagline: "24/7 High-Acuity Trauma, Resuscitation, and Critical Care Support",
  overview: "Our Intensive Care and Emergency Department operates continuously to stabilize critical multi-system trauma, cardiovascular crises, and acute respiratory compromise with advanced life-support technology.",
  features: [
    "Continuous Multi-Parameter Hemodynamic Monitoring and Invasive Support",
    "Mechanical Ventilation Setup, Airway Management, and Blood Gas Control",
    "Rapid Response Trauma Resuscitation, Triaging, and Cardiac Interventions",
    "Dedicated High-Dependency Care Units for Post-Operative Stabilizations"
  ]
};

export default function IcuEmergencyPage() {
  return <ServicePageLayout data={pageData} />;
}