import StickyNavbar from "@/components/StickyNavbar";
import NewsletterForm from "./components/NewsletterForm";
import FeaturedNews from "./components/layout/featured-section";
import PoliticsNews from "./components/layout/politics-section";
import BreakingNews from "./components/layout/breaking-section";
import TechnologyNews from "./components/layout/technology-section";
import BusinessNews from "./components/layout/business-section";
import { SectionHeader } from "@/components/SectionHeader";
import { AnimatedText } from './components/AnimatedHeading';

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <StickyNavbar />
      
      <section id="hero" className="relative pt-32 justify-center pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-transparent dark:from-gray-900/80 dark:to-gray-900" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-5">
          <div className="text-center">
            <AnimatedText 
              as="h1"
              text="Global News Network"
              className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl block"
            />
            <AnimatedText 
              as="p"
              text="Stay informed with the latest breaking news, politics, technology, and business updates from around the world."
              className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
              delay={100}
            />
          </div>
        </div>
        <div className="container max-w-5xl mx-auto px-4">
            <FeaturedNews/>
        </div>
      </section>
      

      <main className="relative z-10">
        {/* Breaking News */}
        <section id="breaking" className="scroll-mt-16 bg-white py-16 dark:bg-gray-900 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BreakingNews/>
          </div>
        </section>

        {/* Politics */}
        <section id="politics" className="scroll-mt-16 bg-gray-50 py-16 dark:bg-gray-800/30 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              title="Politics" 
              description="Latest political developments and analysis" 
              accentColor="from-blue-500 to-cyan-500"
            />
            <PoliticsNews/>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="scroll-mt-16 bg-white py-16 dark:bg-gray-900 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              title="Technology" 
              description="Cutting-edge innovations and tech news"
              accentColor="from-purple-500 to-indigo-600"
            />
            <TechnologyNews/>
          </div>
        </section>

        {/* Business */}
        <section id="business" className="scroll-mt-16 bg-gray-50 py-16 dark:bg-gray-800/30 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader 
              title="Business" 
              description="Financial markets and corporate updates"
              accentColor="from-emerald-500 to-teal-600"
            />
            <BusinessNews/>
          </div>
        </section>

        {/* Newsletter */}
        <section id="newsletter" className="relative scroll-mt-16 overflow-hidden bg-gradient-to-r from-orange-500 to-pink-600 py-16 sm:py-20">
          <div className="absolute inset-0 -z-10 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Stay in the loop
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-orange-100">
                Get the weekly Flux Gazette digest: the stories that matter, delivered to your inbox.
              </p>
              <div className="mt-8 flex justify-center">
                <NewsletterForm />
              </div>
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
