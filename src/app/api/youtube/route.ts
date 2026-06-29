import { NextResponse } from "next/server";
import { localVideos, localPlaylists, localStats, Video, Playlist, ChannelStats, CHANNEL_ID } from "@/data/localData";

export const revalidate = 3600; // Cache on Vercel for 1 hour

// Helper dictionary to enrich live feed videos with hand-curated categories, tags, and durations
const localVideoMap = new Map<string, Partial<Video>>(
  localVideos.map((v) => [
    v.id,
    {
      categories: v.categories,
      tags: v.tags,
      duration: v.duration,
      likes: v.likes,
      // Keep descriptions and titles as they can change
    },
  ])
);

// Helper to categorize a new video based on its title and description if it's not in our map
function categorizeVideo(title: string, description: string): { categories: string[]; tags: string[] } {
  const categories: string[] = [];
  const tags: string[] = [];
  
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes("celestial blade") || text.includes("sword") || text.includes("ren")) {
    categories.push("Celestial Blaze", "Action", "Adventure", "Animation");
    tags.push("TheCelestialBlade", "Anime", "Fantasy", "EpicStory");
  } else if (text.includes("maadurga") || text.includes("durga") || text.includes("kailash") || text.includes("shiva") || text.includes("mythology")) {
    categories.push("Mythology", "Fantasy");
    tags.push("Mythology", "Divine", "MaaDurga", "EpicStory");
  } else if (text.includes("gravity") || text.includes("raindrop") || text.includes("atom") || text.includes("universe") || text.includes("black hole") || text.includes("scifi") || text.includes("sci-fi") || text.includes("space")) {
    categories.push("Sci-Fi");
    tags.push("SciFi", "Cosmos", "Space", "Universe", "ImpossibleCamera");
  }
  
  if (text.includes("horror") || text.includes("demon") || text.includes("beast") || text.includes("terrifying")) {
    categories.push("Horror");
    tags.push("Horror", "Monster");
  }
  
  if (categories.length === 0) {
    categories.push("Sci-Fi"); // Default category
  }
  
  // Extract hashtags
  const hashtagRegex = /#(\w+)/g;
  let match;
  while ((match = hashtagRegex.exec(title + " " + description)) !== null) {
    const tag = match[1];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }

  return { 
    categories: Array.from(new Set(categories)), 
    tags: Array.from(new Set(tags)) 
  };
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID || CHANNEL_ID;

  let videos: Video[] = [];
  let playlists: Playlist[] = localPlaylists;
  let stats: ChannelStats = localStats;
  let dataSource = "local_backup";

  try {
    if (apiKey) {
      dataSource = "youtube_api";
      // 1. Fetch Channel Statistics
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`,
        { next: { revalidate } }
      );
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.items && statsData.items[0]) {
          const s = statsData.items[0].statistics;
          stats = {
            subscriberCount: parseInt(s.subscriberCount, 10),
            viewCount: parseInt(s.viewCount, 10),
            videoCount: parseInt(s.videoCount, 10),
          };
        }
      }

      // 2. Fetch playlists
      const playlistsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=25&key=${apiKey}`,
        { next: { revalidate } }
      );
      if (playlistsRes.ok) {
        const playlistsData = await playlistsRes.json();
        if (playlistsData.items) {
          // Fetch videos for each playlist to construct Playlist objects
          playlists = await Promise.all(
            playlistsData.items.map(async (item: any) => {
              const playlistItemsRes = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${item.id}&maxResults=50&key=${apiKey}`,
                { next: { revalidate } }
              );
              let videoIds: string[] = [];
              if (playlistItemsRes.ok) {
                const itemsData = await playlistItemsRes.json();
                videoIds = itemsData.items?.map((vi: any) => vi.contentDetails?.videoId) || [];
              }
              return {
                id: item.id,
                title: item.snippet.title,
                description: item.snippet.description || "",
                thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || "",
                videoIds,
              };
            })
          );
        }
      }

      // 3. Fetch uploaded videos (using the uploads playlist which starts with UU + the channel id stripped of UC)
      const uploadsPlaylistId = "UU" + channelId.substring(2);
      const uploadsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`,
        { next: { revalidate } }
      );

      if (uploadsRes.ok) {
        const uploadsData = await uploadsRes.json();
        if (uploadsData.items) {
          const apiVideos = await Promise.all(
            uploadsData.items.map(async (item: any) => {
              const videoId = item.contentDetails.videoId;
              const title = item.snippet.title;
              const description = item.snippet.description || "";
              const publishedAt = item.snippet.publishedAt;
              const thumbnailUrl = item.snippet.thumbnails?.maxres?.url || item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url || "";

              // To get durations and stats (views, likes) we can make a details request or estimate/fallback
              const detailsRes = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoId}&key=${apiKey}`,
                { next: { revalidate } }
              );
              let duration = "0:59";
              let views = 10000;
              let likes = 800;
              if (detailsRes.ok) {
                const detailsData = await detailsRes.json();
                if (detailsData.items && detailsData.items[0]) {
                  const details = detailsData.items[0];
                  // Parse ISO duration e.g., PT59S -> 0:59 or PT2M45S -> 2:45
                  const isoDuration = details.contentDetails.duration;
                  const minutesMatch = isoDuration.match(/(\d+)M/);
                  const secondsMatch = isoDuration.match(/(\d+)S/);
                  const minutes = minutesMatch ? minutesMatch[1] : "0";
                  const seconds = secondsMatch ? secondsMatch[1].padStart(2, "0") : "00";
                  duration = `${minutes}:${seconds}`;
                  
                  views = parseInt(details.statistics.viewCount || "0", 10);
                  likes = parseInt(details.statistics.likeCount || "0", 10);
                }
              }

              // Determine if it's a Short
              // Shorts are vertical videos (usually <= 60s)
              const isShort = duration.split(":").map(Number)[0] === 0 && duration.split(":").map(Number)[1] <= 60;

              const curated = localVideoMap.get(videoId);
              const customMeta = curated || categorizeVideo(title, description);

              return {
                id: videoId,
                title,
                description,
                publishedAt,
                duration: curated?.duration || duration,
                views,
                likes,
                isShort,
                categories: customMeta.categories || ["Sci-Fi"],
                tags: customMeta.tags || [],
                thumbnailUrl,
              };
            })
          );

          // Merge and de-duplicate (prefer API results over local)
          const apiIds = new Set(apiVideos.map((v) => v.id));
          const remainingLocal = localVideos.filter((v) => !apiIds.has(v.id));
          videos = [...apiVideos, ...remainingLocal];
        }
      }
    }

    // Fallback 1: If API key is missing or uploads list failed to fetch, use RSS Feed
    if (videos.length === 0) {
      dataSource = "rss_feed";
      const rssRes = await fetch(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
        { next: { revalidate } }
      );

      if (rssRes.ok) {
        const text = await rssRes.text();
        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
        let match;
        const feedVideos: Video[] = [];

        while ((match = entryRegex.exec(text)) !== null) {
          const entry = match[1];
          const idMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
          const titleMatch = entry.match(/<title>(.*?)<\/title>/);
          const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
          const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);
          const thumbMatch = entry.match(/<media:thumbnail url="([^"]+)"/);
          const linkMatch = entry.match(/<link rel="alternate" href="([^"]+)"/);
          const viewsMatch = entry.match(/<media:statistics views="(\d+)"/);

          if (idMatch && titleMatch) {
            const id = idMatch[1].trim();
            const rawTitle = titleMatch[1].trim();
            // Decode XML entities in title
            const title = rawTitle
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, "&")
              .replace(/&lt;/g, "<")
              .replace(/&gt;/g, ">")
              .replace(/&#39;/g, "'");

            const publishedAt = publishedMatch ? publishedMatch[1].trim() : new Date().toISOString();
            const description = descMatch ? descMatch[1].trim() : "";
            const thumbnailUrl = thumbMatch ? thumbMatch[1].trim() : `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
            const link = linkMatch ? linkMatch[1].trim() : "";
            const views = viewsMatch ? parseInt(viewsMatch[1], 10) : 50000;

            const isShort = link.includes("/shorts/") || title.toLowerCase().includes("#shorts") || description.toLowerCase().includes("#shorts");
            
            // Enrich with our local curated details if it exists
            const curated = localVideoMap.get(id);
            const customMeta = curated || categorizeVideo(title, description);

            feedVideos.push({
              id,
              title,
              description,
              publishedAt,
              duration: curated?.duration || (isShort ? "0:59" : "3:00"),
              views: views || curated?.views || 50000,
              likes: curated?.likes || Math.round(views * 0.07),
              isShort,
              categories: customMeta.categories || ["Sci-Fi"],
              tags: customMeta.tags || [],
              thumbnailUrl,
            });
          }
        }

        // Merge RSS videos with our full local backup (de-duplicating)
        const feedIds = new Set(feedVideos.map((v) => v.id));
        const remainingLocal = localVideos.filter((v) => !feedIds.has(v.id));
        videos = [...feedVideos, ...remainingLocal];
      }
    }
  } catch (error) {
    console.error("Error in YouTube API route, falling back to local database:", error);
  }

  // Fallback 2: If everything fails, use our static local database
  if (videos.length === 0) {
    videos = localVideos;
    dataSource = "local_backup_full";
  }

  // Sort final merged list by published date (newest first)
  videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return NextResponse.json({
    dataSource,
    stats,
    playlists,
    videos,
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    }
  });
}
