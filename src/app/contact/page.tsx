"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Footer from "@/components/Footer";

const CustomAlert = ({
  show,
  title,
  message,
  onClose,
}: {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-[9999] px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-xl font-bold text-[#48007e] mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{message}</p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#48007e] text-white rounded-xl font-semibold hover:bg-[#7c01cd] transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [allowMotion, setAllowMotion] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const showAlert = (title: string, message: string) => {
    setAlert({ show: true, title, message });
  };

  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return showAlert("Required Fields", "Please fill in all required fields.");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        setLoading(false);
        return showAlert("Error", data.message || "Something went wrong.");
      }

      setFormData({
        name: "",
        email: "",
        organization: "",
        phone: "",
        message: "",
      });

      setLoading(false);
      showAlert("Message Sent", "Thank you for reaching out! We'll be in touch soon.");
    } catch (err) {
      console.error(err);
      setLoading(false);
      showAlert("Server Error", "Unable to send message at this time.");
    }
  };

  const contactInfo = [
    {
      type: "Email",
      value: "info@tcbc.ca",
      description: "General inquiries and support",
      icon: <Mail size={30} className="text-[#48007e]" />,
    },
    {
      type: "Phone",
      value: "(613) 555-0123",
      description: "Call us during service hours",
      icon: <Phone size={30} className="text-[#48007e]" />,
    },
    {
      type: "Location",
      value: "123 Faith Street, Ottawa, ON",
      description: "Visit us in person",
      icon: <MapPin size={30} className="text-[#48007e]" />,
    },
  ];

  const socialMedia = [
    {
      name: "Facebook",
      href: "https://web.facebook.com/profile.php?id=61571964212983",
      description: "Connect with us on Facebook",
      icon: faFacebook,
      color: "bg-blue-600 hover:bg-blue-800",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/tcbc_ottawa?igsh=MWtmd2doemwycHFn",
      description: "Follow us on Instagram",
      icon: faInstagram,
      color: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@tcbc_ottawa",
      description: "Subscribe to us on YouTube",
      icon: faYoutube,
      color: "bg-red-600 hover:bg-red-700",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Custom Alert */}
      <CustomAlert
        show={alert.show}
        title={alert.title}
        message={alert.message}
        onClose={closeAlert}
      />

      {/* Hero Section */}
      <section
        className="relative py-16 sm:py-24 overflow-hidden bg-gray-50 bg-cover bg-center"
        style={{ backgroundImage: "url('/bib-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#48007e]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Contact Us
          </h1>

          <p className="font-aeonik text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">
            Have questions or want to get involved? We'd love to hear from you. Reach out and let's connect.
          </p>

          <div className="w-20 sm:w-24 h-1 mx-auto bg-white" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-12 lg:gap-20 grid-cols-1 lg:grid-cols-[1.9fr_1fr]">
            {/* Form */}
            <div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 shadow-md">
                <h3 className="font-satoshi text-xl sm:text-2xl font-bold text-[#48007e] mb-4 sm:mb-6">
                  Get in Touch
                </h3>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Organization + Phone */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Organization
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                        placeholder="Organization (Optional)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                        placeholder="(613) 555-0000"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#48007e] text-white font-semibold rounded-xl hover:bg-[#7c01cd] transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="w-full mx-auto lg:mx-0 px-2 sm:px-0">
              <h3 className="font-satoshi text-2xl font-bold text-[#48007e] mb-6 text-center lg:text-left">
                Contact Information
              </h3>

              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition"
                  >
                    <div className="mt-0.5">{contact.icon}</div>
                    <div>
                      <h4 className="text-base font-bold text-[#48007e]">
                        {contact.type}
                      </h4>
                      <a
                        href={`mailto:${contact.value}`}
                        className="text-[#48007e] font-semibold hover:text-[#7c01cd]"
                      >
                        {contact.value}
                      </a>
                      <p className="text-sm text-gray-600 mt-1">
                        {contact.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Section */}
              <div className="pt-8 border-t border-gray-200">
                <h4 className="font-satoshi text-lg font-bold text-[#48007e] mb-5">
                  Connect With Us
                </h4>
                <div className="flex gap-4">
                  {socialMedia.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${social.color} hover:opacity-80 transition-all duration-300`}
                      title={social.description}
                      aria-label={social.name}
                    >
                      <FontAwesomeIcon
                        icon={social.icon}
                        className="w-5 h-5 text-white text-lg"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <div className="inline-block w-full px-6 py-6 bg-[#48007e] rounded-2xl shadow-lg">
                  <h3 className="font-satoshi text-xl text-white">
                    Fast Response Guarantee
                  </h3>
                  <p className="font-aeonik text-base text-gray-100 mt-1">
                    We respond within 24 hours during business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
