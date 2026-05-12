import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { HeroCar3D } from "./HeroCar3D";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-radial pt-24">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />
      <div className="absolute inset-0 bg-spotlight" />

      <motion.div style={{ y, opacity, scale }} className="relative container">
        {/* Eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            Munich · Est. 1994
          </div>
          <div>Collection №24 / Ed. SS</div>
        </motion.div>

        {/* Title */}
        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.85] tracking-[-0.05em] font-medium"
            >
              The
              <span className="font-serif-display block text-gradient-accent">timeless</span>
              <span className="block">machine.</span>
            </motion.h1>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-4 lg:col-start-9 space-y-6"
          >
            <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
              An atelier dedicated to the restoration and preservation of the world's most quietly
              beautiful BMWs — from the E24 to the E39.
            </p>
            <div className="flex items-center gap-4 text-sm font-mono">
              <span className="px-3 py-1.5 rounded-full bg-primary text-primary-foreground">42 cars</span>
              <span className="text-muted-foreground">in current collection</span>
            </div>
          </motion.div>
        </div>

        {/* Featured car block */}
        <div className="mt-16 grid lg:grid-cols-12 gap-6 items-center">
          {/* Left meta */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:col-span-3 order-2 lg:order-1 space-y-6"
          >
            <div className="flex items-center gap-2">
              <button className="size-10 rounded-full border border-border hover:bg-secondary grid place-items-center transition-colors" aria-label="Previous">
                <ChevronLeft className="size-4" />
              </button>
              <button className="size-10 rounded-full border border-border hover:bg-secondary grid place-items-center transition-colors" aria-label="Next">
                <ChevronRight className="size-4" />
              </button>
            </div>
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Featured</div>
              <h3 className="font-display text-5xl font-medium mt-2">BMW M4</h3>
              <div className="text-sm text-muted-foreground mt-1">F82 · 2014 · Austin Yellow</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Top Speed</div>
                <div className="font-display text-2xl">220<span className="text-base text-muted-foreground"> km/h</span></div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Engine</div>
                <div className="font-display text-2xl">1.8<span className="text-base text-muted-foreground"> L M10</span></div>
              </div>
            </div>
          </motion.div>

          {/* Center stage with 3D */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative h-[340px] sm:h-[420px] lg:h-[500px]">
            <div className="pointer-events-none absolute inset-x-8 bottom-12 h-20 rounded-full bg-foreground/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-16 bottom-20 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
            {/* 3D layer */}
            <div className="absolute -inset-x-10 inset-y-0 z-10 cursor-grab active:cursor-grabbing">
              <HeroCar3D />
            </div>
            {/* Big text behind */}
            <div aria-hidden className="absolute -inset-x-10 top-1/2 -translate-y-1/2 -z-0 text-center pointer-events-none">
              <div className="font-display text-[18vw] lg:text-[12vw] font-bold leading-none text-stroke opacity-30 select-none">
                M4
              </div>
            </div>
          </div>

          {/* Right price */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="lg:col-span-3 order-3 space-y-6 lg:text-right"
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">From</div>
              <div className="font-display text-6xl font-medium mt-2">
                <span className="text-2xl align-top">€</span>25,000
              </div>
              <div className="text-sm text-muted-foreground mt-1">+ €4,350 in factory accessories</div>
            </div>
            <button className="w-full lg:w-auto px-6 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:scale-[1.02] hover:shadow-elevated">
              Reserve a viewing
            </button>
            <p className="text-xs text-muted-foreground lg:max-w-[14rem] lg:ml-auto">
              Drag the car to inspect — every angle, every detail.
            </p>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20 flex items-center justify-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
        >
          <span>Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="size-4" />
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
};
