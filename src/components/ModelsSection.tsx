import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Gauge, Heart } from "lucide-react";
import { CardCar3D } from "./CardCar3D";
import { useFavorites, type Car } from "@/hooks/useFavorites";

const CARS: Car[] = [
  { id: "bmw-m1", name: "BMW M1", image: "/models/1979_bmw_m1.glb", price: "€650,000" },
  { id: "bmw-m3-evo2", name: "BMW M3 Evo II", image: "/models/1988_bmw_m3_evolution_ii_e30.glb", price: "€145,000" },
  { id: "bmw-m3-e46", name: "BMW M3 Coupe", image: "/models/2003_bmw_m3_e46_coupe.glb", price: "€45,000" },
  { id: "bmw-m2-comp", name: "BMW M2 Comp", image: "/models/2019_bmw_m2_competition.glb", price: "€55,000" },
];

const META = [
  { year: "1979", series: "E26", spec: "3.5L M88/1 · 273hp" },
  { year: "1988", series: "E30", spec: "2.3L S14 · 220hp" },
  { year: "2003", series: "E46", spec: "3.2L S54 · 338hp" },
  { year: "2019", series: "F87", spec: "3.0L S55 · 405hp" },
];

export const ModelsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isFavorite, toggle } = useFavorites();
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section ref={ref} id="models" className="relative py-32 bg-background">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              ─ The collection
            </div>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight font-medium max-w-2xl">
              Four decades, <span className="font-serif-display text-gradient-accent">one philosophy</span>.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Each car has been mechanically refreshed, period-correct, and certified by our master technicians.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {CARS.map((car, i) => {
            const meta = META[i];
            const fav = isFavorite(car.id);
            return (
              <motion.article
                key={car.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="group relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:shadow-elevated"
              >
                <div className="relative m-3 overflow-hidden rounded-[1.15rem] bg-secondary min-h-[210px] md:min-h-[230px]">
                  <div className="absolute inset-x-8 bottom-9 h-12 rounded-full bg-foreground/10 blur-2xl transition-all duration-500 group-hover:scale-110 group-hover:bg-accent/15" />
                  <div aria-hidden className="absolute left-4 top-4 font-display text-5xl font-bold leading-none text-foreground/[0.08]">
                    {meta.year}
                  </div>
                  <div className="absolute right-4 top-4 rounded-full border border-border/80 bg-background/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground backdrop-blur">
                    {meta.series}
                  </div>
                  <CardCar3D url={car.image} scale={0.72} position={[0, -0.32, 0]} className="inset-x-0 bottom-1 top-8" />
                </div>

                <div className="space-y-5 px-5 pb-5 pt-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
                        Certified classic
                      </div>
                      <h3 className="mt-1 truncate font-display text-2xl font-medium tracking-tight">{car.name}</h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(car);
                      }}
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-background transition-all hover:scale-105 hover:border-accent/50"
                      aria-label="Favorite"
                    >
                      <Heart className={`size-4 transition-all ${fav ? "fill-accent stroke-accent" : "stroke-foreground"}`} />
                    </button>
                  </div>

                  <div className="grid grid-cols-[1fr_auto] items-end gap-4">
                    <div className="min-w-0 rounded-xl bg-secondary/60 px-3 py-2">
                      <div className="mb-1 flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">
                        <Gauge className="size-3" />
                        Spec
                      </div>
                      <div className="truncate text-sm font-medium">{meta.spec}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-foreground">From</div>
                      <div className="font-display text-xl font-semibold">{car.price}</div>
                    </div>
                  </div>

                  <button className="flex h-11 w-full items-center justify-between rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90">
                    Reserve model
                    <ArrowUpRight className="size-4" />
                  </button>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: hover === i ? "100%" : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
