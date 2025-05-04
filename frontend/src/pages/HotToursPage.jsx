import HeaderWithMenu from "@/components/HeaderWithMenu/HeaderWithMenu";
import Hero from "@/components/Hero/Hero";
import Spam2 from '@/components/Spam2/Spam2' 
import Main from "@/components/Tours/Main/Main";
import { HeroContent } from "@/data/data";
import { useRef } from "react";

export default function HotTours() {
  return (
    <div className="hotTours" >
      <HeaderWithMenu />
      <main>
        <Hero
          search={HeroContent[2].search}
          title={HeroContent[2].title}
          imgBg={HeroContent[2].imgBg}
          disc={HeroContent[2].disc}
        />
        <Main/>
        <Spam2/>
      </main>
    </div>
  );
}
