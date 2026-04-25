import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/CTAFooter";
import { ModelsSection } from "@/components/ModelsSection";
import { motion } from "framer-motion";

const Shop = () => (
  <div className="bg-background">
    <Navbar />
    <main className="pt-32">
      <section className="container py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">─ Shop</div>
          <h1 className="font-display text-5xl md:text-7xl font-medium tracking-tight">
            Available <span className="font-serif-display text-gradient-accent">now</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mt-4">
            Each car is offered with a 6-month limited mechanical warranty and full restoration dossier.
          </p>
        </motion.div>
      </section>
      <ModelsSection />
    </main>
    <Footer />
  </div>
);

export default Shop;
