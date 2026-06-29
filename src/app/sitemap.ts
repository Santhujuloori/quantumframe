import { MetadataRoute } from "next";
import { getQuantumFrameData } from "@/utils/youtube";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://quantumframe.tv";
  
  // Try to load videos for dynamic sitemap mappings
  let videoEntries: MetadataRoute.Sitemap = [];
  try {
    const data = await getQuantumFrameData();
    videoEntries = data.videos.map((vid) => ({
      url: `${baseUrl}/video/${vid.id}`,
      lastModified: new Date(vid.publishedAt),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Sitemap generation fetching failed:", e);
  }

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/series`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticEntries, ...videoEntries];
}
