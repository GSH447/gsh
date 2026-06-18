import React from 'react';
import Link from 'next/link';
import { Activity, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicePageLayout({ data }) {
  if (!data) return null;

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-[#5CB338]">
      {/* Premium Institutional Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-900 py-20 lg:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5CB338] px-3 py-1 rounded-full bg-[#5CB338]/10 border border-[#5CB338]/20">
            {data.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {data.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mt-4 font-medium max-w-3xl leading-relaxed">
            {data.tagline}
          </p>
        </div>
      </section>

      {/* Main Structural Layout Block */}
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Narrative Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-white border-l-4 border-[#5CB338] pl-3 mb-4">
                Clinical Overview
              </h2>
              <p className="text-slate-300 leading-relaxed text-base font-normal whitespace-pre-line">
                {data.overview}
              </p>
            </div>
          </div>

          {/* Right Sidebar: Capabilities Panel */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-900 backdrop-blur-sm sticky top-24">
              <h3 className="text-md font-bold text-white tracking-tight mb-4 flex items-center gap-2">
                <Activity className="text-[#5CB338] h-5 w-5" />
                Core Capabilities
              </h3>
              
              <ul className="space-y-3.5">
                {data.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 font-medium">
                    <CheckCircle2 className="text-[#5CB338] h-4 w-4 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-800/80">
                <Link 
                  href="/contact" 
                  className="w-full py-3 bg-[#5CB338] hover:bg-[#4ea22f] text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#5CB338]/10"
                >
                  Book Specialist Consultation
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}