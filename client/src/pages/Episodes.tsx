import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Episodes() {
  const { data: episodes, isLoading } = trpc.episodes.list.useQuery();
  const syncMutation = trpc.episodes.syncFromYouTube.useMutation({
    onSuccess: () => {
      window.location.reload();
    },
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/awl-logo.svg" alt="AWL" className="h-10" />
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/episodes" className="text-[#E31E24] font-bold transition-colors">
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
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black">
              ALL <span className="text-[#E31E24]">EPISODES</span>
            </h1>
            <Button
              onClick={() => syncMutation.mutate()}
              disabled={syncMutation.isPending}
              className="bg-[#E31E24] hover:bg-[#C01A1F] text-white font-bold"
            >
              {syncMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                "Sync from YouTube"
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center text-white/60 py-20">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
              Loading episodes...
            </div>
          ) : episodes && episodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {episodes.map((episode) => (
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
                      <div className="flex justify-between items-center text-sm text-white/60">
                        <span>{episode.publishedTimeText}</span>
                        {episode.views && (
                          <span>{episode.views.toLocaleString()} views</span>
                        )}
                      </div>
                    </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/60 mb-6">No episodes available yet.</p>
              <Button
                onClick={() => syncMutation.mutate()}
                disabled={syncMutation.isPending}
                className="bg-[#E31E24] hover:bg-[#C01A1F] text-white font-bold"
              >
                {syncMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  "Sync from YouTube"
                )}
              </Button>
            </div>
          )}
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

