import StickyNavbar from "@/components/StickyNavbar";
import NewsletterForm from "./components/NewsletterForm";
import FeaturedNews from "./components/layout/featured-section";
import PoliticsNews from "./components/layout/politics-section";
import BreakingNews from "./components/layout/breaking-section";
import TechnologyNews from "./components/layout/technology-section";
import BusinessNews from "./components/layout/business-section";
import { Button } from "@/components/ui/button";
import { width } from 'components/OpenGraphImage';
import { ChevronDownIcon } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <StickyNavbar />
      
      <section id="hero" className="pt-28 flex flex-col gap-4 w-full mx-auto max-w-7xl max-h-[600px] px-4 sm:px-6 lg:px-8 ">
        <header className="w-full">
          <h1 className="font-display text-3xl font-bold">Global News</h1>
        </header>
        <div className="w-full">
            <FeaturedNews/>
        </div>
      </section>
      

      <main>  
        {/* Breaking News */}
        <section id="breaking" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-3xl font-bold">Breaking News</h2>
              <Button className="bg-orange-500/10 border border-px border-orange-500 text-orange-500 text-sm dark:bg-orange-900 dark:text-white gap-1"> 
                <span className="">View all</span> 
                <ChevronDownIcon width={18} height={18}/>
              </Button>
            </header>
            <BreakingNews/> 
          </div>
        </section>

        {/* Politics */}
        <section id="politics" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Politics</h2></header>
            <PoliticsNews/>
          </div>
        </section>

        {/* Technology */}
        <section id="technology" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Technology</h2></header>
            <TechnologyNews/>
          </div>
        </section>


        {/* Business */}
        <section id="business" className="scroll-mt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-6"><h2 className="font-display text-3xl font-bold">Business</h2></header>
            <BusinessNews/>
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
