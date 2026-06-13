import React from "react";
import { useFarm } from "../context/FarmContext";
import { Sparkles, Trophy, Heart, Apple, Eye, ShieldCheck, Milestone } from "lucide-react";
import { GALLERY_IMAGES } from "../constants/assets";

export const About: React.FC = () => {
  const { settings } = useFarm();

  const values = [
    {
      icon: <ShieldCheck size={26} className="text-secondary" />,
      title: "Hospitals-Level Sanitation",
      desc: "Our automated vacuum pipelines and stainless-steel pasteurization silos undergo clinical sterilization cycles twice daily, ensuring pristine chemical and bacterial safety."
    },
    {
      icon: <Apple size={26} className="text-secondary" />,
      title: "Nutritional Integrity",
      desc: "By cold-chain dispatching under strict 4°C state locks, we halt enzymatic degradation and preserve the active calcium, proteins, and gut-friendly probiotics."
    },
    {
      icon: <Heart size={26} className="text-secondary" />,
      title: "Ethical Herd Wellness",
      desc: "Our pedigree Holstein-Friesian cows graze on organic seasonal pastures. We enforce strict antibiotic exclusion guidelines, guaranteeing no drug residues."
    },
    {
      icon: <Trophy size={26} className="text-secondary" />,
      title: "Heritage Handcrafted",
      desc: "Our premium granular ghee and classic clay-pot curd are set and simmered based on traditional generational recipes under rigorous kitchen standards."
    }
  ];

  return (
    <div id="about-heritage-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16 animate-fade-in">
      
      {/* Overview Block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-secondary font-display font-extrabold text-xs tracking-widest uppercase bg-secondary/10 px-3.5 py-1.5 rounded-full border border-secondary/15 inline-flex items-center">
            <Sparkles size={12} className="mr-2" />
            Tasnim Farm Heritage
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-primary tracking-tight leading-none">
            Setting the Gold Standard for Pure Organic Dairy
          </h1>
          <p className="text-sm text-gray-550 leading-relaxed">
            Founded in 2018 with a humble herd of five cows and a singular mission, Tasnim Dairy Farm has emerged as Bangladesh's premier luxury dairy operator. We recognized a critical void in metropolitan areas: true, unadulterated fresh raw milk harvested under clinical hygiene protocols.
          </p>
          <p className="text-sm text-gray-550 leading-relaxed">
            Today, our state-of-the-art Savar agro enclosure incorporates cutting-edge robotic milking facilities that completely eliminate manual human skin handling. We pasture raise our award-winning Dutch breed cows on rich alfalfa fodder grids, nourishing them with high-mineral crops free of synthetic feed, steroid compounds, or hormone boosters.
          </p>
        </div>

        {/* Scenic image stack */}
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-secondary/20 shadow-2xl bg-white p-3.5">
          <img
            src={GALLERY_IMAGES.farm1}
            alt="Tasnim herd cows grazing on Savar alfalfa pasture grids"
            className="w-full h-full object-cover rounded-xl"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-10 right-10 bg-primary text-white text-3xs font-extrabold px-4.5 py-2 rounded-lg leading-normal pr-5 shadow-lg border border-secondary/20">
            <span className="text-secondary text-base font-black align-middle mr-1">🌱</span>
            Savar Agro Complex, Dhaka
          </div>
        </div>
      </div>

      {/* Timeline Section / Mission and Vision bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div className="bg-primary hover:bg-primary-dark transition-all duration-300 text-white rounded-2xl p-8 shadow-sm space-y-4">
          <div className="p-3 bg-white/5 inline-flex rounded-xl text-secondary">
            <Eye size={22} />
          </div>
          <h3 className="font-display font-black text-lg tracking-wide uppercase">
            Our Farming Vision
          </h3>
          <p className="text-xs text-gray-200 leading-relaxed">
            To spearhead a nationwide revolution in agro-dairy processing by demonstrating that high-volume pasteurization can coexist with strict biological trace control, establishing sustainable ecological models where healthy pasture soils, ethical cattle care, and clinical hygiene combine to nourish communities transparently.
          </p>
        </div>

        <div className="bg-white hover:-translate-y-1 transition-all duration-300 rounded-2xl p-8 shadow-3xs border border-gray-100 space-y-4">
          <div className="p-3 bg-primary/5 inline-flex rounded-xl text-primary">
            <Milestone size={22} className="text-secondary" />
          </div>
          <h3 className="font-display font-black text-lg tracking-wide text-primary uppercase">
            Our Daily Mission
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            To deliver an elite biological food experience. We guarantee that every drop of milk, clay pot of dahi, and jar of golden ghee originates entirely within our micro-monitored herd pastures, bypassing third-party milk collectors, avoiding chemical stabilizers, and maintaining cold chain custody directly to the user's doorstep.
          </p>
        </div>
      </div>

      {/* Main Pillars of Trust */}
      <div className="space-y-10 pt-6">
        <div className="text-center space-y-2.5 max-w-xl mx-auto">
          <span className="text-secondary font-display font-extrabold text-xs tracking-wider uppercase">
            ESTABLISHED SYSTEM PROTOCOLS
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary">
            The Four Pillars of Tasnim Integrity
          </h2>
          <p className="text-xs text-gray-400">
            We adhere to clear corporate values that bridge luxury taste profile with clinical-grade safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-3xs border border-gray-100 flex gap-5 items-start hover:shadow-md transition-all duration-300"
            >
              <div className="p-3 bg-primary/5 rounded-xl shrink-0">
                {v.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-black text-gray-800 text-sm tracking-wide uppercase">
                  {v.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team signature block */}
      <div className="bg-secondary/10 hover:bg-secondary/15 transition-all rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-secondary/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 bg-white/20 rounded-full blur-xl" />
        <div className="space-y-4 relative z-10">
          <span className="text-secondary font-bold text-3xs tracking-widest uppercase">
            MEMBER OF BANGLADESH ORGANIC ASSOCIATION
          </span>
          <blockquote className="font-display text-base md:text-lg text-primary font-bold italic leading-relaxed max-w-xl mx-auto">
            "Organic farming isn't a marketing label for us; it is a profound covenant. Our family feeds our children the same fresh milk we dispatch to our Dhaka customers daily."
          </blockquote>
          <div className="flex flex-col items-center pt-2">
            <span className="font-semibold text-gray-800 text-xs">Tasnimul Hasan Chowdhury</span>
            <span className="text-5xs font-bold text-gray-400 tracking-widest uppercase mt-0.5">Founder & Managing Trustee, Tasnim Dairy Farm Group</span>
          </div>
        </div>
      </div>

    </div>
  );
};
