import React from 'react';
import ServicePageLayout from "../../../../../components/ServicePageLayout/index";

const pageData = {
  title: "Fertility Treatment",
  category: "Women & Child Health",
  tagline: "Advanced Reproductive Medicine and Assisted Conception Solutions",
  overview: "Our Fertility Unit blends clinical excellence with empathetic care to support couples navigating conception difficulties, offering individualized endocrinology workups and reproductive options.",
  features: [
    "Comprehensive Male and Female Infertility Diagnostic Evaluations",
    "Ovulation Induction Protocols and Monitored Conception Cycles",
    "Intrauterine Insemination (IUI) & Assisted Reproductive Technology Paths",
    "Advanced Management of Recurrent Pregnancy Losses and PCOS"
  ]
};

export default function FertilityPage() {
  return <ServicePageLayout data={pageData} />;
}