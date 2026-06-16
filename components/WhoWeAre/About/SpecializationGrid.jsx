"use client";

import React, { useState } from "react";
import { Layers, Activity, Stethoscope, Baby } from "lucide-react";

export default function SpecializationGrid() {
  const [activeTab, setActiveTab] = useState("surgery");

  const categories = [
    { id: "surgery", name: "Surgical Specialties", icon: Layers },
    { id: "medicine", name: "Internal Medicine", icon: Activity },
    { id: "obs", name: "Obstetrics & Gynaecology", icon: Stethoscope },
    { id: "paediatrics", name: "Paediatrics & Services", icon: Baby }
  ];

  return (
    <section className="py-20 lg:py-24 bg-slate-900 text-white" id="specialties">
      <div className="container mx-auto px-6 lg:px-16">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">Clinical Portfolio</h4>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Advanced Medical Fields</h2>
          </div>
          <p className="text-slate-400 max-w-md text-sm">
            Providing comprehensive diagnostic and multi-specialty operative interventions executed by credentialed medical personnel.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4 mb-8">
          {categories.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon size={16} />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Content Display Window */}
        <div className="min-h-[250px]">
          {activeTab === "surgery" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {[
                { title: "Cardiothoracic Surgery", details: "Including Video-Assisted Thoracoscopic Surgery (VATS), complex adult & paediatric open-heart surgery, congenital and acquired repairs." },
                { title: "Vascular Procedures", details: "Specialized focus on minimally invasive and modern endovascular or interventional options." },
                { title: "General & Laparoscopic Surgery", details: "Minimally invasive standard procedures for targeted visceral conditions with shortened recovery protocols." },
                { title: "Urology & Endoscopy", details: "Advanced endoscopic urological diagnosis and operative solutions." },
                { title: "Orthopaedic & Neurosurgery", details: "Complete structural spine, joint replacements, complex neuro-trauma management and joint endoscopy." },
                { title: "Burns, Plastic & Maxillofacial", details: "Reconstructive, trauma-related soft tissue remodeling, and facial osteotomy interventions." }
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-xl bg-slate-800/50 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-emerald-400 text-base">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "medicine" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-fadeIn">
              {["Cardiology", "Pulmonology", "Endocrinology", "Gastroenterology", "Rheumatology", "Nephrology", "Haematology", "Neurology", "Oncology"].map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-800/30 border border-slate-800/80 text-center font-medium text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          )}

          {activeTab === "obs" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              {[
                { title: "Maternal Care", details: "Comprehensive premium antenatal tracking, complex delivery management, and post-natal recovery care." },
                { title: "Gynaecological Services", details: "Specialist medical and surgical remedies for comprehensive reproductive health tracking." },
                { title: "Fertility Treatment", details: "Advanced reproductive technological diagnostic options tailored for local families." }
              ].map((item, index) => (
                <div key={index} className="p-6 rounded-xl bg-slate-800/50 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-indigo-400 text-base">{item.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.details}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "paediatrics" && (
            <div className="p-8 rounded-xl bg-slate-800/40 border border-slate-800 space-y-4 max-w-2xl animate-fadeIn">
              <h4 className="font-bold text-slate-100 text-lg">Comprehensive Paediatric Wing</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Integrated critical care pathways tracking infant and youth health conditions. Backed by dedicated neonatal networks, specialized congenital pediatric surgery capacities, and developmental tracking systems.
              </p>
            </div>
          )}
        </div>

        {/* General Support Facilities Sub-Tray */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400 tracking-wider uppercase mb-4">Extended Diagnostic & Care Facilities Available</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-300 font-light">
            <span>• Intensive Care Unit (ICU)</span>
            <span>• 24/7 Emergency Medicine</span>
            <span>• Comprehensive Dialysis</span>
            <span>• Chemotherapy Suites</span>
            <span>• Advanced Medical Imaging</span>
            <span>• Telehealth Specialist Consultations</span>
          </div>
        </div>

      </div>
    </section>
  );
}