"use client";

import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
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
  ministryOther: string;
  completedClasses: boolean | null;
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
    ministryOther: "",
    completedClasses: null,
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

  const ministryOptions = [
    "Choir / Instrumentalists",
    "Media",
    "Children's Ministry",
    "Youth / Teens",
    "Evangelism / Outreach",
    "Welfare",
    "Social events",
    "Facilities, Logistics and Transportation",
    "Decor and housekeeping",
    "Marriage and counselling",
    "Ushering / Hospitality",
    "Intercessory / Prayer",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Download the generated PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `TCBC_Membership_${formData.firstName}_${formData.lastName}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-transparent border-b-2 border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#48007e] transition py-2 mb-4";

  const YesNoRadio = ({ name, value, onChange }: { name: string; value: boolean | null; onChange: (val: boolean) => void }) => (
    <div className="flex gap-6">
      <label className="flex items-center cursor-pointer">
        <input type="radio" name={name} checked={value === true} onChange={() => onChange(true)} className="mr-2 accent-[#48007e]" />
        <span className="font-aeonik">Yes</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input type="radio" name={name} checked={value === false} onChange={() => onChange(false)} className="mr-2 accent-[#48007e]" />
        <span className="font-aeonik">No</span>
      </label>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
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
            <div className="bg-green-50 rounded-2xl border-2 border-green-200 p-12 sm:p-16 text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="font-satoshi text-4xl font-bold text-gray-800 mb-4">
                Application Submitted!
              </h2>
              <p className="font-aeonik text-lg text-gray-600 mb-8">
                Your application has been submitted successfully. A church leader will contact you soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    firstName: "", lastName: "", preferredName: "", dateOfBirth: "", gender: "",
                    maritalStatus: "", phoneNumber: "", email: "", homeAddress: "", memberSince: "",
                    heardAbout: "", acceptedJesus: null, baptizedWater: null, baptizedWaterYear: "",
                    willingBaptism: "", baptizedHolySpirit: null, baptizedHolySpiritYear: "",
                    willingHolySpirit: "", previousChurch: "", ministryInterests: [], ministryOther: "",
                    completedClasses: null, willingServe: null, willingPrayers: null, willingTithes: null,
                    agreeTeachings: null, understandMembership: null, declarationAccepted: false,
                    signature: "", date: "",
                  });
                }}
                className="bg-[#48007e] text-white px-8 py-3 rounded-lg hover:bg-[#7c01cd] transition font-semibold"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Intro */}
              <div className="mb-10 p-5 bg-[#48007e]/5 border-l-4 border-[#48007e] rounded-r-lg">
                <p className="font-aeonik text-gray-700">
                  Kindly complete the following form if you are interested in being a member at The Chosen Bible Church (TCBC). You must be 18 years of age or older.
                </p>
              </div>

              {/* ========== PART I ========== */}
              <div className="mb-16">
                <div className="mb-10">
                  <h2 className="font-satoshi text-2xl sm:text-3xl font-bold text-[#48007e] mb-1">Part I</h2>
                  <p className="font-aeonik text-gray-500">Pre-membership class information</p>
                  <div className="w-16 h-1 bg-[#48007e] mt-3" />
                </div>

                {/* Personal Information */}
                <div className="mb-12">
                  <h3 className="font-satoshi text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                    Personal Information
                  </h3>
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Preferred Name</label>
                        <input type="text" name="preferredName" value={formData.preferredName} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Date of Birth (Date and Month)</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className={inputClass} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Gender</label>
                        <div className="flex gap-6 py-2 border-b-2 border-gray-300 mb-4">
                          <label className="flex items-center cursor-pointer">
                            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleInputChange} className="mr-2 accent-[#48007e]" />
                            <span className="font-aeonik">Male</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleInputChange} className="mr-2 accent-[#48007e]" />
                            <span className="font-aeonik">Female</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Marital Status</label>
                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} className={inputClass}>
                          <option value="">Select</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Home Address</label>
                      <input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleInputChange} className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Church Information */}
                <div className="mb-12">
                  <h3 className="font-satoshi text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                    Church Information
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Member Since (if applicable)</label>
                        <input type="text" name="memberSince" value={formData.memberSince} onChange={handleInputChange} className={inputClass} />
                      </div>
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">How did you hear about TCBC?</label>
                        <input type="text" name="heardAbout" value={formData.heardAbout} onChange={handleInputChange} className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Have you accepted Jesus Christ as your Lord and Savior?</label>
                      <YesNoRadio name="acceptedJesus" value={formData.acceptedJesus} onChange={(val) => setFormData((prev) => ({ ...prev, acceptedJesus: val }))} />
                    </div>

                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Have you been baptized in water by immersion?</label>
                      <YesNoRadio name="baptizedWater" value={formData.baptizedWater} onChange={(val) => setFormData((prev) => ({ ...prev, baptizedWater: val }))} />
                      {formData.baptizedWater === true && (
                        <div className="mt-4 ml-6 pl-4 border-l-2 border-[#48007e]/20">
                          <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">If Yes, provide the estimated year</label>
                          <input type="text" name="baptizedWaterYear" value={formData.baptizedWaterYear} onChange={handleInputChange} placeholder="e.g., 2020" className={inputClass} />
                        </div>
                      )}
                      {formData.baptizedWater === false && (
                        <div className="mt-4 ml-6 pl-4 border-l-2 border-[#48007e]/20">
                          <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">If Not, are you willing to be baptized at the earliest opportunity?</label>
                          <input type="text" name="willingBaptism" value={formData.willingBaptism} onChange={handleInputChange} className={inputClass} />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Have you received the baptism in the Holy Spirit with the initial physical evidence of speaking in tongues?</label>
                      <YesNoRadio name="baptizedHolySpirit" value={formData.baptizedHolySpirit} onChange={(val) => setFormData((prev) => ({ ...prev, baptizedHolySpirit: val }))} />
                      {formData.baptizedHolySpirit === true && (
                        <div className="mt-4 ml-6 pl-4 border-l-2 border-[#48007e]/20">
                          <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">If Yes, provide the approximate year</label>
                          <input type="text" name="baptizedHolySpiritYear" value={formData.baptizedHolySpiritYear} onChange={handleInputChange} placeholder="e.g., 2021" className={inputClass} />
                        </div>
                      )}
                      {formData.baptizedHolySpirit === false && (
                        <div className="mt-4 ml-6 pl-4 border-l-2 border-[#48007e]/20">
                          <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">If Not, are you willing to receive the baptism of the Holy Spirit?</label>
                          <input type="text" name="willingHolySpirit" value={formData.willingHolySpirit} onChange={handleInputChange} className={inputClass} />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Previous Church (if any)</label>
                      <input type="text" name="previousChurch" value={formData.previousChurch} onChange={handleInputChange} className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Ministry Interests */}
                <div>
                  <h3 className="font-satoshi text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                    Ministry Interests
                  </h3>
                  <p className="font-aeonik text-sm text-gray-500 mb-4">Check all that apply</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ministryOptions.map((ministry) => (
                      <label key={ministry} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition">
                        <input
                          type="checkbox"
                          checked={formData.ministryInterests.includes(ministry)}
                          onChange={() => handleMinistryChange(ministry)}
                          className="mr-3 w-4 h-4 accent-[#48007e]"
                        />
                        <span className="font-aeonik text-gray-700">{ministry}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4">
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Other (please specify)</label>
                    <input type="text" name="ministryOther" value={formData.ministryOther} onChange={handleInputChange} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* ========== PART II ========== */}
              <div className="mb-12">
                <div className="mb-10">
                  <h2 className="font-satoshi text-2xl sm:text-3xl font-bold text-[#48007e] mb-1">Part II</h2>
                  <p className="font-aeonik text-gray-500">To be completed after completing membership classes</p>
                  <div className="w-16 h-1 bg-[#48007e] mt-3" />
                </div>

                {/* Availability and Commitment */}
                <div className="mb-12">
                  <h3 className="font-satoshi text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                    Availability and Commitment
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Have you successfully completed the TCBC membership classes?</label>
                      <YesNoRadio name="completedClasses" value={formData.completedClasses} onChange={(val) => setFormData((prev) => ({ ...prev, completedClasses: val }))} />
                    </div>

                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Are you willing to serve in the church?</label>
                      <YesNoRadio name="willingServe" value={formData.willingServe} onChange={(val) => setFormData((prev) => ({ ...prev, willingServe: val }))} />
                    </div>

                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Will you support the Church with your faithful prayers (Ephesians 6:18) and attendance (Hebrews 10:25)?</label>
                      <YesNoRadio name="willingPrayers" value={formData.willingPrayers} onChange={(val) => setFormData((prev) => ({ ...prev, willingPrayers: val }))} />
                    </div>

                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Are you willing to support the Church with tithes and offerings according to the scriptures? (Malachi 3:10, 1 Corinthians 16:2)</label>
                      <YesNoRadio name="willingTithes" value={formData.willingTithes} onChange={(val) => setFormData((prev) => ({ ...prev, willingTithes: val }))} />
                    </div>

                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Do you agree to uphold the Church&apos;s teachings and constitution, and refrain from engaging in or seeking support for activities or lifestyles the Church considers morally inappropriate?</label>
                      <YesNoRadio name="agreeTeachings" value={formData.agreeTeachings} onChange={(val) => setFormData((prev) => ({ ...prev, agreeTeachings: val }))} />
                    </div>

                    <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="font-aeonik text-sm text-gray-700 mb-3">
                        By my response below, I acknowledge and accept the terms stated above. I agree that I will voluntarily surrender my membership, without causing discord among members or adherents, if at any time:
                      </p>
                      <ul className="list-disc list-inside space-y-1.5 font-aeonik text-sm text-gray-700 mb-3 ml-2">
                        <li>I cease regular attendance at church services without providing an acceptable reason.</li>
                        <li>I am unable to work in harmony with TCBC due to personal convictions; or</li>
                        <li>I am found to be in violation of the membership requirements outlined in the Church Constitution.</li>
                      </ul>
                      <p className="font-aeonik text-sm text-gray-700 mb-4">
                        I further understand and acknowledge that failure to surrender my membership as described above may result in the suspension or termination of my membership in accordance with the Church Constitution.
                      </p>
                      <YesNoRadio name="understandMembership" value={formData.understandMembership} onChange={(val) => setFormData((prev) => ({ ...prev, understandMembership: val }))} />
                    </div>
                  </div>
                </div>

                {/* Declaration */}
                <div className="mb-12">
                  <h3 className="font-satoshi text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                    Declaration
                  </h3>
                  <p className="font-aeonik text-sm text-gray-700 mb-6">
                    I declare that the information provided above is accurate to the best of my knowledge. I understand that completion of this form indicates my willingness to be part of the church and align with the doctrines and vision of TCBC.
                  </p>

                  <h4 className="font-satoshi text-lg font-bold text-gray-800 mb-4">Signature</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Applicant&apos;s Signature</label>
                      <input type="text" name="signature" value={formData.signature} onChange={handleInputChange} placeholder="Type your full name" className={inputClass} />
                    </div>
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Date</label>
                      <input type="date" name="date" value={formData.date} onChange={handleInputChange} className={inputClass} />
                    </div>
                  </div>
                </div>

                {/* Office Use Only */}
                <div className="p-6 bg-gray-100 border border-gray-300 rounded-lg">
                  <p className="font-satoshi text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">For Office Use Only</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-500 mb-2">Membership Orientation Completed</label>
                      <div className="flex gap-6 pt-1">
                        <label className="flex items-center"><span className="font-aeonik text-gray-500 mr-1">Yes</span> <span className="inline-block w-5 h-5 border-2 border-gray-400 rounded" /></label>
                        <label className="flex items-center"><span className="font-aeonik text-gray-500 mr-1">No</span> <span className="inline-block w-5 h-5 border-2 border-gray-400 rounded" /></label>
                      </div>
                    </div>
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-500 mb-2">Date Received</label>
                      <div className="border-b-2 border-gray-400 pb-4" />
                    </div>
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-500 mb-2">Church Leader&apos;s Signature</label>
                      <div className="border-b-2 border-gray-400 pb-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-8 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-[#48007e] text-white px-12 py-4 rounded-lg hover:bg-[#7c01cd] transition font-semibold font-satoshi text-lg disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Application"}
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
