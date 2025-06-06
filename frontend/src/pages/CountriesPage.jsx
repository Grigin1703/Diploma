import Header from "@/components/layout/header/header";
import Hero from "@/components/common/Hero/Hero";
import CountriesContent from "@/components/pages/Countries/Countries";
import Footer from "@/components/layout/Footer/Footer";
import { HeroContent } from "@/data/data";

export default function Countries() {
  return (
    <div className="countries">
      <Header />
      <main>
        <Hero
          search={HeroContent[3].search}
          title={HeroContent[3].title}
          imgBg={HeroContent[3].imgBg}
          disc={HeroContent[3].disc}
        />
        <CountriesContent />
      </main>
      <Footer />
    </div>
  );
}
