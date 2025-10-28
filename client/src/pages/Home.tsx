import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import MobileNav from "@/components/MobileNav";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { data: episodes, isLoading } = trpc.episodes.list.useQuery();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/awl_logo.svg" alt="AWL" className="h-10 hidden md:block" />
            <img src="/awl_logo_mobile.svg" alt="AWL" className="h-10 md:hidden" />
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/episodes" className="text-white/80 hover:text-white transition-colors font-medium">
              Episodes
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors font-medium">
              Contact
            </Link>
          </div>
          <div className="md:hidden"><MobileNav /></div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Sky background layer (static) */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/parallax_sky.png')" }}
        />
        
        {/* Parallax warrior and mountain */}
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) translateY(${parallaxOffset}px)`,
            transition: 'transform 0.15s ease-out',
          }}
        >
          <img
            src="/warrior_mountain_transparent.png?v=3"
            alt="Warrior on Mountain"
            className="w-full max-w-3xl h-auto"
            style={{ marginBottom: '-15%' }}
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              THE AGELESS
              <br />
              <span className="text-[#E31E24]">WARRIOR LAB</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Exploring mastery, resilience, and the warrior mindset with host Dave Meyer
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/episodes">
                <Button size="lg" className="bg-[#E31E24] hover:bg-[#C01A1F] text-white font-bold px-8 py-6 text-lg">
                  Watch Episodes
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black font-bold px-8 py-6 text-lg">
                  About the Host
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast Platforms */}
      <section className="py-16 bg-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-black text-center mb-12">
            LISTEN ON YOUR <span className="text-[#E31E24]">FAVORITE PLATFORM</span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            <a
              href="https://www.youtube.com/@AgelessWarriorLab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-4 rounded-lg transition-all group"
            >
              <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="font-bold text-white group-hover:text-[#E31E24] transition-colors">YouTube</span>
            </a>
            <a
              href="https://podcasts.apple.com/us/podcast/the-ageless-warrior-lab/id1840239491"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-4 rounded-lg transition-all group"
            >
              <svg className="w-8 h-8 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75zm0-15.188c-2.067 0-3.75 1.683-3.75 3.75v3.376c0 2.067 1.683 3.75 3.75 3.75s3.75-1.683 3.75-3.75v-3.376c0-2.067-1.683-3.75-3.75-3.75zm1.875 7.126c0 1.034-.841 1.875-1.875 1.875s-1.875-.841-1.875-1.875v-3.376c0-1.034.841-1.875 1.875-1.875s1.875.841 1.875 1.875v3.376z"/>
              </svg>
              <span className="font-bold text-white group-hover:text-[#E31E24] transition-colors">Apple Podcasts</span>
            </a>
            <a
              href="https://open.spotify.com/show/7bGhBqQJZCKvHXPSPVjQvF"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-4 rounded-lg transition-all group"
            >
              <svg className="w-8 h-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span className="font-bold text-white group-hover:text-[#E31E24] transition-colors">Spotify</span>
            </a>
            <a
              href="https://www.iheart.com/podcast/ageless-warrior-lab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-6 py-4 rounded-lg transition-all group"
            >
              <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span className="font-bold text-white group-hover:text-[#E31E24] transition-colors">iHeartRadio</span>
            </a>
          </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            LATEST <span className="text-[#E31E24]">EPISODES</span>
          </h2>
          
          {isLoading ? (
            <div className="text-center text-white/60">Loading episodes...</div>
          ) : episodes && episodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {episodes.slice(0, 6).map((episode) => (
                <Link key={episode.id} href={`/episode/${episode.slug || episode.videoId}`} className="group block bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      {episode.thumbnailUrl && (
                        <img
                          src={episode.thumbnailUrl || ''}
                          alt={episode.title || 'Episode'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#E31E24] transition-colors line-clamp-2">
                        {episode.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {episode.publishedTimeText}
                      </p>
                    </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/60">No episodes available yet.</div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/episodes">
              <Button size="lg" variant="outline" className="border-[#E31E24] text-[#E31E24] hover:bg-[#E31E24] hover:text-white font-bold">
                View All Episodes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} A Dave Meyer Podcast | The Ageless Warrior Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

