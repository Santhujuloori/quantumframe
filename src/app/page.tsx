import { getQuantumFrameData } from "@/utils/youtube";
import HomeContent from "./HomeContent";

export default async function HomePage() {
  const data = await getQuantumFrameData();

  return <HomeContent videos={data.videos} stats={data.stats} />;
}
