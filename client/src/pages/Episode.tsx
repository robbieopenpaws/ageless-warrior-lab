import { useRoute } from "wouter";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { useEffect } from "react";

export default function Episode() {
  const [, params] = useRoute("/episode/:slug");
  const slug = params?.slug;

  const { data: episode, isLoading, refetch } = trpc.episodes.getBySlug.useQuery(
    { slug: slug! },
    { enabled: !!slug }
  );

  const generateSummary = trpc.episodes.generateSummary.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  // Auto-generate summary if not present
  useEffect(() => {
    if (episode && !episode.summary && episode.videoId && !generateSummary.isPending) {
      generateSummary.mutate(episode.videoId);
    }
  }, [episode?.summary, episode?.videoId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-4">Episode not found</div>
          <Link href="/episodes" className="text-[#E31E24] hover:underline">
            Back to Episodes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-black/90 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/awl_logo.svg" alt="AWL" className="h-12" />
          </Link>
          <div className="flex gap-8">
            <Link href="/episodes" className="hover:text-[#E31E24] transition-colors">
              Episodes
            </Link>
            <Link href="/about" className="hover:text-[#E31E24] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#E31E24] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <Link href="/episodes" className="inline-flex items-center text-white/60 hover:text-[#E31E24] transition-colors mb-8">
          ← Back to Episodes
        </Link>

        {/* Video Player */}
        <div className="aspect-video mb-8 bg-black rounded-lg overflow-hidden border-2 border-[#E31E24]">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${episode.videoId}`}
            title={episode.title || "Episode"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Episode Info */}
        <h1 className="text-4xl md:text-5xl font-black mb-4">{episode.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-white/60 mb-8">
          <span>{episode.publishedTimeText}</span>
          <span>•</span>
          <span>{episode.views?.toLocaleString()} views</span>
          <span>•</span>
          <span>{Math.floor((episode.lengthSeconds || 0) / 60)}:{String((episode.lengthSeconds || 0) % 60).padStart(2, '0')}</span>
        </div>

        {/* AI Summary */}
        {episode.summary ? (
          <div className="bg-white/5 p-8 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#E31E24]">Episode Summary</h2>
            <div className="prose prose-invert prose-lg max-w-none whitespace-pre-wrap">
              {episode.summary}
            </div>
          </div>
        ) : generateSummary.isPending ? (
          <div className="bg-white/5 p-8 rounded-lg mb-8">
            <div className="flex items-center gap-3">
              <div className="animate-spin h-5 w-5 border-2 border-[#E31E24] border-t-transparent rounded-full" />
              <span>Generating AI summary...</span>
            </div>
          </div>
        ) : null}

        {/* Description */}
        {episode.description && (
          <div className="bg-white/5 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#E31E24]">Description</h2>
            <p className="text-white/80 whitespace-pre-wrap">{episode.description}</p>
          </div>
        )}

        {/* Watch on YouTube Button */}
        <div className="mt-8">
          <a
            href={`https://www.youtube.com/watch?v=${episode.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E31E24] hover:bg-[#C11A1F] text-white font-bold px-8 py-4 rounded-lg transition-colors"
          >
            Watch on YouTube
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-6 text-center text-white/60">
          <p>© 2025 A Dave Meyer Podcast | The Ageless Warrior Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

