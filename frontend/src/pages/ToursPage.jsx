import { useState } from 'react';
import HeaderWithMenu from "@/components/HeaderWithMenu/HeaderWithMenu";
import Hero from "@/components/Hero/Hero";
import Main from "../components/Tours/Main/Main";
import Spam2 from '@/components/Spam2/Spam2' 


import { HeroContent } from "@/data/data";

export default function Tours() {
  return (
    <div className="tours">
      <HeaderWithMenu />
      <main>
        <Hero
          search={HeroContent[1].search}
          title={HeroContent[1].title}
          imgBg={HeroContent[1].imgBg}
          disc={HeroContent[1].disc}
        />
        <Main />
        <Spam2/>
      </main>
    </div>
  );
}
