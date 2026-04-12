"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Footer from "@/components/Footer";

interface FormData {
  fullName: string;
  preferredName: string;
  homeAddress: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  maritalStatus: string;
  hasChildren: boolean | null;
  childrenWorshippingAtTCBC: boolean | null;
  childrenNames: string;
  occupation: string;
  dateStartedAttending: string;
  acceptedJesus: boolean | null;
  baptizedWater: boolean | null;
  willingBaptism: boolean | null;
  baptizedWaterYear: string;
  baptizedHolySpirit: boolean | null;
  willingHolySpirit: boolean | null;
  baptizedHolySpiritYear: string;
  previouslyMemberOfChurch: boolean | null;
  previousChurchName: string;
  currentlyMemberOfChurch: boolean | null;
  currentChurchDetails: string;
  heardAbout: string;
  ministryInterests: string[];
  ministryOther: string;
  partISignature: string;
  partIDate: string;
  membershipClassCompleted: boolean | null;
  membershipClassDate: string;
  commitClasses: boolean;
  commitMission: boolean;
  commitConstitution: boolean;
  commitPeace: boolean;
  commitLeadership: boolean;
  willingServe: boolean | null;
  willingPrayers: boolean | null;
  willingTithes: boolean | null;
  agreeTeachings: boolean | null;
  partIISignature: string;
  partIIDate: string;
}

const initialFormData: FormData = {
  fullName: "",
  preferredName: "",
  homeAddress: "",
  phoneNumber: "",
  email: "",
  dateOfBirth: "",
  maritalStatus: "",
  hasChildren: null,
  childrenWorshippingAtTCBC: null,
  childrenNames: "",
  occupation: "",
  dateStartedAttending: "",
  acceptedJesus: null,
  baptizedWater: null,
  willingBaptism: null,
  baptizedWaterYear: "",
  baptizedHolySpirit: null,
  willingHolySpirit: null,
  baptizedHolySpiritYear: "",
  previouslyMemberOfChurch: null,
  previousChurchName: "",
  currentlyMemberOfChurch: null,
  currentChurchDetails: "",
  heardAbout: "",
  ministryInterests: [],
  ministryOther: "",
  partISignature: "",
  partIDate: "",
  membershipClassCompleted: null,
  membershipClassDate: "",
  commitClasses: false,
  commitMission: false,
  commitConstitution: false,
  commitPeace: false,
  commitLeadership: false,
  willingServe: null,
  willingPrayers: null,
  willingTithes: null,
  agreeTeachings: null,
  partIISignature: "",
  partIIDate: "",
};

function SubSection({ children, show }: { children: React.ReactNode; show: boolean }) {
  if (!show) return null;
  return <div className="mt-4 ml-6 pl-4 border-l-2 border-[#48007e]/20">{children}</div>;
}

function YesNoRadio({ name, value, onChange }: { name: string; value: boolean | null; onChange: (val: boolean) => void }) {
  return (
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
}

export default function MembershipPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [showPartII, setShowPartII] = useState(false);

  const ministryOptions = [
    "Choir / Music Ministry",
    "Media / Technical Support",
    "Children's Ministry",
    "Youth Ministry",
    "Evangelism / Outreach",
    "Welfare / Care",
    "Social Events",
    "Facilities / Logistics / Transportation",
    "Décor / Housekeeping",
    "Marriage / Counselling",
    "Ushering / Hospitality",
    "Intercessory / Prayer",
    "Administration",
    "Follow-up / Newcomers",
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

  const setBool = (name: string, val: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: val }));
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
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `TCBC_Membership_${formData.fullName.replace(/\s+/g, "_")}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        toast.success("Application submitted successfully! A church leader will contact you soon.");
        setFormData(initialFormData);
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


  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 bg-center bg-cover" style={{ backgroundImage: "url('/bib-4.jpg')" }}>
        <div className="absolute inset-0 bg-[#48007e]/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Membership Application</h1>
          <p className="font-aeonik text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">Join The Chosen Bible Church community and grow in faith with us.</p>
          <div className="w-20 sm:w-24 h-1 mx-auto bg-white" />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>

            {/* Intro */}
            <div className="mb-10 p-6 bg-[#48007e]/5 border-l-4 border-[#48007e] rounded-r-lg space-y-2">
              <p className="font-satoshi font-bold text-gray-800">Two-Stage Membership Process</p>
              <ul className="font-aeonik text-sm text-gray-700 space-y-1 list-disc list-inside">
                <li><strong>Part I</strong> is for individuals who want to begin the membership process.</li>
                <li><strong>Part II</strong> is to be completed only after the applicant has successfully completed the TCBC membership classes.</li>
              </ul>
              <p className="font-aeonik text-sm text-gray-600">Applicants must be <strong>16 years of age or older</strong> to apply for formal membership.</p>
              <p className="font-aeonik text-xs text-gray-500">The information collected on this form will be used for membership administration, pastoral care, ministry planning, and church communication.</p>
            </div>

            {/* ═══════ PART I ═══════ */}
            <div className="mb-16">
              <div className="mb-10">
                <h2 className="font-satoshi text-2xl sm:text-3xl font-bold text-[#48007e] mb-1">Part I — Initial Membership Application</h2>
                <div className="w-16 h-1 bg-[#48007e] mt-3" />
              </div>

              {/* A. Personal Information */}
              <div className="mb-12">
                <h3 className="font-satoshi text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">A. Personal Information</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Full Name</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={inputClass} required />
                  </div>
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Preferred Name (if applicable)</label>
                    <input type="text" name="preferredName" value={formData.preferredName} onChange={handleInputChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Home Address</label>
                    <input type="text" name="homeAddress" value={formData.homeAddress} onChange={handleInputChange} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                      <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={inputClass} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className={inputClass} />
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

                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Do you have children?</label>
                    <YesNoRadio name="hasChildren" value={formData.hasChildren} onChange={(val) => setBool("hasChildren", val)} />
                  </div>
                  <SubSection show={formData.hasChildren === true}>
                    <div className="space-y-4">
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Will they be worshipping with you at TCBC?</label>
                        <YesNoRadio name="childrenWorshippingAtTCBC" value={formData.childrenWorshippingAtTCBC} onChange={(val) => setBool("childrenWorshippingAtTCBC", val)} />
                      </div>
                      <div>
                        <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">List their full names</label>
                        <textarea name="childrenNames" value={formData.childrenNames} onChange={handleInputChange} rows={2} placeholder="e.g. John Doe, Mary Doe" className={inputClass} />
                      </div>
                    </div>
                  </SubSection>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Occupation</label>
                      <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} className={inputClass} />
                    </div>
                    <div>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Date you started attending TCBC (if applicable)</label>
                      <input type="date" name="dateStartedAttending" value={formData.dateStartedAttending} onChange={handleInputChange} className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* B. Church Background */}
              <div className="mb-12">
                <h3 className="font-satoshi text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">B. Church Background</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">1. Have you accepted Jesus Christ as your Lord and personal Saviour?</label>
                    <YesNoRadio name="acceptedJesus" value={formData.acceptedJesus} onChange={(val) => setBool("acceptedJesus", val)} />
                  </div>

                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">2. Have you been baptized by immersion after salvation?</label>
                    <YesNoRadio name="baptizedWater" value={formData.baptizedWater} onChange={(val) => setBool("baptizedWater", val)} />
                    <SubSection show={formData.baptizedWater === false}>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Are you willing to be baptized at the earliest opportunity?</label>
                      <YesNoRadio name="willingBaptism" value={formData.willingBaptism} onChange={(val) => setBool("willingBaptism", val)} />
                    </SubSection>
                    <SubSection show={formData.baptizedWater === true}>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Estimated year</label>
                      <input type="text" name="baptizedWaterYear" value={formData.baptizedWaterYear} onChange={handleInputChange} placeholder="e.g. 2020" className={inputClass} />
                    </SubSection>
                  </div>

                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">3. Have you received the baptism of the Holy Spirit?</label>
                    <YesNoRadio name="baptizedHolySpirit" value={formData.baptizedHolySpirit} onChange={(val) => setBool("baptizedHolySpirit", val)} />
                    <SubSection show={formData.baptizedHolySpirit === false}>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Are you willing to receive teaching and further guidance on this?</label>
                      <YesNoRadio name="willingHolySpirit" value={formData.willingHolySpirit} onChange={(val) => setBool("willingHolySpirit", val)} />
                    </SubSection>
                    <SubSection show={formData.baptizedHolySpirit === true}>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Approximate year</label>
                      <input type="text" name="baptizedHolySpiritYear" value={formData.baptizedHolySpiritYear} onChange={handleInputChange} placeholder="e.g. 2021" className={inputClass} />
                    </SubSection>
                  </div>

                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">4. Have you previously been a member of another church?</label>
                    <YesNoRadio name="previouslyMemberOfChurch" value={formData.previouslyMemberOfChurch} onChange={(val) => setBool("previouslyMemberOfChurch", val)} />
                    <SubSection show={formData.previouslyMemberOfChurch === true}>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Please state the name of the church</label>
                      <input type="text" name="previousChurchName" value={formData.previousChurchName} onChange={handleInputChange} className={inputClass} />
                    </SubSection>
                  </div>

                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">5. Are you currently a member of another church?</label>
                    <YesNoRadio name="currentlyMemberOfChurch" value={formData.currentlyMemberOfChurch} onChange={(val) => setBool("currentlyMemberOfChurch", val)} />
                    <SubSection show={formData.currentlyMemberOfChurch === true}>
                      <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Please provide details</label>
                      <input type="text" name="currentChurchDetails" value={formData.currentChurchDetails} onChange={handleInputChange} className={inputClass} />
                    </SubSection>
                  </div>

                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">6. How did you hear about TCBC?</label>
                    <select name="heardAbout" value={formData.heardAbout} onChange={handleInputChange} className={inputClass}>
                      <option value="">Select an option</option>
                      <option value="Friend or Family">Friend or Family</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Church Website">Church Website</option>
                      <option value="Online Search">Online Search</option>
                      <option value="Community Event">Community Event</option>
                      <option value="Flyer or Poster">Flyer or Poster</option>
                      <option value="Walk-in">Walk-in</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* C. Ministry Interests */}
              <div className="mb-12">
                <h3 className="font-satoshi text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">C. Ministry Interests</h3>
                <p className="font-aeonik text-sm text-gray-500 mb-4">Please indicate the ministry areas in which you may be interested in serving:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {ministryOptions.map((ministry) => (
                    <label key={ministry} className="flex items-center cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition">
                      <input type="checkbox" checked={formData.ministryInterests.includes(ministry)} onChange={() => handleMinistryChange(ministry)} className="mr-3 w-4 h-4 accent-[#48007e]" />
                      <span className="font-aeonik text-gray-700">{ministry}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Other (please specify)</label>
                  <input type="text" name="ministryOther" value={formData.ministryOther} onChange={handleInputChange} className={inputClass} />
                </div>
              </div>

              {/* D. Applicant Declaration — Part I */}
              <div>
                <h3 className="font-satoshi text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">D. Applicant Declaration — Part I</h3>
                <p className="font-aeonik text-sm text-gray-700 mb-2">I declare that the information provided in Part I of this form is true and complete to the best of my knowledge.</p>
                <p className="font-aeonik text-sm text-gray-700 mb-6">I understand that completing this form indicates my desire to begin the TCBC membership process and to participate in the required membership classes before final membership approval.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Applicant Signature</label>
                    <input type="text" name="partISignature" value={formData.partISignature} onChange={handleInputChange} placeholder="Type your full name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Date</label>
                    <input type="date" name="partIDate" value={formData.partIDate} onChange={handleInputChange} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════ PART II ═══════ */}
            <div className="mb-12">
              <div className="mb-10">
                <h2 className="font-satoshi text-2xl sm:text-3xl font-bold text-[#48007e] mb-1">Part II — Membership Confirmation</h2>
                <div className="w-16 h-1 bg-[#48007e] mt-3 mb-6" />
                <label
                  className="flex items-center gap-3 cursor-pointer select-none"
                  onClick={() => setShowPartII(!showPartII)}
                >
                  <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition ${showPartII ? "bg-[#48007e] border-[#48007e]" : "border-gray-300"}`}>
                    {showPartII && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </span>
                  <span className="font-aeonik text-sm text-gray-700">I have completed the TCBC membership classes and would like to complete Part II.</span>
                </label>
                {!showPartII && (
                  <p className="font-aeonik text-xs text-gray-400 mt-2 ml-8">If you haven&apos;t completed the classes yet, skip this section and submit Part I only.</p>
                )}
              </div>

              {showPartII && (
              <>
              {/* A. Membership Class Completion */}
              <div className="mb-12">
                <h3 className="font-satoshi text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">A. Membership Class Completion</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Have you successfully completed the TCBC membership classes?</label>
                    <YesNoRadio name="membershipClassCompleted" value={formData.membershipClassCompleted} onChange={(val) => setBool("membershipClassCompleted", val)} />
                  </div>
                  <SubSection show={formData.membershipClassCompleted === true}>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Date completed</label>
                    <input type="date" name="membershipClassDate" value={formData.membershipClassDate} onChange={handleInputChange} className={inputClass} />
                  </SubSection>
                </div>
              </div>

              {/* B. Membership Commitment */}
              <div className="mb-12">
                <h3 className="font-satoshi text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">B. Membership Commitment</h3>
                <p className="font-aeonik text-sm text-gray-600 mb-4">By signing below, I confirm that:</p>
                <div className="space-y-3 mb-8">
                  {[
                    { name: "commitClasses", label: "I have completed the required membership classes." },
                    { name: "commitMission", label: "I understand and support the mission, values, and teachings of TCBC." },
                    { name: "commitConstitution", label: "I agree to uphold the constitution, guidelines, and leadership structure of TCBC." },
                    { name: "commitPeace", label: "I will seek to live in peace, unity, and fellowship with the church body." },
                    { name: "commitLeadership", label: "I understand that concerns relating to membership status will be handled by church leadership in accordance with the Church Constitution and established church processes." },
                  ].map((item) => (
                    <label key={item.name} className="flex items-start cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition">
                      <input
                        type="checkbox"
                        name={item.name}
                        checked={(formData as any)[item.name]}
                        onChange={handleInputChange}
                        className="mr-3 mt-0.5 w-4 h-4 accent-[#48007e] shrink-0"
                      />
                      <span className="font-aeonik text-sm text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Are you willing to serve in the church?</label>
                    <YesNoRadio name="willingServe" value={formData.willingServe} onChange={(val) => setBool("willingServe", val)} />
                  </div>
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Will you support the Church with your faithful prayers and regular attendance?</label>
                    <YesNoRadio name="willingPrayers" value={formData.willingPrayers} onChange={(val) => setBool("willingPrayers", val)} />
                  </div>
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Are you willing to support the Church with tithes and offerings according to Scripture?</label>
                    <YesNoRadio name="willingTithes" value={formData.willingTithes} onChange={(val) => setBool("willingTithes", val)} />
                  </div>
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Do you agree to uphold the Church&apos;s teachings, values, and constitution?</label>
                    <YesNoRadio name="agreeTeachings" value={formData.agreeTeachings} onChange={(val) => setBool("agreeTeachings", val)} />
                  </div>
                </div>
              </div>

              {/* C. Final Declaration — Part II */}
              <div className="mb-12">
                <h3 className="font-satoshi text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">C. Final Declaration — Part II</h3>
                <p className="font-aeonik text-sm text-gray-700 mb-2">I freely request to be received into membership at TCBC.</p>
                <p className="font-aeonik text-sm text-gray-700 mb-6">I confirm my willingness to be an active and faithful member of the church through worship, fellowship, service, and Christian conduct.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Applicant Signature</label>
                    <input type="text" name="partIISignature" value={formData.partIISignature} onChange={handleInputChange} placeholder="Type your full name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block font-aeonik text-sm font-medium text-gray-600 mb-2">Date</label>
                    <input type="date" name="partIIDate" value={formData.partIIDate} onChange={handleInputChange} className={inputClass} />
                  </div>
                </div>
              </div>

              </>
              )}

              {/* For Church Use Only */}
              <div className="pt-8 border-t border-gray-200">
                <p className="font-satoshi text-sm font-bold text-gray-600 uppercase tracking-wider mb-6">For Church Use Only</p>
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {[
                      { label: "Date Part I Received:", value: <div className="border-b border-gray-400 min-h-[24px]" /> },
                      { label: "Membership Classes Completed:", value: (
                        <div className="flex gap-5">
                          <span className="flex items-center gap-1"><span className="inline-block w-4 h-4 border-2 border-gray-400 rounded-sm" /> Yes</span>
                          <span className="flex items-center gap-1"><span className="inline-block w-4 h-4 border-2 border-gray-400 rounded-sm" /> No</span>
                        </div>
                      )},
                      { label: "Date Membership Classes Completed:", value: <div className="border-b border-gray-400 min-h-[24px]" /> },
                      { label: "Membership Status:", value: (
                        <div className="flex gap-5">
                          {["Pending", "Approved", "Deferred"].map((s) => (
                            <span key={s} className="flex items-center gap-1"><span className="inline-block w-4 h-4 border-2 border-gray-400 rounded-sm" /> {s}</span>
                          ))}
                        </div>
                      )},
                      { label: "Effective Date of Membership:", value: <div className="border-b border-gray-400 min-h-[24px]" /> },
                      { label: "Recommended By:", value: <div className="border-b border-gray-400 min-h-[24px]" /> },
                      { label: "Approved By (Church Leader):", value: <div className="border-b border-gray-400 min-h-[24px]" /> },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-[#dce8f8]/50" : ""}>
                        <td className="font-aeonik font-semibold text-gray-700 py-3 px-4 border border-gray-300 w-1/2">{row.label}</td>
                        <td className="font-aeonik text-gray-600 py-3 px-4 border border-gray-300">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="font-aeonik font-semibold text-gray-700 text-sm">Signature:</span>
                    <span className="inline-block border-b border-gray-400 w-64 ml-2" />
                  </div>
                  <div>
                    <span className="font-aeonik font-semibold text-gray-700 text-sm">Date:</span>
                    <span className="inline-block border-b border-gray-400 w-48 ml-2" />
                  </div>
                  <div>
                    <p className="font-aeonik text-sm text-gray-600">Notes:</p>
                    <div className="border-b border-gray-400 mt-4 mb-2" />
                    <div className="border-b border-gray-400 mt-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-12 text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#48007e] text-white px-16 py-4 rounded-lg hover:bg-[#7c01cd] transition font-semibold font-satoshi text-lg disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
