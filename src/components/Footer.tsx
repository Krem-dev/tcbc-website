"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type FooterLink = {
  name: string;
  href?: string;
  scrollToSection?: string;
};

type FooterLinks = {
  sermons: FooterLink[];
  church: FooterLink[];
  connect: FooterLink[];
};

type Social = {
  name: string;
  href: string;
  description: string;
  icon: IconDefinition;
  color: string;
};

const Footer = () => {
  const router = useRouter();

  const footerLinks: FooterLinks = {
    sermons: [
      { name: "Recent Sermons", href: "/sermons" },
      { name: "Blog", href: "/blog" },
    ],
    church: [
      { name: "About Us", href: "/about" },
      { name: "Ministry", href: "/ministry" },
      { name: "Events", href: "/events" },
    ],
    connect: [
      { name: "Contact Us", href: "/contact" },
    ],
  };

  const socialLinks: Social[] = [
    {
      name: "Facebook",
      href: "https://web.facebook.com/profile.php?id=61571964212983",
      description: "Connect with us on Facebook",
      icon: faFacebook,
      color: "hover:bg-blue-800",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/tcbc_ottawa?igsh=MWtmd2doemwycHFn",
      description: "Follow us on Instagram",
      icon: faInstagram,
      color: "hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@tcbc_ottawa",
      description: "Subscribe to us on YouTube",
      icon: faYoutube,
      color: "hover:bg-red-600",
    },
  ];

  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleLinkClick = (
    link: FooterLink,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (link.scrollToSection && !link.href) {
      scrollToSection(link.scrollToSection);
    } else if (link.scrollToSection && link.href) {
      router.push(`${link.href}#${link.scrollToSection}`);
    } else if (link.href) {
      router.push(link.href);
    }
  };

  const renderFooterLink = (link: FooterLink) => (
    <li key={link.name}>
      <button
        onClick={(e) => handleLinkClick(link, e)}
        className="font-aeonik text-gray-300 hover:text-[#b9d1f3] transition-colors duration-300 text-left"
      >
        {link.name}
      </button>
    </li>
  );

  return (
    <footer className="bg-[#48007e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-10">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Link href="/" className="flex items-center space-x-3">
                  <Image
                    src="/TCBC_logo_vector.pdf2-01 (2).png"
                    alt="TCBC Logo"
                    width={160}
                    height={160}
                    className="h-40 w-auto"
                    priority
                  />
                  <span className="text-4xl font-bold font-satoshi">TCBC</span>
                </Link>
                <p className="font-aeonik text-gray-300 leading-relaxed mt-4">
                  The Chosen Bible Church - A community of faith, hope, and love. Join us as we grow together in Christ and serve our community.
                </p>
              </div>
            </div>

            {/* Sermons Links */}
            <nav aria-labelledby="footer-sermons" className="">
              <h4
                id="footer-sermons"
                className="font-satoshi text-lg font-bold mb-4"
              >
                Sermons
              </h4>
              <ul className="space-y-3">
                {footerLinks.sermons.map(renderFooterLink)}
              </ul>
            </nav>

            {/* Church Links */}
            <nav aria-labelledby="footer-church" className="">
              <h4
                id="footer-church"
                className="font-satoshi text-lg font-bold mb-4"
              >
                Church
              </h4>
              <ul className="space-y-3">
                {footerLinks.church.map(renderFooterLink)}
              </ul>
            </nav>

            {/* Connect Links */}
            <nav aria-labelledby="footer-connect" className="">
              <h4
                id="footer-connect"
                className="font-satoshi text-lg font-bold mb-4"
              >
                Connect
              </h4>
              <ul className="space-y-3">
                {footerLinks.connect.map(renderFooterLink)}
              </ul>
            </nav>
          </div>

          <div className="flex flex-col items-center mt-8 space-y-6">
            <div className="flex flex-col items-center">
              <h4 className="font-satoshi text-lg font-bold mb-4">
                Connect With Us
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800/50">
          <div className="flex flex-col items-center gap-4">
            <div className="text-center">
              <p className="font-aeonik text-gray-400">
                © {currentYear} TCBC. All rights reserved.
              </p>
              <p className="font-aeonik text-sm text-gray-300/80 mt-1">
                Building faith, strengthening community.
              </p>
            </div>
            <div className="text-center">
              <p className="font-aeonik text-sm text-gray-400">
                Powered by{" "}
                <a
                  href="https://www.sleekteq.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b9d1f3] hover:text-white transition-colors duration-300 font-semibold"
                >
                  sleekteq
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
