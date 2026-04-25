import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { num: "30+", label: "Years restoring" },
  { num: "240", label: "Cars delivered" },
  { num: "18", label: "Countries served" },
  { num: "100%", label: "Period-correct" },
];

export const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} id="experience" className="relative py-32 bg-background overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              ─ Experience
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display text-5xl md:text-6xl tracking-tight font-medium leading-[0.95]"
            >
              Three decades of <span className="font-serif-display text-gradient-accent">obsession</span> with one marque.
            </motion.h2>

            <div className="grid grid-cols-2 gap-8 mt-12">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <div className="font-display text-5xl font-medium">{s.num}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <motion.blockquote
              style={{ y: yText }}
              className="font-serif-display text-3xl md:text-4xl leading-snug text-foreground/90"
            >
              "A great BMW isn't restored to look new. It's restored to feel
              <span className="text-accent"> exactly the way it did </span>
              the first time someone turned the key in 1985."
              <footer className="mt-6 not-italic font-sans text-sm text-muted-foreground tracking-wider uppercase">
                — Klaus Becker, Master Technician
              </footer>
            </motion.blockquote>

            <div className="grid sm:grid-cols-2 gap-6 mt-16">
              {[
                { k: "01", t: "Inspection", d: "8-hour, 220-point initial review of every car we acquire." },
                { k: "02", t: "Disassembly", d: "Photographed, catalogued, sent for refurbishment by trade." },
                { k: "03", t: "Reassembly", d: "Original torque specs, OEM gaskets, NOS parts where available." },
                { k: "04", t: "Validation", d: "300km shakedown drive, dyno run, ride-height check." },
              ].map((x, i) => (
                <motion.div
                  key={x.k}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-secondary hover:bg-muted transition-colors duration-500"
                >
                  <div className="font-mono text-xs text-accent mb-3">{x.k}</div>
                  <h4 className="font-display text-2xl font-medium mb-2">{x.t}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{x.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
