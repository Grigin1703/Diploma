import Header from "@/components/layout/header/header";
import Hero from "@/components/common/Hero/Hero";
import Contact from "@/components/common/Contact/Contact";
import Footer from "@/components/layout/Footer/Footer";

import { HeroContent } from "@/data/data";

export default function ContactPage() {
  return (
    <div className="contacts">
      <Header />
      <main>
        <Hero
          search={HeroContent[4].search}
          title={HeroContent[4].title}
          imgBg={HeroContent[4].imgBg}
          disc={HeroContent[4].disc}
        />
        <Contact/>
      </main>
      <Footer/>
    </div>
  );
}
