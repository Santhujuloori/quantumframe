import { Sparkles, Mail, Info, Heart, Award, ArrowUpRight } from "lucide-react";
import Timeline from "@/components/Timeline";
import { CHANNEL_HANDLE } from "@/data/localData";

const YoutubeIconLarge = () => (
  <svg className="w-8 h-8 text-red-500 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIconLarge = () => (
  <svg className="w-8 h-8 text-pink-500 stroke-current fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const metadata = {
  title: "About | Quantum Frame Origin Story",
  description: "Learn about the mission, creator, and journey of Quantum Frame. Explore the storytelling vision behind the cinematic cosmic animations.",
};

export default function AboutPage() {
  const socialCards = [
    {
      name: "YouTube Channel",
      handle: CHANNEL_HANDLE,
      url: `https://www.youtube.com/${CHANNEL_HANDLE}`,
      icon: <YoutubeIconLarge />,
      color: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]",
      desc: "Watch the latest high-fidelity episodes and Shorts, and subscribe to join the community.",
    },
    {
      name: "Instagram",
      handle: "@quantumframe.tv",
      url: "https://instagram.com",
      icon: <InstagramIconLarge />,
      color: "hover:border-pink-500/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
      desc: "Behind-the-scenes renders, concept arts, and daily updates from the production floor.",
    },
    {
      name: "X (Twitter)",
      handle: "@quantum_frame",
      url: "https://x.com",
      icon: (
        <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "hover:border-neon-blue/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
      desc: "Share thoughts on parallel dimensions, sci-fi timelines, and cosmic science discussions.",
    },
    {
      name: "Business Inquiries",
      handle: "contact@quantumframe.tv",
      url: "mailto:contact@quantumframe.tv",
      icon: <Mail className="w-8 h-8 text-neon-purple" />,
      color: "hover:border-neon-purple/30 hover:shadow-[0_0_30px_rgba(189,0,255,0.15)]",
      desc: "Get in touch for brand partnerships, collaborations, syndications, or licensing deals.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* 1. Cinematic Banner Title */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs font-bold tracking-widest uppercase">
          <Info className="w-3.5 h-3.5" />
          The Storytellers
        </span>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-white tracking-widest leading-none">
          BEYOND <span className="text-neon-blue text-glow-blue">IMAGINATION</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
          Quantum Frame is a premium visual arts platform dedicated to crafting deep, thought-provoking narrative animations that cross the boundaries of space, reality, and mythology.
        </p>
      </div>

      {/* 2. Mission & Vision Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <div className="glass rounded-2xl p-8 border border-white/5 space-y-4 relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-neon-blue/15 border border-neon-blue/20 flex items-center justify-center text-neon-blue mb-4">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-white">Our Mission</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            We live to inspire curiosity. By leveraging advanced digital CGI rendering pipelines, cutting-edge AI animatics, and orchestral sound design, we transport viewers to spaces they have never dreamed of—inside a molecular universe hidden within a raindrop, onto the collapsing gravity fields of black holes, or along the sacred borders of ancient mythological kingdoms.
          </p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-full blur-2xl pointer-events-none group-hover:bg-neon-blue/10 transition-colors" />
        </div>

        <div className="glass rounded-2xl p-8 border border-white/5 space-y-4 relative overflow-hidden group hover:border-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-neon-purple/15 border border-neon-purple/20 flex items-center justify-center text-neon-purple mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-lg sm:text-xl text-white">Our Vision</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Our vision is to build an immersive digital studio that bridges science, entertainment, and philosophy. We aim to create complete multi-part sci-fi episodic anthologies and fantasy sagas (like 'The Celestial Blade') that allow viewers to participate in branching narrative arcs, making cinematic experiences more dynamic, educational, and breathtaking.
          </p>
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/5 rounded-full blur-2xl pointer-events-none group-hover:bg-neon-purple/10 transition-colors" />
        </div>
      </div>

      {/* 3. Creator Profile Section */}
      <div className="glass rounded-2xl border border-white/5 p-6 sm:p-10 mb-24 relative overflow-hidden hover:border-white/10 transition-colors duration-300">
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-4 flex justify-center">
            {/* Immersive profile avatar grid */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-neon-purple via-neon-blue to-transparent shadow-[0_0_35px_rgba(0,240,255,0.2)]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src="https://i.ytimg.com/vi/i9iU4BRrXJU/hqdefault.jpg"
                  alt="Santhosh Juloori avatar backdrop"
                  className="w-full h-full object-cover scale-125 opacity-30 filter blur-xs absolute"
                />
                <span className="font-display font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue z-10">
                  QF
                </span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <span className="text-[10px] font-bold tracking-widest text-neon-blue uppercase px-2 py-0.5 rounded bg-neon-blue/10 border border-neon-blue/20 inline-block">
              Founder & Director
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Santhosh Juloori</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Santhosh Juloori is the creative engineer behind Quantum Frame. A digital artist and technology director, Santhosh has merged space exploration concepts, mythology architectures, and AI cinematic rendering to launch Quantum Frame. Believing that science and art are two faces of the same coin, he guides the stories, visual graphics, soundscapes, and digital details that define the channel.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Sparkles className="w-4 h-4 text-neon-purple" />
                <span>AI CGI Production</span>
              </div>
              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Sparkles className="w-4 h-4 text-neon-blue" />
                <span>Cosmology Exploration</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Journey Timeline Section */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
            OUR <span className="text-neon-blue">JOURNEY</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            The major milestones and phases in the history of Quantum Frame.
          </p>
        </div>
        
        <Timeline />
      </section>

      {/* 5. Social Links Section */}
      <section className="border-t border-white/5 pt-16">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide">
            CONNECT <span className="text-neon-purple">WITH US</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Join the community on your preferred platform and stay updated on new sagas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialCards.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass rounded-xl p-5 border border-white/5 flex flex-col justify-between h-56 transition-all duration-300 relative group overflow-hidden ${social.color}`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:border-transparent transition-all">
                    {social.icon}
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="font-display font-bold text-sm text-white group-hover:text-neon-blue transition-colors">
                  {social.name}
                </h3>
                <span className="text-[10px] text-gray-500 font-semibold tracking-wider block mt-0.5">
                  {social.handle}
                </span>
              </div>

              <p className="text-[11px] sm:text-xs text-gray-400 leading-normal line-clamp-3 mt-4">
                {social.desc}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
