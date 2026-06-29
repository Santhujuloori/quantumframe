"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Play, Heart, Share2, ArrowLeft, ArrowRight, Eye, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Video, CHANNEL_HANDLE } from "@/data/localData";
import VideoCard from "@/components/VideoCard";

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface VideoPageContentProps {
  video: Video;
  allVideos: Video[];
}

export default function VideoPageContent({ video, allVideos }: VideoPageContentProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  // Find current index, previous, and next videos
  const currentIndex = useMemo(() => {
    return allVideos.findIndex((v) => v.id === video.id);
  }, [video.id, allVideos]);

  const prevVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : allVideos[allVideos.length - 1];
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : allVideos[0];

  // Compute related videos (exclude current video, sort by shared categories/tags count)
  const relatedVideos = useMemo(() => {
    const currentCats = new Set(video.categories);
    const currentTags = new Set(video.tags);

    return allVideos
      .filter((v) => v.id !== video.id)
      .map((v) => {
        let score = 0;
        v.categories.forEach((cat) => {
          if (currentCats.has(cat)) score += 3; // Categorical matches have higher weights
        });
        v.tags.forEach((tag) => {
          if (currentTags.has(tag)) score += 1;
        });
        return { video: v, score };
      })
      .filter((item) => item.score > 0 || item.video.isShort === video.isShort) // prefer similar formats
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((item) => item.video);
  }, [video, allVideos]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Video Player Container */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0`}
          title={video.title}
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* 2. Primary Metadata Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Video Info & Description */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
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
          <h1 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-white leading-snug">
            {video.title}
          </h1>

          {/* Stats & Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-white/5 py-4 text-xs sm:text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-gray-600" />
                {video.views.toLocaleString()} views
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-600" />
                {new Date(video.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
              </span>
              {video.duration && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-600" />
                    {video.duration}
                  </span>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full border transition-all duration-300 ${
                  isLiked
                    ? "bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-gray-300 hover:text-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500" : ""}`} />
                <span>{isLiked ? (video.likes + 1).toLocaleString() : video.likes.toLocaleString()}</span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-neon-blue/40 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Description expanding block */}
          <div className="glass rounded-xl p-5 border border-white/5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</h3>
            <p className={`text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-wrap ${!descExpanded ? "line-clamp-4" : ""}`}>
              {video.description || "No description available."}
            </p>
            {video.description && video.description.length > 200 && (
              <button
                onClick={() => setDescExpanded(!descExpanded)}
                className="flex items-center gap-1 text-xs text-neon-blue hover:text-white font-semibold transition-colors"
              >
                {descExpanded ? (
                  <>
                    Show Less <ChevronUp className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Tags Chips */}
          {video.tags.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {video.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/videos?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-neon-blue hover:border-neon-blue/20 transition-all duration-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next Pagination controls */}
          <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-8">
            {prevVideo && (
              <Link
                href={`/video/${prevVideo.id}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all text-left max-w-[45%]"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="hidden sm:block">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">PREVIOUS VIDEO</div>
                  <div className="text-xs text-white font-medium line-clamp-1">{prevVideo.title}</div>
                </div>
              </Link>
            )}
            
            {nextVideo && (
              <Link
                href={`/video/${nextVideo.id}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all text-right max-w-[45%] ml-auto"
              >
                <div className="hidden sm:block">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">UP NEXT</div>
                  <div className="text-xs text-white font-medium line-clamp-1">{nextVideo.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </Link>
            )}
          </div>
        </div>

        {/* Right Side: Subscribe CTA & Related videos sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Subscribe CTA Box */}
          <div className="glass rounded-2xl p-6 border border-white/10 shadow-xl bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 relative overflow-hidden text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center mx-auto text-red-500">
              <YoutubeIcon className="w-6 h-6 fill-red-500" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-bold text-white tracking-wide">
                Join the Quantum Frame
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Subscribe for daily epic sci-fi stories, cosmological visuals, and mythology releases.
              </p>
            </div>
            <a
              href={`https://www.youtube.com/${CHANNEL_HANDLE}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-xs font-bold text-white shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform hover:scale-[1.02]"
            >
              SUBSCRIBE TO CHANNEL
            </a>
          </div>

          {/* Related Videos sidebar */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-white/5 pb-2">
              Related Content
            </h3>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {relatedVideos.map((vid) => (
                <div key={vid.id} className="h-full">
                  <VideoCard video={vid} onClick={() => router.push(`/video/${vid.id}`)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
