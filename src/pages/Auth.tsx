import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, Mail, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import bmw518 from "@/assets/bmw-518i.png";

const Auth = () => {
  const [params] = useSearchParams();
  const [mode, setMode] = useState<"signin" | "signup">(params.get("mode") === "signup" ? "signup" : "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate("/account", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: name },
          },
        });
        if (error) throw error;
        toast.success("Welcome to Bavaria. Check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/account` },
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left — visual */}
      <div className="hidden lg:flex relative bg-primary text-primary-foreground overflow-hidden p-10">
        <div className="absolute inset-0 bg-radial opacity-20" />
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-accent/20 blur-3xl" />
        <Link to="/" className="relative flex items-center gap-2 text-sm hover:text-accent transition-colors">
          <ArrowLeft className="size-4" /> Back to atelier
        </Link>

        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          src={bmw518}
          alt=""
          className="absolute bottom-10 -right-10 w-[120%] max-w-none drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)]"
        />
        <div className="relative mt-auto z-10 max-w-md">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground/60 mb-4">
            ─ Members
          </div>
          <h1 className="font-display text-5xl xl:text-6xl font-medium leading-[0.95] tracking-tight">
            Save what moves you. <span className="font-serif-display text-accent">Always.</span>
          </h1>
          <p className="text-primary-foreground/70 mt-6">
            A Bavaria account lets you bookmark cars, receive new arrivals first, and reserve viewings privately.
          </p>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 sm:p-10 relative">
        <Link to="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft className="size-4" /> Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            {mode === "signup" ? "Create account" : "Welcome back"}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight mb-8">
            {mode === "signup" ? (
              <>Join the <span className="font-serif-display text-gradient-accent">atelier</span></>
            ) : (
              <>Sign in</>
            )}
          </h2>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 rounded-full"
            onClick={handleGoogle}
            disabled={loading}
          >
            <svg className="size-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">or</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name" className="text-xs font-mono uppercase tracking-wider">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Klaus Becker"
                  className="h-12 rounded-2xl mt-1.5"
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="h-12 pl-11 rounded-2xl"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-xs font-mono uppercase tracking-wider">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-12 pl-11 rounded-2xl"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full mt-2 text-base"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : (mode === "signup" ? "Create account" : "Sign in")}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            {mode === "signup" ? "Already a member?" : "New to Bavaria?"}{" "}
            <button
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              className="text-accent hover:underline font-medium"
            >
              {mode === "signup" ? "Sign in" : "Create account"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
