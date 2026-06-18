import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Physiotherapy & Rehabilitation",
  category: "Specialty Units",
  tagline: "Advanced Physical Rehabilitation for Peak Neuromuscular Recovery",
  overview: "Our Physiotherapy Unit supports patients recovering from major strokes, orthopaedic operations, athletic injuries, or chronic arthritic conditions through target-driven movement recovery therapies.",
  features: [
    "Post-Stroke Neuro-Rehabilitation and Gait Re-education Systems",
    "Post-Operative Orthopaedic Joint Mobilization and Strengthening Paths",
    "Therapeutic Electrotherapy, Ultrasound, and Targeted Heat Applications",
    "Ergonomic Assessments & Targeted Exercise Protocols for Chronic Back Pain"
  ]
};

export default function PhysiotherapyPage() {
  return <ServicePageLayout data={pageData} />;
}