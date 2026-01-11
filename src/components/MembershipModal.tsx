"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

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

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed left-0 right-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      style={{ top: '4rem', bottom: 0 }}
    >
      <div 
        className={`bg-[#48007e] rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto transform transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
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

              {/* Contact Information */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/50 focus:outline-none focus:border-white transition pb-2"
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/50 focus:outline-none focus:border-white transition pb-2"
                  placeholder="Phone Number"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-3">
                  Street Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/50 focus:outline-none focus:border-white transition pb-2"
                  placeholder="Street Address"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-white text-white placeholder-white/50 focus:outline-none focus:border-white transition pb-2"
                    placeholder="Postal Code"
                  />
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-4">
                  Areas of Interest
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {["Worship", "Bible Study", "Youth Ministry", "Community Service"].map(
                    (interest) => (
                      <label key={interest} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleCheckboxChange(interest)}
                          className="w-4 h-4 rounded border-[#7c01cd] bg-white/20 text-white focus:ring-white"
                        />
                        <span className="ml-3 text-white/80 text-sm">{interest}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full px-6 py-3 bg-white text-[#48007e] font-semibold rounded-lg hover:bg-[#7c01cd] hover:text-white transition-colors mt-8"
              >
                Join Us
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipModal;
