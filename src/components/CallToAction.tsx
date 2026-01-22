"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock } from "lucide-react";

const CallToAction: React.FC = () => {
  const [serviceTimes, setServiceTimes] = useState<any[]>([]);
  const [organizationData, setOrganizationData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homepageRes, orgRes] = await Promise.all([
          fetch("/api/homepage"),
          fetch("/api/organization")
        ]);

        if (homepageRes.ok) {
          const homepageData = await homepageRes.json();
          if (homepageData?.serviceTimesSection?.serviceTimes && homepageData.serviceTimesSection.serviceTimes.length > 0) {
            setServiceTimes(homepageData.serviceTimesSection.serviceTimes);
          }
        }

        if (orgRes.ok) {
          const orgData = await orgRes.json();
          setOrganizationData(orgData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const meetingTimes = serviceTimes;
  const address = organizationData?.address || "";
  const phone = organizationData?.phone || "";
  const email = organizationData?.email || "";

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-satoshi mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#48007e]">
            Ready to Join The Chosen Bible Church?
          </h2>
          <p className="font-aeonik mx-auto max-w-2xl text-lg sm:text-xl text-gray-600 mb-8">
            Experience authentic worship, meaningful fellowship, and spiritual growth at The Chosen Bible Church. We'd love to see you this Sunday!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=45.42001,-75.68954"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#48007e] text-white font-semibold hover:bg-[#7c01cd] rounded-full px-8 py-3 text-base sm:text-lg flex items-center gap-2">
                Get Directions
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <Link href="/contact">
              <Button className="bg-transparent border-2 border-[#48007e] text-[#48007e] font-semibold hover:bg-[#48007e]/5 rounded-full px-8 py-3 text-base sm:text-lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        {/* Location & Service Times Section */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Times */}
            <div>
              <p className="font-satoshi font-bold text-[#48007e] text-lg mb-4">Service Times</p>
              <div className="space-y-3">
                {meetingTimes.map((meeting, index) => (
                  <div key={index} className="border-l-3 border-[#7c01cd] pl-3">
                    <p className="font-aeonik font-semibold text-gray-800">{meeting.day}</p>
                    <p className="font-aeonik text-gray-600 text-sm">{meeting.time}</p>
                    {meeting.service && (
                      <p className="font-aeonik font-semibold text-gray-700 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {meeting.service}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Location & Contact Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-[#48007e]">
              <p className="font-satoshi font-bold text-[#48007e] text-sm mb-3">Location & Contact</p>
              <div className="space-y-2 text-gray-600 text-sm">
                {address && (
                  <p className="font-aeonik flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#7c01cd] flex-shrink-0 mt-0.5" />
                    <span>{address}</span>
                  </p>
                )}
                {phone && (
                  <p className="font-aeonik flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#7c01cd]" />
                    <span>{phone}</span>
                  </p>
                )}
                {email && (
                  <p className="font-aeonik flex items-center gap-2">
                    <span>✉️</span>
                    <span>{email}</span>
                  </p>
                )}
                {!address && !phone && !email && (
                  <p className="font-aeonik text-gray-400 text-xs italic">Contact information will appear here once added in Sanity</p>
                )}
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="mt-8 rounded-lg overflow-hidden border border-gray-200 h-80">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen={true}
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.8474520347266!2d-75.68954!3d45.42001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0718cc4ccccd%3A0x123456789!2sThe%20Chosen%20Bible%20Church!5e0!3m2!1sen!2sca!4v1234567890"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
