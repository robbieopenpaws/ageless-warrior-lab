import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Episode() {
  const [, params] = useRoute("/episode/:videoId");
  const videoId = params?.videoId;

  const { data: episode, isLoading } = trpc.episodes.getByVideoId.useQuery(
    videoId || "",
    { enabled: !!videoId }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-[#E31E24]" />
          <p className="text-white/60">Loading episode...</p>
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Episode Not Found</h1>
          <Link href="/episodes">
            <Button className="bg-[#E31E24] hover:bg-[#C01A1F] text-white font-bold">
              Back to Episodes
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors font-medium">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <Link href="/episodes" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Episodes
          </Link>

          {/* Video Player */}
          <div className="aspect-video w-full max-w-5xl mx-auto mb-8 bg-black">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${episode.videoId}`}
              title={episode.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Episode Info */}
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              {episode.title}
            </h1>
            
            <div className="flex gap-6 text-white/60 mb-6">
              <span>{episode.publishedTimeText}</span>
              {episode.views && (
                <span>{episode.views.toLocaleString()} views</span>
              )}
              {episode.lengthSeconds && (
                <span>
                  {Math.floor(episode.lengthSeconds / 60)}:
                  {String(episode.lengthSeconds % 60).padStart(2, "0")}
                </span>
              )}
            </div>

            {episode.description && (
              <div className="bg-white/5 p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-3 text-[#E31E24]">About This Episode</h2>
                <p className="text-white/80 whitespace-pre-wrap leading-relaxed">
                  {episode.description}
                </p>
              </div>
            )}

            <div className="mt-8">
              <a
                href={`https://www.youtube.com/watch?v=${episode.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-[#E31E24] hover:bg-[#C01A1F] text-white font-bold">
                  Watch on YouTube
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} A Dave Meyer Podcast | The Ageless Warrior Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

