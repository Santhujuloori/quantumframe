import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getQuantumFrameData } from "@/utils/youtube";
import VideoPageContent from "./VideoPageContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  try {
    const data = await getQuantumFrameData();
    return data.videos.map((v) => ({
      id: v.id,
    }));
  } catch (e) {
    console.error("Failed to generate static params:", e);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await getQuantumFrameData();
  const video = data.videos.find((v) => v.id === id);

  if (!video) {
    return {
      title: "Video Not Found | Quantum Frame",
    };
  }

  // Escape any title/description issues for safe metadata representation
  const cleanTitle = video.title.replace(/"/g, "'");
  const cleanDesc = video.description?.substring(0, 155) + "...";

  return {
    title: `${cleanTitle} | Quantum Frame Cinematic`,
    description: cleanDesc,
    openGraph: {
      title: cleanTitle,
      description: cleanDesc,
      images: [{ url: video.thumbnailUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: cleanTitle,
      description: cleanDesc,
      images: [video.thumbnailUrl],
    },
  };
}

export default async function VideoPage({ params }: PageProps) {
  const { id } = await params;
  const data = await getQuantumFrameData();
  const video = data.videos.find((v) => v.id === id);

  if (!video) {
    notFound();
  }

  return <VideoPageContent video={video} allVideos={data.videos} />;
}
