"use client";

import { motion } from "framer-motion";
import { Play, Eye } from "lucide-react";
import { Video } from "@/data/localData";

interface ShortCardProps {
  video: Video;
  onClick: () => void;
}

export default function ShortCard({ video, onClick }: ShortCardProps) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3 }}
      className="group relative cursor-pointer glass rounded-xl overflow-hidden glass-hover flex flex-col h-[320px] sm:h-[400px] w-full border border-white/5 shadow-xl"
    >
      {/* 9:16 Vertical Container */}
      <div className="relative w-full h-full overflow-hidden bg-black/50">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Cinematic gradient tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-black/10 to-transparent opacity-90" />

        {/* Play Icon / Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center shadow-[0_0_20px_rgba(189,0,255,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-5 h-5 text-white fill-white translate-x-[1px]" />
          </div>
        </div>

        {/* Short tag badge */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-neon-purple/80 backdrop-blur-md text-[9px] font-bold tracking-widest text-white border border-neon-purple/30 uppercase">
          Short
        </div>

        {/* Content Box (Overlaid at bottom of vertical card) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end z-10">
          <h3 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug mb-2 group-hover:text-neon-blue transition-colors duration-300 text-glow-purple">
            {video.title}
          </h3>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
            <Eye className="w-3 h-3 text-gray-500" />
            <span>
              {video.views >= 1000000
                ? `${(video.views / 1000000).toFixed(1)}M`
                : video.views.toLocaleString()}{" "}
              views
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
