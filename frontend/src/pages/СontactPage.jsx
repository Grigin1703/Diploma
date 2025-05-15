import HeaderWithMenu from "@/components/HeaderWithMenu/HeaderWithMenu";
import Hero from "@/components/Hero/Hero";
import Contact from "@/components/Contact/Contact";

import { HeroContent } from "@/data/data";

export default function ContactPage() {
  return (
    <div className="contacts">
      <HeaderWithMenu />
      <main>
        <Hero
          search={HeroContent[4].search}
          title={HeroContent[4].title}
          imgBg={HeroContent[4].imgBg}
          disc={HeroContent[4].disc}
        />
        <Contact/>
      </main>
    </div>
  );
}
