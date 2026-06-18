import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Orthopaedics Surgery",
  category: "Surgical Services",
  tagline: "Restoring Mobility through Joint, Bone, and Sports Medicine Excellence",
  overview: "Our Orthopaedic Surgery team focuses on correcting musculoskeletal deformities, treating acute bone fractures, managing degenerative joint problems, and providing sophisticated joint replacement procedures.",
  features: [
    "Total Knee and Total Hip Replacement Arthroplasty",
    "Complex Fracture Fixation (Internal and External Stabilization)",
    "Arthroscopic Sports Medicine Interventions (ACL & Meniscal Repairs)",
    "Correction of Deformities and Bone Realignment Operations"
  ]
};

export default function OrthopaedicsSurgeryPage() {
  return <ServicePageLayout data={pageData} />;
}