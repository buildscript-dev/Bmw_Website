import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Heart } from "lucide-react";
import bmw518 from "@/assets/bmw-518i.png";
import bmwM3 from "@/assets/bmw-m3.png";
import bmw7 from "@/assets/bmw-7series.png";
import bmwZ3 from "@/assets/bmw-z3.png";
import { useFavorites, type Car } from "@/hooks/useFavorites";

const CARS: Car[] = [
  { id: "bmw-518i", name: "BMW 518i", image: bmw518, price: "€25,000" },
  { id: "bmw-m3", name: "BMW M3 E30", image: bmwM3, price: "€89,000" },
  { id: "bmw-7", name: "BMW 730i", image: bmw7, price: "€34,500" },
  { id: "bmw-z3", name: "BMW Z3", image: bmwZ3, price: "€18,900" },
];

const META = [
  { year: "1985", series: "E28", spec: "1.8L M10 · 105hp" },
  { year: "1989", series: "E30", spec: "2.5L S14 · 235hp" },
  { year: "1991", series: "E32", spec: "3.0L M30 · 188hp" },
  { year: "1996", series: "E36/7", spec: "1.9L M44 · 138hp" },
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

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
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
                className="group relative overflow-hidden rounded-[2rem] bg-secondary aspect-[4/3] cursor-pointer"
              >
                <motion.img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  width={1280}
                  height={768}
                  className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 ease-expo group-hover:scale-110"
                />
                {/* Big year overlay */}
                <div aria-hidden className="absolute top-6 left-6 font-display text-7xl font-bold text-foreground/10 leading-none">
                  {meta.year}
                </div>
                {/* Favorite */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(car);
                  }}
                  className="absolute top-6 right-6 size-12 rounded-full glass grid place-items-center hover:scale-110 transition-transform z-10"
                  aria-label="Favorite"
                >
                  <Heart className={`size-5 transition-all ${fav ? "fill-accent stroke-accent" : "stroke-foreground"}`} />
                </button>
                {/* Bottom info */}
                <motion.div
                  className="absolute bottom-0 inset-x-0 p-6 lg:p-8 flex items-end justify-between gap-4"
                  animate={{ y: hover === i ? -8 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div>
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{meta.series} · {meta.spec}</div>
                    <h3 className="font-display text-3xl md:text-4xl font-medium mt-1">{car.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">From</div>
                    <div className="font-display text-2xl font-medium">{car.price}</div>
                  </div>
                </motion.div>
                {/* Hover overlay line */}
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
