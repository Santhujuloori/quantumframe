"use client";

import { motion } from "framer-motion";
import { Milestone, Rocket, Film, Compass, Cpu } from "lucide-react";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  glowColor: string;
}

export default function Timeline() {
  const events: TimelineEvent[] = [
    {
      date: "Late 2024",
      title: "Spark of Imagination",
      description: "Creator Santhosh Juloori initiates the concepts for Quantum Frame, experimenting with advanced AI visual generation, Unreal Engine rendering, and cinematic space soundscapes to create short narrative clips.",
      icon: <Compass className="w-5 h-5" />,
      glowColor: "shadow-[0_0_15px_rgba(0,240,255,0.4)] border-neon-blue text-neon-blue",
    },
    {
      date: "Mid 2025",
      title: "Emergence of Quantum Frame",
      description: "Official launch of @QuantumFrame142. The channel releases its first viral concepts, including scale-travel journeys (like scaling down into an atom or black hole singularities), capturing the imagination of cosmic science enthusiasts.",
      icon: <Rocket className="w-5 h-5" />,
      glowColor: "shadow-[0_0_15px_rgba(189,0,255,0.4)] border-neon-purple text-neon-purple",
    },
    {
      date: "Early 2026",
      title: "The Celestial Blade Saga",
      description: "Quantum Frame launches its first episodic anime-inspired series: 'The Celestial Blade'. Detailing the epic trials of Ren against colossal frozen beasts and ancient guardians, the series goes viral, driving exponential channel growth.",
      icon: <Film className="w-5 h-5" />,
      glowColor: "shadow-[0_0_15px_rgba(0,240,255,0.4)] border-neon-blue text-neon-blue",
    },
    {
      date: "Present",
      title: "Quantum Horizon & Next-Gen Tech",
      description: "Reaching over 248,000 subscribers and millions of cumulative views. Quantum Frame launches this state-of-the-art cinematic web hub, completely automated and synchronized with YouTube to host our next-generation stories.",
      icon: <Cpu className="w-5 h-5" />,
      glowColor: "shadow-[0_0_15px_rgba(189,0,255,0.4)] border-neon-purple text-neon-purple",
    },
  ];

  return (
    <div className="relative py-10 max-w-4xl mx-auto">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-transparent opacity-30 -translate-x-1/2" />

      <div className="space-y-12">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-start ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Dot Icon Indicator */}
              <div className="absolute left-4 md:left-1/2 top-2 z-10 w-9 h-9 rounded-full bg-[#020204] border flex items-center justify-center -translate-x-1/2 shadow-lg transition-transform duration-300 hover:scale-110">
                <div className={`w-8 h-8 rounded-full border-2 bg-black flex items-center justify-center ${event.glowColor}`}>
                  {event.icon}
                </div>
              </div>

              {/* Spacing for mobile vs desktop layout */}
              <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-6 glass rounded-xl border border-white/5 relative group hover:border-white/10 transition-colors duration-300 ${
                    isEven ? "md:text-left" : "md:text-right"
                  }`}
                >
                  {/* Event Date badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 bg-white/5 ${
                    index % 2 === 0 ? "text-neon-blue border border-neon-blue/20" : "text-neon-purple border border-neon-purple/20"
                  }`}>
                    {event.date}
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-bold text-base md:text-lg text-white mb-2 group-hover:text-glow-blue transition-colors">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Subtle directional indicator tip */}
                  <div className={`hidden md:block absolute top-5 w-3 h-3 bg-transparent border-t border-r border-white/5 rotate-45 ${
                    isEven 
                      ? "left-full -translate-x-1.5 border-t-0 border-r-0 border-b border-l" 
                      : "right-full translate-x-1.5 border-t border-r border-b-0 border-l-0"
                  }`} />
                </motion.div>
              </div>

              {/* Empty placeholder spacer for alignment */}
              <div className="hidden md:block w-1/2" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
