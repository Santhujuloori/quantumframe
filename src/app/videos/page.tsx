import { getQuantumFrameData } from "@/utils/youtube";
import VideosContent from "./VideosContent";

export const metadata = {
  title: "Video Library | Quantum Frame Cinematic Catalog",
  description: "Browse all cinematic releases, episodic anime sagas, cosmic what-ifs, and YouTube Shorts from Quantum Frame.",
};

export default async function VideosPage() {
  const data = await getQuantumFrameData();

  return <VideosContent initialVideos={data.videos} />;
}
