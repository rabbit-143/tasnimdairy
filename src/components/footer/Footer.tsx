import React from "react";
import { Link } from "react-router-dom";
import { useFarm } from "../../context/FarmContext";
import { LOGO } from "../../constants/assets";
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  const { settings } = useFarm();

  const businessHoursWeekdays = settings?.businessHoursWeekdays || "6:00 AM - 9:00 PM (Saturday - Thursday)";
  const businessHoursWeekends = settings?.businessHoursWeekends || "7:00 AM - 10:00 PM (Friday)";
  const businessHoursDelivery = settings?.businessHoursDelivery || "Fresh delivery runs daily: 7:00 AM - 11:30 AM";

  const email = settings?.email || "info@tasnimdairy.com";
  const phone = settings?.phone || "+880 1712-345678";
  const address = settings?.address || "Plot 42, Green Valley Agro Complex, Savar, Dhaka, Bangladesh";

  const socialLinks = {
    facebook: settings?.facebook || "https://facebook.com/tasnimdairyfarm",
    instagram: settings?.instagram || "https://instagram.com/tasnimdairyfarm",
    youtube: settings?.youtube || "https://youtube.com/tasnimdairyfarm",
    tiktok: settings?.tiktok || "https://tiktok.com/@tasnimdairyfarm"
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-secondary/15 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          
          {/* Logo & Brand Pitch */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src={LOGO}
                alt="Tasnim Dairy Farm Gold Emblem"
                className="h-14 w-auto rounded-full bg-white p-0.5 border border-secondary/25"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-white uppercase">
                  Tasnim
                </span>
                <span className="font-display font-semibold text-xs text-secondary tracking-widest uppercase">
                  Dairy Farm
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Serving the finest pasteurized milk, clay dahi, golden organic cow ghee, and delicious dairy sweets since 2018. Meticulously pasture raised, hygienic, and fresh.
            </p>
            
            {/* Social channels */}
            <div className="flex items-center space-x-4">
              {socialLinks.facebook && (
                <a
                  id="foot-facebook-link"
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-secondary hover:text-white hover:-translate-y-0.5 transition-all"
                  aria-label="Facebook Link"
                >
                  <Facebook size={18} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  id="foot-instagram-link"
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-secondary hover:text-white hover:-translate-y-0.5 transition-all"
                  aria-label="Instagram Link"
                >
                  <Instagram size={18} />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  id="foot-youtube-link"
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full text-secondary hover:text-white hover:-translate-y-0.5 transition-all"
                  aria-label="YouTube Link"
                >
                  <Youtube size={18} />
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  id="foot-tiktok-link"
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-secondary hover:text-white hover:-translate-y-0.5 font-bold text-xs transition-all flex items-center justify-center w-9.5 h-9.5"
                  aria-label="TikTok Link"
                >
                  🎶
                </a>
              )}
            </div>
          </div>

          {/* Useful Quicklinks */}
          <div>
            <h3 className="font-serif text-xl font-light text-white tracking-normal mb-6 border-b border-secondary/25 pb-2">
              Farm Links
            </h3>
            <ul className="space-y-3.5 text-xs text-gray-300">
              <li>
                <Link to="/" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">
                  <ArrowRight size={12} className="mr-2.5 text-secondary" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">
                  <ArrowRight size={12} className="mr-2.5 text-secondary" />
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">
                  <ArrowRight size={12} className="mr-2.5 text-secondary" />
                  About Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary hover:translate-x-1 transition-all flex items-center">
                  <ArrowRight size={12} className="mr-2.5 text-secondary" />
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Operational Hours */}
          <div>
            <h3 className="font-serif text-xl font-light text-white tracking-normal mb-6 border-b border-secondary/25 pb-2">
              Business Hours
            </h3>
            <ul className="space-y-4 text-xs text-gray-300">
              <li className="flex items-start">
                <Clock size={14} className="mr-3.5 mt-0.5 text-secondary flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white">Saturdays - Thursdays:</span>
                  <span>{businessHoursWeekdays}</span>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={14} className="mr-3.5 mt-0.5 text-secondary flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-white">Fridays (Weekend):</span>
                  <span>{businessHoursWeekends}</span>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={14} className="mr-3.5 mt-0.5 text-secondary flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-semibold text-secondary">Dispatch Window:</span>
                  <span className="text-secondary-light">{businessHoursDelivery}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-serif text-xl font-light text-white tracking-normal mb-6 border-b border-secondary/25 pb-2">
              Our Location
            </h3>
            <ul className="space-y-4.5 text-xs text-gray-350">
              <li className="flex items-start">
                <MapPin size={16} className="mr-3.5 mt-0.5 text-secondary flex-shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-3.5 text-secondary flex-shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-secondary text-white font-medium transition-all">
                  {phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-3.5 text-secondary flex-shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-secondary text-white transition-all underline decoration-secondary">
                  {email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment Gateways Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              We Securely Accept All Major Methods
            </span>
            <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
              {["bKash", "Nagad", "Rocket", "Upay", "EBL Bank"].map((p) => (
                <span
                  key={p}
                  className="border border-secondary/35 px-3 py-1 text-[10px] text-secondary font-display font-semibold tracking-widest uppercase hover:bg-white/5 transition-all"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center sm:text-right space-y-1 text-xs text-gray-400 font-medium">
            <p>&copy; {new Date().getFullYear()} Tasnim Dairy Farm. All Rights Reserved.</p>
            <p className="text-3xs text-secondary/70">
              Optimized for cPanel hosting. Structured for PHP & Laravel migrations.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
