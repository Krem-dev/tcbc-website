"use client";

import React, { useState } from "react";
import { Download, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";

interface FormData {
  firstName: string;
  lastName: string;
  preferredName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  phoneNumber: string;
  email: string;
  homeAddress: string;
  memberSince: string;
  heardAbout: string;
  acceptedJesus: boolean | null;
  baptizedWater: boolean | null;
  baptizedWaterYear: string;
  willingBaptism: string;
  baptizedHolySpirit: boolean | null;
  baptizedHolySpiritYear: string;
  willingHolySpirit: string;
  previousChurch: string;
  ministryInterests: string[];
  willingServe: boolean | null;
  willingPrayers: boolean | null;
  willingTithes: boolean | null;
  agreeTeachings: boolean | null;
  understandMembership: boolean | null;
  declarationAccepted: boolean;
  signature: string;
  date: string;
}

export default function MembershipPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    preferredName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    phoneNumber: "",
    email: "",
    homeAddress: "",
    memberSince: "",
    heardAbout: "",
    acceptedJesus: null,
    baptizedWater: null,
    baptizedWaterYear: "",
    willingBaptism: "",
    baptizedHolySpirit: null,
    baptizedHolySpiritYear: "",
    willingHolySpirit: "",
    previousChurch: "",
    ministryInterests: [],
    willingServe: null,
    willingPrayers: null,
    willingTithes: null,
    agreeTeachings: null,
    understandMembership: null,
    declarationAccepted: false,
    signature: "",
    date: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  const ministryOptions = [
    "Choir / Instrumentalists",
    "Media",
    "Children's Ministry",
    "Youth / Teens",
    "Evangelism / Outreach",
    "Welfare",
    "Social events",
    "Facilities, Logistics and Transportation",
    "Décor and housekeeping",
    "Marriage and counselling",
    "Ushering / Hospitality",
    "Intercessory / Prayer",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? true : false,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMinistryChange = (ministry: string) => {
    setFormData((prev) => ({
      ...prev,
      ministryInterests: prev.ministryInterests.includes(ministry)
        ? prev.ministryInterests.filter((m) => m !== ministry)
        : [...prev.ministryInterests, ministry],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: boolean } = {};

    if (!formData.firstName || !formData.firstName.trim()) newErrors.firstName = true;
    if (!formData.lastName || !formData.lastName.trim()) newErrors.lastName = true;
    if (!formData.dateOfBirth || formData.dateOfBirth.trim() === "") newErrors.dateOfBirth = true;
    if (!formData.gender || formData.gender.trim() === "") newErrors.gender = true;
    if (!formData.maritalStatus || formData.maritalStatus.trim() === "") newErrors.maritalStatus = true;
    if (!formData.phoneNumber || !formData.phoneNumber.trim()) newErrors.phoneNumber = true;
    if (!formData.email || !formData.email.trim()) newErrors.email = true;
    if (!formData.homeAddress || !formData.homeAddress.trim()) newErrors.homeAddress = true;
    if (!formData.heardAbout || formData.heardAbout.trim() === "") newErrors.heardAbout = true;
    if (formData.acceptedJesus !== true) newErrors.acceptedJesus = true;
    if (formData.baptizedWater === false && (!formData.willingBaptism || !formData.willingBaptism.trim())) newErrors.willingBaptism = true;
    if (formData.baptizedHolySpirit === false && (!formData.willingHolySpirit || !formData.willingHolySpirit.trim())) newErrors.willingHolySpirit = true;
    if (!formData.signature || !formData.signature.trim()) newErrors.signature = true;
    if (!formData.date || formData.date.trim() === "") newErrors.date = true;
    if (!formData.declarationAccepted) newErrors.declarationAccepted = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstErrorField = document.querySelector('[data-error="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `TCBC_Membership_${formData.firstName}_${formData.lastName}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section
        className="relative py-16 sm:py-24 bg-center bg-cover"
        style={{ backgroundImage: "url('/bib-4.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#48007e]/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Membership Application
          </h1>
          <p className="font-aeonik text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">
            Join The Chosen Bible Church community and grow in faith with us.
          </p>
          <div className="w-20 sm:w-24 h-1 mx-auto bg-white" />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-2 border-green-200 p-12 sm:p-16 text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="font-satoshi text-4xl font-bold text-gray-800 mb-4">
                Application Submitted Successfully!
              </h2>
              <p className="font-aeonik text-lg text-gray-600 mb-8">
                Your application has been submitted successfully. A church leader will contact you soon to schedule your membership orientation.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    preferredName: "",
                    dateOfBirth: "",
                    gender: "",
                    maritalStatus: "",
                    phoneNumber: "",
                    email: "",
                    homeAddress: "",
                    memberSince: "",
                    heardAbout: "",
                    acceptedJesus: false,
                    baptizedWater: false,
                    baptizedWaterYear: "",
                    willingBaptism: "",
                    baptizedHolySpirit: false,
                    baptizedHolySpiritYear: "",
                    willingHolySpirit: "",
                    previousChurch: "",
                    ministryInterests: [],
                    willingServe: false,
                    willingPrayers: false,
                    willingTithes: false,
                    agreeTeachings: false,
                    understandMembership: false,
                    declarationAccepted: false,
                    signature: "",
                    date: "",
                  });
                }}
                className="bg-[#48007e] text-white px-8 py-3 rounded-lg hover:bg-[#7c01cd] transition font-semibold"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-12 p-6 bg-[#48007e]/10 border-l-4 border-[#48007e] rounded-lg">
                <p className="font-aeonik text-gray-700 text-lg">
                  Kindly complete the following form if you are interested in being a member at The Chosen Bible Church (TCBC). You must be 18 years of age or older.
                </p>
              </div>

              <div className="space-y-12">
                <div>
                  <h3 className="font-satoshi text-3xl font-bold text-[#48007e] mb-8 pb-4 border-b-2 border-gray-200">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div data-error={errors.firstName ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full bg-transparent border-b-2 text-gray-800 placeholder-gray-400 focus:outline-none transition pb-2 ${
                          errors.firstName ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                        }`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">First name is required</p>}
                    </div>
                    <div data-error={errors.lastName ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full bg-transparent border-b-2 text-gray-800 placeholder-gray-400 focus:outline-none transition pb-2 ${
                          errors.lastName ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                        }`}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">Last name is required</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Name</label>
                      <input
                        type="text"
                        name="preferredName"
                        value={formData.preferredName}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                      />
                    </div>
                    <div data-error={errors.dateOfBirth ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Date of Birth *</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full bg-transparent border-b-2 text-gray-800 placeholder-gray-400 focus:outline-none transition pb-2 ${
                          errors.dateOfBirth ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                        }`}
                      />
                      {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">Date of birth is required</p>}
                    </div>
                    <div>
                      <label className="block font-aeonik font-semibold text-gray-700 mb-2">Gender *</label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleInputChange}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">Male</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleInputChange}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">Female</span>
                        </label>
                      </div>
                    </div>
                    <div data-error={errors.maritalStatus ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Marital Status *</label>
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        className={`w-full bg-transparent border-b-2 text-gray-800 focus:outline-none transition pb-2 ${
                          errors.maritalStatus ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                        }`}
                      >
                        <option value="">Select an option</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                      {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">Marital status is required</p>}
                    </div>
                    <div data-error={errors.phoneNumber ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Phone Number *</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full bg-transparent border-b-2 text-gray-800 placeholder-gray-400 focus:outline-none transition pb-2 ${
                          errors.phoneNumber ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                        }`}
                      />
                      {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">Phone number is required</p>}
                    </div>
                    <div data-error={errors.email ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-transparent border-b-2 text-gray-800 placeholder-gray-400 focus:outline-none transition pb-2 ${
                          errors.email ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">Email address is required</p>}
                    </div>
                    <div className="lg:col-span-3" data-error={errors.homeAddress ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Home Address *</label>
                      <input
                        type="text"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleInputChange}
                        className={`w-full bg-transparent border-b-2 text-gray-800 placeholder-gray-400 focus:outline-none transition pb-2 ${
                          errors.homeAddress ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                        }`}
                      />
                      {errors.homeAddress && <p className="text-red-500 text-xs mt-1">Home address is required</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-satoshi text-3xl font-bold text-[#48007e] mb-8 pb-4 border-b-2 border-gray-200">Church Information</h3>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Member Since (if applicable)</label>
                        <input
                          type="date"
                          name="memberSince"
                          value={formData.memberSince}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                        />
                      </div>
                      <div data-error={errors.heardAbout ? "true" : "false"}>
                        <label className="block text-sm font-medium text-gray-700 mb-3">How did you hear about TCBC? *</label>
                        <select
                          name="heardAbout"
                          value={formData.heardAbout}
                          onChange={handleInputChange}
                          className={`w-full bg-transparent border-b-2 text-gray-800 focus:outline-none transition pb-2 ${
                            errors.heardAbout ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                          }`}
                        >
                          <option value="">Select an option</option>
                          <option value="Friend or Family">Friend or Family</option>
                          <option value="Social Media">Social Media</option>
                          <option value="Website">Website</option>
                          <option value="Church Event">Church Event</option>
                          <option value="Community Outreach">Community Outreach</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.heardAbout && <p className="text-red-500 text-xs mt-1">Please select how you heard about TCBC</p>}
                      </div>
                    </div>

                    <div data-error={errors.acceptedJesus ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Have you accepted Jesus Christ as your Lord and Savior? *</label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="acceptedJesus"
                            value="true"
                            checked={formData.acceptedJesus === true}
                            onChange={() => setFormData((prev) => ({ ...prev, acceptedJesus: true }))}
                            className="mr-2"
                          />
                          <span className="font-aeonik">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="acceptedJesus"
                            value="false"
                            checked={formData.acceptedJesus === false}
                            onChange={() => setFormData((prev) => ({ ...prev, acceptedJesus: false }))}
                            className="mr-2"
                          />
                          <span className="font-aeonik">No</span>
                        </label>
                      </div>
                      {errors.acceptedJesus && <p className="text-red-500 text-xs mt-2">This field is required</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Have you been baptized in water by immersion? *</label>
                      <div className="flex gap-6 mb-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="baptizedWater"
                            value="true"
                            checked={formData.baptizedWater === true}
                            onChange={() => setFormData((prev) => ({ ...prev, baptizedWater: true }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="baptizedWater"
                            value="false"
                            checked={formData.baptizedWater === false}
                            onChange={() => setFormData((prev) => ({ ...prev, baptizedWater: false }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">No</span>
                        </label>
                      </div>
                      {formData.baptizedWater && (
                        <div className="ml-6 pl-4 border-l-2 border-gray-300">
                          <label className="block text-sm font-medium text-gray-700 mb-3">If Yes, provide the estimated year</label>
                          <input
                            type="text"
                            name="baptizedWaterYear"
                            value={formData.baptizedWaterYear}
                            onChange={handleInputChange}
                            placeholder="e.g., 2020"
                            className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                          />
                        </div>
                      )}
                      {!formData.baptizedWater && (
                        <div className="ml-6 pl-4 border-l-2 border-gray-300">
                          <label className="block text-sm font-medium text-gray-700 mb-3">If Not, are you willing to be baptized at the earliest opportunity?</label>
                          <input
                            type="text"
                            name="willingBaptism"
                            value={formData.willingBaptism}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Have you received the baptism in the Holy Spirit with the initial physical evidence of speaking in tongues? *</label>
                      <div className="flex gap-6 mb-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="baptizedHolySpirit"
                            value="true"
                            checked={formData.baptizedHolySpirit === true}
                            onChange={() => setFormData((prev) => ({ ...prev, baptizedHolySpirit: true }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="baptizedHolySpirit"
                            value="false"
                            checked={formData.baptizedHolySpirit === false}
                            onChange={() => setFormData((prev) => ({ ...prev, baptizedHolySpirit: false }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">No</span>
                        </label>
                      </div>
                      {formData.baptizedHolySpirit && (
                        <div className="ml-6 pl-4 border-l-2 border-gray-300">
                          <label className="block text-sm font-medium text-gray-700 mb-3">If Yes, provide the approximate year</label>
                          <input
                            type="text"
                            name="baptizedHolySpiritYear"
                            value={formData.baptizedHolySpiritYear}
                            onChange={handleInputChange}
                            placeholder="e.g., 2021"
                            className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                          />
                        </div>
                      )}
                      {!formData.baptizedHolySpirit && (
                        <div className="ml-6 pl-4 border-l-2 border-gray-300">
                          <label className="block text-sm font-medium text-gray-700 mb-3">If Not, are you willing to receive the baptism of the Holy Spirit?</label>
                          <input
                            type="text"
                            name="willingHolySpirit"
                            value={formData.willingHolySpirit}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Previous Church (if any)</label>
                      <input
                        type="text"
                        name="previousChurch"
                        value={formData.previousChurch}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-satoshi text-3xl font-bold text-[#48007e] mb-8 pb-4 border-b-2 border-gray-200">Ministry Interests (check all that apply)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ministryOptions.map((ministry) => (
                      <label key={ministry} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.ministryInterests.includes(ministry)}
                          onChange={() => handleMinistryChange(ministry)}
                          className="mr-3 w-4 h-4"
                        />
                        <span className="font-aeonik text-gray-700">{ministry}</span>
                      </label>
                    ))}
                    <div className="lg:col-span-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.ministryInterests.includes("Other")}
                          onChange={() => handleMinistryChange("Other")}
                          className="mr-3 w-4 h-4"
                        />
                        <span className="font-aeonik text-gray-700">Other:</span>
                      </label>
                      {formData.ministryInterests.includes("Other") && (
                        <input
                          type="text"
                          placeholder="Please specify"
                          className="w-full bg-transparent border-b-2 border-[#48007e] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#7c01cd] transition pb-2 mt-3"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-satoshi text-3xl font-bold text-[#48007e] mb-8 pb-4 border-b-2 border-gray-200">Availability and Commitment</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-aeonik font-semibold text-gray-700 mb-2">Are you willing to serve in the church? *</label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingServe"
                            value="true"
                            checked={formData.willingServe === true}
                            onChange={() => setFormData((prev) => ({ ...prev, willingServe: true }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingServe"
                            value="false"
                            checked={formData.willingServe === false}
                            onChange={() => setFormData((prev) => ({ ...prev, willingServe: false }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-aeonik font-semibold text-gray-700 mb-2">Will you support the Church with your faithful prayers (Ephesians 6:18) and attendance (Hebrews 10:25)? *</label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingPrayers"
                            value="true"
                            checked={formData.willingPrayers === true}
                            onChange={() => setFormData((prev) => ({ ...prev, willingPrayers: true }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingPrayers"
                            value="false"
                            checked={formData.willingPrayers === false}
                            onChange={() => setFormData((prev) => ({ ...prev, willingPrayers: false }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-aeonik font-semibold text-gray-700 mb-2">Are you willing to support the Church with tithes and offerings according to the scriptures? (Malachi 3:10, 1 Corinthians 16:2) *</label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingTithes"
                            value="true"
                            checked={formData.willingTithes === true}
                            onChange={() => setFormData((prev) => ({ ...prev, willingTithes: true }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="willingTithes"
                            value="false"
                            checked={formData.willingTithes === false}
                            onChange={() => setFormData((prev) => ({ ...prev, willingTithes: false }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">No</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-aeonik font-semibold text-gray-700 mb-2">Do you agree to uphold the Church's teachings and constitution, and refrain from engaging in or seeking support for activities or lifestyles the Church considers morally inappropriate? *</label>
                      <div className="flex gap-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="agreeTeachings"
                            value="true"
                            checked={formData.agreeTeachings === true}
                            onChange={() => setFormData((prev) => ({ ...prev, agreeTeachings: true }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="agreeTeachings"
                            value="false"
                            checked={formData.agreeTeachings === false}
                            onChange={() => setFormData((prev) => ({ ...prev, agreeTeachings: false }))}
                            className="mr-2"
                            required
                          />
                          <span className="font-aeonik">No</span>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg">
                      <p className="font-aeonik text-gray-700 mb-4">
                        By my response below, I acknowledge and accept the terms stated above. I agree that I will voluntarily surrender my membership, without causing discord among members or adherents, if at any time:
                      </p>
                      <ul className="list-disc list-inside space-y-2 font-aeonik text-gray-700 mb-4">
                        <li>I cease regular attendance at church services without providing an acceptable reason.</li>
                        <li>I am unable to work in harmony with TCBC due to personal convictions; or</li>
                        <li>I am found to be in violation of the membership requirements outlined in the Church Constitution.</li>
                      </ul>
                      <p className="font-aeonik text-gray-700 mb-4">
                        I further understand and acknowledge that failure to surrender my membership as described above may result in the suspension or termination of my membership in accordance with the Church Constitution.
                      </p>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="understandMembership"
                          checked={formData.understandMembership === true}
                          onChange={handleInputChange}
                          className="mr-3 w-4 h-4"
                        />
                        <span className="font-aeonik font-semibold text-gray-700">I agree to these terms *</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-satoshi text-3xl font-bold text-[#48007e] mb-8 pb-4 border-b-2 border-gray-200">Declaration</h3>
                  <p className="font-aeonik text-gray-700 mb-6">
                    I declare that the information provided above is accurate to the best of my knowledge. I understand that completion of this form indicates my willingness to undergo membership orientation and align with the doctrines and vision of TCBC.
                  </p>
                  <label className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      name="declarationAccepted"
                      checked={formData.declarationAccepted}
                      onChange={handleInputChange}
                      className="mr-3 w-4 h-4"
                      required
                    />
                    <span className="font-aeonik font-semibold text-gray-700">I declare the above information is accurate *</span>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div data-error={errors.signature ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Signature *</label>
                      <input
                        type="text"
                        name="signature"
                        value={formData.signature}
                        onChange={handleInputChange}
                        placeholder="Type your full name as signature"
                        className={`w-full bg-transparent border-b-2 text-gray-800 placeholder-gray-400 focus:outline-none transition pb-2 ${
                          errors.signature ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                        }`}
                      />
                      {errors.signature && <p className="text-red-500 text-xs mt-1">Signature is required</p>}
                    </div>
                    <div data-error={errors.date ? "true" : "false"}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`w-full bg-transparent border-b-2 text-gray-800 placeholder-gray-400 focus:outline-none transition pb-2 ${
                          errors.date ? "border-red-500 focus:border-red-600" : "border-[#48007e] focus:border-[#7c01cd]"
                        }`}
                      />
                      {errors.date && <p className="text-red-500 text-xs mt-1">Date is required</p>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t-2 border-gray-200 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#48007e] text-white px-8 py-4 rounded-lg hover:bg-[#7c01cd] transition font-semibold font-satoshi text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
