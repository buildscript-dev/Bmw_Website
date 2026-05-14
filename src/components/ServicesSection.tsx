import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import garage from "@/assets/garage-bg.jpg";

const SERVICES = [
  { num: "01", title: "Restoration", body: "Frame-off rebuilds following BMW's original factory specifications. Every nut, every torque value, documented." },
  { num: "02", title: "Sourcing", body: "Decades of contacts across Europe. We find the cars worth restoring — barn-finds, one-owners, period-correct survivors." },
  { num: "03", title: "Authentication", body: "VIN-decoded, history-traced, paint-thickness measured. A 60-page dossier accompanies every sale." },
  { num: "04", title: "Concierge", body: "Storage, transport, track days, classic rallies. Owning a BMW car is an ongoing relationship." },
];

export const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} id="services" className="relative py-32 overflow-hidden bg-primary text-primary-foreground">
      {/* Parallax bg */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-30">
        <img src={garage} alt="" className="w-full h-[130%] object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-primary" />
      </motion.div>

      <div className="container relative">
        <div className="max-w-3xl mb-20">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-3">
            ─ Services
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight font-medium leading-[0.95]">
            We don't sell cars.<br />
            We <span className="font-serif-display text-accent">curate</span> them.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t border-primary-foreground/15 pt-8"
            >
              <div className="flex items-baseline justify-between mb-4">
                <span className="font-mono text-xs text-primary-foreground/50 tracking-widest">{s.num} / 04</span>
                <span className="size-2 rounded-full bg-accent group-hover:scale-150 transition-transform duration-500" />
              </div>
              <h3 className="font-display text-4xl md:text-5xl font-medium mb-4">{s.title}</h3>
              <p className="text-primary-foreground/70 leading-relaxed max-w-md">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-32 overflow-hidden border-y border-primary-foreground/15 py-6">
        <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-5xl md:text-7xl font-medium">
          {Array.from({ length: 2 }).flatMap((_, k) => (
            ["Restoration", "·", "Authentication", "·", "Concierge", "·", "Sourcing", "·"].map((t, i) => (
              <span key={`${k}-${i}`} className={t === "·" ? "text-accent" : "text-primary-foreground/80"}>{t}</span>
            ))
          ))}
        </div>
      </div>
    </section>
  );
};
