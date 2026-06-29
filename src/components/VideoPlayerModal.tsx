"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Share2 } from "lucide-react";
import { Video, CHANNEL_HANDLE } from "@/data/localData";

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface VideoPlayerModalProps {
  video: Video | null;
  onClose: () => void;
}

export default function VideoPlayerModal({ video, onClose }: VideoPlayerModalProps) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (video) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [video]);

  if (!video) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: `https://www.youtube.com/watch?v=${video.id}`,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${video.id}`);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Floating color ambient glow backing */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] max-w-[800px] bg-gradient-to-tr from-neon-purple/20 to-neon-blue/20 rounded-full blur-[120px] pointer-events-none opacity-60 z-0 animate-pulse-glow" />

        {/* Modal Content Wrapper */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative w-full max-w-5xl glass rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] border border-white/10 z-10 flex flex-col md:flex-row h-full max-h-[85vh] md:max-h-[80vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-neon-blue transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Panel: Embedded Iframe Player */}
          <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative aspect-video md:aspect-auto md:h-full">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0`}
              title={video.title}
              className="w-full h-full border-0 absolute inset-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Right Panel: Content Details */}
          <div className="w-full md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto bg-[#05050a]/95 border-t md:border-t-0 md:border-l border-white/5 h-full">
            <div>
              {/* Categories */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {video.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                  >
                    {cat}
                  </span>
                ))}
                {video.isShort && (
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                    Short
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-display font-bold text-lg md:text-xl text-white mb-2 leading-snug">
                {video.title}
              </h2>

              {/* Stats Bar */}
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 border-b border-white/5 pb-3">
                <span>{video.views.toLocaleString()} views</span>
                <span>•</span>
                <span>{new Date(video.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</span>
                {video.duration && (
                  <>
                    <span>•</span>
                    <span>{video.duration}</span>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="text-xs text-gray-400 leading-relaxed mb-6 whitespace-pre-wrap max-h-40 md:max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                {video.description || "No description available."}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-white/10 hover:border-neon-blue/40 text-xs text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </button>
                <div className="flex items-center gap-1.5 text-xs text-gray-300 px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
                  <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  <span>{video.likes.toLocaleString()}</span>
                </div>
              </div>

              {/* Subscribe and watch directly CTAs */}
              <div className="flex flex-col gap-2">
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-neon-purple to-neon-blue text-xs font-bold text-white shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300"
                >
                  <YoutubeIcon />
                  WATCH ON YOUTUBE
                </a>
                
                <a
                  href={`https://www.youtube.com/${CHANNEL_HANDLE}?sub_confirmation=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  SUBSCRIBE TO CHANNEL
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
