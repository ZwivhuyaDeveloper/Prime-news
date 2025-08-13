import StickyNavbar from "@/components/StickyNavbar";
import { ArticleCard } from "@/components/ArticleCard";

import { Button } from "@/components/ui/button";
import NewsletterForm from "./components/NewsletterForm";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <StickyNavbar />

      <header id="hero" className="pt-28">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border">
            <Image
              src="/images/hero.jpg"
              width={1920}
              height={1080}
              alt="Flux Gazette hero image, editorial collage with gradient glow"
              className="h-[52vh] w-full object-cover sm:h-[64vh]"
            />
            <div className="absolute inset-0 bg-gradient-brand opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-gradient-brand sm:text-5xl md:text-6xl">
                Flux Gazette
              </h1>
              <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
                A modern digital magazine covering breaking news, politics, technology, sports, entertainment, business, health, and opinion.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#breaking"><Button className="brand" variant="default" size="lg">Read Latest</Button></a>
                <a href="#contact" className="inline-flex"><Button variant="outline" size="lg">Subscribe</Button></a>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main>
        {/* Breaking News */}
        <section id="breaking" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-3xl font-bold">Breaking News</h2>
              <a href="#" className="story-link text-sm text-muted-foreground">View all</a>
            </header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ArticleCard title="Overnight developments reshape global markets" excerpt="Futures rally as tech leads gains; energy stocks follow amid policy shifts." image="/images/breaking.jpg" alt="Breaking news scene with city lights and urgency" category="Breaking" date="Just now" />
              <ArticleCard title="Major policy announcement expected at summit" excerpt="Sources indicate cross-border collaboration on climate and AI regulation." image="/images/politics.jpg" alt="Government building and press microphones" category="Politics" date="10 min ago" />
              <ArticleCard title="New chip architecture promises leap in performance" excerpt="Semiconductor leaders unveil roadmap aimed at efficiency and mobile-first design." image="/images/technology.jpg" alt="Sleek workstation with holographic UI elements" category="Technology" date="20 min ago" />
            </div>
          </div>
        </section>

        {/* Politics */}
        <section id="politics" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Politics</h2></header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ArticleCard title="Coalition outlines long-term infrastructure plan" excerpt="Analysts weigh fiscal impacts and sustainability targets over the next decade." image="/images/politics.jpg" alt="Stately government building with flags" category="Politics" date="2 hours ago" />
              <ArticleCard title="Election watchdog releases transparency report" excerpt="Report highlights digital advertising and misinformation trends across regions." image="/images/breaking.jpg" alt="Press conference and news lights" category="Politics" date="3 hours ago" />
              <ArticleCard title="International relations enter new phase" excerpt="Diplomats seek common ground on trade, technology, and security frameworks." image="/images/business.jpg" alt="Modern skyline representing global commerce" category="Politics" date="5 hours ago" />
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Technology</h2></header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ArticleCard title="Startups embrace AI copilots across workflows" excerpt="New tools boost productivity while raising fresh questions about oversight." image="/images/technology.jpg" alt="Workstation with AI interfaces" category="Technology" date="1 hour ago" />
              <ArticleCard title="Cloud-native security transforms dev pipelines" excerpt="Zero-trust and SBOM strategies move from theory to daily practice." image="/images/technology.jpg" alt="Abstract circuit patterns" category="Technology" date="4 hours ago" />
              <ArticleCard title="Edge computing expands to the last mile" excerpt="Latency-sensitive apps leap forward with smarter routing and caching." image="/images/technology.jpg" alt="Edge compute visualization" category="Technology" date="Yesterday" />
            </div>
          </div>
        </section>

        {/* Sports */}
        <section id="sports" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Sports</h2></header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ArticleCard title="Title race intensifies as rivals trade wins" excerpt="Managers praise resilience as squads rotate ahead of crucial fixtures." image="/images/sports.jpg" alt="Stadium scene with athletes" category="Sports" date="2 hours ago" />
              <ArticleCard title="Analytics guide training regimens in preseason" excerpt="Wearable data informs recovery windows and tactical preparation." image="/images/sports.jpg" alt="Training with analytics" category="Sports" date="Yesterday" />
              <ArticleCard title="Rising stars make their mark on the circuit" excerpt="Breakthrough performances hint at a fresh competitive era." image="/images/sports.jpg" alt="Athlete in motion" category="Sports" date="2 days ago" />
            </div>
          </div>
        </section>

        {/* Entertainment */}
        <section id="entertainment" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Entertainment</h2></header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ArticleCard title="Festival lineup blends classics with newcomers" excerpt="Curators highlight cross-genre collaborations and immersive venues." image="/images/entertainment.jpg" alt="Theater marquee and crowd" category="Entertainment" date="Today" />
              <ArticleCard title="Streaming platforms pivot to live experiences" excerpt="Hybrid premieres and interactive features reimagine audience engagement." image="/images/entertainment.jpg" alt="Neon-lit entertainment district" category="Entertainment" date="6 hours ago" />
              <ArticleCard title="Soundtrack revival sparks vinyl renaissance" excerpt="Collectors celebrate tactile listening as labels expand reissues." image="/images/entertainment.jpg" alt="Vinyl and turntable vibes" category="Entertainment" date="This week" />
            </div>
          </div>
        </section>

        {/* Business */}
        <section id="business" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Business</h2></header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ArticleCard title="Earnings season signals cautious optimism" excerpt="Guidance narrows as executives point to resilient consumer demand." image="/images/business.jpg" alt="Glass skyscrapers with reflections" category="Business" date="Today" />
              <ArticleCard title="Manufacturing rebounds on supply chain shifts" excerpt="Regional hubs attract investment with incentives and talent pipelines." image="/images/business.jpg" alt="Modern office buildings" category="Business" date="Yesterday" />
              <ArticleCard title="Fintech consolidates amid regulatory clarity" excerpt="Payments and lending platforms integrate to broaden services." image="/images/business.jpg" alt="Financial district skyline" category="Business" date="This week" />
            </div>
          </div>
        </section>

        {/* Health */}
        <section id="health" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Health</h2></header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ArticleCard title="Clinics tap telehealth to expand access" excerpt="Providers report improved follow-up care and preventative screenings." image="/images/health.jpg" alt="Clinic scene with charts" category="Health" date="Today" />
              <ArticleCard title="Nutrition research spotlights simple habits" excerpt="Experts emphasize sleep, hydration, and balanced routines." image="/images/health.jpg" alt="Healthy lifestyle imagery" category="Health" date="This week" />
              <ArticleCard title="Mental health support scales with new tools" excerpt="Community programs partner with digital services for timely care." image="/images/health.jpg" alt="Calm workspace" category="Health" date="2 days ago" />
            </div>
          </div>
        </section>

        {/* Opinion */}
        <section id="opinion" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Opinion</h2></header>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ArticleCard title="The art of pacing innovation" excerpt="Why shipping steadily beats sprinting blindly in most product orgs." image="/images/opinion.jpg" alt="Writer desk with notebook and coffee" category="Opinion" date="Today" />
              <ArticleCard title="Markets reward clarity over hype" excerpt="A case for transparent roadmaps and measurable progress." image="/images/opinion.jpg" alt="Minimal workspace" category="Opinion" date="This week" />
              <ArticleCard title="What cities can teach companies" excerpt="Density, diversity, and durable systems as design inspiration." image="/images/opinion.jpg" alt="City desk view" category="Opinion" date="Yesterday" />
            </div>
          </div>
        </section>

        {/* Contact / Newsletter */}
        <section id="contact" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
            <div className="relative overflow-hidden rounded-2xl border p-10 text-center">
              <div className="absolute inset-0 -z-10 bg-gradient-brand opacity-[0.15]" />
              <h2 className="font-display text-3xl font-bold">Stay in the loop</h2>
              <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Get the weekly Flux Gazette digest: the stories that matter, delivered to your inbox.</p>
              <div className="mx-auto mt-6 flex justify-center"><NewsletterForm /></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Flux Gazette. All rights reserved.</div>
      </footer>
    </div>
  );
}
