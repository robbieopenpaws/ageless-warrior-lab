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
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors font-medium">
              Contact
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
                    Dave Meyer is a pioneering American Brazilian Jiu Jitsu practitioner, and accomplished non-profit founder and Philanthropist.
                  </p>

                  <p>
                    Dave began training Jiu Jitsu as a young child in 1968. He trained Kung Fu under Sifu Douglas Wong and taught Jiu Jitsu at Steven Seagal's Tenshin Dojo when Segal first returned from Japan to teach Aikido.
                  </p>

                  <p>
                    Dave was head instructor of Jiu Jitsu at UCLA and holds a 3rd degree black belt Seki Ryu Ju Jitsu and an honorary 4th degree black belt in Danzan Ryu/Small Circle Jiu Jitsu. He began training Brazilian Jiu-Jitsu in 1990, and was one of the first Americans to reach black belt (referred to as "the Dirty Dozen"), receiving his rank in 1996 from Rigan Machado. He is a 6th degree black belt in BJJ and was trained by Rigan, Jean Jacques, Carlos, John and Roger Machado.
                  </p>

                  <p>
                    He was the first American to win a medal at the black belt level at a BJJ World Championship, earning the Bronze Medal in Black Belt Open Weight Class division in Brazil in 1998. He also won the first ever BJJ competition held in the United States (a cross-school competition between the Tarzana and Redondo Beach Machado Brothers schools in 1994).
                  </p>

                  <p>
                    He partnered in 1999 with Professor John Will (who is the first Australian to earn a black belt in BJJ and the first Australian Coral belt) to create grappling and MMA curriculums in manuals/videos/DVDs sold to nearly 1,000 martial arts schools around the world across all styles, including a customized version for Chuck Norris and his UFAF association.
                  </p>

                  <p>
                    He has taught seminars around the world to martial arts instructors, law enforcement and military of all types, and general practitioners.
                  </p>

                  <p>
                    He authored the book "Training for Competition: Brazilian Jiu Jitsu and Submission Grappling," and co-authored "The Triangle" with Rigan Machado, and "BJJ Essential Tactics" and "BJJ Level Up Your Game" with John Will. Over the years he has been a coach and training partner for numerous MMA fighters in Los Angeles and San Francisco, and I still actively competes in BJJ and has won many world championship titles in his age division over the years.
                  </p>

                  <p>
                    He is also a passionate advocate for animal welfare and is an executive with deep experience at the nexus of the nonprofit and for-profit sectors.
                  </p>

                  <p>
                    He is co-founder and CEO of Humane America Animal Foundation and Food System Innovations. He regularly meets with U.S. Senators and Representatives, and has a long list of philanthropic accomplishments.
                  </p>

                  <p>
                    He has raised and deployed over $180 million in philanthropic capital as part of his work in the nonprofit space.
                  </p>

                  <p>
                    He co-founded and ran Adopt-a-Pet.com for 22 years, taking it from just an idea, to the world's largest nonprofit homeless pet adoption website. He and his team grew it to a multimillion dollar budget, funded by major companies including Nestle Purina, Chewy, Bayer, Petco, Petco Foundation (Petco Love) and others, ultimately selling the program to Kinship Partners, a division of Mars. Inc. Adopt-a-Pet.com reaches millions of website visitors every month, and lists hundreds of thousands of adoptable pets from over 19,000 animal welfare organizations. It is estimated that Adopt-a-Pet.com has helped save the lives of millions of pets and in doing so enhanced the lives of millions of families.
                  </p>

                  <p>
                    He co-led the animal rescue efforts in New Orleans post-Katrina saving over 17,000 stranded and starving animals. He is a co-author of the books "Total Dog Manual" and "Total Cat Manual".
                  </p>

                  <p>
                    Dave also cofounded an orphanage in Haiti for children with HIV, and has led numerous self-defense and empowerment programs for women and children, including serving on the board of Tuff Love Fitness, a non-profit that provides accessible and affordable self-defense, martial arts, and fitness training for populations that may be underserved by martial arts schools.
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
          <p>&copy; {new Date().getFullYear()} A Dave Meyer Podcast | The Ageless Warrior Lab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

