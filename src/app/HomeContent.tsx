"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Eye, Film, Users, Sparkles, TrendingUp } from "lucide-react";
import { Video, ChannelStats, CHANNEL_HANDLE } from "@/data/localData";
import VideoCard from "@/components/VideoCard";
import ShortCard from "@/components/ShortCard";
import VideoPlayerModal from "@/components/VideoPlayerModal";

const YoutubeIcon = () => (
  <svg className="w-4 h-4 fill-current text-red-500" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface HomeContentProps {
  videos: Video[];
  stats: ChannelStats;
}

export default function HomeContent({ videos, stats }: HomeContentProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [animatedStats, setAnimatedStats] = useState({ subs: 0, views: 0, vids: 0 });

  // Filter videos and shorts
  const normalVideos = videos.filter((v) => !v.isShort);
  const shorts = videos.filter((v) => v.isShort);

  // Latest upload (first normal video, or first video if none are long)
  const latestUpload = normalVideos[0] || videos[0];

  // Animate statistics counters on mount
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setAnimatedStats({
        subs: Math.round((stats.subscriberCount / steps) * step),
        views: Math.round((stats.viewCount / steps) * step),
        vids: Math.round((stats.videoCount / steps) * step),
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats({
          subs: stats.subscriberCount,
          views: stats.viewCount,
          vids: stats.videoCount,
        });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [stats]);

  const formatStatsNumber = (num: number, isSub = false) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M+`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K+`;
    }
    return num.toString();
  };

  return (
    <div className="relative">
      {/* 1. Large Cinematic Hero Section */}
      {latestUpload && (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black py-20">
          {/* Background image with masks */}
          <div className="absolute inset-0 z-0">
            <img
              src={latestUpload.thumbnailUrl.replace("hqdefault", "maxresdefault")}
              alt="Featured Video Backdrop"
              className="w-full h-full object-cover opacity-35 scale-105 filter blur-[2px]"
            />
            {/* Cinematic dark mask overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-black/50" />
            <div className="absolute inset-0 hero-mask" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-bold tracking-widest uppercase"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Featured Latest Release
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-none"
              >
                QUANTUM<span className="text-neon-blue text-glow-blue">FRAME</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display font-medium text-lg sm:text-xl text-gray-300 italic tracking-wide"
              >
                "Stories Beyond Reality."
              </motion.p>

              {/* Title & Description of Latest Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-3"
              >
                <h2 className="text-white font-bold text-xl sm:text-2xl line-clamp-2">
                  {latestUpload.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xl line-clamp-3">
                  {latestUpload.description}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
              >
                <button
                  onClick={() => setSelectedVideo(latestUpload)}
                  className="flex items-center gap-2.5 bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] text-white text-sm font-bold tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-white" />
                  WATCH NOW
                </button>
                
                <a
                  href={`https://www.youtube.com/${CHANNEL_HANDLE}?sub_confirmation=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-bold tracking-wider px-8 py-3.5 rounded-full transition-all duration-300"
                >
                  <YoutubeIcon />
                  SUBSCRIBE
                </a>
              </motion.div>
            </div>

            {/* Hero Right Visual (Card Preview) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div
                onClick={() => setSelectedVideo(latestUpload)}
                className="relative aspect-video rounded-2xl overflow-hidden glass cursor-pointer border border-white/10 shadow-[0_0_40px_rgba(189,0,255,0.15)] group transition-all duration-300 hover:border-neon-blue/30"
              >
                <img
                  src={latestUpload.thumbnailUrl}
                  alt={latestUpload.title}
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:bg-black/60 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-[#020204]/90 border border-neon-blue/40 flex items-center justify-center text-neon-blue group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                    <Play className="w-6 h-6 fill-neon-blue translate-x-[1.5px]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 2. Channel Statistics Section */}
      <section className="relative z-10 -mt-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="glass rounded-2xl py-8 px-6 sm:px-12 grid grid-cols-3 gap-4 text-center border border-white/10 shadow-2xl shadow-black/80">
          <div className="space-y-1">
            <div className="flex justify-center text-neon-purple mb-1.5">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-white">
              {formatStatsNumber(animatedStats.subs)}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Subscribers
            </div>
          </div>
          <div className="space-y-1 border-x border-white/5">
            <div className="flex justify-center text-neon-blue mb-1.5">
              <Eye className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-white">
              {formatStatsNumber(animatedStats.views)}
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Total Views
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-center text-neon-purple mb-1.5">
              <Film className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div className="font-display font-black text-lg sm:text-2xl lg:text-3xl text-white">
              {animatedStats.vids}+
            </div>
            <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider font-semibold">
              Videos & Shorts
            </div>
          </div>
        </div>
      </section>

      {/* 3. Latest Upload Detailed Display Section */}
      {latestUpload && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-[1px] bg-neon-purple" />
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
              LATEST <span className="text-neon-purple">UPLOAD</span>
            </h2>
          </div>

          <div className="glass rounded-2xl border border-white/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 hover:border-white/10 transition-colors duration-300">
            <div className="lg:col-span-7 relative aspect-video w-full rounded-xl overflow-hidden bg-black/40 group cursor-pointer" onClick={() => setSelectedVideo(latestUpload)}>
              <img
                src={latestUpload.thumbnailUrl}
                alt={latestUpload.title}
                className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neon-purple to-neon-blue flex items-center justify-center text-white shadow-xl scale-90 group-hover:scale-100 transition-all duration-300">
                  <Play className="w-6 h-6 fill-white translate-x-[1px]" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-neon-blue uppercase px-2 py-0.5 rounded bg-neon-blue/10 border border-neon-blue/20 inline-block">
                  New Release
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug hover:text-neon-blue cursor-pointer transition-colors" onClick={() => setSelectedVideo(latestUpload)}>
                  {latestUpload.title}
                </h3>
                <p className="text-xs text-gray-500">
                  Published on {new Date(latestUpload.publishedAt).toLocaleDateString(undefined, { dateStyle: "long" })} • Duration: {latestUpload.duration}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-4 sm:line-clamp-6">
                  {latestUpload.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedVideo(latestUpload)}
                className="w-full sm:w-auto self-start flex items-center justify-center gap-2 py-3 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-blue/40 text-xs font-bold text-white tracking-wider transition-all duration-300"
              >
                <Play className="w-4 h-4 fill-white" />
                PLAY VIDEO
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. Latest Shorts Section */}
      {shorts.length > 0 && (
        <section className="py-16 bg-[#04040a]/40 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-neon-blue" />
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
                  LATEST <span className="text-neon-blue">SHORTS</span>
                </h2>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-gray-500 uppercase tracking-widest font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-neon-blue" />
                Trending
              </span>
            </div>

            {/* Shorts Horizontal Scroll Box */}
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-thin snap-x snap-mandatory">
              {shorts.slice(0, 8).map((short) => (
                <div key={short.id} className="min-w-[200px] sm:min-w-[250px] max-w-[280px] snap-start flex-shrink-0">
                  <ShortCard video={short} onClick={() => setSelectedVideo(short)} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Regular Uploads Library Preview */}
      {normalVideos.length > 1 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-neon-purple" />
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
                RECENT <span className="text-neon-purple">VIDEOS</span>
              </h2>
            </div>
            <a
              href="/videos"
              className="text-xs text-neon-blue hover:text-white uppercase tracking-widest font-bold transition-colors duration-300"
            >
              View Full Library &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {normalVideos.slice(1, 4).map((vid) => (
              <VideoCard key={vid.id} video={vid} onClick={() => setSelectedVideo(vid)} />
            ))}
          </div>
        </section>
      )}

      {/* 6. Dynamic Video Player Overlay Modal */}
      {selectedVideo && (
        <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}
