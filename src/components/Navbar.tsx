"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Play } from "lucide-react";
import { CHANNEL_HANDLE } from "@/data/localData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/videos?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Videos", path: "/videos" },
    { name: "Series", path: "/series" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-white/5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  <Play className="w-4 h-4 fill-white text-white translate-x-[1px]" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <span className="font-display font-bold tracking-widest text-lg md:text-xl text-white group-hover:text-glow-blue transition-all duration-300">
                  QUANTUM<span className="text-neon-blue font-light">FRAME</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      className="relative text-sm font-medium tracking-wide transition-colors duration-300 py-2 text-gray-300 hover:text-white"
                    >
                      {link.name}
                      {isActive && (
                        <motion.div
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input
                  type="text"
                  placeholder="Search channel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 xl:w-60 bg-white/5 border border-white/10 rounded-full py-1.5 pl-4 pr-10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-neon-blue transition-colors duration-300"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* YouTube Subscribe CTA */}
              <a
                href={`https://www.youtube.com/${CHANNEL_HANDLE}?sub_confirmation=1`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold text-white rounded-full group bg-gradient-to-br from-neon-purple to-neon-blue group-hover:from-neon-purple group-hover:to-neon-blue hover:text-white dark:text-white focus:ring-2 focus:outline-none focus:ring-neon-blue/50 shadow-[0_0_10px_rgba(189,0,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300"
              >
                <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-[#020204] rounded-full group-hover:bg-opacity-0">
                  SUBSCRIBE
                </span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white p-2 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass border-b border-white/5 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search channel..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-neon-blue"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </form>

                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 text-white border-l-2 border-neon-blue"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <a
                  href={`https://www.youtube.com/${CHANNEL_HANDLE}?sub_confirmation=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center py-3 px-4 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-xs font-semibold text-white tracking-widest hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300"
                >
                  SUBSCRIBE TO CHANNEL
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
