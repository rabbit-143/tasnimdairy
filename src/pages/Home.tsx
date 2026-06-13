import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFarm } from "../context/FarmContext";
import { useCart } from "../context/CartContext";
import { HERO_IMAGES, GALLERY_IMAGES } from "../constants/assets";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Truck,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star
} from "lucide-react";

export const Home: React.FC = () => {
  const { products, settings } = useFarm();
  const { addToCart } = useCart();

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: HERO_IMAGES.hero1,
      title: "Pure Pasture Sourced Organic Dairy",
      subtitle: "FROM NATURAL PASTURES DIRECT TO YOUR TABLE",
      desc: "Experience pure pasteurized milk, traditional clay-pot curd, and premium churned ghee crafted using cutting-edge hygienic automated milking processes."
    },
    {
      image: HERO_IMAGES.hero2,
      title: "Granular Golden Cow Ghee",
      subtitle: "GOLD STANDARD TRADITIONAL BOILING",
      desc: "Slow-rendered from pasture-grazed cultured cream. Features the iconic nutty aroma and crystalline granules that elevate Bangladeshi traditional cuisines."
    },
    {
      image: HERO_IMAGES.hero3,
      title: "Bengali Artisanal Sweets Portfolios",
      subtitle: "MADE FROM PURE FRESH COW CHHANA",
      desc: "Hand-kneaded Bengali sweet treats from fresh-to-pasteurize dairy whey. Handcrafted with zero industrial artificial additives for clean, guilt-free bliss."
    }
  ];

  // Auto Rotate Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Filter Featured Products
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);

  // Statistics database
  const stats = [
    { value: "180+", label: "Award Grazing Stock", detail: "Purebred Holstein-Friesian cows" },
    { value: "1,500 L", label: "Fresh Daily Yield", detail: "Chilled and tested immediately" },
    { value: "12,000+", label: "Families Served", detail: "Direct delivery chain network" },
    { value: "100%", label: "Traceable Chain", detail: "No artificial hormones or urea" }
  ];

  // Highlights
  const highlights = [
    {
      icon: <ShieldCheck size={28} className="text-secondary" />,
      title: "100% Robotic Hygiene",
      desc: "Automated milking vacuum lines avoid any direct human skin touch, preserving original fresh purity."
    },
    {
      icon: <Sparkles size={28} className="text-secondary" />,
      title: "Pasture Fodder Only",
      desc: "Our herd grazes on high-mineral alfalfa crop pasture. Contains no steroid boosters or urea compounds."
    },
    {
      icon: <Truck size={28} className="text-secondary" />,
      title: "Cold Chain Assurance",
      desc: "Refrigerated transit vans retain constant 4°C state from milk parlor tanks directly to your neighborhood."
    },
    {
      icon: <Heart size={28} className="text-secondary" />,
      title: "Artisanal Integrity",
      desc: "Handcrafted ghee boils and sweet churning from traditional family recipes passed down generations."
    }
  ];

  // Reviews List
  const testimonials = [
    {
      name: "Sultana Jahan Chowdhury",
      role: "Mothers Association Chair, Banani",
      content: "Finding genuine unadulterated milk for children in Dhaka is so stress-relieving! Tasnim Dairy's milk is incredibly creamy and sweet. Their clay-pot curd is majestic, reminiscent of rural Bogra curd.",
      rating: 5
    },
    {
      name: "Chef Imtiaz Kabir",
      role: "Luxury Fusion Bistro Group, Gulshan",
      content: "Their granular cow ghee carries an exquisite aroma that is unparalleled in commercial brands. It makes our biryanis and polao absolute masterpieces. High recommendation to all master cuisines.",
      rating: 5
    },
    {
      name: "Dr. Rakibul Hasan",
      role: "Clinical Nutrition Specialist, Apollo Health",
      content: "I recommend organic grass-fed dairy to families concerned about steroid residues in commercial milk. Tasnim Farm's clinical trace assurance makes them the gold standard in organic cow dairy in Bangladesh.",
      rating: 5
    }
  ];

  return (
    <div id="home-view" className="w-full pb-2 animate-fade-in">
      
      {/* SECTION 1: HERO IMAGE SLIDER */}
      <section id="hero-slider" className="relative h-[600px] md:h-[680px] bg-primary-dark overflow-hidden flex items-center">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-95 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Dark contrast image screen overlay */}
            <div className="absolute inset-0 bg-primary-dark/45 bg-gradient-to-r from-primary-dark/80 via-primary-dark/40 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover scale-100 transition-transform duration-[6000ms] ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Slider Content */}
            <div className="absolute inset-0 z-20 flex items-center pr-0 lg:pr-[33.333%]">
              <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 w-full">
                <div className="max-w-2xl space-y-6">
                  <span className="inline-block text-secondary font-display font-semibold text-xs tracking-[0.4em] uppercase">
                    {slide.subtitle}
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-[64px] font-serif leading-[1.1] text-white tracking-normal font-light">
                    {slide.title.includes("Organic Dairy") ? (
                      <>
                        Pure Pasture <br/>
                        <span className="italic font-light text-farm-cream">Sourced Organic Dairy</span>
                      </>
                    ) : slide.title.includes("Cow Ghee") ? (
                      <>
                        Granular Golden <br/>
                        <span className="italic font-light text-farm-cream">Cow Ghee Purity</span>
                      </>
                    ) : (
                      <>
                        Bengali Artisanal <br/>
                        <span className="italic font-light text-farm-cream">Sweets Portfolio</span>
                      </>
                    )}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-md font-sans font-light">
                    {slide.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      id="hero-btn-products"
                      to="/products"
                      className="bg-primary text-secondary border border-secondary font-display font-bold py-4 px-8 rounded-none text-center hover:bg-secondary hover:text-primary transition-all text-xs uppercase tracking-[0.2em]"
                    >
                      Shop The Collection
                    </Link>
                    <Link
                      to="/about"
                      className="border border-white/30 text-white font-display font-medium py-4 px-8 rounded-none text-center hover:bg-white/10 transition-all text-xs uppercase tracking-[0.2em]"
                    >
                      Visit Our Farm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Floating Right Glass Statistics Sidebar */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/70 backdrop-blur-md border-l border-secondary/20 p-12 hidden lg:flex flex-col justify-end z-25 text-farm-text">
          <div className="mb-10">
            <div className="text-3xl font-display font-bold bg-primary text-[#FDFBF7] inline-block px-3 py-1 mb-2">100%</div>
            <p className="text-sm uppercase tracking-widest font-bold text-primary font-display">Grass-Fed Cattle</p>
            <p className="text-xs text-farm-text/75 mt-1 font-sans">No antibiotics, growth promoters, or synthetic hormones.</p>
          </div>
          <div className="mb-10">
            <div className="text-3xl font-display font-bold bg-primary text-[#FDFBF7] inline-block px-3 py-1 mb-2">24hr</div>
            <p className="text-sm uppercase tracking-widest font-bold text-primary font-display">Farm to Table</p>
            <p className="text-xs text-farm-text/75 mt-1 font-sans">Fresh chilled daily cycles directly to your neighborhood.</p>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 text-white/70 hover:text-white bg-primary/45 hover:bg-primary transition-all rounded-full border border-white/10 focus:outline-none"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-[calc(4px+33.333%)] hidden lg:block top-1/2 -translate-y-1/2 z-30 p-2.5 text-white/70 hover:text-white bg-primary/45 hover:bg-primary transition-all rounded-full border border-white/10 focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>
        {/* Fallback right controls for smaller screens */}
        <button
          onClick={handleNextSlide}
          className="absolute right-4 lg:hidden top-1/2 -translate-y-1/2 z-30 p-2.5 text-white/70 hover:text-white bg-primary/45 hover:bg-primary transition-all rounded-full border border-white/10 focus:outline-none"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} />
        </button>

        {/* Bullet Indicator gauges */}
        <div className="absolute bottom-6 left-6 md:left-20 z-30 flex space-x-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all border border-white/20 ${
                idx === currentSlide ? "bg-secondary w-8" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: PROMO BANNER GRAPHICS CARDS */}
      <section id="banner-offer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-4">
        <div className="bg-[#FDFBF7] border border-[#D4AF37] text-primary p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
          {/* Subtle overlay */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
          
          <div className="space-y-3 z-10 flex-grow text-center md:text-left">
            <span className="bg-primary text-secondary text-[10px] font-semibold px-3 py-1 uppercase tracking-[0.2em]">
              Exclusive Delivery Promotion
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight leading-tight pt-1">
              {settings?.bannerText || "Enjoy Fresh Organic Deliveries Directly to your Gate!"}
            </h2>
            <p className="text-xs sm:text-sm text-farm-text/80 font-sans max-w-xl">
              Get raw, unadulterated cow milk, local clay pot curd, and special ghee with instant dispatch!
            </p>
          </div>
          <Link
            id="promo-shop-link"
            to="/products"
            className="bg-primary text-secondary border border-secondary font-display font-bold py-4 px-8 rounded-none transition-all text-xs tracking-[0.2em] uppercase flex items-center space-x-2 shrink-0 z-10 hover:bg-secondary hover:text-primary"
          >
            <span>Book Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* SECTION 3: FEATURED PRODUCTS GRID */}
      <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-secondary font-display font-semibold text-xs tracking-[0.3em] uppercase bg-secondary/10 px-4 py-1">
            Naturally Rich & Organic
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-primary tracking-normal font-light">
            Our Premium Farm Catalog
          </h2>
          <p className="text-xs sm:text-sm text-farm-text/75 leading-relaxed font-sans max-w-lg mx-auto">
            Delve into delicious organic dairy highlights harvested daily under highly secure clinical conditions on our custom farm.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featured.map((p) => (
            <div
              key={p.id}
              className="group bg-[#FDFBF7] border border-secondary/20 overflow-hidden flex flex-col hover:bg-white transition-all duration-300"
            >
              {/* Product Card Image container */}
              <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-secondary/10">
                <span className="absolute top-3 left-3 bg-primary text-secondary font-display font-semibold text-[9px] py-1 px-2.5 uppercase tracking-wider">
                  Featured
                </span>
                {p.stock === 0 && (
                  <span className="absolute inset-0 bg-white/70 backdrop-blur-3xs z-10 flex items-center justify-center font-bold text-gray-400 uppercase text-xs">
                    SOLD OUT
                  </span>
                )}
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card Meta details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-secondary font-bold uppercase tracking-widest">Category: {p.category}</div>
                  <h3 className="text-xl font-serif font-semibold text-primary mt-1 group-hover:text-secondary transition-colors line-clamp-1">
                    {p.name}
                  </h3>
                  <p className="text-xs text-farm-text/75 line-clamp-2 h-8 mt-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-secondary/10 mt-4">
                  <div className="flex flex-col">
                    <span className="text-base bg-primary text-secondary px-2.5 py-0.5 inline-block font-display font-semibold w-fit leading-none">
                      ৳ {p.price}
                    </span>
                    <span className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider">
                      per {p.unit}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(p, 1)}
                    disabled={p.stock === 0}
                    className={`text-[10px] font-semibold uppercase tracking-widest ${
                      p.stock === 0
                        ? "text-gray-300 pointer-events-none"
                        : "text-primary hover:text-secondary transition-colors font-display"
                    }`}
                  >
                    Quick Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            id="view-catalog-link"
            to="/products"
            className="inline-flex items-center space-x-2 text-primary hover:text-secondary font-display font-extrabold text-sm tracking-widest uppercase transition-all"
          >
            <span>Explore Complete Farm catalog</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US (BENTO CONVENTION STYLE) */}
      <section id="why-choose-us" className="bg-primary text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Abstract design elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-secondary font-display font-semibold text-xs tracking-[0.3em] uppercase">
              No Compromises on Health
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-normal font-light">
              Why Tasnim Dairy Excels
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans font-light">
              We marry traditional dairy passion with state-of-the-art automatic production protocols to bring pure freshness under absolute clinical hygiene.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-white/[0.02] border border-white/10 hover:border-secondary/35 hover:bg-white/[0.05] p-8 rounded-none transition-all duration-300 text-center space-y-4"
              >
                <div className="inline-flex p-3 bg-white/5 border border-secondary/20 text-secondary">
                  {h.icon}
                </div>
                <h3 className="font-serif text-white text-lg font-light">
                  {h.title}
                </h3>
                <p className="text-xs text-gray-350 leading-relaxed font-sans font-light">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: LIVE STATISTICS KPI METRICS */}
      <section id="statistics-counter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="bg-[#FDFBF7] border border-secondary/20 p-8 sm:p-14 flex flex-col md:flex-row justify-between items-center gap-10">
          {stats.map((s, idx) => (
            <div key={idx} className="flex-1 text-center space-y-1.5 relative w-full">
              {idx > 0 && (
                <div className="hidden md:block absolute -left-5 top-1/2 -translate-y-1/2 w-0.5 h-12 bg-secondary/15" />
              )}
              <h3 className="text-4xl sm:text-5xl font-serif font-light text-primary leading-none">
                {s.value}
              </h3>
              <p className="font-display font-semibold text-[11px] text-secondary tracking-[0.2em] uppercase">
                {s.label}
              </p>
              <p className="text-[10px] text-gray-400 font-sans tracking-wide uppercase">
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: DESIGNER AESTHETIC FARM GALLERY */}
      <section id="gallery-carousel" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-secondary/10 pb-5">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-secondary font-display font-semibold text-xs tracking-[0.3em] uppercase">
              Our Modern Farm Atmosphere
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-primary tracking-normal font-light col">
              Life at Tasnim Meadows
            </h2>
          </div>
          <p className="text-xs text-gray-450 max-w-xs text-center sm:text-right leading-relaxed font-sans font-light">
            Catch fresh highlights from our pasture rotations, milking parlor facility, and sweet processing lab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-4/3 overflow-hidden border border-secondary/20 group">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/5 transition-all duration-300 z-10" />
            <img
              src={GALLERY_IMAGES.farm1}
              alt="Hygienic Cow Barn"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-4 left-4 z-20 font-display font-semibold text-[10px] text-white uppercase tracking-widest bg-primary border border-secondary/20 py-1.5 px-3">
              Pasture Rotations
            </span>
          </div>

          <div className="relative aspect-4/3 overflow-hidden border border-secondary/20 group">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/5 transition-all duration-300 z-10" />
            <img
              src={GALLERY_IMAGES.farm2}
              alt="Automatic parlor milking pipelines"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-4 left-4 z-20 font-display font-semibold text-[10px] text-white uppercase tracking-widest bg-primary border border-secondary/20 py-1.5 px-3">
              Automated Milking Parlor
            </span>
          </div>

          <div className="relative aspect-4/3 overflow-hidden border border-secondary/20 group">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/5 transition-all duration-300 z-10" />
            <img
              src={GALLERY_IMAGES.farm3}
              alt="Artisanal boiling process"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-4 left-4 z-20 font-display font-semibold text-[10px] text-white uppercase tracking-widest bg-primary border border-secondary/20 py-1.5 px-3">
              Gold Boiling Ghee Lab
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 7: CUSTOMER REVIEWS CAROUSEL */}
      <section id="reviews-carousel" className="bg-[#1E3E2B]/5 border-t border-b border-secondary/15 py-16 sm:py-20 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2.5 max-w-xl mx-auto">
            <span className="text-secondary font-display font-semibold text-xs tracking-[0.3em] uppercase">
              Reviews Portfolio
            </span>
            <h2 className="text-3xl font-serif text-primary tracking-normal font-light">
              Trusted by Local Families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#FDFBF7] p-6 sm:p-8 border border-secondary/20 rounded-none flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex text-amber-500 space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-farm-text/80 leading-relaxed font-serif italic font-light">
                    "{t.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-secondary/10 flex flex-col mt-6">
                  <span className="font-display font-semibold text-xs text-primary uppercase tracking-wider">
                    {t.name}
                  </span>
                  <span className="text-[9px] font-semibold text-secondary uppercase tracking-widest mt-0.5">
                    {t.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: CONTACT CTA SECTION */}
      <section id="home-cta" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center space-y-6">
        <h2 className="text-3xl font-serif font-light text-primary tracking-normal">
          Want to Visit Our Pastures? Or Place bulk bookings?
        </h2>
        <p className="text-xs sm:text-sm text-farm-text/75 max-w-lg mx-auto leading-relaxed font-sans font-light">
          We organize guided pasteurization tours for schools, clinical nutritionists, and families. Or reach our bulk team for institutional sweet-making contracts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link
            id="cta-contact-link"
            to="/contact"
            className="bg-primary text-secondary border border-secondary font-display font-bold py-4 px-8 rounded-none text-xs uppercase tracking-[0.2em] hover:bg-secondary hover:text-primary transition-all text-center"
          >
            Locate Farm & Contact
          </Link>
          <a
            href="https://wa.me/8801712345678"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/20 text-primary py-4 px-8 font-display font-bold rounded-none text-xs uppercase tracking-[0.2em] hover:bg-primary/5 transition-all flex items-center justify-center space-x-2"
          >
            <span>WhatsApp Quickchat</span>
          </a>
        </div>
      </section>

    </div>
  );
};
