"use client";

import { motion } from "framer-motion";
import { Play, Eye, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { Video } from "@/data/localData";

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  // Format publish date to a clean relative or standard string
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group relative cursor-pointer glass rounded-xl overflow-hidden glass-hover flex flex-col h-full border border-white/5 shadow-lg"
    >
      {/* Thumbnail Wrap */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/40">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300 ease-out">
            <Play className="w-5 h-5 text-white fill-white translate-x-[1px]" />
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-medium tracking-wide text-white border border-white/10 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {video.duration}
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-gradient-to-b from-transparent to-[#040408]/50">
        <div>
          {/* Categories */}
          <div className="flex flex-wrap gap-1 mb-2">
            {video.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/5 text-neon-blue font-semibold border border-white/5"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-display font-semibold text-sm line-clamp-2 text-white group-hover:text-neon-blue transition-colors duration-300 leading-snug">
            {video.title}
          </h3>
        </div>

        {/* Stats footer */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 mt-4 border-t border-white/5 pt-3">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-gray-600" />
            <span>{video.views >= 1000000 ? `${(video.views / 1000000).toFixed(1)}M` : video.views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-600" />
            <span>{formatDate(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
