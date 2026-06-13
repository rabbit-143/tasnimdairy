import React, { useState } from "react";
import { useFarm } from "../context/FarmContext";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export const Contact: React.FC = () => {
  const { settings } = useFarm();

  const phone = settings?.phone || "+880 1712-345678";
  const whatsapp = settings?.whatsapp || "https://wa.me/8801712345678";
  const email = settings?.email || "info@tasnimdairy.com";
  const address = settings?.address || "Plot 42, Green Valley Agro Complex, Savar, Dhaka, Bangladesh";
  const mapEmbedUrl = settings?.googleMapUrl ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58367.62580436856!2d90.2315729!3d23.8967912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebd32049e377%3A0xb35e38d781b2bf8b!2sSavar!5e0!3m2!1sen!2sbd!4v1718228394461!5m2!1sen!2sbd" : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58367.62580436856!2d90.2315729!3d23.8967912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebd32049e377%3A0xb35e38d781b2bf8b!2sSavar!5e0!3m2!1sen!2sbd!4v1718228394461!5m2!1sen!2sbd";

  const weekdays = settings?.businessHoursWeekdays || "6:00 AM - 9:00 PM (Saturday - Thursday)";
  const weekends = settings?.businessHoursWeekends || "7:00 AM - 10:00 PM (Friday)";
  const delivery = settings?.businessHoursDelivery || "Fresh delivery runs daily: 7:00 AM - 11:30 AM";

  // Form states
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [subject, setSubject] = useState("Sales");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(false);

    if (!name.trim()) return setFormError("Corporate or Personal Name is required");
    if (!senderEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setFormError("Enter a valid email address");
    if (!senderPhone.match(/^[0-9+-\s]{10,15}$/)) return setFormError("Provide a valid contact phone number");
    if (message.length < 10) return setFormError("Message details must be at least 10 characters long");

    setSending(true);
    // Simulate API transport wait
    await new Promise(resolve => setTimeout(resolve, 800));
    setSending(false);
    setFormSuccess(true);
    
    // Clear state inputs
    setName("");
    setSenderEmail("");
    setSenderPhone("");
    setSubject("Sales");
    setMessage("");
  };

  return (
    <div id="contact-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 animate-fade-in">
      
      {/* Narrative block */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <span className="text-secondary font-display font-extrabold text-xs tracking-widest uppercase bg-secondary/10 px-3.5 py-1.5 rounded-full border border-secondary/15">
          Active Support Lines
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-primary tracking-tight">
          Interact with our Pastures
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          Reach our Savar headquarters, submit order inquiries, schedule bulk corporate milk contracts, or coordinate guided pasteurization tours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
        
        {/* PANEL 1: INQUIRY ENTRY FORM PANEL */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 sm:p-10 shadow-3xs flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
              <div className="p-2.5 bg-primary/5 rounded-xl text-primary">
                <MessageSquare size={20} className="text-secondary" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-gray-800 text-sm">
                  Send a Secure inquiry
                </h3>
                <p className="text-3xs text-gray-400">
                  Our customer service coordinator evaluates and replies within 12 business hours.
                </p>
              </div>
            </div>

            {formSuccess && (
              <div className="p-4 bg-green-50 text-green-700 border border-green-150 rounded-xl text-xs font-semibold flex items-center space-x-3.5 shadow-3xs">
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                <span>Your organic farm inquiry was transmitted safely! Our coordinator is reviewing your details.</span>
              </div>
            )}

            {formError && (
              <div className="p-3 bg-red-50 text-red-650 border border-red-100 rounded-xl text-xs font-bold">
                ⚠️ {formError}
              </div>
            )}

            <form onSubmit={handleInquirySubmit} className="space-y-4 grid grid-cols-1 select-text">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">YOUR NAME</label>
                  <input
                    type="text"
                    className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="e.g. Tanvir Alam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="name@email.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">PHONE NUMBER</label>
                  <input
                    type="tel"
                    className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 focus:bg-white focus:border-primary focus:outline-none"
                    placeholder="01712xxxxxx"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">TOPIC CATEGORY</label>
                <select
                  className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 focus:bg-white focus:border-primary focus:outline-none"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="Sales">Fresh Home Deliveries & Sales</option>
                  <option value="Bulk">Bulk Commercial Sweet Milk Inquiries</option>
                  <option value="Tours">Guided Cattle Pasture Tours</option>
                  <option value="Complaints">Hygienic standard feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-3xs font-extrabold text-gray-400 mb-1 tracking-wider">MESSAGE CONTENT</label>
                <textarea
                  rows={4}
                  className="w-full text-xs font-semibold bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 focus:bg-white focus:border-primary focus:outline-none"
                  placeholder="Detail your requirements, booking questions or delivery coordinates..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="bg-primary hover:bg-primary-light text-white font-display text-xs font-semibold tracking-widest uppercase py-3 px-6 rounded-xl hover:-translate-y-0.5 transition-all shadow-md flex items-center justify-center space-x-2 shrink-0 self-start"
              >
                {sending ? (
                  <span>Transmitting inquiry...</span>
                ) : (
                  <>
                    <Send size={13} className="text-secondary" />
                    <span>Send farm Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* PANEL 2: CONTACT DETAILS & TIMINGS INFO PANEL */}
        <div className="bg-primary text-white rounded-2xl p-6 sm:p-8 space-y-8 flex flex-col justify-between relative overflow-hidden border border-secondary/15">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 rounded-full blur-2xl" />

          <div className="space-y-6 z-10">
            <h3 className="font-display font-bold text-md text-secondary tracking-widest uppercase pb-2 border-b border-white/10">
              Direct Channels
            </h3>
            
            <ul className="space-y-5 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3.5 mt-0.5 text-secondary flex-shrink-0" />
                <div className="space-y-1">
                  <span className="font-semibold block text-white">Agro Complex Headquarters:</span>
                  <span className="text-xs text-gray-300 leading-normal">{address}</span>
                </div>
              </li>

              <li className="flex items-start">
                <Phone size={18} className="mr-3.5 mt-0.5 text-secondary flex-shrink-0" />
                <div className="space-y-1">
                  <span className="font-semibold block text-white">Call center Desk:</span>
                  <a href={`tel:${phone}`} className="text-secondary hover:text-white font-bold transition-all text-xs">
                    {phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <Mail size={18} className="mr-3.5 mt-0.5 text-secondary flex-shrink-0" />
                <div className="space-y-1">
                  <span className="font-semibold block text-white">Official Mailbox:</span>
                  <a href={`mailto:${email}`} className="text-xs hover:text-secondary text-gray-300 underline decoration-secondary">
                    {email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-5 z-10 border-t border-white/10 pt-6">
            <h4 className="font-display font-extrabold text-xs text-secondary-light tracking-wide uppercase flex items-center">
              <Clock size={14} className="mr-2" />
              Timing Windows
            </h4>
            <div className="text-xs text-gray-300 space-y-2 leading-relaxed">
              <div>
                <span className="text-white font-semibold">Saturdays - Thursdays:</span>
                <p>{weekdays}</p>
              </div>
              <div>
                <span className="text-white font-semibold">Fridays (Weekend):</span>
                <p>{weekends}</p>
              </div>
              <div className="bg-white/5 p-2.5 rounded border border-white/5">
                <span className="text-secondary font-semibold">Dispatch Window:</span>
                <p className="text-3xs text-secondary-light">{delivery}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Google Maps Satellite Embed section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-gray-150 pb-4">
          <div className="text-center sm:text-left space-y-0.5">
            <h3 className="font-display font-extrabold text-primary text-md">
              Google Maps Location Satellite
            </h3>
            <p className="text-3xs text-gray-400 font-bold uppercase tracking-wider">
              Green Complex, Savar Area, Dhaka Suburban Belt
            </p>
          </div>
          <a
            href={settings?.googleMapUrl || "https://maps.google.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xs font-extrabold tracking-widest text-primary hover:text-secondary uppercase transition-all bg-white shadow-soft py-2 px-4 border border-gray-105 rounded-full"
          >
            Launch on Google Maps App
          </a>
        </div>

        <div className="w-full h-[350px] sm:h-[450px] rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 shadow-inner group relative">
          <iframe
            title="Tasnim Dairy Google Map Savar Location"
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

    </div>
  );
};
