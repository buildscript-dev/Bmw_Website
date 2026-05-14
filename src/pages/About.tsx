import { Navbar } from "@/components/Navbar";
import { Footer, CTASection } from "@/components/CTAFooter";
import { motion } from "framer-motion";
import garage from "@/assets/garage-bg.jpg";

const About = () => (
  <div className="bg-background">
    <Navbar />
    <main className="pt-32">
      <section className="container py-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">─ Atelier</div>
        <h1 className="font-display text-5xl md:text-8xl font-medium tracking-tight max-w-4xl">
          Three generations of <span className="font-serif-display text-gradient-accent">BMW</span> craft.
        </h1>
      </section>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="relative h-[60vh] overflow-hidden">
        <img src={garage} alt="Workshop" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.section>

      <section className="container py-24 grid md:grid-cols-2 gap-12">
        <p className="font-serif-display text-3xl leading-snug">
          Founded in 1994 by master technician Klaus Becker, BMW began in a single garage off the Maximilianstrasse.
        </p>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>Today the atelier occupies a 2,400 m² facility and employs eleven specialists — engine builders, trimmers, panel beaters, and electricians — all trained in the original BMW factory methods.</p>
          <p>We believe a properly restored car is a living archive: the smell of the leather, the click of the indicators, the precise weight of the door. These are not details. They are the car.</p>
        </div>
      </section>

      <CTASection />
    </main>
    <Footer />
  </div>
);

export default About;
