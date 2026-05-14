import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative py-32 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground p-10 md:p-20"
        >
          <div className="absolute -top-20 -right-20 size-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 size-96 rounded-full bg-bmwblue/20 blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-10 items-end">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-4">
                ─ The next chapter
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-medium leading-[0.95] tracking-tight">
                Visit the<br />
                <span className="font-serif-display text-accent">atelier</span>.
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-primary-foreground/70 max-w-md">
                By appointment only. Schedule a private viewing in Munich, or arrange a delivery worldwide.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/auth?mode=signup" className="group inline-flex items-center gap-2 px-6 py-4 rounded-full bg-primary-foreground text-primary font-medium hover:bg-accent hover:text-accent-foreground transition-all">
                  Reserve viewing
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="mailto:atelier@bmw.com" className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/5 transition-all">
                  atelier@bmw.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/bmw-logo.svg" alt="BMW Logo" className="size-9" />
              <span className="font-display font-semibold tracking-tight text-lg">BMW Atelier</span>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              An independent restorer and curator of significant BMW automobiles, headquartered in Munich, Germany.
            </p>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Atelier</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="/experience" className="hover:text-accent transition-colors">Experience</a></li>
              <li><a href="/shop" className="hover:text-accent transition-colors">Shop</a></li>
              <li><a href="/about" className="hover:text-accent transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">Contact</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Maximilianstrasse 18</li>
              <li>80539 München</li>
              <li>+49 89 244 12 80</li>
              <li>atelier@bmw.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap justify-between items-center gap-4 font-mono text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} BMW Atelier</span>
          <span className="tracking-widest">CRAFTED IN MUNICH</span>
        </div>
      </div>
    </footer>
  );
};
