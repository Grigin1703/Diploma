import HeaderWithMenu from "@/components/HeaderWithMenu/HeaderWithMenu";
import Hero from "@/components/Hero/Hero";
import CountriesContent from "@/components/Countries/Countries";
import Footer from "@/components/Footer/Footer";
import { HeroContent } from "@/data/data";

export default function Countries() {
  return (
    <div className="countries">
      <HeaderWithMenu />
      <main>
        <Hero
          search={HeroContent[3].search}
          title={HeroContent[3].title}
          imgBg={HeroContent[3].imgBg}
          disc={HeroContent[3].disc}
        />
        <CountriesContent/>
      </main>
      <Footer/>
    </div>
  );
}
