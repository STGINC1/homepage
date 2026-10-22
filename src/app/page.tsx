import { CtaBand } from "@/components/cta-band";
import { Hero } from "@/components/hero/hero";
import { CoverageMap } from "@/components/home/coverage-map";
import { Marquee } from "@/components/home/marquee";
import { Process } from "@/components/home/process";
import { Reasons } from "@/components/home/reasons";
import { ServicesPreview } from "@/components/home/services-preview";
import { Story } from "@/components/home/story";
import { PageTransition } from "@/components/page-transition";
import { ScrollBand } from "@/components/scroll-band";

export default function HomePage() {
  return (
    <PageTransition>
      <Hero />
      <Marquee />
      <Story />
      <ServicesPreview />
      <Process />
      <Reasons />
      <ScrollBand
        top={["All 48 states", "Full truckload"]}
        bottom={["99.9% delivered right", "Mason, Ohio"]}
      />
      <CoverageMap />
      <CtaBand />
    </PageTransition>
  );
}
