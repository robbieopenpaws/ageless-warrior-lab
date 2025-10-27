import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { data: episodes, isLoading } = trpc.episodes.list.useQuery();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax offset
  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/awl-logo.svg" alt="AWL" className="h-10" />
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/episodes" className="text-white/80 hover:text-white transition-colors font-medium">
              Episodes
            </Link>
            <Link href="/about" className="text-white/80 hover:text-white transition-colors font-medium">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 w-full h-[120vh]"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: "url(/hero-warrior.png)",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        />
        
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

      {/* Latest Episodes Section */}
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
                <Link key={episode.id} href={`/episode/${episode.videoId}`} className="group block bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                    <div className="aspect-video relative overflow-hidden">
                      {episode.thumbnailUrl && (
                        <img
                          src={episode.thumbnailUrl}
                          alt={episode.title}
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
          <p>&copy; {new Date().getFullYear()} The Ageless Warrior Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

