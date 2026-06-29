import { getQuantumFrameData } from "@/utils/youtube";
import SeriesContent from "./SeriesContent";

export const metadata = {
  title: "Cinematic Series | Quantum Frame Episodic Sagas",
  description: "Explore the sagas, multi-part mythological visual chronicles, and cosmological concepts from Quantum Frame, organized by playlist series.",
};

export default async function SeriesPage() {
  const data = await getQuantumFrameData();

  return <SeriesContent playlists={data.playlists} videos={data.videos} />;
}
