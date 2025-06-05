import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { Information } from "@/sections/Information";
import { Testimonials } from "@/sections/Testimonials";
import { WhatIs } from "@/sections/WhatIs"; 
import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <section id="inicio">
        <Hero />
      </section>
      <LogoTicker />
      <section id="prueba">
        <ProductShowcase />
      </section>
      <section id="informacion">
        <Information />
      </section>
      <section id="que-es"> 
        <WhatIs />
      </section>
      <section id="testimonios">
        <Testimonials />
      </section>
      <section id="call-to-action">
        <CallToAction />
      </section>
      <section id="contacto">
        <Footer />
      </section>
    </>
  );
}
