export interface ContactConfig {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapUrl: string;
  googleMapEmbedUrl: string;
  businessHours: {
    weekdays: string;
    weekends: string;
    delivery: string;
  };
}

export const contactConfig: ContactConfig = {
  phone: "+880 1712-345678",
  whatsapp: "https://wa.me/8801712345678",
  email: "info@tasnimdairy.com",
  address: "Plot 42, Green Valley Agro Complex, Savar, Dhaka, Bangladesh",
  googleMapUrl: "https://maps.google.com/?q=Savar+Dhaka",
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58367.62580436856!2d90.2315729!3d23.8967912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebd32049e377%3A0xb35e38d781b2bf8b!2sSavar!5e0!3m2!1sen!2sbd!4v1718228394461!5m2!1sen!2sbd",
  businessHours: {
    weekdays: "6:00 AM - 9:00 PM (Saturday - Thursday)",
    weekends: "7:00 AM - 10:00 PM (Friday)",
    delivery: "Fresh delivery runs daily: 7:00 AM - 11:30 AM"
  }
};
