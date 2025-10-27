import { Link } from "wouter";

export default function About() {
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
            <Link href="/about" className="text-[#E31E24] font-bold transition-colors">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black mb-12 text-center">
              ABOUT THE <span className="text-[#E31E24]">HOST</span>
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="bg-white/5 p-8 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#E31E24]">
                  Co-founder and CEO of Food System Innovations and Humane American Animal Foundation
                </h2>
                
                <img 
                  src="/dave-meyer.jpg" 
                  alt="Dave Meyer in Brazilian Jiu Jitsu Gi" 
                  className="float-left mr-6 mb-4 w-64 h-auto rounded-lg shadow-lg"
                />
                
                <div className="space-y-6 text-white/80 leading-relaxed">
                  <p>
                    David Meyer is a pioneering American Brazilian Jiu Jitsu practitioner, and accomplished non-profit founder and Philanthropist.
                  </p>

                  <p>
                    David co-founded and served as CEO of Adopt-a-Pet.com for two decades, turning it into the world's largest nonprofit homeless pet adoption website and helping save millions of animals, before its acquisition by Mars Inc.
                  </p>

                  <p>
                    Today, David leads Food System Innovations and Humane America Animal Foundation, leading in farm animal welfare and the protein transition movement. He frequently advises U.S. lawmakers on these issues, and has raised and deployed over $160 million in philanthropic capital as part of his work in the nonprofit space.
                  </p>

                  <p>
                    In his athletic career, David has risen to the highest ranks of Brazilian Jiu Jitsu (BJJ). He earned his black belt from Rigan Machado in 1996 and ranked among the first Americans ("the Dirty Dozen") to do so. He was the first American to medal at the black belt level at the BJJ World Championships in Brazil in 1998, and continues to compete, winning world championship titles in his age division.
                  </p>

                  <p>
                    As a martial artist and instructor, he taught at UCLA, Steven Seagal's Tenshin Dojo, and developed globally used grappling curricula with John Will, including customized material for Chuck Norris's UFAF association.
                  </p>

                  <p>
                    Meyer also played a critical role in post-Katrina animal rescue, co-authored key books on BJJ and pet care, and co-founded a Haiti orphanage for children with HIV, exemplifying a lifetime of impactful leadership in both martial arts and philanthropy.
                  </p>

                  <p>
                    David resides in the San Francisco Bay, and continues to coach BJJ athletes while actively managing Food System Innovations and Humane America Animal Foundation.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Link href="/episodes" className="inline-block bg-[#E31E24] hover:bg-[#C01A1F] text-white font-bold px-8 py-4 rounded-lg transition-colors">
                  Watch Episodes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} The Ageless Warrior Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

