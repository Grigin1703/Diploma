import Header from "@/components/layout/header/header";
import Hero from "@/components/common/Hero/Hero";
import Tours from "@/components/pages/Home/Tours/Tours";
import Spam from "@/components/common/Spam/Spam";
import Reviews from "@/components/pages/Home/Reviews/Reviews";
import News from "@/components/pages/Home/News/News";
import About from "@/components/pages/Home/About/About";
import Spam2 from "@/components/common/Spam2/Spam2";
import Footer from "@/components/layout/Footer/Footer";

import { HeroContent } from "@/data/data";

export default function Home() {
  return (
    <div className="home">
      <Header />
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
