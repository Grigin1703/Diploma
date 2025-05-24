import HeaderWithMenu from "@/components/HeaderWithMenu/HeaderWithMenu";
import Hero from "@/components/Hero/Hero";
import Tours from "@/components/Home/Tours/Tours";
import Spam from "@/components/Spam/Spam";
import Reviews from "@/components/Home/Reviews/Reviews";
import News from "@/components/Home/News/News";
import About from "@/components/Home/About/About";
import Spam2 from "@/components/Spam2/Spam2";
import Footer from "@/components/Footer/Footer";

import { HeroContent } from "@/data/data";

export default function Home() {
  return (
    <div className="home">
      <HeaderWithMenu />
      <main>
        <Hero
          search={HeroContent[0].search}
          title={HeroContent[0].title}
          imgBg={HeroContent[0].imgBg}
          disc={HeroContent[0].disc}
        />

        <Tours />
        <Spam />
        <Reviews />
        <News />
        <About />
        <Spam2 />
      </main>
      <Footer/>
    </div>
  );
}
