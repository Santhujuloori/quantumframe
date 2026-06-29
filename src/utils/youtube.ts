import { localVideos, localPlaylists, localStats, Video, Playlist, ChannelStats } from "@/data/localData";

export interface YouTubeData {
  dataSource: string;
  stats: ChannelStats;
  playlists: Playlist[];
  videos: Video[];
}

export async function getQuantumFrameData(): Promise<YouTubeData> {
  const isServer = typeof window === "undefined";
  
  if (!isServer) {
    try {
      const res = await fetch("/api/youtube");
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.error("Client fetch error, using local backup:", e);
    }
    return {
      dataSource: "client_fallback",
      stats: localStats,
      playlists: localPlaylists,
      videos: localVideos,
    };
  }

  // Server-side: call the API route's logic directly to avoid self-referencing HTTP requests
  try {
    const { GET } = await import("@/app/api/youtube/route");
    const response = await GET();
    if (response.ok) {
      return await response.json();
    }
  } catch (e) {
    console.error("Server direct call error, using local backup:", e);
  }

  return {
    dataSource: "server_fallback",
    stats: localStats,
    playlists: localPlaylists,
    videos: localVideos,
  };
}
