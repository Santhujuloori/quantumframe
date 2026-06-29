"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ListVideo, Heart, Sparkles, Film } from "lucide-react";
import { Video, Playlist } from "@/data/localData";
import VideoPlayerModal from "@/components/VideoPlayerModal";

interface SeriesContentProps {
  playlists: Playlist[];
  videos: Video[];
}

export default function SeriesContent({ playlists, videos }: SeriesContentProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Map video IDs to Video objects for quick lookup
  const videoMap = new Map(videos.map((v) => [v.id, v]));

  // Get full video objects for each playlist
  const playlistsWithVideos = playlists.map((p) => {
    const playlistVideos = p.videoIds
      .map((id) => videoMap.get(id))
      .filter((v): v is Video => !!v);
    
    return {
      ...p,
      videos: playlistVideos,
    };
  }).filter((p) => p.videos.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="mb-14 text-center sm:text-left">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-white tracking-wider mb-2">
          CINEMATIC <span className="text-neon-purple text-glow-purple">SERIES</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Discover our episodic sagas, cosmology concepts, and multi-part mythological visual stories.
        </p>
      </div>

      {/* Playlists Showcase */}
      <div className="space-y-24">
        {playlistsWithVideos.map((playlist, pIdx) => {
          const firstVid = playlist.videos[0];
          
          return (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              key={playlist.id}
              className="space-y-6"
            >
              {/* Series Cinematic Banner */}
              <div className="relative h-[250px] sm:h-[350px] rounded-2xl overflow-hidden border border-white/5 shadow-2xl flex items-end">
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={playlist.thumbnailUrl || firstVid?.thumbnailUrl}
                    alt={playlist.title}
                    className="w-full h-full object-cover opacity-30 transform scale-103 filter blur-[1px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-[#020204]/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
                </div>

                {/* Banner Content Details */}
                <div className="p-6 sm:p-10 relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-1.5 text-xs text-neon-blue font-bold tracking-widest uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      Quantum Saga #{pIdx + 1}
                    </div>
                    <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide">
                      {playlist.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                      {playlist.description}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedVideo(firstVid)}
                    className="flex-shrink-0 flex items-center gap-2.5 bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] text-white text-xs font-bold tracking-wider px-6 py-3 rounded-full transition-all transform hover:scale-105"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    PLAY SERIES
                  </button>
                </div>
              </div>

              {/* Episodes Grid List */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold tracking-wider uppercase">
                  <ListVideo className="w-4 h-4 text-neon-purple" />
                  <span>Episodes In This Saga ({playlist.videos.length})</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {playlist.videos.map((vid, eIdx) => (
                    <motion.div
                      key={vid.id}
                      onClick={() => setSelectedVideo(vid)}
                      className="group cursor-pointer glass rounded-xl overflow-hidden glass-hover flex flex-col h-full border border-white/5"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Thumbnail with sequence badge */}
                      <div className="relative aspect-video bg-black/35 overflow-hidden">
                        <img
                          src={vid.thumbnailUrl}
                          alt={vid.title}
                          className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                        {/* Episode Sequence badge */}
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/85 text-[9px] font-bold tracking-wider text-white border border-white/10 uppercase">
                          Episode {eIdx + 1}
                        </div>
                        {vid.duration && (
                          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-[9px] text-white border border-white/10">
                            {vid.duration}
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <h3 className="font-display font-bold text-xs sm:text-sm line-clamp-2 text-white group-hover:text-neon-blue transition-colors duration-300 leading-snug">
                          {vid.title}
                        </h3>
                        <div className="flex items-center justify-between text-[10px] text-gray-500 mt-3 border-t border-white/5 pt-2">
                          <span>{vid.views.toLocaleString()} views</span>
                          <span>•</span>
                          <span>{new Date(vid.publishedAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          );
        })}
      </div>

      {/* Video watch Modal */}
      {selectedVideo && (
        <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}
