"use client";

import { ArrowUp, Mail } from "lucide-react";
import Link from "next/link";
import { CHANNEL_HANDLE } from "@/data/localData";

const YoutubeIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socials = [
    {
      name: "YouTube",
      url: `https://www.youtube.com/${CHANNEL_HANDLE}`,
      icon: <YoutubeIcon />,
      color: "hover:text-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
      icon: <InstagramIcon />,
      color: "hover:text-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]",
    },
    {
      name: "X (Twitter)",
      url: "https://x.com",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "hover:text-neon-blue hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]",
    },
    {
      name: "Email",
      url: "mailto:contact@quantumframe.tv",
      icon: <Mail className="w-5 h-5" />,
      color: "hover:text-neon-purple hover:shadow-[0_0_15px_rgba(189,0,255,0.5)]",
    },
  ];

  return (
    <footer className="relative mt-auto border-t border-white/5 bg-[#020204]/90 backdrop-blur-md py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-white/5 pb-8 mb-8">
          {/* Logo & Branding */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 group mb-3">
              <span className="font-display font-bold tracking-widest text-lg text-white">
                QUANTUM<span className="text-neon-blue font-light">FRAME</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 text-center md:text-left max-w-xs leading-relaxed">
              Crafting stories beyond reality. Immersive cinematic journeys exploring cosmic sci-fi, mythology, and deep space phenomena.
            </p>
          </div>

          {/* Nav links quick navigation */}
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <Link href="/" className="hover:text-neon-blue transition-colors duration-300">
              Home
            </Link>
            <Link href="/videos" className="hover:text-neon-blue transition-colors duration-300">
              Videos
            </Link>
            <Link href="/series" className="hover:text-neon-blue transition-colors duration-300">
              Series
            </Link>
            <Link href="/about" className="hover:text-neon-blue transition-colors duration-300">
              About
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex justify-center md:justify-end gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.name}
                className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${social.color} hover:bg-white/10 hover:border-transparent`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} Quantum Frame. All rights reserved. Developed for cinematic excellence.
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-neon-blue hover:border-neon-blue/30 transition-all duration-300 group"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
