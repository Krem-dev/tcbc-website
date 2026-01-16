"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MembershipModal: React.FC<MembershipModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    interests: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);

  const ministries = [
    { _id: "1", name: "Children Teachers Ministry" },
    { _id: "2", name: "Facilities and Decor Ministry" },
    { _id: "3", name: "Technical Team" },
    { _id: "4", name: "Welcome Team" },
    { _id: "5", name: "Music Ministry" },
    { _id: "6", name: "Media Ministry" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        interests: [],
      });
    }, 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed left-0 right-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          onClick={handleBackdropClick}
          style={{ top: '4rem', bottom: 0 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#48007e] rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
            style={{ margin: 'auto' }}
          >
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#7c01cd] rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#48007e]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#7c01cd]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Welcome to TCBC!</h3>
              <p className="text-slate-300">
                Thank you for joining us. We'll be in touch soon with more information.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-8">Become a Member</h2>
              
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/50 focus:outline-none focus:border-white transition pb-2"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/50 focus:outline-none focus:border-white transition pb-2"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              {/* Phone Number - Required */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/50 focus:outline-none focus:border-white transition pb-2"
                  placeholder="Phone Number"
                />
              </div>

              {/* Email Address - Optional */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/50 focus:outline-none focus:border-white transition pb-2"
                  placeholder="Email Address"
                />
              </div>

              {/* City - Optional */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/50 focus:outline-none focus:border-white transition pb-2"
                  placeholder="City"
                />
              </div>

              {/* Areas of Interest */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-4">
                  Areas of Interest (Ministries)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {ministries.length > 0 ? (
                    ministries.map((ministry) => (
                      <label key={ministry._id} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(ministry.name)}
                          onChange={() => handleCheckboxChange(ministry.name)}
                          className="w-4 h-4 rounded accent-white"
                        />
                        <span className="ml-3 text-white/80 text-sm">{ministry.name}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-white/60 text-sm col-span-2">Loading ministries...</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-white text-[#48007e] font-semibold rounded-lg hover:bg-[#7c01cd] hover:text-white transition-colors mt-8"
              >
                Join Us
              </button>
            </form>
          )}
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MembershipModal;
