import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, LogOut, Menu, Settings, User, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", label: "Models" },
  { to: "/services", label: "Services" },
  { to: "/experience", label: "Experience" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Atelier" },
];

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = user?.email?.[0]?.toUpperCase() ?? "?";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 ease-expo ${
          scrolled ? "glass shadow-card" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 px-3">
          <div className="size-9 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold text-sm">
            B
          </div>
          <span className="hidden sm:block font-display font-semibold tracking-tight">Bavaria</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1 rounded-full bg-card/60 backdrop-blur-md px-1.5 py-1.5 border border-border/40">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}>
              {({ isActive }) => (
                <span
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                    isActive ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {l.label}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex rounded-full gap-2"
                onClick={() => navigate("/account")}
              >
                <Heart className="size-4" /> Saved
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="size-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-medium text-sm shadow-soft hover:scale-105 transition-transform">
                    {initials}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                  <DropdownMenuLabel className="font-normal">
                    <div className="text-xs text-muted-foreground">Signed in as</div>
                    <div className="truncate font-medium">{user.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <User className="size-4 mr-2" /> Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <Heart className="size-4 mr-2" /> Saved cars
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-destructive">
                    <LogOut className="size-4 mr-2" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex rounded-full"
                onClick={() => navigate("/auth")}
              >
                Sign in
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90"
                onClick={() => navigate("/auth?mode=signup")}
              >
                Reserve
              </Button>
            </>
          )}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden size-10 rounded-full grid place-items-center hover:bg-secondary"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex justify-between items-center p-6">
              <span className="font-display font-semibold">Bavaria</span>
              <button onClick={() => setMobileOpen(false)} className="size-10 rounded-full grid place-items-center hover:bg-secondary">
                <X />
              </button>
            </div>
            <div className="flex flex-col gap-2 px-6 mt-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-4xl font-display font-medium tracking-tight border-b border-border"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
