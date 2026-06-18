import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Paediatric Surgery",
  category: "Surgical Services",
  tagline: "Compassionate, Precision Surgical Care for Infants and Children",
  overview: "Our Paediatric Surgery unit offers dedicated surgical management for neonates, infants, children, and adolescents, specializing in congenital anomaly corrections and common childhood surgical diseases.",
  features: [
    "Neonatal Emergency Surgery for Congenital Malformations",
    "Paediatric Hernia, Hydrocele, and Orchidopexy (Undescended Testes)",
    "Surgical Correction of Anorectal Malformations & Hirschsprung's Disease",
    "Minimally Invasive Paediatric Laparoscopy and Cystoscopy"
  ]
};

export default function PaediatricSurgeryPage() {
  return <ServicePageLayout data={pageData} />;
}