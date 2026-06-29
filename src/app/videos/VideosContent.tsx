"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Grid, ListFilter, Play } from "lucide-react";
import { Video } from "@/data/localData";
import VideoCard from "@/components/VideoCard";
import ShortCard from "@/components/ShortCard";
import VideoPlayerModal from "@/components/VideoPlayerModal";

interface VideosContentProps {
  initialVideos: Video[];
}

function VideosContentInner({ initialVideos }: VideosContentProps) {
  const searchParams = useSearchParams();
  const navbarQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [filterType, setFilterType] = useState("All Media"); // All Media, Videos, Shorts
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Sync search query from navbar redirection search parameter
  useEffect(() => {
    if (navbarQuery) {
      setSearchQuery(navbarQuery);
    }
  }, [navbarQuery]);

  const categories = ["All", "Sci-Fi", "Mythology", "Horror", "Action", "Adventure", "Animation", "Celestial Blaze"];

  // Filter and sort computation
  const filteredVideos = useMemo(() => {
    let result = [...initialVideos];

    // 1. Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((v) =>
        v.categories.some((c) => c.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    // 3. Media Type Filter (Videos vs Shorts)
    if (filterType === "Videos") {
      result = result.filter((v) => !v.isShort);
    } else if (filterType === "Shorts") {
      result = result.filter((v) => v.isShort);
    }

    // 4. Sorting
    if (sortBy === "Latest") {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === "Oldest") {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else if (sortBy === "Most Viewed") {
      result.sort((a, b) => b.views - a.views);
    }

    return result;
  }, [initialVideos, searchQuery, selectedCategory, filterType, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-wider mb-2">
          EXPLORE <span className="text-neon-blue">CONTENT</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Search, filter, and discover all uploaded videos and Shorts from Quantum Frame.
        </p>
      </div>

      {/* Control Panel: Search & Select Filter Toggles */}
      <div className="glass rounded-xl p-5 border border-white/5 space-y-4 mb-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Search Field */}
          <div className="relative w-full lg:max-w-md">
            <input
              type="text"
              placeholder="Search by title, tags, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-neon-blue focus:bg-white/10 transition-all"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Media Type Filter */}
            <div className="flex bg-[#050508] border border-white/5 p-1 rounded-xl w-full sm:w-auto">
              {["All Media", "Videos", "Shorts"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex-1 sm:flex-initial text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    filterType === type
                      ? "bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-blue/40 text-white"
                      : "text-gray-400 hover:text-white border border-transparent"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-[#050508] border border-white/5 px-3 py-2 rounded-xl text-xs w-full sm:w-auto justify-between sm:justify-start">
              <span className="text-gray-500 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="Latest" className="bg-[#050508]">Newest Releases</option>
                <option value="Oldest" className="bg-[#050508]">Oldest Uploads</option>
                <option value="Most Viewed" className="bg-[#050508]">Most Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="border-t border-white/5 pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <ListFilter className="w-3.5 h-3.5" />
            <span className="font-semibold uppercase tracking-wider">Genres & Sagas:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs px-4 py-2 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "bg-neon-blue/10 border-neon-blue text-neon-blue shadow-[0_0_12px_rgba(0,240,255,0.15)] font-semibold"
                      : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Videos Layout Grid */}
      <AnimatePresence mode="popLayout">
        {filteredVideos.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredVideos.map((vid) => (
              <motion.div
                layout
                key={vid.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {vid.isShort ? (
                  <ShortCard video={vid} onClick={() => setSelectedVideo(vid)} />
                ) : (
                  <VideoCard video={vid} onClick={() => setSelectedVideo(vid)} />
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-xl p-16 text-center border border-white/5 max-w-xl mx-auto"
          >
            <p className="text-gray-400 text-sm mb-4">
              We couldn't find any videos matching your search filters. Try searching something else or clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setFilterType("All Media");
              }}
              className="text-xs font-bold px-5 py-2.5 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue text-white"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Watch modal */}
      {selectedVideo && (
        <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}

export default function VideosContent({ initialVideos }: VideosContentProps) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 rounded-full border-2 border-neon-blue border-t-transparent animate-spin" />
      </div>
    }>
      <VideosContentInner initialVideos={initialVideos} />
    </Suspense>
  );
}
